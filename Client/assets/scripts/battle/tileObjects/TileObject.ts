import MapObject from '../../shared/game/battle/MapObject'
import { _decorator, Component, Node, dragonBones, Vec3, Color, Tween } from 'cc';
import ResourceManager from '../../manager/ResourceManager';
const { ccclass, property } = _decorator;

@ccclass('TileObject')
export class TileObject extends Component {

    displayName: string = "UNKNOWN"
    mapObject: MapObject

    spriteId: string = "11014"
    sprite: dragonBones.ArmatureDisplay

    constructor(){
        super()
    }

    start(){
        this.mapObject = new MapObject()
        if(this.sprite == null){
            this.sprite = this.node.addComponent(dragonBones.ArmatureDisplay);
        }
    }

    async render(){
        let dbAsset = await ResourceManager.Instance<ResourceManager>().loadAsset<dragonBones.DragonBonesAsset>("textures/characters/" + this.spriteId + "_ske")
        let dbAtlas = await ResourceManager.Instance<ResourceManager>().loadAsset<dragonBones.DragonBonesAtlasAsset>("textures/characters/" + this.spriteId)
        this.sprite.dragonAsset = dbAsset
        this.sprite.dragonAtlasAsset = dbAtlas
        this.sprite.armatureName = "armatureName"
        this.sprite.playAnimation('wait', 0)
        this.node.setScale(new Vec3(0.35,0.35,1))

        this.sprite.color = new Color(255, 255, 255, 0);
        let color = new Color(255, 255, 255, 0);
        let curColor = new Color()
        let tween = new Tween(this.sprite)
        tween
          .to(0.5, {}, {
            onUpdate: (target, ratio: number) => {
                this.sprite.color = Color.lerp(curColor, color, Color.WHITE, ratio)
            }
          })
          .call(() => {
              //this.statusBar.active = true
          })
          .start()
    }

}

