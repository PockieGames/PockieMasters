import { UserSystemInfos } from "../../types/UserSystemInfos"

export interface ReqReg {
    uuid: string
    osInfos: UserSystemInfos
}

export interface ResReg {
    identifier: string,
    password: string
}
