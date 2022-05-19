import { ApiCall } from "tsrpc";
import { ReqReg, ResReg } from "../../shared/protocols/user/PtlReg";

export async function ApiReg(call: ApiCall<ReqReg, ResReg>) {

    function generateId() {
        function rndNbr() {
            return Math.floor(Math.random() * 9 + 0.5).toString()
        }
        return rndNbr() + rndNbr() + rndNbr() + rndNbr() + rndNbr() + rndNbr() + rndNbr() + rndNbr() + rndNbr()
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

    let id = generateId()

    call.succ({ identifier: id, password: generatePassword() })

}