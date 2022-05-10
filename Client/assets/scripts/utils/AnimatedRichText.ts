import { _decorator, Component, RichText } from 'cc';
const { ccclass, property, requireComponent } = _decorator;

interface TagModifier {
    tagName: string,
    tagValue: string | number
}

@ccclass('AnimatedRichText')
@requireComponent(RichText)
export class AnimatedRichText extends Component {

    originalText: string
    richText: RichText

    onFinish?: () => any

    @property("number")
    speed: number = 1
    cursor: number = 0

    currentModifiers: TagModifier[] = []
    lastClosingTags: string[] = []

    finishEarly = false
 
    start() {
        this.richText = this.getComponent(RichText)
        this.originalText = this.richText.string
        this.richText.string = ""
        this.cursor = 0

        this.startReading()
    }

    startReading(){
        this.scheduleOnce(() => { this.readText() }, 1 / this.speed)
    }

    // Finish early, for example through click on the dialogue box
    finishNow(){
        this.finishEarly = true
        this.richText.string = this.originalText
        this.onFinish?.()
    }

    readText(){

        if(this.finishEarly)
            return

        if(this.cursor >= this.originalText.length)
        return
    
        let currentChar = this.cursorUp()

        currentChar = this.tagCheck(currentChar)

        while(this.isSkippble(currentChar)){
            currentChar = this.cursorUp()
        }

        currentChar = this.tagCheck(currentChar)

        this.richText.string = this.originalText.substring(0, this.cursor)

        this.lastClosingTags.forEach((closingTag: string) => {
            this.richText.string += "<" + closingTag + "/>"
        })


        if(this.cursor >= this.originalText.length){
            this.onFinish?.()
            return
        }

        // Speed Modifier
        let speedModifier = this.currentModifiers.find(x => x.tagName == "speed")
        let modifiedSpeed = speedModifier ? speedModifier.tagValue : this.speed

        this.scheduleOnce(() => { this.readText() }, 1 /  Number.parseFloat(modifiedSpeed.toString()))
        
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
            let hasValue = false
            let tagName = ""
            let tagValue = ""
            while(!tagClosed){
                currentChar = this.cursorUp()
                if(currentChar == "/"){
                    isClosingTag = true
                    continue
                }
                if(currentChar == ">"){
                    currentChar = this.cursorUp()
                    tagClosed = true
                    if(!isClosingTag){
                        if(tagName == "speed"){
                            this.currentModifiers.push({tagName: tagName, tagValue: tagValue})
                        }
                    } else {
                        this.currentModifiers.forEach((modifier, index) => {
                            if(modifier.tagName == tagName){
                                this.currentModifiers.splice(index, 1)
                            }
                        })
                    }
                }
                if(currentChar == "="){
                    hasValue = true
                    continue
                }
                if(hasValue) {
                    tagValue += currentChar
                } else {
                    if(currentChar != "<")
                        tagName += currentChar
                }
            }
            if(isClosingTag){
                this.lastClosingTags.splice(this.lastClosingTags.findIndex(t => t = tagName), 1)
            } else {
                this.lastClosingTags.push(tagName)
            }
            this.tagCheck(currentChar)
        }
        return currentChar
    }

    // Skip spaces and line break and print them instant
    isSkippble(char: string): boolean{
        if(char == " ") return true
        if(char == '\n') return true
        return false
    }
}

