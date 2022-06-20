import { Component, dragonBones, instantiate, isValid, Node, Prefab, _decorator } from "cc";
import ResourceManager from "../../manager/ResourceManager";
import UserManager from "../../manager/UserManager";
import HeroData from "../../shared/game/data/HeroData";
import { HeroFrame } from "../HeroFrame";
import { delay } from "../../Constants"

const { ccclass, property } = _decorator;

@ccclass("HeroesUI")
export default class HeroesUI extends Component{

    @property(dragonBones.ArmatureDisplay)
    dragonBonesComponent: dragonBones.ArmatureDisplay
    dragonBoneNode: Node

    @property(Node)
    scrollViewContent: Node

    @property(Prefab)
    heroFramePrefab: Prefab

    start(){
        this.dragonBoneNode = this.dragonBonesComponent.node
        UserManager.Instance<UserManager>().heroes.forEach((heroData: HeroData) => {

            let heroFrame = instantiate(this.heroFramePrefab)
            heroFrame.setParent(this.scrollViewContent)

            let heroFrameComp = heroFrame.getComponent(HeroFrame)
            ResourceManager.Instance<ResourceManager>().loadSpriteFrame("textures/characters/icons/hero" + heroData.sprite).then((spriteFrame) => {
                heroFrameComp.setIcon(spriteFrame)
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
                })
            }

        })
    }

}