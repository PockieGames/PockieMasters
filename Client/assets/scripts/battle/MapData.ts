import { Vec2 } from "cc"
import HeroData from "../shared/game/data/HeroData"
import IStat from "../shared/game/battle/stats/IStat"


export enum MapObjectType {
    
    HERO,
    STATIC,
    ATTACKABLE,

}

export default interface MapObject {
    type: MapObjectType,
    objectData: HeroData,
    position: Vec2

}

export default interface MapData {

    mapObjects: MapObject[]

}