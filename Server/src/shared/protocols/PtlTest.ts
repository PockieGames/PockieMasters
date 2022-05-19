import { BaseConf, BaseRequest, BaseResponse } from "./base";

export interface ReqTest extends BaseRequest{
    
}

export interface ResTest extends BaseResponse{
    
}

export const conf: BaseConf = {
    needLogin: true
}