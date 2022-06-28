import { Button, CCBoolean, Color, Component, dragonBones, instantiate, isValid, Label, Node, Prefab, Sprite, SpriteFrame, _decorator } from "cc";
import ResourceManager from "../../manager/ResourceManager";
import UserManager from "../../manager/UserManager";
import HeroData, { HeroType } from "../../shared/game/data/HeroData";
import { HeroFrame } from "../components/HeroFrame";
import { delay } from "../../Constants"
import NetworkManager from "../../manager/NetworkManager";
import UIManager from "../../manager/UIManager";
import GameData from "../../manager/GameData";
import MessageBox from "../popups/MessageBox";
import { TypeFilterButton } from "../components/TypeFilterButton";

const { ccclass, property } = _decorator;

@ccclass("HeroesUI")
export default class HeroesUI extends Component {

    prefabName = "HeroesUI"

    @property({ type: Node })
    filterNode: Node

    @property(dragonBones.ArmatureDisplay)
    dragonBonesComponent: dragonBones.ArmatureDisplay
    dragonBoneNode: Node

    @property(Label)
    heroNameLabel: Label

    @property(Sprite)
    heroTypeIcon: Sprite

    @property(Node)
    scrollViewContent: Node

    @property(Prefab)
    heroFramePrefab: Prefab

    @property(CCBoolean)
    showAllHeroesInstead: boolean = false

    allHeroesFromNetwork: HeroData[] = []

    activeFilterButton: Node = null

    async start() {

        this.dragonBoneNode = this.dragonBonesComponent.node
        this.heroNameLabel.node.parent.active = false
        this.dragonBoneNode.active = false

        await UIManager.Instance<UIManager>().showLoad()

        NetworkManager.Instance<NetworkManager>().callApi("user/Heroes").then(async (heroReq) => {

            let heroRes = heroReq.res.heroes
            UserManager.Instance<UserManager>().populateHeroes(heroRes)

            let heroDatas: HeroData[] = []
            if (this.showAllHeroesInstead) {
                await GameData.Instance<GameData>().fetchData()
                heroDatas = GameData.Instance<GameData>().heroData
                this.allHeroesFromNetwork = heroDatas
            } else {
                heroDatas = UserManager.Instance<UserManager>().heroes
            }

            this.insertHeroFrames(heroDatas)

            if (heroDatas.length <= 0)
                UIManager.Instance<UIManager>().hideLoad()

        }).catch(() => {
            UIManager.Instance<UIManager>().hideLoad()
        })

        this.changeActiveFilter(this.filterNode.getChildByName("TypeAllBtn"))

        this.filterNode.children.forEach((filterNode: Node) => {
            let filterNodeComp = filterNode.getComponent(TypeFilterButton)
            filterNodeComp.getComponent(Button).node.on(Button.EventType.CLICK, () => {

                let heroDatas: HeroData[] = []
                if (this.showAllHeroesInstead) {
                    if (filterNodeComp.typeToFilter == HeroType.ALL) {
                        heroDatas = this.allHeroesFromNetwork
                        console.log("Showing all heroes")
                    } else {
                        heroDatas = this.allHeroesFromNetwork.filter(x => x.heroType == filterNodeComp.typeToFilter)
                    }
                } else {
                    if (filterNodeComp.typeToFilter == HeroType.ALL) {
                        heroDatas = UserManager.Instance<UserManager>().heroes
                        console.log("Showing all heroes")
                    } else {
                        heroDatas = UserManager.Instance<UserManager>().heroes.filter(x => x.heroType == filterNodeComp.typeToFilter)
                    }
                }

                this.changeActiveFilter(filterNode)
                this.insertHeroFrames(heroDatas)

            })
        })
    }

    changeActiveFilter(newActiveBtn: Node) {
        if (this.activeFilterButton != null) {
            this.activeFilterButton.getComponent(Button).normalColor = new Color(214, 214, 214)
            this.activeFilterButton.getComponent(Button).hoverColor = new Color(214, 214, 214)
        }
        newActiveBtn.getComponent(Button).normalColor = new Color(255, 255, 255)
        newActiveBtn.getComponent(Button).hoverColor = new Color(255, 255, 255)
        this.activeFilterButton = newActiveBtn
    }

    insertHeroFrames(heroDatas: HeroData[]) {

        // Clear all the children
        this.scrollViewContent.removeAllChildren()

        if (heroDatas.length <= 0) {
            this.heroNameLabel.node.parent.active = false
            return
        }
        heroDatas.forEach((heroData: HeroData, index) => {

            let heroFrame = instantiate(this.heroFramePrefab)
            heroFrame.setParent(this.scrollViewContent)

            let heroFrameComp = heroFrame.getComponent(HeroFrame)

            ResourceManager.Instance<ResourceManager>().loadSpriteFrame("textures/characters/icons/hero" + heroData.sprite).then((spriteFrame: SpriteFrame) => {
                if (isValid(heroFrameComp)) {
                    heroFrameComp.setIcon(spriteFrame)
                }
            })

            ResourceManager.Instance<ResourceManager>().loadSpriteFrame("textures/UI/Common/typeicons/" + heroData.heroType).then((spriteFrame: SpriteFrame) => {
                if (isValid(heroFrameComp)) {
                    heroFrameComp.setIconType(spriteFrame)
                }
            })

            heroFrameComp.onClick = () => {

                this.heroNameLabel.node.parent.active = true

                this.dragonBonesComponent.destroy()

                ResourceManager.Instance<ResourceManager>().loadDragonBones("textures/characters/heroDB" + heroData.sprite + "_ske", "textures/characters/heroDB" + heroData.sprite).then(async (dragonBone) => {
                    while (isValid(this.dragonBonesComponent)) {
                        // Wait for dragonBones Component to be destroyed
                        await delay(1)
                    }
                    this.dragonBonesComponent = this.dragonBoneNode.addComponent(dragonBones.ArmatureDisplay)
                    this.dragonBonesComponent.dragonAsset = dragonBone.dbAsset
                    this.dragonBonesComponent.dragonAtlasAsset = dragonBone.dbAtlas
                    this.dragonBonesComponent.armatureName = "armatureName"
                    this.dragonBonesComponent.playAnimation('wait', 0)
                    this.heroNameLabel.string = heroData.name
                    this.heroTypeIcon.spriteFrame = await ResourceManager.Instance<ResourceManager>().loadSpriteFrame("textures/UI/Common/typeicons/" + heroData.heroType)
                }).catch(() => {
                    heroFrameComp.onClick = () => {
                        UIManager.Instance<UIManager>().OpenPopup(MessageBox, {
                            title: "DragonBones Error",
                            message: "No DragonBones Data Found for " + heroData.sprite,
                        })
                    }
                })
            }

            if (index == 0) {
                this.dragonBoneNode.active = true
                heroFrameComp.onClick()
                UIManager.Instance<UIManager>().hideLoad()
            }
        })
    }

}