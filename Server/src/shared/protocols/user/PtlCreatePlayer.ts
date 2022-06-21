import { BaseConf, BaseRequest, BaseResponse } from "../base";

export interface ReqCreatePlayer extends BaseRequest {
    name: string
    hero: number
}

export interface ResCreatePlayer extends BaseResponse {
    
}

export const conf: BaseConf = {
    needLogin: true
}