import { AudioClip, AudioSource, Node } from "cc";
import { AudioMusic } from "../utils/AudioMusic";
import Logger from "../utils/Logger";
import SingletonNode from "../utils/SingletonNode";
import StorageUtils from "../utils/StorageUtils";
import ResourceManager from "./ResourceManager";


export default class AudioManager extends SingletonNode {

    static localStorageKey = "pockie.audio";

    musicSource: AudioMusic
    effectSource: AudioSource

    musicVolume: number = 1
    effectVolume: number = 1

    initialized = false

    init(){

        this.musicSource = AudioManager.Instance<AudioManager>().addComponent(AudioMusic)
        this.effectSource = AudioManager.Instance<AudioManager>().addComponent(AudioSource)

        let storageMusicVolume = StorageUtils.readData(AudioManager.localStorageKey + ".musicVolume")
        if(storageMusicVolume == null)
            this.musicVolume = 1
        else
            this.musicVolume = Number.parseFloat(storageMusicVolume)

        let storageEffectVolume = StorageUtils.readData(AudioManager.localStorageKey + ".effectVolume")
        if(storageEffectVolume == null)
            this.effectVolume = 1
        else
            this.effectVolume = Number.parseFloat(storageEffectVolume)

        this.initialized = true

    }

    playEffect(path: string){
        if(!this.initialized){
            this.init()
        }
        ResourceManager.Instance<ResourceManager>().loadAsset<AudioClip>(path).then((clip) => {
            this.effectSource.clip = clip
            this.effectSource.volume = this.effectVolume
            this.effectSource.loop = false
            this.effectSource.play()
        })
    }

    playMusic(path: string){
        if(!this.initialized){
            this.init()
        }
        this.musicSource.load(path)
    }

}