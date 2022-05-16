import { sys } from "cc";

export default class StorageUtils {

    static saveData(dataKey: string, dataValue: string){
        if(sys.isNative){
            //TODO save on native end
            jsb.fileUtils.getWritablePath()
        }
        if(sys.isBrowser){
            localStorage.setItem(dataKey, dataValue)
        }
    }

    static readData(dataKey: string): string{
        if(sys.isNative){
            //TODO read on native end
            jsb.fileUtils.getWritablePath()
        }
        if(sys.isBrowser){
            return localStorage.getItem(dataKey)
        }
    }

}