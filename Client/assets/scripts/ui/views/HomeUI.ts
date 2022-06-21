import { Button, director, Node, _decorator } from 'cc';
import UIBase from '../UIBase';
import UIManager from '../UIManager';
const { ccclass, property } = _decorator;

@ccclass('HomeUI')
export default class HomeUI extends UIBase {

    prefabName = "HomeUI"

    @property(Button)
    chapterButton: Button

    start() {
        this.chapterButton.node.on(Button.EventType.CLICK, () => {
            director.loadScene("chapter")
        }, this)
    }

    update(deltaTime: number) {
        
    }
}

