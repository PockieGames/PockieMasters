import { uint } from "tsrpc";

export interface StaticHero{
    id: uint
    name: string
    sprite: string
    type: uint
    rarity: uint
    spells: string[]
    attack: uint
    movement: uint
}