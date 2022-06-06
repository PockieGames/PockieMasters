
interface IDictionary<TValue> {
    [id: string]: TValue;
}

export default class Dictionary<T> {

    private _dictionary: IDictionary<T>

    constructor(populate = {}) {
        this._dictionary = populate;
    }

    public containsKey(key: string): boolean {
        return key in this._dictionary;
    }

    public add(key: string, value: T) {
        this._dictionary[key] = value;
    }

    public delete(key: string): boolean {
        if (this.containsKey(key)) {
            delete this._dictionary[key];
            return true;
        }
        return false;
    }

    public get(key: string): T | undefined {
        return this.containsKey(key) ? this._dictionary[key] : undefined;
    }

    public keys(): Array<string> {
        let result: Array<string> = new Array<string>();
        for (let key in this._dictionary) {
            if (this.containsKey(key)) result.push(key);
        }
        return result;
    }

    public values(): Array<T> {
        let result: Array<T> = new Array<T>();
        for (let key in this._dictionary) {
            if (this.containsKey(key)) result.push(this._dictionary[key]);
        }
        return result;
    }

    public getDictionary(): Object {
        return this._dictionary;
    }

    public clear() {
        this._dictionary = {};
    }

    public get size(): number {
        return Object.keys(this._dictionary).length;
    }
}