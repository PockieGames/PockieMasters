import { _decorator, Component, Node } from 'cc';
import UIManager from '../ui/UIManager';
import HomeUI from '../ui/views/HomeUI';
const { ccclass, property } = _decorator;

@ccclass('HomeScene')
export class HomeScene extends Component {

    @property(Node)
    viewNode: Node

    async start() {
        //let homeUI = await UIManager.Instance<UIManager>().OpenUI(HomeUI)
    }

    update(deltaTime: number) {
        
    }
}

