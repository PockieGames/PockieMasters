import { Canvas, find, instantiate, Prefab, Node } from "cc";
import ResourceManager from "../resources/ResourceManager";
import Dictionary from "../utils/Dictionary";
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

    async OpenUI(uiBase: { new(): UIBase }): Promise<UIBase>{
        return new Promise<UIBase>(async (resolve, reject) => {
            if(!this.uiDict.containsKey(uiBase.name)){
                try{
                    let asset = await ResourceManager.Instance(ResourceManager).loadPrefab<Prefab>("/UINAME") //TODO: uiName

                    let uiNode = instantiate(asset)
                    uiNode.parent = this.getCanvas().node
                    let uiBaseComponent = uiNode.getComponent(UIBase);
        
                    this.uiDict.add(uiBase.name, uiBaseComponent)
        
                    resolve(uiBaseComponent)
                 } catch(e){
                    reject(e);
                }
            }
            resolve(this.uiDict.get(uiBase.name))
        })
    }

}