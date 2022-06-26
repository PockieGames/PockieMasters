import { _decorator, Component, Node, ButtonComponent, SpriteComponent, Button, director, CCInteger, Enum } from 'cc';
import SceneManager from '../manager/SceneManager';
import { HeroType } from '../shared/game/data/HeroData';
const { ccclass, property } = _decorator;

@ccclass('TypeFilterButton')
export class TypeFilterButton extends Component {

    @property({type: Enum(HeroType)})
    typeToFilter: HeroType = HeroType.ALL
    
}

