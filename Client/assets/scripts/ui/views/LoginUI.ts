import { Button, EditBox, EventHandler, _decorator } from "cc";
import UIBase from "../UIBase";
import UIManager from "../UIManager";
import MessageBox from "./MessageBox";

const { ccclass, property } = _decorator;

@ccclass("LoginUI")
export default class LoginUI extends UIBase{
    
    @property(Button)
    loginBtn: Button
    @property(EditBox)
    username: EditBox
    @property(EditBox)
    password: EditBox

    start(){
        this.loginBtn.node.on(Button.EventType.CLICK, () => {
            UIManager.Instance<UIManager>().OpenPopup(MessageBox, {
                title: "Hallo",
                message: "Welt"
            })
        }, this)
    }

    onLogin(){

    }

}