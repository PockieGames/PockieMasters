import { _decorator, Component, Node, UITransform, Layout } from 'cc';
const { ccclass, property, executeInEditMode } = _decorator;
 
@ccclass('ContentSizeFitter')
@executeInEditMode()
export class ContentSizeFitter extends Component {

    update () {

        let width = 0

        let layout = this.node.getComponent(Layout)

        if(layout){
            width += (this.node.children.filter(x => x.active == true).length - 1) * layout.spacingX
        }

        this.node.children.forEach((node: Node) => {
            if(!node.active)
                return
            width += node.getComponent(UITransform).width
        })

        this.node.getComponent(UITransform).width = width
        
    }
}