import { Component, dragonBones, instantiate, isValid, Label, Node, Prefab, _decorator } from "cc";
import ResourceManager from "../../manager/ResourceManager";
import UserManager from "../../manager/UserManager";
import HeroData from "../../shared/game/data/HeroData";
import { HeroFrame } from "../HeroFrame";
import { delay } from "../../Constants"
import NetworkManager from "../../manager/NetworkManager";
import UIManager from "../UIManager";

const { ccclass, property } = _decorator;

@ccclass("HeroesUI")
export default class HeroesUI extends Component{

    @property(dragonBones.ArmatureDisplay)
    dragonBonesComponent: dragonBones.ArmatureDisplay
    dragonBoneNode: Node

    @property(Label)
    heroNameLabel: Label

    @property(Node)
    scrollViewContent: Node

    @property(Prefab)
    heroFramePrefab: Prefab

    async start(){
        
        await UIManager.Instance<UIManager>().showLoad()
        let heroRes = (await NetworkManager.Instance<NetworkManager>().callApi("user/Heroes")).res.heroes
        UserManager.Instance<UserManager>().populateHeroes(heroRes)
        UIManager.Instance<UIManager>().hideLoad()

        this.dragonBoneNode = this.dragonBonesComponent.node
        UserManager.Instance<UserManager>().heroes.forEach((heroData: HeroData, index) => {

            let heroFrame = instantiate(this.heroFramePrefab)
            heroFrame.setParent(this.scrollViewContent)

            let heroFrameComp = heroFrame.getComponent(HeroFrame)
            ResourceManager.Instance<ResourceManager>().loadSpriteFrame("textures/characters/icons/hero" + heroData.sprite).then(async (spriteFrame) => {
                heroFrameComp.setIcon(spriteFrame)
                heroFrameComp.setIconType(await ResourceManager.Instance<ResourceManager>().loadSpriteFrame("textures/UI/Common/typeicons/" + heroData.heroType))
            })

            heroFrameComp.onClick = () => {

                this.dragonBonesComponent.destroy()

                ResourceManager.Instance<ResourceManager>().loadDragonBones("textures/characters/heroDB" + heroData.sprite + "_ske", "textures/characters/heroDB" + heroData.sprite).then(async (dragonBone) => {
                    while(isValid(this.dragonBonesComponent)){
                        // Wait for dragonBones Component to be destroyed
                        await delay(1)
                    }
                    this.dragonBonesComponent = this.dragonBoneNode.addComponent(dragonBones.ArmatureDisplay)
                    this.dragonBonesComponent.dragonAsset = dragonBone.dbAsset
                    this.dragonBonesComponent.dragonAtlasAsset = dragonBone.dbAtlas
                    this.dragonBonesComponent.armatureName = "armatureName"
                    this.dragonBonesComponent.playAnimation('wait', 0)
                    this.heroNameLabel.string = heroData.name
                })
            }

            if(index == 0){
                heroFrameComp.onClick()
            }

        })
    }

}