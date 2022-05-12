import { Button, Label, tween, Vec3, _decorator, Node, Tween, easing } from "cc";
import UIBase from "../UIBase";

const { ccclass, property } = _decorator;

@ccclass("MessageBox")
export default class MessageBox extends UIBase{
    
    @property({type: Node})
    dialogue: Node
    @property({type: Label})
    title: Label
    @property({type: Label})
    message: Label
    @property({type: Button})
    closeBtn: Button

    start(){
        super.start()
        this.setupUI()
    }

    setupUI(){
        this.title.string = this.uiData.title
        this.message.string = this.uiData.message
        this.closeBtn.node.on(Button.EventType.CLICK, () => {
            this.hide()
        }, this)

        tween(this.dialogue)
            .set({ scale: new Vec3(0, 0, 1)})
            .to(0.2, {scale: new Vec3(1,1,1)}, {easing: "fade"} )
            .start()
    }

    hide(){
        tween(this.dialogue)
            .to(0.05, { scale: new Vec3(0, 0, 1)}, {
                onComplete: () => {
                    super.hide()
                }
            })
            .start()
    }

}