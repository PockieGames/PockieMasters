export enum HeroType{
    FIRE,
    EARTH,
    AIR,
    WATER,
    LIGHT,
    DARK
}
export default class HeroData{
    id: number
    name: string
    sprite: string
    baseMovement: number
    heroType: HeroType
    spells: string[]
}