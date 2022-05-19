import { _decorator, Component, Node, sys, gfx } from 'cc';
import UserManager from './manager/UserManager';
import UIManager from './ui/UIManager';
import LoginUI from './ui/views/LoginUI';
import TestUI from './ui/views/TestUI';
import Singleton from './utils/Singleton';
import StorageUtils from './utils/StorageUtils';

const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends Component {

    async start() {

        //let networkManager = new NetworkManager()

        let uiManager = UIManager.Instance<UIManager>().OpenUI(LoginUI)

        console.log(UserManager.Instance<UserManager>().getUUID())

    }

    update(deltaTime: number) {
        
    }
}

