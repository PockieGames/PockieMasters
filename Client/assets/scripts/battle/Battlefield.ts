import { Camera, Color, Component, director, EventMouse, EventTouch, instantiate, Layers, Node, Prefab, Sprite, tween, UITransform, Vec2, Vec3, _decorator } from "cc";
import TileColors from "../Constants";
import ResourceManager from "../manager/ResourceManager";
import Logger from "../utils/Logger";
import Map from "../shared/game/battle/Map"
import Tile from "./Tile";
import UIManager from "../ui/UIManager";
import MapData, { MapObjectType } from "./MapData";
import MessageBox from "../ui/views/MessageBox";
import OrthoCameraZoom from "../utils/OrthoCameraZoom";
import { Team } from "../shared/game/SharedConstants";
import { TileObject } from "./tileObjects/TileObject";
import GameData from "../manager/GameData";
import HeroData from "../shared/game/data/HeroData";
import MapObject from "./MapData";
import AttackableObject from "../shared/game/battle/MapAttackableObject";
import MapAttackableObject from "../shared/game/battle/MapAttackableObject";
import MapTile from "../shared/game/battle/MapTile";

const { ccclass, property } = _decorator;

@ccclass("Battlefield")
export default class Battlefield extends Component {

    map: Map
    tiles: Tile[] = []
    coloredTiles: Tile[] = []

    selectedTile: Tile

    @property("number")
    width: number = 9;
    @property("number")
    height: number = 5;
    @property(Node)
    tileContainerNode: Node
    @property(Camera)
    battlefieldCamera: Camera

    animate: boolean = true
    offlineFight: boolean = true
    offlineMapData: MapData

    units: {
        team: Team,
        unit: TileObject
    }[] = []

    async start() {

        this.map = new Map(this.width, this.height)

        this.map.buildTiles()

        await this.drawMap()
        if (this.animate)
            await this.animateTiles()

        //this.registerInputs()

        if (!this.offlineFight) {
            // Connect to WS, listen to events, etc.
        } else {

            let testHeroes = GameData.Instance<GameData>().heroData

            this.offlineMapData = {
                mapObjects: []
            } as MapData

            testHeroes.forEach((hero) => {
                this.offlineMapData.mapObjects.push({
                    objectData: hero,
                    position: new Vec2(0, 0),
                    type: MapObjectType.HERO
                } as MapObject)
            })

            this.initializeOfflineMapData()
        }

    }

    initializeOfflineMapData() {
        if (!this.offlineMapData) {
            UIManager.Instance<UIManager>().OpenPopup(MessageBox, {
                title: "BattleMap Error",
                message: "No Offline Map Data Initialized",
                onClose: () => {
                    director.loadScene("home")
                }
            })
            return
        }

        // Initialize
        this.offlineMapData.mapObjects.forEach((mapObject) => {
            this.placeCharacter(mapObject.objectData, { x: mapObject.position.x, y: mapObject.position.y })
        })
    }

    placeCharacter(object: HeroData, position: { x: number, y: number }) {
        let tilePlacement = this.getTile(position.x, position.y)

        let newNode = new Node("Character")
        newNode.parent = tilePlacement.node
        newNode.layer = Layers.BitMask.UI_3D

        let tileObjectComponent = newNode.addComponent(TileObject)
        tilePlacement.tileObject = tileObjectComponent
        tilePlacement.mapTile.mapObject = new MapAttackableObject(object)
        tileObjectComponent.render()
    }

    getTile(x: number, y: number): Tile {
        return this.tiles.find(tile => tile.mapTile.x == x && tile.mapTile.y == y)
    }

    getTilesByDistance(target: Tile, distance: number, clear = false): Tile[]{

        distance = distance+1 
        let queue: Tile[] = []
        let returns: Tile[] = []

        queue.push(target)

        let i = 0
        while(i < distance){
            queue.forEach((tile: Tile) => {
                tile.mapTile.adjacencyList.forEach((_neighbour: MapTile) => {
                    let tileOnMap = this.getTile(_neighbour.x, _neighbour.y)
                    if((i + 1) < distance && tileOnMap.tileObject == null && !_neighbour.visited){
                        _neighbour.visited = true
                        _neighbour.parent = tile.mapTile
                        queue.push(tileOnMap)
                    }
                })
            })
            i++
        }

        if(clear){
            this.clearTiles()
        }


        queue.forEach((tile: Tile) => {
            if(tile != target){
                if(!(returns.indexOf(tile) > -1)){
                    returns.push(tile)
                }
            }
        })

        return returns;
    }

    clearTiles() {
        this.coloredTiles = [];
        this.tiles.forEach((tile: Tile) => {
            tile.setColor(TileColors.NORMAL)
            tile.mapTile.visited = false
        })
    }

    clickOnTile(position: Vec2) {
        let tile = this.getTile(position.x, position.y)
        if(this.selectedTile == null){
            if(tile.mapTile.mapObject){
                let ao = tile.mapTile.mapObject as AttackableObject
                console.log("CLICKED ON: " + ao.displayName + " with MP: " + ao.heroData.baseMovement)
                let tiles = this.getTilesByDistance(tile, ao.heroData.baseMovement, true)
                this.coloredTiles = tiles
                this.animateColorTiles(tile, TileColors.MOVEMENT)
                this.selectedTile = tile
            }
        } else {
            if(this.coloredTiles.find(x => x == tile)){
                // MOVE
                console.log("LOL")
                this.moveObject(this.selectedTile, tile)
            } else {
                this.selectedTile = null
                this.clearTiles()
                console.log("Lul")
            }
        }
    }

    moveObject(from: Tile, to: Tile){

        to.tileObject = from.tileObject
        to.mapTile.mapObject = from.mapTile.mapObject

        to.tileObject.node.parent = to.node

        from.tileObject = null
        from.mapTile.mapObject = null

        this.selectedTile = null
        this.clearTiles()

    }

    async drawMap() {
        let offsetX = 0;
        let offsetY = -5

        let spacingX: number = 0
        let spacingY: number = 0

        let tilePrefab = await ResourceManager.Instance<ResourceManager>().loadAsset<Prefab>("prefabs/battle/tile")

        let tileTestNode = instantiate(tilePrefab)

        for (let x: number = this.map.width - 1; x >= 0; x--) {
            for (let y: number = this.height - 1; y >= 0; y--) {

                let tileNode = instantiate(tileTestNode)

                let tile = tileNode.getComponent(Tile)
                tile.setColor(TileColors.NORMAL)
                tile.mapTile = this.map.tiles[x][y]
                //tile.showDebugPos()

                tileNode.on(Node.EventType.TOUCH_START || Node.EventType.MOUSE_DOWN, (event: EventTouch | EventMouse) => {
                    /*if(tile.mapTile.x >= 2){
                        this.battlefieldCamera.getComponent(OrthoCameraZoom).orthoZoom(tileNode.position, 280)
                    } else {
                        this.battlefieldCamera.getComponent(OrthoCameraZoom).zoomBack(0.1)
                    }
                    */
                    this.clickOnTile(new Vec2(tile.mapTile.x, tile.mapTile.y))
                })

                tileNode.on(Node.EventType.MOUSE_MOVE, (event: EventMouse) => {
                    tile.hoverFrame.active = true
                })
                tileNode.on(Node.EventType.MOUSE_LEAVE, (event: EventMouse) => {
                    tile.hoverFrame.active = false
                })

                this.tiles.push(tile)

                let tileComponent = tileNode.getComponent(UITransform)

                let newPosX = x * (tileComponent.width + spacingX) - ((this.map.width - 1) * (tileComponent.width + spacingX) / 2) + offsetX;
                let newPosY = y * (tileComponent.height + spacingY) - ((this.map.height - 1) * (tileComponent.height + spacingY) / 2) + offsetY;

                if (this.animate) {
                    newPosY - 10
                }

                if (this.animate)
                    tile.getComponent(Sprite).color = new Color(0, 0, 0, 0)

                tileNode.setPosition(new Vec3(newPosX, newPosY))

                this.tileContainerNode.addChild(tileNode)

            }
        }

        // Set Backdrop

        /*if(this.battlefieldNode){
            let uiComponent = this.battlefieldNode.getComponent(UITransform)
            let tileTransform = tileTestNode.getComponent(UITransform)
            uiComponent.width = (tileTransform.width + spacingY ) * this.width;
            uiComponent.height = (tileTransform.height + spacingX ) * this.height;
            //this.tileBackdropNode.getChildByName("Backdrop").active = false;
        }*/

        tileTestNode.destroy()
    }

    async animateColorTiles(target: Tile, _color: number[]){
        let color = new Color(_color[0], _color[1], _color[2], _color[3])
        let longestDelay = 0
        this.coloredTiles.forEach((tile: Tile) => {
            let animationSpeed = 0.1
            let delay = Math.abs(Math.round((tile.mapTile.x) - (target.mapTile.x))) * animationSpeed
            delay += Math.abs(Math.round((tile.mapTile.y) - (target.mapTile.y))) * animationSpeed
            console.log(delay)
            if (longestDelay < delay)
                longestDelay = delay
            
            let curColor = tile.background.getComponent(Sprite).color
            let outColor = new Color()
            tween(tile.background.node.getComponent(Sprite)).delay(delay - animationSpeed).to(0.1, { }, {
                onUpdate: (target, ratio: number) => {
                    tile.background.color = Color.lerp(outColor, curColor, color, ratio)
                }
              }).start()
        })
    }

    async animateTiles() {
        let longestDelay = 0
        this.tiles.forEach((tile: Tile) => {
            let animationSpeed = 0.1
            let delay = Math.abs(Math.round((tile.mapTile.x) - (this.width / 2))) * animationSpeed
            delay += Math.abs(Math.round((tile.mapTile.y) - (this.height / 2))) * animationSpeed
            if (longestDelay < delay)
                longestDelay = delay
            tween(tile.node.getComponent(Sprite)).delay(delay).to(0.2, {
                color: new Color(0, 0, 0, 255)
            }).start()
            tween(tile.node).delay(delay).to(0.2, {
                position: new Vec3(tile.node.position.x, tile.node.position.y + 5, tile.node.position.z)
            }).start()
        })
        return await new Promise(f => setTimeout(f, longestDelay * 1000))
    }

    /*
    updateZIndex(){
        let tilePriority: [{tile: Tile, priority: number}]
        this.tileMap.forEach((tileXRow: Tile[], index: number) => {
            tileXRow.forEach((tile: Tile, index: number) => {
                if(tile.tileObject){
                    if(!tilePriority){
                        tilePriority = [{tile, priority: tile.x + tile.y}]
                    } else {
                        tilePriority.push({tile, priority: tile.x + tile.y})
                    }
                }
            })
        })
        tilePriority.sort((x, b) => {
            if (x.priority < b.priority) {
                return 1;
            }
        
            if (x.priority > b.priority) {
                return -1;
            }
        
            return 0;
        })
        tilePriority.forEach((tile: {tile: Tile, priority: number}, index: number) => {
            tile.tile.tileObject.node.setSiblingIndex(index)
        })
    }*/
}