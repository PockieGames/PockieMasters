import { Component, ScrollView, Vec2, _decorator } from "cc";
import { ElasticLimit } from "../ElasticLimit";

const { ccclass, property } = _decorator;

@ccclass("TownUI")
export default class TownUI extends Component{
    
    @property(ElasticLimit)
    scrollView: ElasticLimit

    start(){
        this.scrollView.scrollTo(new Vec2(0.5, 0))
    }

}