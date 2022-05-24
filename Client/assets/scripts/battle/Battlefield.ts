import { Camera, Color, Component, director, EventMouse, EventTouch, instantiate, Node, Prefab, Sprite, tween, UITransform, Vec3, _decorator } from "cc";
import TileColors from "../Constants";
import ResourceManager from "../manager/ResourceManager";
import Logger from "../utils/Logger";
import Map from "../shared/game/battle/Map"
import Tile from "./Tile";
import UIManager from "../ui/UIManager";
import MapData from "./MapData";
import MessageBox from "../ui/views/MessageBox";

const { ccclass, property } = _decorator;

@ccclass("Battlefield")
export default class Battlefield extends Component{

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

    async start(){

        this.map = new Map(this.width, this.height) 

        this.map.buildTiles()

        await this.drawMap()
        if(this.animate)
            await this.animateTiles()

        //this.registerInputs()

        if(!this.offlineFight){
            // Connect to WS, listen to events, etc.
        } else {
            this.initializeOfflineMapData()
        }

    }

    initializeOfflineMapData(){
        /*if(!this.offlineMapData)
        {
            UIManager.Instance<UIManager>().OpenPopup(MessageBox, {
                title: "BattleMap Error",
                message: "No Offline Map Data Initialized",
                onClose: () => {
                    director.loadScene("home")
                }
            })
            return
        }*/
        // Initialize
    }

    registerInputs(){
        
        UIManager.Instance<UIManager>().getCanvas().node.on(Node.EventType.TOUCH_START || Node.EventType.MOUSE_DOWN, (event: EventTouch | EventMouse) => {
            this.tiles.forEach((tile: Tile) => {
                tile.hoverFrame.active = false
                if(tile.isOnTile(event.getUILocation())){
                    tile.hoverFrame.active = true
                }
            })
        })
        
        UIManager.Instance<UIManager>().getCanvas().node.on(Node.EventType.MOUSE_MOVE, (event: EventMouse) => {
            this.tiles.forEach((tile: Tile) => {
                tile.hoverFrame.active = false
                if(tile.isOnTile(event.getUILocation())){
                    tile.hoverFrame.active = true
                }
            })
        })

        UIManager.Instance<UIManager>().getCanvas().node.on(Node.EventType.TOUCH_END || Node.EventType.MOUSE_UP, (event: EventTouch | EventMouse) => {
            this.tiles.forEach((tile: Tile) => {
                tile.hoverFrame.active = false
                if(tile.isOnTile(event.getUILocation())){
                    tile.hoverFrame.active = true
                    if(this.selectedTile == null){
                            //if(tile.tileObject)
                              //  this.selectedTile = tile
                        }
                        if(this.selectedTile){
                            if(this.coloredTiles.indexOf(tile) > -1){
                                if(this.selectedTile != null){
                                    if(this.selectedTile != tile){
                                        //let tileObject = this.selectedTile.tileObject
                                        //this.selectedTile.tileObject = null
                                        //tileObject.moveTo(tile, ()=>{
                                        //    this.updateZIndex()
                                        //})
                                        this.clearTiles()
                                    }
                                }
                            }

                            /*if(tile.tileObject){
                                this.selectedTile = tile
                                tile.setColor(TileColors.MOVEMENT)
    
                                let distance = 3
                                let tiles: Tile[] = this.getTilesByDistance(this.selectedTile, distance, true);
    
                                this.coloredTiles = tiles
    
                                tiles.forEach((tile: Tile) => {
                                    tile.setColor(TileColors.MOVEMENT);
                                })
                            }*/
                        }
                    }
            })
        })

    }

    clearTiles(){
        this.coloredTiles = [];
        this.tiles.forEach((tile: Tile) => {
            tile.setColor(TileColors.NORMAL)
            tile.visited = false
        })
    }

    async drawMap(){
        let offsetX = 0;
        let offsetY = -5

        let spacingX: number = 0
        let spacingY: number = 0

        let tilePrefab = await ResourceManager.Instance<ResourceManager>().loadAsset<Prefab>("prefabs/battle/tile")

        let tileTestNode = instantiate(tilePrefab)

        for(let x: number = this.map.width - 1; x >= 0; x--){
            for(let y: number = this.height - 1; y >= 0; y--){

                let tileNode = instantiate(tileTestNode)

                let tile = tileNode.getComponent(Tile)
                tile.setColor(TileColors.NORMAL)
                tile.mapTile = this.map.tiles[x][y]
                //tile.showDebugPos()

                tileNode.on(Node.EventType.TOUCH_START || Node.EventType.MOUSE_DOWN, (event: EventTouch | EventMouse) => {
                    console.log("CLICKED ON: " + tile.mapTile.x + " / " + tile.mapTile.y)
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

                if(this.animate){
                    newPosY - 10
                }

                if(this.animate)
                    tile.getComponent(Sprite).color = new Color(0,0,0,0)

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

    
    async animateTiles(){
        let longestDelay = 0
        this.tiles.forEach((tile: Tile) => {
                let animationSpeed = 0.1
                let delay = Math.abs(Math.round((tile.mapTile.x) - (this.width / 2))) * animationSpeed
                delay += Math.abs(Math.round((tile.mapTile.y) - (this.height / 2))) * animationSpeed
                if(longestDelay < delay)
                    longestDelay = delay
                tween(tile.node.getComponent(Sprite)).delay(delay).to(0.2, {
                    color: new Color(0,0,0,255)
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