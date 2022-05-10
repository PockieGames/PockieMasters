import { Button, EventHandler, _decorator } from "cc";
import UIBase from "../UIBase";

const { ccclass, property } = _decorator;

@ccclass("TestUI")
export default class TestUI extends UIBase{
    
    @property({type: Button})
    closeBtn: Button

    start(){
        this.closeBtn.node.on(Button.EventType.CLICK, () => {
            this.hide()
        }, this)
    }

}