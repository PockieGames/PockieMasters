import IStat from "../shared/game/battle/stats/IStat"

export enum MapObjectType {
    
    STATIC,
    AI_BEGINNER,
    AI_STANDARD,
    AI_EXPERT,

}

export default interface MapData {

    mapObjects: {
        type: MapObjectType,
        objectData: {
            name: string,
            skin: string,
            stats: IStat[]
        },
        position: {
            x:number,
            y: number
        }
    }[]

}