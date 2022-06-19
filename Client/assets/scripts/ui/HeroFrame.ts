import { _decorator, Component, Node, Sprite, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('HeroFrame')
export class HeroFrame extends Component {

    @property(Sprite)
    icon: Sprite
    @property(Sprite)
    frame: Sprite
    @property(Label)
    lvl: Label

    populate(heroData){
        
    }

}