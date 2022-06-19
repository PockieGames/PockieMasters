import { JsonAsset } from "cc";
import HeroData from "../shared/game/data/HeroData";
import SpellData from "../shared/game/data/SpellData";
import Singleton from "../utils/Singleton";
import ResourceManager from "./ResourceManager";
import { spells } from "../shared/game/SharedConstants"
import TestSpell from "../shared/game/data/Spells/TestSpell";

export default class GameData extends Singleton{

    heroData: HeroData[]
    initialized = false

    async loadData(){
        this.heroData = (await ResourceManager.Instance<ResourceManager>().loadAsset<JsonAsset>("gdata/heroData")).json as HeroData[]
        this.initialized = true
    }

}