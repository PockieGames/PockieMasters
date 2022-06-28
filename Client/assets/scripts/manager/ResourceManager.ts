import { Asset, dragonBones, ImageAsset, JsonAsset, resources, SpriteFrame, Texture2D } from "cc"
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

    async loadSpriteFrame(path: string): Promise<SpriteFrame>{
        return new Promise<SpriteFrame>((resolve, reject) => {
            resources.preload(path, ImageAsset, (err) => {
                if(err)
                    reject(err.message)
    
                resources.load<ImageAsset>(path, (err, asset: ImageAsset) => {
                    if(err) reject(err.message)
                    let spriteFrame = new SpriteFrame()
                    let tex = new Texture2D()
                    tex.image = asset
                    spriteFrame.texture = tex
                    resolve(spriteFrame)
                })
                
            })
        })
    }

    async loadDragonBones(dbAssetPath: string, dbAtlasPath: string): Promise<{dbAsset: dragonBones.DragonBonesAsset, dbAtlas: dragonBones.DragonBonesAtlasAsset}> {
        return new Promise<{dbAsset: dragonBones.DragonBonesAsset, dbAtlas: dragonBones.DragonBonesAtlasAsset}>((resolve, reject) => {
            resources.preload(dbAssetPath, dragonBones.DragonBonesAsset, (err) => {
                if(err) reject(err.message)
                resources.preload(dbAtlasPath, dragonBones.DragonBonesAtlasAsset, (err) => {
                    if(err) reject(err.message)
                    resources.load<dragonBones.DragonBonesAsset>(dbAssetPath, (err, dbAsset) => {
                        if(err)
                            reject(err)
                        resources.load<dragonBones.DragonBonesAtlasAsset>(dbAtlasPath, (err, dbAtlas) => {
                            if(err)
                                reject(err)
                            resolve({dbAsset: dbAsset, dbAtlas: dbAtlas})
                        })
                    })
                })
            })
        })
    }

    releaseAsset(path: string){
        resources.release(path)
    }

}