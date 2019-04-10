import { ICamelOptions } from "./interfaces";

export const isObject = (x: any): boolean => {
    const instance: boolean = !(x instanceof RegExp) && !(x instanceof Error) && !(x instanceof Date);

    return typeof x === 'object' && x !== null && instance;
};

export const has = (exclude: any, key: string): boolean => {
    const callback: Function = (x: any): boolean => {
        return typeof x === 'string' ? x === key : x.test(key)
    };

    return exclude.some(callback)
};

const preserveCamelCase = (input: string) => {
    let isLastCharLower = false;
    let isLastCharUpper = false;
    let isLastLastCharUpper = false;

    for (let i = 0; i < input.length; i++) {
        const c = input[i];

        if (isLastCharLower && /[a-zA-Z]/.test(c) && c.toUpperCase() === c) {
            input = `${input.slice(0, i)}-${input.slice(i)}`;
            isLastCharLower = false;
            isLastLastCharUpper = isLastCharUpper;
            isLastCharUpper = true;
            i++;
        } else if (isLastCharUpper && isLastLastCharUpper && /[a-zA-Z]/.test(c) && c.toLowerCase() === c) {
            input = `${input.slice(0, i - 1)}-${input.slice(i - 1)}`;
            isLastLastCharUpper = isLastCharUpper;
            isLastCharUpper = false;
            isLastCharLower = true;
        } else {
            isLastCharLower = c.toLowerCase() === c;
            isLastLastCharUpper = isLastCharUpper;
            isLastCharUpper = c.toUpperCase() === c;
        }
    }

    return input;
};

const camelOptions: ICamelOptions = { pascalCase: false };
const postProcess = (x: string): string => camelOptions.pascalCase ? x.charAt(0).toUpperCase() + x.slice(1) : x;

export const camelCase = (input: string): string => {
    if (Array.isArray(input)) {
        input = input.map((x: string): string => x.trim())
            .filter((x: string): boolean => !!x.length)
            .join('-');
    } else {
        input = input.trim();
    }

    if (input.length === 0) {
        return '';
    }

    if (input.length === 1) {
        return camelOptions.pascalCase ? input.toUpperCase() : input.toLowerCase();
    }

    if (/^[a-z\d]+$/.test(input)) {
        return postProcess(input);
    }

    const hasUpperCase: boolean = input !== input.toLowerCase();

    if (hasUpperCase) {
        input = preserveCamelCase(input);
    }

    input = input
        .replace(/^[_.\- ]+/, '')
        .toLowerCase()
        .replace(/[_.\- ]+(\w|$)/g, (m: string, p1: string): string => p1.toUpperCase());

    return postProcess(input);
};

