import { _decorator, Component, Node, input, Input, EventKeyboard, KeyCode, game, Prefab, Button, instantiate, Label, EditBox, EventHandler } from 'cc';
import NetworkManager from '../manager/NetworkManager';
const { ccclass, property } = _decorator;

@ccclass('CheatUI')
export class CheatUI extends Component {

    @property(Node)
    consoleViewContainer: Node

    @property(EditBox)
    editBox: EditBox

    @property(Prefab)
    consoleItemPrefab: Prefab

    @property(Button)
    sendBtn: Button

    start() {
        game.addPersistRootNode(this.node)
        this.node.active = false
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this)
        this.sendBtn.node.on(Button.EventType.CLICK, () => {
            this.parseCmd(this.editBox.string)
            this.editBox.string = ""
        })
    }

    async parseCmd(cmd: string){
        let cmdInfos = cmd.split(" ")
        switch(cmdInfos[0]){
            case "/help":
                this.printToConsole("Available Commands: NONE")
                break
            case "/callApi":
                let apiName: any = cmdInfos[1]
                let apiBody: any = cmdInfos[2] ?? {}
                let response = await NetworkManager.Instance<NetworkManager>().callApi(apiName, apiBody)
                this.printToConsole(JSON.stringify(response.res))
                break
            default:
                this.printToConsole("CMD \""+ cmdInfos[0] +"\" not found.")
                break
        }
    }

    printToConsole(msg: string){
        let prefab = instantiate(this.consoleItemPrefab)
        prefab.getComponent(Label).string = msg
        prefab.parent = this.consoleViewContainer
    }

    onKeyDown (event: EventKeyboard) {
        switch(event.keyCode) {
            case KeyCode.KEY_P:
                this.node.active = !this.node.active
                break;
        }
    }

}

