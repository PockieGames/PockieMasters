import { Button, Label, tween, Vec3, _decorator, Node, Tween, easing } from "cc";
import UIBase from "../UIBase";

const { ccclass, property } = _decorator;

@ccclass("FormationSetup")
export default class FormationSetup extends UIBase{
    
    prefabName = "FormationSetup"

    backdropBtn: Button

    start(){
        this.setupUI()
    }

    setupUI(){

        this.backdropBtn.node.on(Button.EventType.CLICK, () => {
            this.hide()
        }, this)
        
    }

    hide(){
        super.hide()
    }

}