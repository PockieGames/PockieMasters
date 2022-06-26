import { Vec2 } from "cc"
import HeroData from "../shared/game/data/HeroData"
import IStat from "../shared/game/battle/stats/IStat"


export enum MapObjectType {  
    HERO,
    STATIC,
    ATTACKABLE,
}

export interface MapObject {
    type: MapObjectType,
    objectData: HeroData,
    position: Vec2
}

export interface MapData {

    mapObjects: MapObject[]

}