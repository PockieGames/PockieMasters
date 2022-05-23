import { ApiCall } from "tsrpc";
import { ReqUser, ResUser } from "../../shared/protocols/user/PtlUser";
import { UserUtil } from "../../models/UserUtil";

export async function ApiUser(call: ApiCall<ReqUser, ResUser>) {
    
    let user = await UserUtil.parseSSO(call.req.__ssoToken!)

    if(user == undefined)
        return call.error("User not found.")

    call.succ({user: {
        uuid: user.uuid,
        username: user.username,
        currencyFree: user.currencyFree,
        currencyPremium: user.currencyPremium,
        tutorialStep: user.tutorialStep
    }})

}