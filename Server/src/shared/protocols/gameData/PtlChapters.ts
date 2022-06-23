import { StaticChapter } from "../../types/StaticChapter"
import { BaseConf, BaseRequest, BaseResponse } from "../base"

export interface ReqChapters extends BaseRequest {
}

export interface ResChapters extends BaseResponse {
    chapters: StaticChapter[]
}

export const conf: BaseConf = {
    needLogin: true
}