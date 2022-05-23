import { uint } from "tsrpc";

export interface User {
    uuid: string,
    username?: string,
    currencyPremium: uint,
    currencyFree: uint,
    tutorialStep: uint
}