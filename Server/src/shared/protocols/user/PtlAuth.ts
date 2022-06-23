import { BaseConf, BaseRequest, BaseResponse } from "../base"

export interface ReqAuth extends BaseRequest {
    uuid: string,
    identifier: string,
    password: string
}

export interface ResAuth extends BaseResponse {
    __ssoToken: string
}

export const conf: BaseConf = {
    needLogin: false
}