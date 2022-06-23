import { ApiCall } from "tsrpc";
import StaticChapters from "../../database/models/staticdata/StaticChapters";
import { ReqChapters, ResChapters } from "../../shared/protocols/gameData/PtlChapters";
import { StaticChapter } from "../../shared/types/StaticChapter";

export async function ApiChapters(call: ApiCall<ReqChapters, ResChapters>) {

    let chapters = await StaticChapters.findAll({})

    let staticChapterList: StaticChapter[] = []

    chapters.forEach((chapter) => {
        staticChapterList.push({
            id: chapter.id,
            chapter: chapter.chapter,
            skin: chapter.skin,
            chapterData: chapter.chapterData
        })
    })

    call.succ({ chapters: staticChapterList })
}