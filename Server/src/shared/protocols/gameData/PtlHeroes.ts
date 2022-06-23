import { StaticHero } from "../../types/StaticHero"
import { BaseConf, BaseRequest, BaseResponse } from "../base"

export interface ReqHeroes extends BaseRequest {
}

export interface ResHeroes extends BaseResponse {
    heroes: StaticHero[]
}

export const conf: BaseConf = {
    needLogin: true
}