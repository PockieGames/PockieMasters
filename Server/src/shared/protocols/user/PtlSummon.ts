import { BaseRequest, BaseResponse } from "../base";

export interface ReqSummon extends BaseRequest{
    amount: number
    banner: number
}

export interface ResSummon extends BaseResponse{
    
}
