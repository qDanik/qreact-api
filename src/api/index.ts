import toCamelCase from '../camelCase';
import {
    IApi,
    IConfiguration, IEndpoints, IHeader, IHeaders, IOptions, IParams
} from "./interfaces";
import { TMethods, TRequest } from "./types";
import { Http } from "../http";
import { IHttp } from "../http/interfaces";

const DEFAULT_METHOD: TMethods = window.DEFAULT_METHOD || TMethods.get;
const CIPHER_STATUS: boolean = window.CIPHER_STATUS;

export class Api implements IApi {

    private baseUrl: string;

    private endpoints: IEndpoints;

    private headers: IHeader = { 'Content-Type': 'application/json' };

    private http: IHttp = new Http();

    public constructor(baseUrl: string, endpoints: IEndpoints) {
        this.baseUrl = baseUrl || 'www.example.com';
        this.endpoints = endpoints || {};

        this.createHttp();
    }

    public createHttp(): void {
        this.http = this.http.create({
            baseUrl: this.getBaseUrl(),
            headers: this.headers,
            withCredentials: true,
        });
    }

    private configureEndpoint(endpoint: string, params: IParams): string {
        const paramsArr: string[] = Object.keys(params);

        return paramsArr.reduce((result: string, key: string): string => result.replace(`:${key}`, params[key]), endpoint);
    }

    private configureRequest(configuration: IConfiguration): TRequest {
        const { method, options, url } = configuration;
        const callback = this.http[method.toLowerCase()];

        return callback(url, options.params).then(Api.decrypt);
    }

    public request(path: string, options: IOptions): TRequest {
        let url: string = this.find(path).toString();
        const method: TMethods = options.method || DEFAULT_METHOD;
        const { params, urlParams } = options;

        if (urlParams) {
            url = this.configureEndpoint(url, urlParams);
        }

        return this.configureRequest({ method, url, options: { params } });
    }

    private get(name: string, endpoints: IEndpoints = this.endpoints): IEndpoints {
        return endpoints[name] ? endpoints[name] : false;
    }

    public endpoint(path: string): string {
        return `${this.getBaseUrl()}${this.find(path)}`;
    }

    public find(path: string): IEndpoints {
        const paths: string[] = path.split('.');

        return paths.reduce((result: IEndpoints, value): IEndpoints => this.get(value, result), this.endpoints)
    }

    public getBaseUrl(): string {
        return this.baseUrl;
    }

    public setEndpoints(values: IEndpoints): this {
        this.endpoints = { ...this.endpoints, ...values };

        return this;
    }

    public setHeaders(headers: IHeaders[]): this {
        for (let count = 0; count < headers.length; count++) {
            const header: IHeader = headers[count];
            this.setHeader(header.name, header.value);
        }
        this.createHttp();

        return this;
    }

    public setHeader(name: string, value: any): this {
        this.headers[name] = value;

        return this;
    }

    public setBaseUrl(value: string): this {
        this.baseUrl = value;

        return this;
    }

    public static decrypt(response: any): object {
        let { data } = response;
        if (CIPHER_STATUS) {
            const decrypted = window.di.cipher.decrypt(data);
            try {
                data = toCamelCase(decrypted, { deep: true });
            } catch (e) {
                data = decrypted;
            }
        }
        data = typeof data === 'object' ? toCamelCase(data, { deep: true }) : data;

        return { ...response, data };
    }

}
