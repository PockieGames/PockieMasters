import Logger from "../../../../logger";
import MapObject from "../MapObject";
import IStat from "./IStat";

export default class AttackableObject extends MapObject {

    healthPoints: IStat = new IStat(300)
    movementPoints: IStat = new IStat(3)
    attackPoints: IStat = new IStat(50)

    setDefaultStats(stats: { name: string, base: number }[]) {
        stats.forEach((stat) => {
            switch (stat.name) {
                case "healthPoints":
                    this.healthPoints = new IStat(stat.base)
                    break
                case "movementPoints":
                    this.movementPoints = new IStat(stat.base)
                    break
                case "attackPoints":
                    this.attackPoints = new IStat(stat.base)
                    break
            }
        })
    }

    onDie(source: AttackableObject) {
    }

    increaseStats(stats: { name: string, flat?: number, percent?: number }[]) {
        stats.forEach((stat) => {
            this.increaseStat(stat)
        })
    }

    increaseStat(stat: { name: string, flat?: number, percent?: number }) {
        let istat: IStat | undefined = undefined
        switch (stat.name) {
            case "attackPoints":
                istat = this.attackPoints
                break;
            case "movementPoints":
                istat = this.movementPoints
                break;
            case "healthPoints":
                istat = this.healthPoints
                break;
        }
        if (istat == undefined)
            return
        istat.flatBonus += stat.flat ?? 0
        istat.percentageBonus += stat.percent ?? 0
    }

    decreaseStats(stats: { name: string, flat?: number, percent?: number }[]) {
        stats.forEach((stat) => {
            this.decreaseStat(stat)
        })
    }

    decreaseStat(stat: { name: string, flat?: number, percent?: number }) {
        let istat: IStat | undefined = undefined
        switch (stat.name) {
            case "attackPoints":
                istat = this.attackPoints
                break;
            case "movementPoints":
                istat = this.movementPoints
                break;
            case "healthPoints":
                istat = this.healthPoints
                break;
        }
        if (istat == undefined)
            return
        istat.flatBonus -= stat.flat ?? 0
        istat.percentageBonus -= stat.percent ?? 0
    }
}