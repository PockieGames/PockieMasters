import { Camera, Component, tween, Vec3, _decorator } from "cc";

const { ccclass, requireComponent } = _decorator;

@requireComponent(Camera)
@ccclass("OrthoCameraZoom")
export default class OrthoCameraZoom extends Component
{
    private defaultCenter: Vec3
    private defaultHeight: number = 320

    private camera: Camera

    start()
    {
        this.camera = this.getComponent(Camera)
        this.defaultCenter = this.camera.node.position
        this.defaultHeight = 2 * this.camera.orthoHeight
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