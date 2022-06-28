import { _decorator, Component, Node, input, Input, EventKeyboard, KeyCode, game, Prefab, Button, instantiate, Label, EditBox, EventHandler, director } from 'cc';
import NetworkManager from '../../manager/NetworkManager';
import SceneManager from '../../manager/SceneManager';
import Dictionary from '../../shared/game/utils/Dictionary';
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

    consoleCmds: Dictionary<{help: string, execute: (cmd: string) =>{}}> = new Dictionary<{help: string, execute: (cmd: string) =>{}}>({
        "/help": {
            help: "/help : Shows a list of available commands.",
            execute: (cmd) => {
                this.printToConsole("Available Commands: =============")
                this.consoleCmds.values().forEach((cmd) => {
                    this.printToConsole(cmd.help)
                })
                this.printToConsole("==============================")
            }
        },
        "/callApi": {
            help: "/callApi {ENDPOINT} {BODY} : Call an API on the Server.",
            execute: async (cmd) => {
                let cmdInfos = cmd.split(" ")
                let apiName: any = cmdInfos[1]
                let apiBody: any = cmdInfos[2] ?? {}
                this.printToConsole("[Request] >> " + apiName + " - " + JSON.stringify(apiBody))
                let response = await NetworkManager.Instance<NetworkManager>().callApi(apiName, apiBody)
                this.printToConsole("[Response] << " + JSON.stringify(response.res))
            }
        },
        "/changeScene": {
            help: "/changeScene {SCENENAME} : Changes Scene",
            execute: async (cmd) => {
                let cmdInfos = cmd.split(" ")
                SceneManager.Instance<SceneManager>().loadScene(cmdInfos[1])
            }
        }
    })

    start() {
        game.addPersistRootNode(this.node)
        this.node.active = false
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this)
        input.on(Input.EventType.KEY_DOWN, this.onEnter, this)
        this.sendBtn.node.on(Button.EventType.CLICK, () => {
            this.parseCmd(this.editBox.string)
            this.editBox.string = ""
        })
    }

    async parseCmd(cmd: string){
        let cmdInfos = cmd.split(" ")
        let cmdObject = this.consoleCmds.get(cmdInfos[0])
        if(cmdObject)
            cmdObject.execute(cmd)
        else
            this.printToConsole("CMD " + cmdInfos[0] + " not found")
    }

    printToConsole(msg: string){
        let prefab = instantiate(this.consoleItemPrefab)
        prefab.getComponent(Label).string = msg
        prefab.parent = this.consoleViewContainer
    }

    onEnter(event: EventKeyboard){
        if(event.keyCode == KeyCode.ENTER){
            this.parseCmd(this.editBox.string)
            this.editBox.string = ""
        }
    }

    onKeyDown (event: EventKeyboard) {
        switch(event.keyCode) {
            case KeyCode.KEY_P:
                this.node.active = !this.node.active
                break;
        }
    }

}

