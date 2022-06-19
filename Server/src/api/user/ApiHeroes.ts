import { ApiCall } from "tsrpc";
import { UserUtil } from "../../models/UserUtil";
import { ReqHeroes, ResHeroes } from "../../shared/protocols/user/PtlHeroes";

export async function ApiHeroes(call: ApiCall<ReqHeroes, ResHeroes>) {
    
    let user = await UserUtil.parseSSO(call.req.__ssoToken!)

    if(user == undefined)
        return call.error("User not found.")

    call.succ({
        heroes: user.heroes
    })

}