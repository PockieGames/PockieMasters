import { _decorator, director, Button, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ChapterUI')
export class ChapterUI extends Component {@property(Button)
    storyBtn: Button

    start() {
        this.storyBtn.node.on(Button.EventType.CLICK, () => {
            director.loadScene("battle")
        }, this)
    }

    update(deltaTime: number) {
        
    }
}

