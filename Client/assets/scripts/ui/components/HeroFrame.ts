import { _decorator, Component, Node, Sprite, Label, Button, SpriteFrame } from 'cc';
import { RarityColors } from '../../Constants';
const { ccclass, property } = _decorator;

@ccclass('HeroFrame')
export class HeroFrame extends Component {

    @property(Sprite)
    icon: Sprite
    @property(Sprite)
    iconType: Sprite
    @property(Sprite)
    frame: Sprite
    @property(Label)
    lvl: Label
    @property(Node)
    loadingNode: Node

    onClick: () => any = async () => {}

    start(){

        if(this.loadingNode.active){
            this.icon.node.active = false
            this.iconType.node.active = false
            this.lvl.node.active = false
        }

        this.node.on(Node.EventType.TOUCH_END, () => {
            this.onClick()
        })

    }

    setRarity(rarity: number){
        switch(rarity){
            case 1:
                this.frame.color = RarityColors.COMMON
                break
            case 2:
                this.frame.color = RarityColors.UNCOMMON
                break
            case 3:
                this.frame.color = RarityColors.RARE
                break
            case 4:
                this.frame.color = RarityColors.EPIC
                break
            case 5:
                this.frame.color = RarityColors.LEGENDARY
                break
            case 5:
                this.frame.color = RarityColors.IMMORTAL
                break
        }
    }

    setIcon(spriteFrame: SpriteFrame){
        this.icon.spriteFrame = spriteFrame
        this.icon.node.active = true
        this.loadingNode.active = false
    }

    setLevel(lvl: number){
        this.lvl.string = `${lvl}`
        this.lvl.node.active = true
        this.loadingNode.active = false
    }

    setIconType(spriteFrame: SpriteFrame){
        this.iconType.spriteFrame = spriteFrame
        this.iconType.node.active = true
        this.loadingNode.active = false
    }

}