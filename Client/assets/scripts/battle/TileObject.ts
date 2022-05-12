import MapObject from '../shared/game/battle/MapObject'
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TileObject')
export class TileObject extends Component {

    displayName: string = "UNKNOWN"
    mapObject: MapObject

    constructor(){
        super()
        this.mapObject = new MapObject()
    }

}

