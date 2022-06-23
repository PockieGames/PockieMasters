import HeroData from "../shared/game/data/HeroData";
import SpellData from "../shared/game/data/SpellData";
import Singleton from "../utils/Singleton";
import NetworkManager from "./NetworkManager";
import { StaticHero } from "../shared/types/StaticHero";
import ChapterData from "../shared/game/data/ChapterData";
import { StaticChapter } from "../shared/types/StaticChapter";

export default class GameData extends Singleton{

    heroData: HeroData[]
    chapterData: ChapterData[]
    initialized = false

    async fetchData(){

        // Fetch GameData from server
        let gameDataRes = await NetworkManager.Instance<NetworkManager>().callApi("gameData/Heroes")
        if(!gameDataRes || gameDataRes.err)
            return
        this.heroData = []
        gameDataRes.res.heroes.forEach((heroData: StaticHero) => {
            let hero = new HeroData()
            hero.id = heroData.id
            hero.name = heroData.name
            hero.sprite = heroData.sprite
            hero.heroType = heroData.type
            hero.rarity = heroData.rarity
            hero.spells = heroData.spells
            this.heroData.push(hero)
        })

        // Fetch ChapterData from server
        let chapterDataRes = await NetworkManager.Instance<NetworkManager>().callApi("gameData/Chapters")
        if(!chapterDataRes || chapterDataRes.err)
            return
        this.chapterData = []
        chapterDataRes.res.chapters.forEach((chapterData: StaticChapter) => {
            let chapter = new ChapterData()
            chapter.id = chapterData.id
            chapter.chapter = chapterData.chapter
            chapter.skin = chapterData.skin
            chapter.chapterData = chapterData.chapterData
            this.chapterData.push(chapter)
        })

        this.initialized = true
    }

}