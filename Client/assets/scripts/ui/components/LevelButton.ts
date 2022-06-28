import { _decorator, Component, Node, ButtonComponent, SpriteComponent, Button, director, Vec2, Label } from 'cc';
import Battlefield from '../../battle/Battlefield';
import SceneManager from '../../manager/SceneManager';
import UIManager from '../../manager/UIManager';
import { MapData, MapObjectType } from "../../battle/MapData";
const { ccclass, property } = _decorator;

@ccclass('LevelButton')
export class LevelButton extends Component {

    @property(String)
    level: string = '1'

    chapterData: any

    @property(Boolean)
    unlocked: Boolean;

    @property(ButtonComponent)
    button: ButtonComponent;

    @property(SpriteComponent)
    sprite: SpriteComponent;

    @property(Label)
    levelIndicator: Label

    start() {
        this.sprite.grayscale = !this.unlocked;
        this.button.node.on(Button.EventType.CLICK, () => {

            if(!this.unlocked)
                return

            //UIManager.Instance<UIManager>().OpenPopup()

            let chapterData = this.chapterData
            SceneManager.Instance<SceneManager>().loadScene('battle', () => {
                let mapData = {} as MapData
                mapData.mapObjects = []
                chapterData.fightData.forEach((data) => {
                    let position = data.position.split(",")
                    mapData.mapObjects.push({
                        type: MapObjectType.HERO,
                        objectData: data.entity,
                        position: new Vec2(parseInt(position[0]), parseInt(position[1]))
                    })
                })
                UIManager.Instance<UIManager>().getCanvas().node.getChildByName("Battlefield").getComponent(Battlefield).offlineMapData = mapData
            })
        })
    }

    setupLevelLbl(chapter: string){
        this.levelIndicator.string = chapter + " - " + this.level
    }

    update(deltaTime: number) {
        
    }
}

