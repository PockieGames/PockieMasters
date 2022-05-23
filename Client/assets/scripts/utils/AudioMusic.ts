import { AudioClip, AudioSource, error, log, Tween, tween, _decorator } from 'cc';
import AudioManager from '../manager/AudioManager';
import ResourceManager from '../manager/ResourceManager';
const { ccclass, menu } = _decorator;

/** 背景音乐 */
@ccclass('AudioMusic')
export class AudioMusic extends AudioSource {
    
    public onComplete: Function | null = null;
    private _progress: number = 0;
    private _url: string | null = null;
    private _isPlay: boolean = false;

    private tweenVolume: Tween<AudioMusic>

    public get progress() {
        this._progress = this.currentTime / this.duration;
        return this._progress;
    }
    public set progress(value: number) {
        this._progress = value;
        this.currentTime = value * this.duration;
    }

    public load(url: string, isLoop:boolean=true, callback?: Function) {
        ResourceManager.Instance<ResourceManager>().loadAsset<AudioClip>(url).then((clip) => {
            this.fadeOut().then(() => {
                this.clip = clip
                this.currentTime = 0
                this.play()
                this.loop = isLoop
                callback && callback()
                this._url = url

                this.fadeIn()
            })
        })
    }

    private async fadeOut(): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            if(!this.playing) return resolve(false)

            this.tweenVolume?.stop();
            this.tweenVolume = new Tween(this);
            this.tweenVolume.to(1, { volume:0 }, {
                onComplete : ()=>{
                    this.tweenVolume = null
                    this.stop()
                    return resolve(true)
            }}).start()
        })
    }

    private async fadeIn() {
        this.tweenVolume?.stop()
        this.tweenVolume = new Tween(this)
        this.volume = 0
        this.tweenVolume.to(1, { volume: AudioManager.Instance<AudioManager>().musicVolume }, {
            onComplete: ()=>{
                this.tweenVolume = null
            }
        }).start()
    }

    update(dt: number) {

        if (this.currentTime > 0) {
            this._isPlay = true;
        }

        if (this._isPlay && this.playing == false) {
            this._isPlay = false;
            this.onComplete && this.onComplete();
        }
    }

}
