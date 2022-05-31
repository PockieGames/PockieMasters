import MapObject from '../../shared/game/battle/MapTileObject'
import { _decorator, Component, Node, dragonBones, Vec3, Color, Tween, tween, JsonAsset } from 'cc';
import ResourceManager from '../../manager/ResourceManager';
import Spell from '../../shared/game/battle/spells/Spell'
import { Team } from '../../shared/game/SharedConstants';
const { ccclass, property } = _decorator;

@ccclass('TileObject')
export class TileObject extends Component {

    id: number 
    spriteId: string = "24026"
    sprite: dragonBones.ArmatureDisplay
    spellSlots: Spell[] = []

    constructor(){
        super()
    }

    start(){
        if(this.sprite == null){
            this.sprite = this.node.addComponent(dragonBones.ArmatureDisplay);
        }
    }

    changeAnimation(name: string, timesPlayed: number = 0){
        if(this.sprite.animationName == name)
            return
        this.sprite.playAnimation(name, timesPlayed)
    }

    async render(team: Team){
        let dbAsset = await ResourceManager.Instance<ResourceManager>().loadAsset<dragonBones.DragonBonesAsset>("textures/characters/heroDB" + this.spriteId + "_ske")
        let dbAtlas = await ResourceManager.Instance<ResourceManager>().loadAsset<dragonBones.DragonBonesAtlasAsset>("textures/characters/heroDB" + this.spriteId)
        this.sprite.dragonAsset = dbAsset
        this.sprite.dragonAtlasAsset = dbAtlas
        this.sprite.armatureName = "armatureName"
        this.sprite.playAnimation('wait', 0)
        if(team == Team.TEAM_BLUE){
            this.node.setScale(new Vec3(0.35,0.35,1))
        } else{
            this.node.setScale(new Vec3(-0.35,0.35,1))
        }

        this.sprite.color = new Color(255, 255, 255, 0);
        let color = new Color(255, 255, 255, 0);
        let curColor = new Color()
        
        tween(this.sprite)
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

