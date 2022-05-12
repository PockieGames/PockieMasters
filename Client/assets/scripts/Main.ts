import { _decorator, Component, Node } from 'cc';
import NetworkManager from './network/NetworkManager';
import { serviceProto, ServiceType } from "./shared/protocols/serviceProto";
import UIManager from './ui/UIManager';
import LoginUI from './ui/views/LoginUI';
import TestUI from './ui/views/TestUI';
import Singleton from './utils/Singleton';

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

