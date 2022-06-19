import { _decorator, Component, Node, Button, director } from 'cc';
import UIBase from '../UIBase';
const { ccclass, property } = _decorator;

@ccclass('StoryUI')
export class StoryUI extends UIBase {
    @property({type: Button})
    skipBtn: Button

    start() {
        this.skipBtn.node.on(Button.EventType.CLICK, async () => {
            director.loadScene("home");
        })
    }

    update(deltaTime: number) {
        
    }
}

