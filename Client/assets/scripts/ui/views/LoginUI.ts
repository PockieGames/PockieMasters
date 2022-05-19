import { Button, director, EditBox, EventHandler, _decorator } from "cc";
import NetworkManager from "../../manager/NetworkManager";
import UserManager from "../../manager/UserManager";
import { ResReg } from "../../shared/protocols/user/PtlReg";
import Logger from "../../utils/Logger";
import UIBase from "../UIBase";
import UIManager from "../UIManager";
import MessageBox from "./MessageBox";

const { ccclass, property } = _decorator;

@ccclass("LoginUI")
export default class LoginUI extends UIBase{
    
    @property(Button)
    loginBtn: Button

    @property(Button)
    logoutBtn: Button

    @property(Button)
    testBtn: Button

    start(){

        this.testBtn.node.on(Button.EventType.CLICK, async () => {
            let res = await NetworkManager.Instance<NetworkManager>().callApi("Test", {})
            console.log(res)
        })

        this.logoutBtn.node.on(Button.EventType.CLICK, async() => {
            let res = await NetworkManager.Instance<NetworkManager>().callApi("user/Logout", {})
            console.log(res)
        })

        this.loginBtn.node.on(Button.EventType.CLICK, async () => {

            //await NetworkManager.Instance<NetworkManager>().connect();

            let userManager = UserManager.Instance<UserManager>()

            if(userManager.getIdentifier() && userManager.getPassword()){

                // Identifier, login!

                let res = await NetworkManager.Instance<NetworkManager>().callApi("user/Auth", {
                    uuid: userManager.getUUID(),
                    identifier: userManager.getIdentifier(),
                    password: userManager.getPassword()
                })

            } else {

                // NO Identifier, register!

                let res = await NetworkManager.Instance<NetworkManager>().callApi("user/Reg", {
                    uuid: userManager.getUUID(),
                    osInfos: userManager.getSystemInfo(),
                })
    
                if(!res.isSucc)
                    return
    
                Logger.Info("Registered. Identifier: " + res.res.identifier)
    
                userManager.setIdentifier(res.res.identifier)
                userManager.setPassword(res.res.password)
    
                UIManager.Instance<UIManager>().HideUI(this)

            }

        }, this)
    }

    onLogin(){

    }

}