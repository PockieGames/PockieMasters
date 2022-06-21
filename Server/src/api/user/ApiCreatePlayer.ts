import { ApiCall } from "tsrpc";
import Heroes from "../../database/models/Heroes";
import User from "../../database/models/User";
import { UserUtil } from "../../models/UserUtil";
import { ReqCreatePlayer, ResCreatePlayer } from "../../shared/protocols/user/PtlCreatePlayer";

export async function ApiCreatePlayer(call: ApiCall<ReqCreatePlayer, ResCreatePlayer>) {

    let user = await UserUtil.parseSSO(call.req.__ssoToken!)

    if (user == undefined)
        return call.error("User not found.")

    // insert hero to datase
    await Heroes.create({
        ownerId: user.id,
        heroId: call.req.hero
    })

    // update username from user
    await User.update({
        username: call.req.name
    },
    { where: { id: user.id } })

    call.succ({})
}