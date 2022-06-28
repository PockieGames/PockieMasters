import { Button, EditBox, EventHandler, _decorator } from "cc";
import NetworkManager from "../../manager/NetworkManager";
import UIBase from "../UIBase";
import UIManager from "../../manager/UIManager";
import MessageBox from "../popups/MessageBox";
import { TutorialUI } from "./TutorialUI";

const { ccclass, property } = _decorator;

@ccclass("CreatePlayerUI")
export default class CreatePlayerUI extends UIBase{
    
    prefabName: string = "CreatePlayer"

    @property({type: Button})
    confirmBtn: Button

    @property({type: EditBox})
    editBox: EditBox

    start(){
        this.editBox.node.on(EditBox.EventType.TEXT_CHANGED, () => {
            this.confirmBtn.interactable = this.editBox.string.length > 2
        })
        this.confirmBtn.node.on(Button.EventType.CLICK, () => {
            UIManager.Instance<UIManager>().OpenPopup(MessageBox, {
                title: "Hello",
                message: this.editBox.string,
                onClose: async () => {
                    let res = await NetworkManager.Instance<NetworkManager>().callApi("user/CreatePlayer", {
                        name: this.editBox.string,
                        hero: 1
                    })
                    if(res.err){

                    } else {
                        UIManager.Instance<UIManager>().OpenUI(TutorialUI).then(() => {
                            UIManager.Instance<UIManager>().HideUI(this)
                        })
                    }
                }
            })
        }, this)
    }

}