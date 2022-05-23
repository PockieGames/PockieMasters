import { Button, director, Node, _decorator } from 'cc';
import UIBase from '../UIBase';
import UIManager from '../UIManager';
const { ccclass, property } = _decorator;

@ccclass('HomeUI')
export default class HomeUI extends UIBase {

    @property(Button)
    storyBtn: Button

    start() {
        this.storyBtn.node.on(Button.EventType.CLICK, () => {
            director.loadScene("battle")
        }, this)
    }

    update(deltaTime: number) {
        
    }
}

