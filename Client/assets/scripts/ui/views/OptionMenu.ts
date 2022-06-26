import { Button, Label, tween, Vec3, _decorator, Node, Tween, easing } from "cc";
import UIBase from "../UIBase";

const { ccclass, property } = _decorator;

@ccclass("OptionMenu")
export default class OptionMenu extends UIBase{
    
    prefabName = "OptionMenu"

    @property({type: Button})
    backdrop: Button

    @property({type: Node})
    container: Node

    onClose: () => any

    start(){
        this.setupUI()
    }

    setupUI(){
        this.backdrop.node.on(Button.EventType.CLICK, () => {
            this.hide()
            if(this.onClose)
                this.onClose() 
        })

        tween(this.container)
            .set({ scale: new Vec3(0, 0, 1)})
            .to(0.2, {scale: new Vec3(1,1,1)}, {easing: "fade"} )
            .start()
    }

    hide(){
        tween(this.container)
            .to(0.05, { scale: new Vec3(0, 0, 1)}, {
                onComplete: () => {
                    super.hide()
                }
            })
            .start()
    }

}