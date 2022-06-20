import { ApiCall } from "tsrpc";
import Heroes from "../../database/models/Heroes";
import { UserUtil } from "../../models/UserUtil";
import { ReqHeroes, ResHeroes } from "../../shared/protocols/user/PtlHeroes";
import { Hero } from "../../shared/types/Hero";

export async function ApiHeroes(call: ApiCall<ReqHeroes, ResHeroes>) {

    let user = await UserUtil.parseSSO(call.req.__ssoToken!)

    if (user == undefined)
        return call.error("User not found.")

    let heroes = await Heroes.findAll({
        where: {
            ownerId: user.id
        }
    })

    let heroArray: Hero[] = []

    heroes.forEach((hero: Heroes) => {
        heroArray.push({
            id: hero.id,
            heroId: hero.heroId
        })
    })

    call.succ({
        heroes: heroArray
    })

}