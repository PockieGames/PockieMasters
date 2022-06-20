import { Hero } from "../../types/Hero"
import { BaseConf, BaseRequest, BaseResponse } from "../base"

export interface ReqHeroes extends BaseRequest {
}

export interface ResHeroes extends BaseResponse {
    heroes: Hero[]
}

export const conf: BaseConf = {
    needLogin: true
}