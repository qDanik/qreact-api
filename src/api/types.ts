export enum TMethods {
    get = 'GET',
    heade = 'HEAD',
    post = 'POST',
    put = 'PUT',
    delete = 'DELETE',
    conenct = 'CONNECT',
    options = 'OPTIONS',
    trace = 'TRACE',
    patch = 'PATCH',
}

export type TRequest = Promise<any>;
