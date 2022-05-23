import { _decorator, Component, Node, director } from 'cc';
import AudioManager from '../manager/AudioManager';
const { ccclass, property } = _decorator;

@ccclass("AnimationCallbacks")
export class AnimationCallbacks extends Component {

    playMusic(clipPath: string){
        AudioManager.Instance<AudioManager>().playMusic(clipPath)
        console.log("Play Music: " + clipPath)
    }

    playEffect(clipPath: string){
        AudioManager.Instance<AudioManager>().playEffect(clipPath)
        console.log("Play Effect: " + clipPath)
    }

    changeScene(sceneName: string){
        director.loadScene(sceneName)
    }

}