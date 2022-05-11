import { Button, Label, _decorator } from "cc";
import UIBase from "../UIBase";

const { ccclass, property } = _decorator;

@ccclass("MessageBox")
export default class MessageBox extends UIBase{
    
    @property({type: Label})
    title: Label
    @property({type: Label})
    message: Label
    @property({type: Button})
    closeBtn: Button

    start(){
        console.log(this.uiData)
        this.closeBtn.node.on(Button.EventType.CLICK, () => {
            this.hide()
        }, this)
        this.setupUI()
    }

    setupUI(){
        this.title.string = this.uiData.title
        this.message.string = this.uiData.message
    }

}