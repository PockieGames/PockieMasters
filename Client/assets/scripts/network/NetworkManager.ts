import { ApiReturn, WsClient } from "tsrpc-browser";
import { serviceProto, ServiceType } from "../shared/protocols/serviceProto";
import Singleton from "../utils/Singleton";

export default class NetworkManager extends Singleton{

    client: WsClient<ServiceType>;

    constructor(wsUrl: string = "ws://localhost:3001") {
        
        super()

        this.client = new WsClient(serviceProto, {
            server: wsUrl,
            json: true,
            //logger: console
        });

        this.client.connect().then((res) => {
            console.log(res.errMsg)

            this.callApi("Auth", { username: "t", password: "t" } ).then((res) => {
                console.log(res)
            })
        })

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