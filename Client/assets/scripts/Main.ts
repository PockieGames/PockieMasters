import { _decorator, Component, Node } from 'cc';
import NetworkManager from './network/NetworkManager';
import { serviceProto, ServiceType } from "./shared/protocols/serviceProto";

const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends Component {

    async start() {

        let networkManager = new NetworkManager()

    }

    update(deltaTime: number) {
        
    }
}

