import MapTileObject from "./MapTileObject"
import AttackableObject from "./MapAttackableObject"

export default class MapTile {
    
    x: number = 0
    y: number = 0
    
    adjacencyList: MapTile[] = []
    visited: boolean = false
    parent: MapTile
    mapObject: MapTileObject
    
    constructor(_x: number, _y: number){
        this.x = _x
        this.y = _y
    }
    
}