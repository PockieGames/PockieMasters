import { ApiCall } from "tsrpc";
import User from "../../database/models/User";
import { UserUtil } from "../../models/UserUtil";
import { ReqAuth, ResAuth } from "../../shared/protocols/user/PtlAuth";

export async function ApiAuth(call: ApiCall<ReqAuth, ResAuth>) {

    let user = await User.findOne({
        where: {
            uuid: call.req.uuid,
            identifier: call.req.identifier,
            password: call.req.password,
        }
    })

    if(user == null)
        call.error("There was a problem authenticating.")

    if(user != null){
        let sso = await UserUtil.createSsoToken(user.uuid)

        call.succ({__ssoToken: sso})
    }
}