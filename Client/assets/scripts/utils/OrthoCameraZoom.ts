import { Camera, Component, tween, Vec3, _decorator } from "cc";

const { ccclass } = _decorator;

@ccclass("OrthoCameraZoom")
export default class OrthoCameraZoom extends Component
{
    private defaultCenter: Vec3
    private defaultHeight: number // height of orthographic viewport in world units

    private camera: Camera

    start()
    {
        this.camera = this.getComponent(Camera)
        this.defaultCenter = this.camera.node.position
        this.defaultHeight = 2 * this.camera.orthoHeight
    }

    orthoZoom(center: Vec3, regionHeight: number)
    {
        tween(this.node)
        .to(0.5, {position: new Vec3(center.x, center.y, this.defaultCenter.z)})
        .start()

        tween(this.camera)
        .to(0.5, {orthoHeight: regionHeight / 2})
        .start()
    }
}