export default class TileColors {

    static readonly NORMAL: number[] = [255, 255, 255, 80];
    static readonly ATTACK: number[] = [255, 0, 0, 120];
    static readonly MOVEMENT: number[] = [10, 155, 255 , 120];
    static readonly MOVEMENT_HOVER: number[] = [255, 155, 10 , 120];
    
}

export const delay = function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

export const SERVER_IP = "192.168.115.26"
export const SERVER_PORT = 3001