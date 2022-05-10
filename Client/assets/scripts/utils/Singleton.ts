export default class Singleton {

    private static _instance = null

    public static Instance<T>(): T {
        if (this._instance == null) {
            this._instance = new this() as T
        }
        return this._instance as T
    }

}