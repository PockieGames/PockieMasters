import { _decorator, Component, Node, RichText, removeProperty } from 'cc';
const { ccclass, property, requireComponent } = _decorator;

@ccclass('AnimatedRichText')
@requireComponent(RichText)
export class AnimatedRichText extends Component {

    originalText: string
    richText: RichText

    @property("number")
    cursor: number = 0
    @property("number")
    speed: number = 1
 
    //TODO: RichText MarkUp Parser & Space Ignore
    start() {
        this.richText = this.getComponent(RichText)
        this.originalText = this.richText.string
        this.richText.string = ""
        this.cursor = 0

        let timer = setInterval(() => {
            this.cursor++
            this.richText.string = this.originalText.substring(0, this.cursor)
            console.log(this.richText.string)
            if(this.cursor >= this.originalText.length)
                clearInterval(timer)
        }, this.speed * 1000)

    }
}

