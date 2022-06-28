import { CCInteger, Component, ProgressBar, UITransform, _decorator } from "cc";

const { ccclass, property, requireComponent, executeInEditMode } = _decorator;

@ccclass('ResponiveProgressBar')
@requireComponent(ProgressBar)
@executeInEditMode()
export class ResponiveProgressBar extends Component {

    progressBar: ProgressBar
    transform: UITransform
    @property({type: CCInteger})
    offset: number = 0
    
    start(){
        this.progressBar = this.getComponent(ProgressBar)
        this.transform = this.getComponent(UITransform)
    }

    update(){
        this.progressBar.totalLength = this.transform.width - this.offset
    }

}