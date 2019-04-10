type TExclude = string | RegExp;

export type TConfigure = [string, any];

export interface IData {
    [key: string]: any;
}

export interface ICamelOptions {
    pascalCase: boolean;
}

export interface IOptions {
    readonly deep?: boolean;
    readonly exclude?: TExclude[];
}

export interface ICamelCase {
    result(): IData;
}
