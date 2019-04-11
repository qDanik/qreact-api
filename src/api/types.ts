export enum TMethods {
    get = 'GET',
    head = 'HEAD',
    post = 'POST',
    put = 'PUT',
    delete = 'DELETE',
    connect = 'CONNECT',
    options = 'OPTIONS',
    trace = 'TRACE',
    patch = 'PATCH',
}

export type TRequest = Promise<any>;
