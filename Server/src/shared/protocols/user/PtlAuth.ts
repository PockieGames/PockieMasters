import { Account } from "../../types/Account"

export interface ReqAuth {
    username: string,
    password: string
}

export interface ResAuth {
    account: Account
}
