import { game, Node } from "cc"
import UIManager from "../ui/UIManager"

export default class SingletonNode extends Node{

    private static _instance = null

    public static Instance<T extends Node>(): T {
        if (this._instance == null) {
            this._instance = new this() as T
            game.addPersistRootNode(this._instance)
        }
        return this._instance as T
    }

}