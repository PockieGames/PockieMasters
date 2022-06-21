import { _decorator, Component } from "cc";
import UIManager from "./UIManager";

const { ccclass, property } = _decorator;

@ccclass("UIBase")
export default class UIBase extends Component{

    public prefabName: string =  "PLEASE SET PREFAB NAME"

    protected uiData: any

    setUIData(data: any){
        this.uiData = data
    }

    hide(){
        if(!UIManager.Instance<UIManager>().HideUI(this)){
            this.node.destroy()
        }
    }

}