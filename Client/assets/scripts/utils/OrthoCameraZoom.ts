import { Camera, Component, tween, Vec3, _decorator } from "cc";

const { ccclass, requireComponent } = _decorator;

@ccclass("OrthoCameraZoom")
@requireComponent(Camera)
export default class OrthoCameraZoom extends Component
{
    private defaultCenter: Vec3
    private defaultHeight: number = 320

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

    orthoZoom(center: Vec3, regionHeight: number, offsets: {x: number, y: number} = {x: 0, y: 0}, duration: number = 0.2)
    {
        tween(this.node)
        .to(duration, {position: new Vec3(center.x + offsets.x, center.y + offsets.y, this.defaultCenter.z)})
        .start()

        tween(this.camera)
        .to(duration, {orthoHeight: regionHeight / 2})
        .start()
    }
}