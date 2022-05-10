import { _decorator, Component } from "cc";
import UIManager from "./UIManager";

const { ccclass, property } = _decorator;

@ccclass("UIBase")
export default class UIBase extends Component{

    protected uiData: {data: any}

    setUIData(data: {data: any}){
        this.uiData = data
    }

    hide(){
        if(!UIManager.Instance<UIManager>().HideUI(this)){
            this.node.destroy()
        }
    }

}