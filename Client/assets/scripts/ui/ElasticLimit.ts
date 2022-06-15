import { _decorator, ScrollView, Node, EventTouch, UITransform, Vec3, CCFloat, Component } from 'cc';
const { ccclass, property } = _decorator;

class ParalaxNode extends Component{
    @property(Node)
    node: Node
    @property(Number)
    scrollMultiplier: number
}

@ccclass('ElasticLimit')
export class ElasticLimit extends ScrollView {
    @property
    public elasticValueX = 0.5;
    @property
    public elasticValueY = 0.5;

    @property({type: [Node]})
    paralaxNodes: Node[] = []
    paralaxOriginPositions: {node: Node, position: Vec3}[] = []

    onLoad() {
        this.node.on(Node.EventType.TOUCH_MOVE, this._onTouchMoved, this, true);
    }

    _onTouchMoved(event: any, captureListeners: any) {
        if (!this.enabledInHierarchy) return;
        if (this._hasNestedViewGroup(event, captureListeners)) return;
        let touch = event.touch;
        if (this.content) {
            this._handleMoveLogic(touch);
        }
        if (!this.cancelInnerEvents) {
            return;
        }
        let deltaMove = touch.getLocation().subtract(touch.getStartLocation());
        if (deltaMove.length > 7) {
            if (!this._touchMoved && event.target !== this.node) {
                let cancelEvent = new EventTouch(event.getTouches(), event.bubbles, Node.EventType.TOUCH_CANCEL);
                cancelEvent.type = Node.EventType.TOUCH_CANCEL;
                cancelEvent.touch = event.touch;
                cancelEvent.simulate = true;
                event.target.dispatchEvent(cancelEvent);
                this._touchMoved = true;
            }
        }
        this._stopPropagationIfTargetIsMe(event);
    }

    _handleMoveLogic(touch: any) {
        let deltaMove = touch.getDelta();
        this._processDeltaMove(deltaMove);
    }

    _processDeltaMove(deltaMove: any) {
        this._scrollChildren(deltaMove);
        this._gatherTouchMove(deltaMove);
    }

    _scrollChildren(deltaMove: Vec3) {
        this._clampDelta(deltaMove);
        let realMove = deltaMove;
        let outOfBoundary;
        if (this.elastic) {
            outOfBoundary = this._getHowMuchOutOfBoundary();
            realMove.x *= (outOfBoundary.x === 0 ? 1 : this.elasticValueX);
            realMove.y *= (outOfBoundary.y === 0 ? 1 : this.elasticValueY);
        }
        if (!this.elastic) {
            outOfBoundary = this._getHowMuchOutOfBoundary(realMove);
            realMove.add(outOfBoundary);
        }
        let scrollEventType: any = -1;

        const uiTraContent = this.content!.getComponent(UITransform)!;
        const posContent = this.content!.position;
        if (realMove.y > 0) { //up
            let icBottomPos = posContent.y - uiTraContent.anchorY * uiTraContent.height;
            if (icBottomPos + realMove.y > this._bottomBoundary) {
                scrollEventType = 'scroll-to-bottom';
            }
        }
        else if (realMove.y < 0) { //down
            let icTopPos = posContent.y - uiTraContent.anchorY * uiTraContent.height + uiTraContent.height;
            if (icTopPos + realMove.y <= this._topBoundary) {
                scrollEventType = 'scroll-to-top';
            }
        }
        else if (realMove.x < 0) { //left
            let icRightPos = posContent.x - uiTraContent.anchorX * uiTraContent.width + uiTraContent.width;
            if (icRightPos + realMove.x <= this._rightBoundary) {
                scrollEventType = 'scroll-to-right';
            }
        }
        else if (realMove.x > 0) { //right
            let icLeftPos = posContent.x - uiTraContent.anchorX * uiTraContent.width;
            if (icLeftPos + realMove.x >= this._leftBoundary) {
                scrollEventType = 'scroll-to-left';
            }
        }
        this._moveContent(realMove, false);

        if (realMove.x !== 0 || realMove.y !== 0) {
            if (!this._scrolling) {
                this._scrolling = true;
                this._dispatchEvent('scroll-began');
            }
            this._dispatchEvent('scrolling');
        }
        if (scrollEventType !== -1) {
            this._dispatchEvent(scrollEventType);
        }
    }

    _moveContent(deltaMove: Vec3, canStartBounceBack?: boolean){
        super._moveContent(deltaMove, canStartBounceBack)

        const posContent = this.content!.position;
        let test = posContent.x / 5

        this.paralaxNodes.forEach((paralaxNode, index) => {
            let i = this.paralaxNodes.length - index;
            let origin = this.paralaxOriginPositions.find(x => x.node == paralaxNode)
            if(!origin){
                this.paralaxOriginPositions.push({node: paralaxNode, position: new Vec3(paralaxNode.position)})
                origin = {node: paralaxNode, position: new Vec3(paralaxNode.position)}
            }
            let newPos = new Vec3(origin.position)
            newPos.x = origin.position.x + (test / i)
            paralaxNode.position = newPos
        })

    }

}