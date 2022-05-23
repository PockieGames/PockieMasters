import { User } from "../../types/User";
import { BaseConf, BaseRequest, BaseResponse } from "../base";

export interface ReqUser extends BaseRequest{
    
}

export interface ResUser extends BaseResponse{
    user: User
}

export const conf: BaseConf = {
    needLogin: true
}