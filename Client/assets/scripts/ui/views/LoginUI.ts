import { Button, director, EditBox, EventHandler, _decorator } from "cc";
import NetworkManager from "../../network/NetworkManager";
import UIBase from "../UIBase";
import UIManager from "../UIManager";
import { HomeUI } from "./HomeUI";
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
        this.loginBtn.node.on(Button.EventType.CLICK, async () => {
            UIManager.Instance<UIManager>().OpenPopup(MessageBox, {
                title: "Hallo",
                message: "Welt"
            })
            await NetworkManager.Instance<NetworkManager>().connect();
            await NetworkManager.Instance<NetworkManager>().callApi("Auth", {
                password: "123",
                username: "123"
            });
            UIManager.Instance<UIManager>().HideUI(this);
            UIManager.Instance<UIManager>().OpenUI(LoginUI);
        }, this)
    }

    onLogin(){

    }

}