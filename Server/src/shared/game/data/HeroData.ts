export enum HeroType{
    DEATH = 1,
    PSYCH,
    ANIMAL,
    NATURE,
    DARK,
    LIGHT,
    ALL = -1
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