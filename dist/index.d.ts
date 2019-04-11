
// FILE GENERATED BY `rollup-plugin-dts@0.14.0`
// https://github.com/Swatinem/rollup-plugin-dts

declare enum EConnection {
    "ethernet" = 0,
    "bluetooth" = 1,
    "cellular" = 2,
    "mixed" = 3,
    "none" = 4,
    "other" = 5,
    "unknown" = 6,
    "wifi" = 7,
    "wimax" = 8
}
declare enum EffectiveConnectionType {
    "2g" = 0,
    "3g" = 1,
    "4g" = 2,
    "slow-2g" = 3
}
declare type TConnection = EConnection | undefined;
declare type TDownlink = number | undefined;

interface IConnection {
    getStatus(): boolean;
    getType(): TConnection;
    getEffectiveType(): EffectiveConnectionType;
    getDownlink(): TDownlink;
    getDownlinkMax(): TDownlink;
    getRtt(): number;
    getSaveData(): boolean;
    setCallback(callback: any): this;
}

declare enum TMethods {
    get = "GET",
    head = "HEAD",
    post = "POST",
    put = "PUT",
    delete = "DELETE",
    connect = "CONNECT",
    options = "OPTIONS",
    trace = "TRACE",
    patch = "PATCH"
}
declare type TRequest = Promise<any>;

interface IParams {
    [key: string]: any;
}
interface IEndpoints {
    [key: string]: any;
}
interface IHeaders {
    name: string;
    value: any;
}
interface IOptions {
    params?: IParams;
    urlParams?: IParams;
    method?: TMethods;
}
interface IApi {
    request(path: string, options: IOptions): TRequest;
    endpoint(path: string): string;
    find(path: string): IEndpoints;
    getBaseUrl(): string;
    setEndpoints(values: IEndpoints): this;
    setHeaders(headers: IHeaders[]): this;
    setHeader(name: string, value: any): this;
    setBaseUrl(value: string): this;
}

declare type TCredentials = 'omit' | 'same-origin' | 'include';

interface IResponse {
    data: any;
    status: string;
}
interface IOptions$1 {
    headers?: HeadersInit;
    withCredentials?: boolean;
    credentials?: TCredentials;
    baseUrl?: string;
}
interface IHttp {
    [key: string]: any;
    create(options: IOptions$1): this;
    getOptions(): RequestInit;
    getUrl(url: string): string;
    post(url: string, params: IParams): Promise<any>;
    get(url: string, params: IParams): Promise<any>;
    queryString(params: IParams, letter: string, separator: string): string;
}

declare class Http implements IHttp {
    private options;
    constructor();
    create(options: IOptions$1): this;
    getOptions(): RequestInit;
    getUrl(url: string): string;
    post(url: string, params: IParams): Promise<any>;
    get(url: string, params: IParams): Promise<any>;
    static toJson(response: any): Promise<IResponse>;
    static toText(response: any): Promise<IResponse>;
    queryString(params: IParams, letter?: string, separator?: string): string;
}
declare const _default: Http;

declare type TExclude = string | RegExp;
interface IData {
    [key: string]: any;
}
interface IOptions$2 {
    readonly deep?: boolean;
    readonly exclude?: TExclude[];
}
interface ICamelCase {
    result(): IData;
}

declare class CamelCase implements ICamelCase {
    private readonly data;
    private readonly options;
    private cache;
    constructor(data: any, options?: IOptions$2);
    private configure;
    private map;
    private convert;
    result(): IData;
}
declare const _default$1: (data: any, options?: IOptions$2 | undefined) => object;

declare class Api implements IApi {
    private baseUrl;
    private endpoints;
    private headers;
    private http;
    constructor(baseUrl: string, endpoints: IEndpoints);
    createHttp(): void;
    private configureEndpoint;
    private configureRequest;
    request(path: string, options: IOptions): TRequest;
    private get;
    endpoint(path: string): string;
    find(path: string): IEndpoints;
    getBaseUrl(): string;
    setEndpoints(values: IEndpoints): this;
    setHeaders(headers: IHeaders[]): this;
    setHeader(name: string, value: any): this;
    setBaseUrl(value: string): this;
    static decrypt(response: any): object;
}

declare class Connection implements IConnection {
    private readonly status;
    private connect;
    constructor(callback?: null);
    getStatus(): boolean;
    getType(): TConnection;
    getEffectiveType(): EffectiveConnectionType;
    getDownlink(): TDownlink;
    getDownlinkMax(): TDownlink;
    getRtt(): number;
    getSaveData(): boolean;
    setCallback(callback: any): this;
}

export { Api, CamelCase, Connection, Http, _default as http, _default$1 as toCamelCase };
