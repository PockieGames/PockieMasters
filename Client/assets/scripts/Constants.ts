import { Color } from "cc";

export class TileColors {
    static readonly NORMAL: number[] = [255, 255, 255, 80];
    static readonly ATTACK: number[] = [255, 0, 0, 120];
    static readonly MOVEMENT: number[] = [10, 155, 255 , 120];
    static readonly MOVEMENT_HOVER: number[] = [255, 155, 10 , 120];
}

export class RarityColors {
    static readonly UNCOMMON: Color = new Color(0, 255, 31, 255);
    static readonly COMMON: Color = new Color(0, 150, 255, 255);
    static readonly RARE: Color = new Color(255, 0, 255, 255);
    static readonly EPIC: Color = new Color(255, 0, 0, 255);
    static readonly LEGENDARY: Color = new Color(255, 150, 0, 255);
    static readonly IMMORTAL: Color = new Color(255, 255, 255, 255);
}

export const delay = function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

export const SERVER_IP = "127.0.0.1"
export const SERVER_PORT = 3001