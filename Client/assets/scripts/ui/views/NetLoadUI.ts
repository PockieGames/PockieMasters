import SingletonNode from "../../utils/SingletonNode";

export default class NetLoadUI extends SingletonNode{

    start(){
        console.log("START")
    }

    hide(){
        this.active = false
    }

    show(){
        this.active = true
    }

}