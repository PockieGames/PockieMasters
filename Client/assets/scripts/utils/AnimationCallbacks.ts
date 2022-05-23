import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass("AnimationCallbacks")
export class AnimationCallbacks extends Component {

    playSound(clipName: string){
        console.log("PlaySound: " + clipName)
    }

}