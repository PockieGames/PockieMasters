import { ApiCall } from "tsrpc";
import { ReqAuth, ResAuth } from "../../shared/protocols/user/PtlAuth";

export async function ApiAuth(call: ApiCall<ReqAuth, ResAuth>) {
    call.succ({account: { id: 0 }})
}