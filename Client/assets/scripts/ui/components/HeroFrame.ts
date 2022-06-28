import { _decorator, Component, Node, Sprite, Label, Button, SpriteFrame } from 'cc';
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

        this.icon.node.active = false
        this.iconType.node.active = false
        this.lvl.node.active = false
        
        this.loadingNode.active = true

        this.node.on(Node.EventType.TOUCH_END, () => {
            this.onClick()
        })

    }

    setIcon(spriteFrame: SpriteFrame){
        this.icon.spriteFrame = spriteFrame
        this.icon.node.active = true
        this.loadingNode.active = false
    }

    setLevel(lvl: number){
        this.lvl.string = `${lvl}`
        this.lvl.node.active = true
    }

    setIconType(spriteFrame: SpriteFrame){
        this.iconType.spriteFrame = spriteFrame
        this.iconType.node.active = true
    }

}