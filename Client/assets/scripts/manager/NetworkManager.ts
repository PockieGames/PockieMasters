import { director, sys } from "cc";
import { ApiReturn, HttpClient, WsClient } from "tsrpc-browser";
import { resolve } from "../../../extensions/i18n/@types/editor/utils/source/path";
import { BaseResponse } from "../shared/protocols/base";
import { serviceProto, ServiceType } from "../shared/protocols/serviceProto";
import UIManager from "../ui/UIManager";
import MessageBox from "../ui/views/MessageBox";
import Singleton from "../utils/Singleton";

export default class NetworkManager extends Singleton {

    client: HttpClient<ServiceType>

    // Extend callApi, to log and for example show error window
    async callApi<T extends keyof ServiceType['api']>(apiName: T, req: ServiceType['api'][T]['req'] = {}): Promise<ApiReturn<ServiceType['api'][T]['res']>> {
        return new Promise<ApiReturn<ServiceType['api'][T]['res']>>(async (resolve) => {

            if (!this.client) {

                this.client = new HttpClient(serviceProto, {
                    server: "http://127.0.0.1:3001",
                    json: true
                })

                // SSO Token
                this.client.flows.postApiReturnFlow.push(v => {
                    if (v.return.isSucc) {
                        let res = v.return.res as BaseResponse;
                        if (res.__ssoToken !== undefined) {
                            sys.localStorage.setItem('SSO_TOKEN', res.__ssoToken);
                        }
                    }
                    else if (v.return.err.code === 'NEED_LOGIN') {
                        sys.localStorage.removeItem('SSO_TOKEN');
                    }
                    return v;
                });
                
                // Append "__ssoToken" to request automatically
                this.client.flows.preCallApiFlow.push(v => {
                    let ssoToken = sys.localStorage.getItem('SSO_TOKEN');
                    if (ssoToken) {
                        v.req.__ssoToken = ssoToken;
                    }
                    return v;
                })
            }

            let res = await this.client.callApi(apiName, req)
            if (res.err) {
                UIManager.Instance<UIManager>().OpenPopup(MessageBox, {
                    title: "Connection Error",
                    message: res.err.message
                })
            }
            resolve(res)
        })
    }

}