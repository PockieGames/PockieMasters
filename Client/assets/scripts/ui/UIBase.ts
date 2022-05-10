import { _decorator, Component } from "cc";
import UIManager from "./UIManager";

const { ccclass, property } = _decorator;

@ccclass("UIBase")
export default class UIBase extends Component{

    hide(){
        UIManager.Instance(UIManager).HideUI(this)
    }

}