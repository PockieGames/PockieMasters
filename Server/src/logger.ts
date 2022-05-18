import { TerminalColorLogger } from "tsrpc";

export default class Logger extends TerminalColorLogger {

    static _instance: Logger

    static getInstance(){
        if(this._instance == null){
            return this._instance = new Logger()
        }
        return this._instance
    }

    static warn(msg: string){
        Logger.getInstance().warn(msg)
    }

    static debug(msg: string){
        Logger.getInstance().debug(msg)
    }

    static error(msg: string){
        Logger.getInstance().error(msg)
    }
    
    static log(msg: string){
        Logger.getInstance().log(msg)
    }

}