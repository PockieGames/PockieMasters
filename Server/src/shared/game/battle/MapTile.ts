import MapObject from "./MapObject"

export default class MapTile {
    
    x: number = 0
    y: number = 0
    
    adjacencyList: MapTile[] = []
    visited: boolean = false
    parent: MapTile
    object: MapObject
    
    constructor(_x: number, _y: number){
        this.x = _x
        this.y = _y
    }
    
}