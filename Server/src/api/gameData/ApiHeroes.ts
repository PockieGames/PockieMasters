import { ApiCall } from "tsrpc";
import StaticHeroes from "../../database/models/staticdata/StaticHeroes";
import { ReqHeroes, ResHeroes } from "../../shared/protocols/gameData/PtlHeroes";
import { StaticHero } from "../../shared/types/StaticHero";

export async function ApiHeroes(call: ApiCall<ReqHeroes, ResHeroes>) {
    // Fetch StaticHeroes from database and return them
    let heroes = await StaticHeroes.findAll({})

    let staticHeroList: StaticHero[] = []

    heroes.forEach((hero) => {
        staticHeroList.push({
            id: hero.id,
            name: hero.name,
            sprite: hero.sprite,
            type: Number.parseInt(hero.type),
            rarity: Number.parseInt(hero.rarity),
            spells: hero.spells.split(","),
            attack: hero.attack,
            movement: hero.movement
        })
    })

    call.succ({ heroes: staticHeroList })
}