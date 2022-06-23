export enum HeroType{
    FIRE,
    EARTH,
    AIR,
    WATER,
    LIGHT,
    DARK
}
export enum HeroRarity {
    COMMON,
    UNCOMMON,
    RARE,
    EPIC,
    LEGENDARY 
}
export default class HeroData{
    id: number
    name: string
    sprite: string
    baseMovement: number
    heroType: HeroType
    rarity: HeroRarity
    spells: string[]
}