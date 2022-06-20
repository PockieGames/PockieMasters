import { _decorator, Component, Node, Sprite, Label, Button, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('HeroFrame')
export class HeroFrame extends Component {

    @property(Sprite)
    icon: Sprite
    @property(Sprite)
    frame: Sprite
    @property(Label)
    lvl: Label

    onClick: () => any = async () => {}

    start(){
        this.node.on(Node.EventType.MOUSE_UP || Node.EventType.TOUCH_END, () => {
            this.onClick()
        })
    }

    setIcon(spriteFrame: SpriteFrame){
        this.icon.spriteFrame = spriteFrame
    }

}