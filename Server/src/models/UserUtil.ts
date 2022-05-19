import { HttpServer } from "tsrpc";
import * as uuid from "uuid";
import User from "../database/models/User";
import { BaseConf, BaseRequest } from "../shared/protocols/base";

const SSO_VALID_TIME = 86400000 * 7;

export class UserUtil {

    static ssoTokenInfo: {
        [token: string]: { expiredTime: number, uuid: string }
    } = {};

    static async createSsoToken(_uuid: string): Promise<string> {
        let token = uuid.v1();
        // Expired after some time without any action
        let expiredTime = Date.now() + SSO_VALID_TIME;

        this.ssoTokenInfo[token] = {
            uuid: _uuid,
            expiredTime: expiredTime
        };

        return token;
    }

    static async destroySsoToken(ssoToken: string): Promise<void> {
        delete this.ssoTokenInfo[ssoToken];
    }

    static async parseSSO(ssoToken: string): Promise<User | undefined> {
        return new Promise<User | undefined>((resolve, reject) => {

            let info = this.ssoTokenInfo[ssoToken]

            // Token not exists or expired
            if (!info || info.expiredTime < Date.now()) {
                resolve(undefined)
            }
    
            // Parse User
            let user = User.findOne({
                where: {
                    uuid: info.uuid
                }
            }).then((user) => {
                info.expiredTime = Date.now() + SSO_VALID_TIME
                resolve(user!)
            }).catch((err) => {
                console.log(err)
                resolve(undefined)
            })

        })
    }

}

export function enableAuthentication(server: HttpServer) {
    server.flows.preApiCallFlow.push(call => {
        let conf: BaseConf | undefined = call.service.conf;

        // NeedLogin
        if (conf?.needLogin && !call.currentUser) {
            console.log(call.currentUser)
            call.error('You need login before do this', { code: 'NEED_LOGIN' });
            return undefined;
        }

        return call;
    })
}

export function parseCurrentUser(server: HttpServer) {
    // Auto parse call.currentUser
    server.flows.preApiCallFlow.push(async call => {
        let req = call.req as BaseRequest
        if (req.__ssoToken) {
            call.currentUser = await UserUtil.parseSSO(req.__ssoToken)
            console.log(call.currentUser)
        }
        return call
    })
}

declare module 'tsrpc' {
    export interface ApiCall {
        currentUser?: User
    }
}