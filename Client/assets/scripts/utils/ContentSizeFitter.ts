import { _decorator, Component, Node, UITransform, Layout, CCBoolean, CCInteger, CCFloat, Widget, Enum } from 'cc';
import { IgnoreContentSizeFitter } from './IgnoreContentSizeFitter';
const { ccclass, property, executeInEditMode } = _decorator;

enum ContentSizeFitterType {
    Horizontal,
    Vertical,
    Both
}

@ccclass('ContentSizeFitter')
@executeInEditMode()
export class ContentSizeFitter extends Component {

    @property({type: CCFloat})
    heightDiff: number = 0
    
    @property({type: CCFloat})
    widthDiff: number = 0

    @property({type: Enum(ContentSizeFitterType)})
    type: ContentSizeFitterType = ContentSizeFitterType.Both

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
            if(node.getComponent(IgnoreContentSizeFitter))
                return
            width += node.getComponent(UITransform).width
            height += node.getComponent(UITransform).height
        })

        if(this.type == ContentSizeFitterType.Horizontal){
            this.node.getComponent(UITransform).width = width + this.widthDiff
        } else if(this.type == ContentSizeFitterType.Vertical){
            this.node.getComponent(UITransform).height = height + this.heightDiff
        } else if(this.type == ContentSizeFitterType.Both){
            this.node.getComponent(UITransform).width = width + this.widthDiff
            this.node.getComponent(UITransform).height = height + this.heightDiff
        }
        
    }
}