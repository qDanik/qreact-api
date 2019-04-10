import { ICamelCase, IData, IOptions, TConfigure } from './interfaces';
import { camelCase, has, isObject } from "./utils";

export class CamelCase implements ICamelCase {

    private readonly data: any;
    private readonly options: IOptions;
    private cache: IData = {};

    public constructor(data: any, options: IOptions = {}) {
        this.data = data;
        this.options = {
            deep: false,
            ...options
        };
    }

    private configure = (key: string, value: any): TConfigure => {
        const { exclude } = this.options;

        if(exclude && has(exclude, key)) {
            return [key, value];
        }

        if (this.cache[key]) {
            key = this.cache[key];

            return [key, value];
        }

        const newKey = camelCase(key);
        if (key.length < 100) {
            this.cache[key] = newKey;
        }

        key = newKey;

        return [key, value];
    };

    private map(data: IData, target: IData = {}, seen: WeakMap<object, any> = new WeakMap<object, any>()): IData {
        if (seen.has(data)) {
            return seen.get(data);
        }

        seen.set(data, target);

        const mapArray = (array: IData[]): IData[] => array.map((x: IData): IData => (isObject(x) ? this.map(x, {}, seen) : x));

        if (Array.isArray(data)) {
            return mapArray(data);
        }

        const dataKeys: string[] = Object.keys(data);
        const { deep } = this.options;

        return dataKeys.reduce((result: IData, key: string): IData => {
            const value: any = data[key];
            const [newKey, newValue] = this.configure(key, value);

            if (deep && isObject(newValue)) {
                target[newKey] = Array.isArray(newValue)
                    ? mapArray(newValue)
                    : this.map(newValue, target, seen);

                return target;
            }

            target[newKey] = newValue;

            return target;
        }, target);
    }

    private convert(data: any = this.data): IData {
        return this.map(data);
    }

    public result(): IData {
        if(Array.isArray(this.data)) {
            const inputKeys: string[] = Object.keys(this.data);

            return inputKeys.map((key: string): IData => this.convert(this.data[key]));
        }

        return this.convert();
    }

}

export default (data: any, options?: IOptions): object => {
    const converter: CamelCase = new CamelCase(data, options);

    return converter.result();
}
