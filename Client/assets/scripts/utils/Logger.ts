import { error, log, sys, warn } from "cc";

const Log_Tag:string = "PockieMasters"

export default class Logger {
    
    private static _lv: number = 4;
    public static get lv(): number {
        return this._lv;
    }
    public static set lv(value: number) {
        this._lv = value;
    }

    static Info(message:any, ...op:any[]) {
        if (this.lv >= 3) {
            if (sys.isNative) {
                if (typeof(message) === "object") {
                    let s = JSON.stringify(message)
                    log(`[${Log_Tag} Info] :`,s, op)
                }
                else{
                    log(`[${Log_Tag} Info] :`,message,op)
                }
            }
            else{
                log(`[${Log_Tag} Info] :`,message, op)
            }
        }
    }

    static Error(message:any,...op:any[]) {
        if (this.lv >= 1) {
            if (sys.isNative) {
                if (typeof(message) === "object") {
                    let s = JSON.stringify(message)
                    error(`[${Log_Tag} Error] :`,s, op)
                }
                else{
                    error(`[${Log_Tag} Error] :`,message,op)
                }
            }
            else{
                error(`[${Log_Tag} Error] :`,message, op)
            }
        }
    }

    static Warn(message:any) {
        if (this.lv >= 2) {
            warn(`[${Log_Tag} Warn] :`,message)
        }
    }

    static Network(message:any,...op:any[]) {
        if (this.lv >= 4) {
            if (sys.isNative) {
                if (typeof(message) === "object") {
                    let s = JSON.stringify(message)
                    log(`[${Log_Tag}  Net] :`,s, op)
                }
                else{
                    log(`[${Log_Tag}  Net] :`,message,op)
                }
            }
            else{
                log(`[${Log_Tag}  Net] :`,message, op)
            }
        }
    }
}