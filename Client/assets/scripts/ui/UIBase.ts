import { _decorator, Component } from "cc";
import UIManager from "./UIManager";

const { ccclass, property } = _decorator;

@ccclass("UIBase")
export default class UIBase extends Component{

    protected uiData: any

    setUIData(data: any){
        this.uiData = data
    }

    start(){
        console.log("Start from UIBASE")
    }

    hide(){
        if(!UIManager.Instance<UIManager>().HideUI(this)){
            this.node.destroy()
        }
    }

}