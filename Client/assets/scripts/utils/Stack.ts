import Logger from "./Logger";

export default class Stack<T>{

    private _array: T[];
    private _maxCount: number;
    private _curCount: number;

    constructor(maxCount?: number) {
        this._array = [];
        this._curCount = 0;
        if (maxCount != null) {
            this._maxCount = maxCount;
        }
    }

    public push(...elements: T[]) {
        let newCount = elements.length;
        if (this._maxCount && this._array.length + newCount > this._maxCount) {
            Logger.Warn('The number of stacks exceeds the preset number');
            return;
        }
        this._array.push(...elements);
    }

    public pop(): T {
        return this._array.pop();
    }

    public peek() {
        return this._array[this._array.length - 1];
    }

    public get count() {
        this._curCount = this._array.length;
        return this._curCount;
    }

    public isEmpty() {
        return this._array.length === 0;
    }

    public clear() {
        this._array = [];
    }

    public print() {
        Logger.Info(this._array);
    }

}