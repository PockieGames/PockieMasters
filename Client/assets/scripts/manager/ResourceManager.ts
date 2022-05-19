import { Asset, resources } from "cc"
import Singleton from "../utils/Singleton"

export default class ResourceManager extends Singleton{

    async loadAsset<T extends Asset>(path: string): Promise<T>{
        return new Promise<T>((resolve, reject) => {
            resources.load<T>(path, (err, asset: T) => {
                if(err) reject(err.message)
                resolve(asset)
            })
        })
    }

}