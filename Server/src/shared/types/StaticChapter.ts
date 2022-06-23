import { uint } from "tsrpc";

export interface StaticChapter{
    id: uint
    chapter: number
    skin: string
    chapterData: string
}