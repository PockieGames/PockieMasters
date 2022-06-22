import { _decorator, director, Button, Component, Node } from 'cc';
import SceneManager from '../manager/SceneManager';
const { ccclass, property } = _decorator;

@ccclass('ChapterUI')
export class ChapterUI extends Component {@property(Button)
    storyBtn: Button

    start() {
        this.storyBtn.node.on(Button.EventType.CLICK, () => {
            SceneManager.Instance<SceneManager>().loadScene("battle")
        }, this)
    }

    update(deltaTime: number) {
        
    }
}

