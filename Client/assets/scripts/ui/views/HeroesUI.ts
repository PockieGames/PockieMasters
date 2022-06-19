import { Component, instantiate, Node, Prefab, _decorator } from "cc";
import UserManager from "../../manager/UserManager";

const { ccclass, property } = _decorator;

@ccclass("HeroesUI")
export default class HeroesUI extends Component{

    @property(Node)
    scrollViewContent: Node

    @property(Prefab)
    heroFramePrefab: Prefab

    start(){
        UserManager.Instance<UserManager>().heroes.forEach((heroData) => {
            let heroFrame = instantiate(this.heroFramePrefab)
            heroFrame.setParent(this.scrollViewContent)
        })
    }

}