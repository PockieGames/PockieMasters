import { JsonAsset } from "cc";
import HeroData from "../data/HeroData";
import Singleton from "../utils/Singleton";
import ResourceManager from "./ResourceManager";

export default class GameData extends Singleton{

    heroData: HeroData[]
    initialized = false

    async loadData(){
        this.heroData = (await ResourceManager.Instance<ResourceManager>().loadAsset<JsonAsset>("gdata/heroData")).json as HeroData[]
        this.initialized = true
    }


}