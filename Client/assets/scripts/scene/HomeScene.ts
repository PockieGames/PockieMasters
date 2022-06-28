import { _decorator, Component, Node, Prefab, instantiate, Button, Sprite, SpriteFrame, director, game, Canvas, Label } from 'cc';
import NetworkManager from '../manager/NetworkManager';
import UserManager from '../manager/UserManager';
import HeroData from '../shared/game/data/HeroData';
import Dictionary from '../shared/game/utils/Dictionary';
import UIManager from '../manager/UIManager';
import MessageBox from '../ui/views/MessageBox';
import OptionMenu from '../ui/views/OptionMenu';
const { ccclass, property } = _decorator;

@ccclass('HomeScene')
export class HomeScene extends Component {

    sceneToLoad: string = "Story"

    @property(Node)
    viewNode: Node

    @property(Node)
    topUserInfo: Node

    @property(Prefab)
    townPrefab: Prefab
    @property(Button)
    townBtn: Button
    @property(Prefab)
    heroesPrefab: Prefab
    @property(Button)
    heroesBtn: Button
    @property(Prefab)
    bagPrefab: Prefab
    @property(Button)
    bagBtn: Button
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

    @property(Node)
    avatarFrame: Node

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

        this.bagBtn.node.on(Button.EventType.CLICK, () => {
            this.replaceView("Bag")
        })

        this.townBtn.node.on(Button.EventType.CLICK, () => {
            this.replaceView("Town")
        })

        this.heroesBtn.node.on(Button.EventType.CLICK, () => {
            this.replaceView("Heroes")
        })

        this.avatarFrame.on(Node.EventType.TOUCH_START, () => {
            UIManager.Instance<UIManager>().OpenPopup(OptionMenu, {})
        })

        this.fetchData()
    }

    async fetchData(){
        let userManager = UserManager.Instance<UserManager>()
        let networkManager = NetworkManager.Instance<NetworkManager>()

        let heroRes = (await networkManager.callApi("user/Heroes")).res.heroes
        userManager.populateHeroes(heroRes)
        userManager.currentUser = (await NetworkManager.Instance<NetworkManager>().callApi("user/User")).res.user

        this.updateTopNode()
    }

    updateTopNode(){
        this.topUserInfo.getChildByName("username").getComponent(Label).string = UserManager.Instance<UserManager>().currentUser.username
        this.topUserInfo.getChildByName("gold").getChildByName("goldLabel").getComponent(Label).string = UserManager.Instance<UserManager>().currentUser.currencyFree.toString()
        this.topUserInfo.getChildByName("diamonds").getChildByName("diamondLabel").getComponent(Label).string = UserManager.Instance<UserManager>().currentUser.currencyPremium.toString()
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
        this.viewDictionary.add("Town", {
            active: false,
            viewPrefab: this.townPrefab, button: this.townBtn, node: null
        })
        this.viewDictionary.add("Heroes", {
            active: false,
            viewPrefab: this.heroesPrefab, button: this.heroesBtn, node: null
        })
        this.viewDictionary.add("Bag", {
            active: false,
            viewPrefab: this.bagPrefab, button: this.bagBtn, node: null
        })
    }

    // In the View Node, instantiate the new view, delete the old one
    replaceView(view: string) {

        if(this.viewNode.children.length > 0)
            if(this.viewNode.children[0].name == view)
                return

        let viewObject = this.viewDictionary.get(view)
        if(viewObject == undefined){
            UIManager.Instance<UIManager>().OpenPopup(MessageBox, {title: "Error in View Dictionary", message: "Can't open view. (" + view + ")"})
            return
        }

        let newNode = instantiate(viewObject.viewPrefab)
        newNode.name = view
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
    }

    update(deltaTime: number) {

    }
}

