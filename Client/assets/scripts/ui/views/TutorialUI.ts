import { _decorator, Component, Node, AnimationClip, Animation } from 'cc';
import UIBase from '../UIBase';
import UIManager from '../UIManager';
import { StoryUI } from './StoryUI';
const { ccclass, property } = _decorator;

@ccclass('TutorialUI')
export class TutorialUI extends UIBase {
    
    @property({type: Node})
    step1: Node

    start() {
    }

    update(deltaTime: number) {
        /* UIManager.Instance<UIManager>().OpenUI(StoryUI).then(() => {
            UIManager.Instance<UIManager>().HideUI(this)
        })*/
    }

}

