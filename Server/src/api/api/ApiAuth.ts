import { ApiCall } from "tsrpc";
import { ReqAuth, ResAuth } from "../../shared/protocols/api/PtlAuth";

export async function ApiAuth(call: ApiCall<ReqAuth, ResAuth>) {
    call.succ({ success: true })
}