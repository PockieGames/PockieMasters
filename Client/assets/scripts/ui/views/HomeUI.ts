import { _decorator } from 'cc';
import UIBase from '../UIBase';
import UIManager from '../UIManager';
const { ccclass, property } = _decorator;

@ccclass('HomeUI')
export class HomeUI extends UIBase {
    start() {
        console.log('Home ui');
    }

    update(deltaTime: number) {
        
    }
}

