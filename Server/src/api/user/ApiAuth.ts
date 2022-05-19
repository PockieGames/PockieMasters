import { ApiCall } from "tsrpc";
import Database from "../../models/Database";
import { ReqAuth, ResAuth } from "../../shared/protocols/user/PtlAuth";

export async function ApiAuth(call: ApiCall<ReqAuth, ResAuth>) {
    Database.query("", "")
    call.succ({account: { id: 0 }})
}