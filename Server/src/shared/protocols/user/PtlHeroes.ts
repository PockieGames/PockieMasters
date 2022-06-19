import { Account } from "../../types/Account"
import { BaseConf, BaseRequest, BaseResponse } from "../base"

export interface ReqHeroes extends BaseRequest {
}

export interface ResHeroes extends BaseResponse {
    heroes: string
}

export const conf: BaseConf = {
    needLogin: true
}