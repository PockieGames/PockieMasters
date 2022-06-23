import { _decorator, Component, Node, ButtonComponent, SpriteComponent, Button, director } from 'cc';
import SceneManager from '../manager/SceneManager';
const { ccclass, property } = _decorator;

@ccclass('LevelButton')
export class LevelButton extends Component {

    @property(String)
    levelToLoad: String;

    @property(Boolean)
    unlocked: Boolean;

    @property(ButtonComponent)
    button: ButtonComponent;

    @property(SpriteComponent)
    sprite: SpriteComponent;

    start() {
        this.sprite.grayscale = !this.unlocked;
        this.button.node.on(Button.EventType.CLICK, () => {
            // Display battle info with rewards and enemy units?
            SceneManager.Instance<SceneManager>().loadScene('battle');
        });
    }

    update(deltaTime: number) {
        
    }
}

