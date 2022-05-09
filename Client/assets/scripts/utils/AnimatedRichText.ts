import { _decorator, Component, Node, RichText, removeProperty, TerrainBlock, TERRAIN_BLOCK_VERTEX_SIZE } from 'cc';
const { ccclass, property, requireComponent } = _decorator;

interface TagModifier {
    tagName: string,
    tagValue: string | number
}

enum RevealType {
    CHAR_BY_CHAR,
    WORD_BY_WORD
}

@ccclass('AnimatedRichText')
@requireComponent(RichText)
export class AnimatedRichText extends Component {

    originalText: string
    richText: RichText

    onFinish?: () => any

    @property()
    revealType: RevealType = RevealType.CHAR_BY_CHAR
    @property("number")
    speed: number = 1
    cursor: number = 0

    currentModifiers: TagModifier[] = []
    lastClosingTags: string[] = []
 
    start() {
        this.richText = this.getComponent(RichText)
        this.originalText = this.richText.string
        this.richText.string = ""
        this.cursor = 0

        this.startReading()
    }

    startReading(){
        if(this.revealType == RevealType.CHAR_BY_CHAR)
            setTimeout(() => { this.readCharByChar(this) }, 1000 /  this.speed )
        else
        //WIP: Fix this :)
            setTimeout(() => { this.readWordByWord(this) }, 1000 /  this.speed )

    }

    readWordByWord(self: AnimatedRichText){

        let _this = self;

        let words = _this.originalText.split(' ').join('\n').split('\n')

        if(_this.cursor >= words.length)
            return

        let currentWord = words[_this.cursor]

        if(currentWord.startsWith("<")){
            _this.wordTagCheck(currentWord)
        }

        _this.cursor++; 
        this.richText.string += currentWord

        // speedCheck
        let speedModifier = this.currentModifiers.find(x => x.tagName == "speed")
        let modifiedSpeed = speedModifier ? speedModifier.tagValue : _this.speed

        setTimeout(() => { _this.readWordByWord(_this) }, 1000 /  Number.parseFloat(modifiedSpeed.toString()))

    }

    readCharByChar(self: AnimatedRichText){

        let _this = self;

        if(_this.cursor >= _this.originalText.length)
        return
    
        let currentChar = _this.cursorUp()

        currentChar = _this.tagCheck(currentChar)

        while(_this.isSkippble(currentChar)){
            currentChar = _this.cursorUp()
        }

        currentChar = _this.tagCheck(currentChar)

        _this.richText.string = _this.originalText.substring(0, _this.cursor)

        _this.lastClosingTags.forEach((closingTag: string) => {
            _this.richText.string += "<" + closingTag + "/>"
        })


        if(_this.cursor >= _this.originalText.length){
            _this.onFinish?.()
            return
        }

        // speedCheck
        let speedModifier = this.currentModifiers.find(x => x.tagName == "speed")
        let modifiedSpeed = speedModifier ? speedModifier.tagValue : _this.speed

        setTimeout(() => { _this.readCharByChar(_this) }, 1000 /  Number.parseFloat(modifiedSpeed.toString()))
        
    }

    // Repetitive calls for interval start, tagCheck and isSkippable
    cursorUp(): string{
        this.cursor++
        return this.originalText.charAt(this.cursor - 1)
    }


    wordTagCheck(word: string){

        let _tagName = ""
        let _tagValue = ""
        let startTag = false
        let closingTag = false
        let hasValue = false

        for(let i = 0; i <= word.length; i++){
            let char = word.charAt(i)
            if(char == "<") {
                startTag = true
                continue
            }
            if(char == "/"){
                closingTag = true
                continue
            }
            if(char == "="){
                hasValue = true
                continue
            }
            if(char == ">"){
                if(!closingTag){
                    console.log("Added "+ _tagName + " modifier: " + _tagValue)
                    this.currentModifiers.push({ tagName: _tagName, tagValue: _tagValue })
                } else {
                    this.lastClosingTags.splice(this.lastClosingTags.findIndex(t => t = _tagName), 1)
                }
                return
            }
            if(startTag) {
                if(!hasValue) {
                    _tagName += word.charAt(i)
                } else {
                    _tagValue += word.charAt(i)
                }
            }
        }

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

    // Skip spaces and line break
    isSkippble(char: string): boolean{
        if(char == " ") return true
        if(char == '\n') return true
        return false
    }
}

