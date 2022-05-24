import MapTile from "./MapTile"
import AttackableObject from "./stats/AttackableObject"

export default class Map{

    width: number = 0
    height: number = 0

    tiles: MapTile[][]

    constructor(_width: number, _height: number){
        this.width = _width
        this.height = _height
    }

    buildTiles(){
        this.tiles = []

        for(let x: number = this.width - 1; x >= 0; x--){
            this.tiles[x] = [];
            for(let y: number = this.height - 1; y >= 0; y--){
                this.tiles[x][y] = new MapTile(x, y)
            }
        }

        // Set Adjancency
        for(let x: number = this.width - 1; x >= 0; x--){
            for(let y: number = this.height - 1; y >= 0; y--){
                if(x > 0)
                    this.tiles[x][y].adjacencyList.push(this.tiles[x - 1][y]);
                if(x < this.width - 1)
                    this.tiles[x][y].adjacencyList.push(this.tiles[x + 1][y]);
                if(y > 0)
                    this.tiles[x][y].adjacencyList.push(this.tiles[x][y - 1]);
                if(y < this.height - 1)
                    this.tiles[x][y].adjacencyList.push(this.tiles[x][y + 1]);
            }
        }
    }

}