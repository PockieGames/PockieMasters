export default class SpellData {

    id: number = 0
    name: string = "No Spell Name"
    icon: string = "locked"
    description: string = "No Spell Description"
    pattern: string = ""
    range: number = 3
    
    onCast(){
        console.log(this.name + " onCast not implemented.")
    }

}