import { director } from "cc";
import { ApiReturn, WsClient } from "tsrpc-browser";
import { resolve } from "../../../extensions/i18n/@types/editor/utils/source/path";
import { serviceProto, ServiceType } from "../shared/protocols/serviceProto";
import UIManager from "../ui/UIManager";
import MessageBox from "../ui/views/MessageBox";
import Singleton from "../utils/Singleton";

export default class NetworkManager extends Singleton{

    client: WsClient<ServiceType>

    async connect(wsUrl: string = "ws://localhost:3001"): Promise<{ isSucc: true; errMsg?: undefined; } | { isSucc: false; errMsg: string; } | WsClient<ServiceType>>{
        return new Promise<{ isSucc: true; errMsg?: undefined; } | { isSucc: false; errMsg: string; } | WsClient<ServiceType>>((resolve) => {

            if(!this.client) {
                this.client = new WsClient(serviceProto, {
                    server: wsUrl,
                    json: true
                })
            }

            this.client.flows.postDisconnectFlow.push(v => {
                    // HANDLE DISCONNECT
                    UIManager.Instance<UIManager>().OpenPopup(MessageBox, {
                        title: "Disconnected",
                        message: "You have been disconnected from the server.",
                        onClose: () => {
                            director.loadScene("main")
                        }
                    })
                return v;
            })

            if(this.client.isConnected)
                resolve(this.client)

            resolve(this.client.connect())

        })

    }

    // Extend callApi, to log and for example show error window
    async callApi<T extends keyof ServiceType['api']>(apiName: T, req: ServiceType['api'][T]['req']): Promise<ApiReturn<ServiceType['api'][T]['res']>>{
        return new Promise<ApiReturn<ServiceType['api'][T]['res']>>(async (resolve) => {
            let res = await this.client.callApi(apiName, req)
            if(res.err){
                UIManager.Instance<UIManager>().OpenPopup(MessageBox, {
                    title: "Connection Error",
                    message: res.err.message
                })
            }
            resolve(res)
        })
    }

}