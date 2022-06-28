import { Component, ScrollView, Vec2, _decorator } from "cc";
import { BetterScrollView } from "../components/BetterScrollView";

const { ccclass, property } = _decorator;

@ccclass("TownUI")
export default class TownUI extends Component{
    
    prefabName = "TownUI"

    @property(BetterScrollView)
    scrollView: BetterScrollView

    start(){
        // Scroll To 50% of X axis
        this.scrollView.scrollTo(new Vec2(0.5, 0))
    }

}