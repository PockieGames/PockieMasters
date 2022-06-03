import { _decorator, Component, Node, UITransform, Layout, CCBoolean, CCInteger, CCFloat } from 'cc';
const { ccclass, property, executeInEditMode } = _decorator;
 
@ccclass('ContentSizeFitter')
@executeInEditMode()
export class ContentSizeFitter extends Component {

    @property({type: CCFloat})
    heightDiff: number = 0
    
    @property({type: CCFloat})
    widthDiff: number = 0

    update () {

        let width = 0
        let height = 0

        let layout = this.node.getComponent(Layout)

        if(layout){
            width += (this.node.children.filter(x => x.active == true).length - 1) * layout.spacingX
            height += (this.node.children.filter(x => x.active == true).length - 1) * layout.spacingY
        }

        this.node.children.forEach((node: Node) => {
            if(!node.active)
                return
            width += node.getComponent(UITransform).width
            height += node.getComponent(UITransform).height
        })

        this.node.getComponent(UITransform).width = width + this.widthDiff
        this.node.getComponent(UITransform).height = height + this.heightDiff
        
    }
}