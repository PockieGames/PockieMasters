import { sys } from "cc";
import { UserSystemInfos } from "../shared/types/UserSystemInfos";
import Singleton from "../utils/Singleton";
import StorageUtils from "../utils/StorageUtils";
import { generateUUID } from "../utils/UUID";

export default class UserManager extends Singleton{

    getIdentifier(): string{
        return StorageUtils.readData("sys.identifier")
    }

    setIdentifier(id: string){
        StorageUtils.saveData("sys.identifier", id)
    }

    getPassword(): string{
        return StorageUtils.readData("sys.password")
    }

    setPassword(password: string){
        StorageUtils.saveData("sys.password", password)
    }

    // Generate a UUID that persists
    getUUID(): string{
        var uuid = StorageUtils.readData("sys.uuid")
        if(uuid){
            return uuid 
        }
        return StorageUtils.saveData("sys.uuid", generateUUID())
    }

    getSystemInfo(): UserSystemInfos{
        return {
            language: sys.languageCode,
            os: sys.os,
            osVersion: sys.osVersion
        }
    }

}