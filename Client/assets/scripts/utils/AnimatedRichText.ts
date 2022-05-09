import { _decorator, Component, Node, RichText, removeProperty, TerrainBlock } from 'cc';
const { ccclass, property, requireComponent } = _decorator;

@ccclass('AnimatedRichText')
@requireComponent(RichText)
export class AnimatedRichText extends Component {

    originalText: string
    richText: RichText

    onFinish?: () => any

    cursor: number = 0

    @property("number")
    speed: number = 1

    timer: number

    lastClosingTag: string
 
    start() {
        this.richText = this.getComponent(RichText)
        this.originalText = this.richText.string
        this.richText.string = ""
        this.cursor = 0

        this.timer = setInterval(() => {

            if(this.cursor >= this.originalText.length)
                return
            
            let currentChar = this.cursorUp()

            currentChar = this.tagCheck(currentChar)

            while(this.isSkippble(currentChar)){
                currentChar = this.cursorUp()
            }

            currentChar = this.tagCheck(currentChar)

            this.richText.string = this.originalText.substring(0, this.cursor)
            if(this.lastClosingTag){
                this.richText.string += this.lastClosingTag
            }

            if(this.cursor >= this.originalText.length){
                clearInterval(this.timer)
                this.onFinish?.()
            }

        }, this.speed * 1000)
    }

    // Repetitive calls for interval start, tagCheck and isSkippable
    cursorUp(): string{
        this.cursor++
        return this.originalText.charAt(this.cursor - 1)
    }

    // Print opening and closing tag to display RichText correctly
    // Maybe replace later for proper parsing
    tagCheck(currentChar: string): string{
        if(currentChar == "<"){
            let tagClosed = false
            let isClosingTag = false
            let tagName = ""
            while(!tagClosed){
                currentChar = this.cursorUp()
                if(currentChar == "/"){
                    isClosingTag = true
                    continue
                }
                if(currentChar == ">"){
                    currentChar = this.cursorUp()
                    tagClosed = true
                    continue
                }
                tagName += currentChar
            }
            if(isClosingTag){
                this.lastClosingTag = null
            } else {
                this.lastClosingTag = "</" + tagName + ">"
            }
        }
        return currentChar
    }

    // Skip spaces and line break
    isSkippble(char: string): boolean{
        if(char == " ") return true
        if(char == '\n') return true
        return false
    }
}

