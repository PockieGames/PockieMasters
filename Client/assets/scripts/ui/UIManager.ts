import { Canvas, find, instantiate, Prefab, Node, game } from "cc";
import ResourceManager from "../manager/ResourceManager";
import Dictionary from "../shared/game/utils/Dictionary";
import Logger from "../utils/Logger";
import Singleton from "../utils/Singleton";
import UIBase from "./UIBase";
import MessageBox from "./views/MessageBox";
import TestUI from "./views/TestUI";

export default class UIManager extends Singleton{

    private _canvas: Canvas

    private uiDict: Dictionary<UIBase> = new Dictionary<UIBase>()
    private popupDict: Dictionary<UIBase> = new Dictionary<UIBase>()

    private loadingCanvas: Node

    async showLoad(){

        if(this.loadingCanvas)
            return this.loadingCanvas.active = true

        let prefab = await ResourceManager.Instance<ResourceManager>().loadAsset<Prefab>("ui/NetLoadUI")
        let loadNode = instantiate(prefab)
        loadNode.name = "LoadingUI"
        game.addPersistRootNode(loadNode)
        this.loadingCanvas = loadNode
        return loadNode.active = true
    }

    hideLoad(){
        if(this.loadingCanvas)
            return this.loadingCanvas.active = false
    }

    getCanvas(): Canvas{
        if(this._canvas == null){
            this._canvas = find('Canvas').getComponent(Canvas)
            this._canvas.onDestroy = () => {
                this._canvas = null
                // If Canvas get's destroyed, clear uiDict
                this.uiDict.clear()
                this.popupDict.clear()
            }
        }
        return this._canvas;
    }

    HideUI(uiBase: UIBase): boolean{
        if(this.uiDict.containsKey(uiBase.node.name)){
            Logger.Info("Deleted UI: " + uiBase.node.name)
            let uiNode = this.uiDict.get(uiBase.node.name)
            uiNode.node.destroy()
            this.uiDict.delete(uiBase.node.name)
            return true
        } else {
            return false
        }
    }

    async OpenPopup<T extends UIBase>(c: { new(): T }, uiData: any = null): Promise<T>{
        return new Promise<T>(async (resolve, reject) => {

            let name = (new c() as T).prefabName
            
            try{
                let messageBox = await 
                ResourceManager.Instance<ResourceManager>().loadAsset<Prefab>("ui/" + name)

                let uiNode = instantiate(messageBox)
                uiNode.name = messageBox.name
                uiNode.parent = this.getCanvas().node
                let uiBaseComponent = uiNode.getComponent(UIBase);
                this.popupDict.add(messageBox.name, uiBaseComponent)
                uiBaseComponent.setUIData(uiData)

                Logger.Info("Open Popup: " + messageBox.name)
                resolve(uiBaseComponent as T)
             } catch(e){
                Logger.Error("Couldn't Open UI: " + name)
                reject(e);
            }
        })
    }

    async OpenUI(uiBase: { new(): UIBase }, uiData: any = null): Promise<UIBase>{
        return new Promise<UIBase>(async (resolve, reject) => {
            let name = (new uiBase()).prefabName
            if(!this.uiDict.containsKey(name)){
                try{
                    let asset = await ResourceManager.Instance<ResourceManager>().loadAsset<Prefab>("ui/" + name)

                    let uiNode = instantiate(asset)
                    uiNode.name = name
                    uiNode.parent = this.getCanvas().node
                    let uiBaseComponent = uiNode.getComponent(UIBase);
                    this.uiDict.add(name, uiBaseComponent)
                    uiBaseComponent.setUIData(uiData)

                    Logger.Info("Open UI: " + name)
                    resolve(uiBaseComponent)
                 } catch(e){
                    Logger.Error("Couldn't Open UI: " + name)
                    reject(e);
                }
            }
            resolve(this.uiDict.get(name))
        })
    }

}