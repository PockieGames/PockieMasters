import { director, game, instantiate, Node, Prefab, ProgressBar } from "cc";
import Singleton from "../utils/Singleton";
import ResourceManager from "./ResourceManager";

export default class SceneManager extends Singleton {

    loadNode: Node
    loadNodeProgressBar: ProgressBar

    async loadScene(name: string, onComplete: (err, scene) => void = null) {

        if(!this.loadNode){
            let prefab = await ResourceManager.Instance<ResourceManager>().loadAsset<Prefab>("ui/SceneLoadUI")
            let loadNode = instantiate(prefab)
            loadNode.name = "SceneLoadUI"
            game.addPersistRootNode(loadNode)
            this.loadNode = loadNode
            this.loadNodeProgressBar = loadNode.getChildByName("ProgressBar").getComponent(ProgressBar)
        }

        this.loadNode.active = true

        director.preloadScene(
            name,
            (completedCount, totalCount) => {
                this.loadNodeProgressBar.progress = completedCount / totalCount
                console.log(`${completedCount}/${totalCount}`)
                console.log(this.loadNodeProgressBar.progress)
            },
            (err, asset) => {
                if (err) {
                    // error handling
                    return
                }
                director.loadScene(name, onComplete)
                this.loadNode.active = false
            }
        )

    }

}