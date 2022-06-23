import { CCBoolean, Component, dragonBones, instantiate, isValid, Label, Node, Prefab, Sprite, SpriteFrame, _decorator } from "cc";
import ResourceManager from "../../manager/ResourceManager";
import UserManager from "../../manager/UserManager";
import HeroData from "../../shared/game/data/HeroData";
import { HeroFrame } from "../HeroFrame";
import { delay } from "../../Constants"
import NetworkManager from "../../manager/NetworkManager";
import UIManager from "../UIManager";
import GameData from "../../manager/GameData";
import MessageBox from "./MessageBox";
import ChapterData from "../../shared/game/data/ChapterData";

const { ccclass, property } = _decorator;

@ccclass("ChapterUI")
export default class ChapterUI extends Component {

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
        chapterDataJson.forEach((chapter: any) => {
            console.log(chapter)
        })
        
        UIManager.Instance<UIManager>().hideLoad()
    }

}