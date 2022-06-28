import { Button, EventHandler, _decorator } from "cc";
import UIBase from "../UIBase";
import UIManager from "../../manager/UIManager";
import MessageBox from "../popups/MessageBox";

const { ccclass, property } = _decorator;

@ccclass("TestUI")
export default class TestUI extends UIBase{
    
    @property({type: Button})
    closeBtn: Button

    start(){
        this.closeBtn.node.on(Button.EventType.CLICK, () => {
            UIManager.Instance<UIManager>().OpenPopup(MessageBox, {
                title: "Hallo",
                message: "Welt"
            })
        }, this)
    }

}