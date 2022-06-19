import SpellData from "./data/SpellData"
import TestSpell from "./data/Spells/TestSpell"
import TestSpell2 from "./data/Spells/TestSpell2"
import Dictionary from "./utils/Dictionary"

export enum Team {
    TEAM_NEUTRAL = 0,
    TEAM_BLUE = 1,
    TEAM_RED = 2
}

export const spells: Dictionary<SpellData> = new Dictionary<SpellData>({
    "TestSpell": new TestSpell(),
    "TestSpell2": new TestSpell2()
})