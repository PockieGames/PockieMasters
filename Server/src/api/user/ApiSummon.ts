import { ApiCall } from "tsrpc";
import { ReqSummon, ResSummon } from "../../shared/protocols/user/PtlSummon";

export async function ApiSummon(call: ApiCall<ReqSummon, ResSummon>) {
    // TODO
    call.error('API Not Implemented');
}