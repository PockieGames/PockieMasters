import { Color, Component, Label, Node, Sprite, UITransform, Vec2, _decorator } from "cc";
import MapTile from "../shared/game/battle/MapTile";

const { ccclass, property } = _decorator;

@ccclass('Tile')
export default class Tile extends Component {

    mapTile: MapTile

    visited: boolean = false
    parent: Tile

    @property(Node)
    hoverFrame: Node
    @property(Label)
    debugPos: Label = null
    @property(Sprite)
    background: Sprite

    start () {
        if(this.hoverFrame != null) { 
            this.hoverFrame.active = false
        }
        this.debugPos.node.active = false
    }
    
    isOnTile(position: Vec2){
        let uiTransform = this.node.getComponent(UITransform)
        if(position.x > (this.node.worldPosition.x - uiTransform.width / 2) && position.x < (this.node.worldPosition.x + uiTransform.width / 2)){
            if(position.y > (this.node.worldPosition.y - uiTransform.height / 2) && position.y < (this.node.worldPosition.y + uiTransform.height / 2)){
                return true
            }
        }
        return false
    }

    showDebugPos(){
        this.debugPos.node.active = false
        this.debugPos.string = this.mapTile.x + "/" + this.mapTile.y
    }

    setColor(color: number[]){
        let nodeSprite = this.background.getComponent(Sprite)
        nodeSprite.color = new Color(color[0], color[1], color[2], color[3])
    }

}