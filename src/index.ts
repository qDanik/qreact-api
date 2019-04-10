import { NetworkInformation } from "./connection/interfaces";
import { TMethods } from "./api/types";
import http, { Http } from './http';
import toCamelCase, { CamelCase } from './camelCase';
import { Injector } from 'qreact-di';

declare global {
    interface Navigator {
        connection: NetworkInformation;
    }

    interface Window {
        DEFAULT_METHOD: TMethods;
        CIPHER_STATUS: boolean;
        di: Injector;
    }
}

export { Connection } from './connection';
export {
    Http, http, toCamelCase, CamelCase
};
