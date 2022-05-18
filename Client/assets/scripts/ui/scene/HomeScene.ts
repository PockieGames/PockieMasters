import { _decorator, Component, Node } from 'cc';
import UIManager from '../UIManager';
import { HomeUI } from '../views/HomeUI';
const { ccclass, property } = _decorator;

@ccclass('HomeScene')
export class HomeScene extends Component {
    start() {
        UIManager.Instance<UIManager>().OpenUI(HomeUI)
    }

    update(deltaTime: number) {
        
    }
}

