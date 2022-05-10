export default class Singleton<T> {

    private static _instance = null;

    public static Instance<T>(c: { new(): T }): T {
        if (this._instance == null) {
            this._instance = new c();
        }
        return this._instance;
    }

}