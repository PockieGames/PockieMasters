import { _decorator, Component, Node, Prefab, instantiate, Button, Sprite, SpriteFrame, director, game, Canvas } from 'cc';
import Dictionary from '../shared/game/utils/Dictionary';
import UIManager from '../ui/UIManager';
import HomeUI from '../ui/views/HomeUI';
import MessageBox from '../ui/views/MessageBox';
const { ccclass, property } = _decorator;

@ccclass('HomeScene')
export class HomeScene extends Component {

    sceneToLoad: string = "Shop"

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
    
    @property(SpriteFrame)
    normalButtonSprite: SpriteFrame
    @property(SpriteFrame)
    hoverButtonSprite: SpriteFrame

    // Map Views to Button
    viewDictionary = new Dictionary<{active: boolean, viewPrefab: Prefab, button: Button, node: Node}>()

    // Show chapter, assign button behaviour
    start() {

        this.mapViews()

        this.replaceView(this.sceneToLoad)

        this.chapterBtn.node.on(Button.EventType.CLICK, () => {
            this.replaceView("Story")
        })

        this.shopButton.node.on(Button.EventType.CLICK, () => {
            this.replaceView("Shop")
        })
    }

    mapViews(){
        this.viewDictionary.add("Shop", {
            active: false,
            viewPrefab: this.shopPrefab, button: this.shopButton, node: null
        })
        this.viewDictionary.add("Story", {
            active: false,
            viewPrefab: this.chapterPrefab, button: this.chapterBtn, node: null
        })
    }

    // In the View Node, instantiate the new view, delete the old one
    replaceView(view: string) {

        let viewObject = this.viewDictionary.get(view)
        if(viewObject == undefined){
            UIManager.Instance<UIManager>().OpenPopup(MessageBox, {title: "Error in View Dictionary", message: "Can't open view. (" + view + ")"})
            return
        }

        let newNode = instantiate(viewObject.viewPrefab)
        newNode.setParent(this.viewNode)

        let activeView = this.viewDictionary.values().find(x => x.active == true)
        if(activeView){
            if(activeView.node){
                activeView.node.destroy()
                activeView.node = null
            }
            activeView.active = false
            activeView.button.normalSprite = this.normalButtonSprite
        }

        viewObject.button.normalSprite = this.hoverButtonSprite
        viewObject.active = true
        viewObject.node = newNode

        game.config.orientation = "portrait"
    }

    update(deltaTime: number) {

    }
}

