import { sys } from "cc";
import HeroData from "../shared/game/data/HeroData";
import { User } from "../shared/types/User";
import { UserSystemInfos } from "../shared/types/UserSystemInfos";
import Singleton from "../utils/Singleton";
import StorageUtils from "../utils/StorageUtils";
import { generateUUID } from "../utils/UUID";
import GameData from "./GameData";

export default class UserManager extends Singleton{

    currentUser?: User
    heroes: HeroData[] = []

    populateHeroes(data){
        data.forEach((hero) => {
            let heroData = GameData.Instance<GameData>().heroData.find(x => x.id == hero.id)
            if(heroData)
                this.heroes.push(heroData)
        })
    }

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

    reset() {
        StorageUtils.deleteData("sys.identifier");
        StorageUtils.deleteData("sys.password");
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