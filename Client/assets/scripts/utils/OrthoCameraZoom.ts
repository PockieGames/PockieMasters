import { Camera, Component, tween, Vec3, _decorator } from "cc";

const { ccclass, requireComponent } = _decorator;

@ccclass("OrthoCameraZoom")
@requireComponent(Camera)
export default class OrthoCameraZoom extends Component
{
    private defaultCenter: Vec3
    public defaultHeight: number = 320

    private camera: Camera

    start()
    {
        this.camera = this.getComponent(Camera)
        this.defaultCenter = this.camera.node.position
        console.log(this.camera.orthoHeight)
        this.defaultHeight = this.camera.orthoHeight
    }
    
    zoomBack(duration: number = 0)
    {
        tween(this.node)
        .to(duration, {position: new Vec3()})
        .start()

        tween(this.camera)
        .to(duration, {orthoHeight: this.defaultHeight})
        .start()
    }

    getCurrentOrtho(): number{
        return this.camera.orthoHeight
    }

    orthoZoom(center: Vec3, regionHeight: number, offsets: {x: number, y: number} = {x: 0, y: 0}, duration: number = 0.2)
    {
        if(regionHeight == this.defaultHeight){
            center = new Vec3()
            offsets = {x: 0, y: 0}
        }

        tween(this.node)
        .to(duration, {position: new Vec3(center.x + offsets.x, center.y + offsets.y, this.defaultCenter.z)})
        .start()

        tween(this.camera)
        .to(duration, {orthoHeight: regionHeight})
        .start()
    }
}