import { _decorator, Component, Node, sys, gfx } from 'cc';
import AudioManager from '../manager/AudioManager';
import SceneManager from '../manager/SceneManager';
import UIManager from '../manager/UIManager';
import LoginUI from '../ui/views/LoginUI';

const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends Component {

    async start() {

        //let networkManager = new NetworkManager()
        //SceneManager.Instance<SceneManager>().loadScene

        UIManager.Instance<UIManager>().OpenUI(LoginUI)

    }

    update(deltaTime: number) {
        
    }
}

