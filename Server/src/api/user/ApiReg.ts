import { ApiCall } from "tsrpc";
import User from "../../database/models/User";
import { ReqReg, ResReg } from "../../shared/protocols/user/PtlReg";

export async function ApiReg(call: ApiCall<ReqReg, ResReg>) {

    async function generateId(): Promise<string> {
        function rndNbr() {
            return Math.floor(Math.random() * 9 + 0.5).toString()
        }
        async function idExists(id: string) {
            return await User.findAll({
                where: {
                    identifier: id
                }
            })
        }
        let id = rndNbr() + rndNbr() + rndNbr() + rndNbr() + rndNbr() + rndNbr() + rndNbr() + rndNbr() + rndNbr()
        let exists = await idExists(id)
        if (exists.length > 0) {
            // recursive generate id until we found one :)
            id = await generateId()
        }
        return id
    }

    function generatePassword() {
        var password = ''
        var length = 12
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        for (var i = 0; i < length; i++) {
            password += characters.charAt(Math.floor(Math.random() * characters.length))
        }
        return password
    }

    let id = await generateId()
    let pass = generatePassword()

    // Add User TO Database
    await User.create({
        uuid: call.req.uuid,
        identifier: id,
        password: pass,
        os: call.req.osInfos.os,
        osVersion: call.req.osInfos.osVersion,
        language: call.req.osInfos.language,
        tutorialStep: 0,
        currencyFree: 0,
        currencyPremium: 0,
        heroes: "{}",
        inventory: "{}"
    })

    call.succ({ identifier: id, password: pass })

}