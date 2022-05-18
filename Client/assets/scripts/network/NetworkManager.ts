import { ApiReturn, WsClient } from "tsrpc-browser";
import { resolve } from "../../../extensions/i18n/@types/editor/utils/source/path";
import { serviceProto, ServiceType } from "../shared/protocols/serviceProto";
import Singleton from "../utils/Singleton";

export default class NetworkManager extends Singleton{

    client: WsClient<ServiceType>

    async connect(wsUrl: string = "ws://localhost:3001"): Promise<{ isSucc: true; errMsg?: undefined; } | { isSucc: false; errMsg: string; }>{

        this.client = new WsClient(serviceProto, {
            server: wsUrl,
            json: true
        })

        return await this.client.connect()

    }

    // Extend callApi, to log and for example show error window
    async callApi<T extends keyof ServiceType['api']>(apiName: T, req: ServiceType['api'][T]['req']): Promise<ApiReturn<ServiceType['api'][T]['res']>>{
        return new Promise<ApiReturn<ServiceType['api'][T]['res']>>(async (resolve) => {
            let res = await this.client.callApi(apiName, req)
            if(res.err){
                // Erorr Popup and potentially close connection.
            }
            resolve(res)
        })
    }

}