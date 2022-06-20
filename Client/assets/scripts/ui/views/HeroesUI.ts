import { Component, dragonBones, instantiate, Node, Prefab, _decorator } from "cc";
import UserManager from "../../manager/UserManager";
import HeroData from "../../shared/game/data/HeroData";

const { ccclass, property } = _decorator;

@ccclass("HeroesUI")
export default class HeroesUI extends Component{

    @property(dragonBones.ArmatureDisplay)
    dragonBonesComponent: dragonBones.ArmatureDisplay

    @property(Node)
    scrollViewContent: Node

    @property(Prefab)
    heroFramePrefab: Prefab

    start(){
        UserManager.Instance<UserManager>().heroes.forEach((heroData: HeroData) => {
            let heroFrame = instantiate(this.heroFramePrefab)
            heroFrame.setParent(this.scrollViewContent)
            heroFrame.on(Node.EventType.MOUSE_UP || Node.EventType.TOUCH_END, () => {
                heroData.sprite
            })
        })
    }

}