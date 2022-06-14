import { _decorator, Component, Node, Prefab, instantiate, Button } from 'cc';
import UIManager from '../ui/UIManager';
import HomeUI from '../ui/views/HomeUI';
const { ccclass, property } = _decorator;

@ccclass('HomeScene')
export class HomeScene extends Component {

    @property(Node)
    viewNode: Node

    @property(Prefab)
    chapterPrefab: Prefab
    @property(Button)
    chapterBtn: Button
    @property(Prefab)
    shopPrefab: Prefab
    @property(Button)
    shopButton: Button

    start() {
        this.replaceView(this.chapterPrefab)

        this.chapterBtn.node.on(Button.EventType.CLICK, () => {
            this.replaceView(this.chapterPrefab)
        })

        this.shopButton.node.on(Button.EventType.CLICK, () => {
            this.replaceView(this.shopPrefab)
        })
    }

    replaceView(prefab: Prefab) {
        let newNode = instantiate(prefab)
        if (this.viewNode.children.length > 0) {
            let oldNode = this.viewNode.children[0]
            oldNode.destroy()
        }
        newNode.setParent(this.viewNode)
    }

    update(deltaTime: number) {

    }
}

