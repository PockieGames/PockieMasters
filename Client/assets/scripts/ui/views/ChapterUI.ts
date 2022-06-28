import { CCBoolean, CCInteger, Component, dragonBones, instantiate, isValid, Label, Node, Prefab, Sprite, SpriteFrame, _decorator } from "cc";
import ResourceManager from "../../manager/ResourceManager";
import UserManager from "../../manager/UserManager";
import HeroData from "../../shared/game/data/HeroData";
import { HeroFrame } from "../components/HeroFrame";
import { delay } from "../../Constants"
import NetworkManager from "../../manager/NetworkManager";
import UIManager from "../../manager/UIManager";
import GameData from "../../manager/GameData";
import MessageBox from "../popups/MessageBox";
import ChapterData from "../../shared/game/data/ChapterData";
import { LevelButton } from "../components/LevelButton";

const { ccclass, property } = _decorator;

@ccclass("ChapterUI")
export default class ChapterUI extends Component {

    @property(Node)
    levels: Node

    @property(CCInteger)
    chapter: number = 1

    async start() {
        await UIManager.Instance<UIManager>().showLoad()
        let currentChapter = UserManager.Instance<UserManager>().currentUser.chapter
        let chapterData = GameData.Instance<GameData>().chapterData.find((chapter: ChapterData) => chapter.chapter === currentChapter)
        if (!chapterData){
            // open message box
            UIManager.Instance<UIManager>().OpenPopup(MessageBox, {
                title: "Chapter not found",
                message: "Invalid Chapter " + currentChapter
            })
        }
        // Instantiate Map Skin
       // let mapSkin = await ResourceManager.Instance<ResourceManager>().loadAsset<Prefab>("prefabs/chapters/" + chapterData.skin)
        
        let chapterDataJson = JSON.parse(chapterData.chapterData)

        this.levels.children.forEach((level: Node) => {
            if(level.name == "playerIndicator")
                return
            let levelBtnComp = level.getComponent(LevelButton)
            levelBtnComp.setupLevelLbl(this.chapter.toString())
            let levelData = chapterDataJson.find(x => x.level == levelBtnComp.level)
            if(!levelData)
                return
            levelBtnComp.chapterData  = levelData
            console.log("Added ChapterData to " + levelBtnComp.node.name)
        })
        
        UIManager.Instance<UIManager>().hideLoad()
    }

}