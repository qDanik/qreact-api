import { IParams } from "../api/interfaces";
import { TCredentials } from "./types";

export interface IResponse {
    data: any;
    status: string;
}

export interface IOptions {
    headers?: HeadersInit;
    withCredentials?: boolean;
    credentials?: TCredentials;
    baseUrl?: string;
}

export interface IHttp {
    [key: string]: any;
    create(options: IOptions): this;
    getOptions(): RequestInit;
    getUrl(url: string): string;
    post(url: string, params: IParams): Promise<any>;
    get(url: string, params: IParams): Promise<any>;
    queryString(params: IParams, letter: string, separator: string): string;
}
