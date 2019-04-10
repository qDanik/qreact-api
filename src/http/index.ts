import { IParams } from "../api/interfaces";
import { IHttp, IOptions, IResponse } from "./interfaces";

export class Http implements IHttp {

    private options: IOptions;

    public constructor() {
        this.options = {};
    }

    public create(options: IOptions): this {
        this.options = options;

        return this;
    }

    public getOptions(): RequestInit {
        return {
            headers: this.options.headers,
            ...(this.options.withCredentials && ({ credentials: 'include' })),
        }
    }

    public getUrl(url: string): string {
        return this.options.baseUrl + url;
    }

    public post(url: string, params: IParams): Promise<any> {
        return window.fetch(this.getUrl(url), {
            method: 'post',
            body: JSON.stringify(params),
            ...this.getOptions(),
        }).then(Http.toJson)
    }

    public get(url: string, params: IParams): Promise<any> {
        const query = this.queryString(params);

        return window.fetch(`${this.getUrl(url)}${query && `?${query}`}`, { method: 'get', }).then(Http.toText);
    }

    public static async toJson(response: any): Promise<IResponse> {
        const data = await response.json();

        return {
            data,
            status: response.status,
        }
    }

    public static async toText(response: any): Promise<IResponse> {
        const data = await response.text();

        return {
            data,
            status: response.status,
        }
    }

    public queryString(params: IParams, letter: string = '=', separator: string = '&'): string {
        if (!params) return '';

        const paramsKeys: string[] = Object.keys(params);
        const query: string[] = paramsKeys.map((key: string): string => {
            const value = params[key];

            if (typeof value === 'object') {
                const paramValue = this.queryString(value, ':', ',');

                return `${key}={${paramValue}}`;
            }

            const paramName = letter === '=' ? key : JSON.stringify(key);

            return `${paramName}${letter}${JSON.stringify(value)}`;
        });

        return query.join(separator);
    }

}

export default new Http();
