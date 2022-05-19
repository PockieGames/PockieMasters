import { UserSystemInfos } from "../../types/UserSystemInfos"
import { BaseRequest } from "../base"

export interface ReqReg extends BaseRequest{
    uuid: string
    osInfos: UserSystemInfos
}

export interface ResReg extends BaseRequest {
    identifier: string,
    password: string
}
