import { _decorator, Component, Node, Button, director } from 'cc';
import SceneManager from '../../manager/SceneManager';
import { AnimatedRichText } from '../components/AnimatedRichText';
import UIBase from '../UIBase';
const { ccclass, property } = _decorator;

@ccclass('StoryUI')
export class StoryUI extends UIBase {

    prefabName = "StoryUI"

    @property({type: AnimatedRichText})
    animatedDialogueText: AnimatedRichText

    @property({type: Button})
    skipBtn: Button

    start() {
        this.animatedDialogueText.onFinish = () => {
            // Wait 3 Seconds before loading
            this.scheduleOnce(() => {
                SceneManager.Instance<SceneManager>().loadScene("home")
            }, 3)
        }
        this.animatedDialogueText.node.on(Node.EventType.TOUCH_END, () => {
            this.animatedDialogueText.finishNow()
        })
        this.skipBtn.node.on(Button.EventType.CLICK, async () => {
            this.unscheduleAllCallbacks()
            SceneManager.Instance<SceneManager>().loadScene("home");
        })
    }

    update(deltaTime: number) {
        
    }
}

