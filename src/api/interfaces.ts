import { TMethods, TRequest } from "./types";

export interface IParams {
    [key: string]: any;
}

export interface IEndpoints {
    [key: string]: any;
}

export interface IHeaders {
    name: string;
    value: any;
}
export interface IHeader {
    [key: string]: any;
}

export interface IOptions {
    params?: IParams;
    urlParams?: IParams;
    method?: TMethods;
}

export interface IConfiguration {
    method: TMethods;
    options: IOptions;
    url: string;
}

export interface IApi {
    request(path: string, options: IOptions): TRequest;
    endpoint(path: string): string;
    find(path: string): IEndpoints;
    getBaseUrl(): string;
    setEndpoints(values: IEndpoints): this;
    setHeaders(headers: IHeaders[]): this;
    setHeader(name: string, value: any): this;
    setBaseUrl(value: string): this;
}
