import { _decorator, Component, Node, ButtonComponent, SpriteComponent, Button, director, Vec2 } from 'cc';
import Battlefield from '../battle/Battlefield';
import SceneManager from '../manager/SceneManager';
import UIManager from './UIManager';
import { MapData, MapObjectType } from "../battle/MapData";
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

    start() {
        this.sprite.grayscale = !this.unlocked;
        this.button.node.on(Button.EventType.CLICK, () => {
            let chapterData = this.chapterData
            console.log(chapterData)
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

    update(deltaTime: number) {
        
    }
}

