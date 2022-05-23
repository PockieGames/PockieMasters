import { _decorator, Component, Node, sys, gfx } from 'cc';
import AudioManager from '../manager/AudioManager';
import UIManager from '../ui/UIManager';
import LoginUI from '../ui/views/LoginUI';

const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends Component {

    async start() {

        //let networkManager = new NetworkManager()

        let uiManager = UIManager.Instance<UIManager>().OpenUI(LoginUI)

    }

    update(deltaTime: number) {
        
    }
}

