import { WsClient } from "tsrpc-browser";
import { _decorator, Component, Node } from 'cc';
import { serviceProto, ServiceType } from "./shared/protocols/serviceProto";

const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends Component {

    client: WsClient<ServiceType>;

    async start() {

        let client = this.client = new WsClient(serviceProto, {
            server: `ws://${location.hostname}:3000`,
            json: true,
            // logger: console
        });

        await client.connect();

        let ret = await this.client.callApi('Auth', { username: "test", password: "" });

        if (!ret.isSucc) {
            console.log(ret.err)
            console.log(client.isConnected)
            console.log("Not sucessfully")
            return;
        }

        console.log(ret.res.success)

    }

    update(deltaTime: number) {
        
    }
}

