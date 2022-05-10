import { Canvas, find, instantiate, Prefab, Node } from "cc";
import ResourceManager from "../resources/ResourceManager";
import Dictionary from "../utils/Dictionary";
import Logger from "../utils/Logger";
import Singleton from "../utils/Singleton";
import UIBase from "./UIBase";

export default class UIManager extends Singleton<UIManager>{

    private _canvas: Canvas

    private uiDict: Dictionary<UIBase> = new Dictionary<UIBase>()

    getCanvas(): Canvas{
        if(this._canvas == null){
            this._canvas = find('Canvas').getComponent(Canvas);
        }
        return this._canvas;
    }

    HideUI(uiBase: UIBase){
        if(this.uiDict.containsKey(uiBase.node.name)){
            Logger.Info("Deleted UI: " + uiBase.node.name)
            let uiNode = this.uiDict.get(uiBase.node.name)
            uiNode.node.destroy()
            this.uiDict.delete(uiBase.node.name)
        } else {
            Logger.Info("Couldn't Hide UI: " + uiBase.node.name)
            
        }
    }

    async OpenUI(uiBase: { new(): UIBase }, uiData: {data: any} = null): Promise<UIBase>{
        return new Promise<UIBase>(async (resolve, reject) => {
            if(!this.uiDict.containsKey(uiBase.name)){
                try{
                    let asset = await ResourceManager.Instance<ResourceManager>().loadPrefab<Prefab>("ui/" + uiBase.name)

                    let uiNode = instantiate(asset)
                    uiNode.name = uiBase.name
                    uiNode.parent = this.getCanvas().node
                    let uiBaseComponent = uiNode.getComponent(UIBase);
                    this.uiDict.add(uiBase.name, uiBaseComponent)
                    uiBaseComponent.setUIData(uiData)

                    Logger.Info("Open UI: " + uiBase.name)
                    resolve(uiBaseComponent)
                 } catch(e){
                    Logger.Error("Couldn't Open UI: " + uiBase.name)
                    reject(e);
                }
            }
            resolve(this.uiDict.get(uiBase.name))
        })
    }

}