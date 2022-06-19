import { sys } from "cc";

export default class StorageUtils {

    static saveData(dataKey: string, dataValue: string){
        sys.localStorage.setItem(dataKey, dataValue)
        return dataValue
    }

    static readData(dataKey: string): string{
        return sys.localStorage.getItem(dataKey)
    }

    static deleteData(dataKey: string) {
        return sys.localStorage.removeItem(dataKey);
    }

}