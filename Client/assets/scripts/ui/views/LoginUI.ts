import { Button, director, EditBox, EventHandler, Node, sys, _decorator } from "cc";
import NetworkManager from "../../manager/NetworkManager";
import UserManager from "../../manager/UserManager";
import { ResReg } from "../../shared/protocols/user/PtlReg";
import { ServiceType } from "../../shared/protocols/serviceProto";
import Logger from "../../utils/Logger";
import UIBase from "../UIBase";
import UIManager from "../UIManager";
import MessageBox from "./MessageBox";
import { TutorialUI } from "./TutorialUI";
import GameData from "../../manager/GameData";

const { ccclass, property } = _decorator;

@ccclass("LoginUI")
export default class LoginUI extends UIBase{
    
    @property(Button)
    loginBtn: Button

    @property(Button)
    logoutBtn: Button

    @property(Button)
    serverSelectBtn: Button

    @property(Node)
    serverSelectionNode: Node

    serverList: [
        {
            "id": 1,
            "name": "Test Server",
            "ip": "127.0.0.1",
            "port": 80,
            "status": "normal"
        }
    ]

    setupServerSelection(){
        this.serverSelectionNode.getChildByName("bg").on(Node.EventType.MOUSE_DOWN || Node.EventType.TOUCH_START, () => {
            this.serverSelectionNode.active = false
        })
    }

    start(){

        GameData.Instance<GameData>().loadData()

        this.setupServerSelection()

        this.serverSelectBtn.node.on(Button.EventType.CLICK, async () => {
            this.serverSelectionNode.active = true
        })

        this.logoutBtn.node.on(Button.EventType.CLICK, async() => {
            let res = await NetworkManager.Instance<NetworkManager>().callApi("user/Logout", {})
            console.log(res)
        })

        this.loginBtn.node.on(Button.EventType.CLICK, async () => {

            let userManager = UserManager.Instance<UserManager>()

            if(userManager.getIdentifier() && userManager.getPassword()){

                let res = await NetworkManager.Instance<NetworkManager>().callApi("user/Auth", {
                    uuid: userManager.getUUID(),
                    identifier: userManager.getIdentifier(),
                    password: userManager.getPassword()
                })

                if(res.isSucc){
                    // Sucessfully logged in. Handle login.
                    // Probably check if Tutorial is done, etc.

                    // Get and Set User Infos
                    let user = await NetworkManager.Instance<NetworkManager>().callApi("user/User")
                    userManager.currentUser = user.res

                    if(userManager.currentUser.tutorialStep > 10){
                        director.loadScene("Home")
                    } else {
                        Logger.Info("Go-to-Tutorial")
                        UIManager.Instance<UIManager>().OpenUI(TutorialUI).then(() => {
                            UIManager.Instance<UIManager>().HideUI(this)
                        })
                    }
                }

            } else { // NO Identifier, register!

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