export default class IStat{

    baseValue: number = 0
    flatBonus: number = 0
    percentageBonus: number = 0

    total(){
		  return this.baseValue + this.flatBonus + (this.baseValue * this.percentageBonus / 100)
    }

    constructor(_base: number){
        this.baseValue = _base
    }
    
}