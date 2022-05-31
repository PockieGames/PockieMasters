import { Camera, Color, Component, director, EventMouse, EventTouch, instantiate, Label, Layers, Node, Prefab, Scheduler, Sprite, tween, UITransform, Vec2, Vec3, _decorator } from "cc";
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
    @property(Node)
    goContainerNode: Node
    @property(Camera)
    battlefieldCamera: Camera

    animate: boolean = true
    offlineFight: boolean = true
    offlineMapData: MapData

    units: {
        id: number
        team: Team,
        unit: TileObject,
        moved: boolean,
        attacked: boolean
    }[] = []

    // BattleFunctions
    turn: number = 0
    turnTimerStopped = false
    turnTeam: Team = Team.TEAM_RED
    turnTimeTotal: number = 30
    turnTimeLeft: number = 0
    @property(Label)
    turnTimeLabel: Label


    startBattle(){
        this.changeTurn()
    }

    changeTurn(){
        
        this.unscheduleAllCallbacks()
        this.clearTiles()
        this.selectedTile = null

        // Change Team
        if(this.turnTeam == Team.TEAM_BLUE)
            this.turnTeam = Team.TEAM_RED
        else if(this.turnTeam == Team.TEAM_RED)
            this.turnTeam = Team.TEAM_BLUE

        // Reset Values and Add +1 to Turn
        this.turn++
        this.turnTimeLeft = this.turnTimeTotal
        this.turnTimeLabel.string = this.turnTimeLeft.toString()

        console.log("Turn: " + this.turn + " (" + this.turnTeam.toString() + ")")

        // Reset Units moved and attacked state
        this.units.forEach((unit) => {
            unit.attacked = false
            unit.moved = false
            unit.unit.changeAnimation("wait")
        })
        
        // Schedule the Countdown
        this.schedule(() => {
            if(this.turnTimerStopped)
                return
            this.turnTimeLeft -= 1
            this.turnTimeLabel.string = this.turnTimeLeft.toString()
            if(this.turnTimeLeft < 0){
                this.changeTurn()
            }
        }, 1)
        
    }

    async start() {

        this.map = new Map(this.width, this.height)

        this.map.buildTiles()

        await this.drawMap()
        if (this.animate)
            await this.animateTiles()

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

        // Initialize MapData - Enemies and Obstacles(Tree, Walls, idk)
        this.offlineMapData.mapObjects.forEach((mapObject) => {
            this.placeCharacter(mapObject.objectData, { x: mapObject.position.x, y: mapObject.position.y }, Team.TEAM_RED)
        })

        // Initialize our characters
        let myHero = new HeroData()
        myHero.id = 1
        myHero.name = "Maufeat"
        myHero.sprite = "11014"
        myHero.baseMovement = 1
        this.placeCharacter(myHero, {x: 2, y: 2}, Team.TEAM_BLUE)

        this.scheduleOnce(() => {this.startBattle() }, 1)
    }

    placeCharacter(object: HeroData, position: { x: number, y: number }, team: Team) {
        let tilePlacement = this.getTile(position.x, position.y)

        let newNode = new Node("Character")
        newNode.parent = this.goContainerNode
        newNode.position = tilePlacement.node.position
        newNode.layer = Layers.BitMask.UI_3D

        let tileObjectComponent = newNode.addComponent(TileObject)
        tilePlacement.tileObject = tileObjectComponent
        tilePlacement.mapTile.mapObject = new MapAttackableObject(object)
        tileObjectComponent.id = this.units.length + 1
        tileObjectComponent.render()

        this.units.push({id: tileObjectComponent.id, team: team, unit: tileObjectComponent, moved: false, attacked: false})

        this.updateZIndex()
    }

    getTile(x: number, y: number): Tile {
        return this.tiles.find(tile => tile.mapTile.x == x && tile.mapTile.y == y)
    }

    getTilesByDistance(target: Tile, distance: number, clear = false): Tile[] {

        distance = distance + 1
        let queue: Tile[] = []
        let returns: Tile[] = []

        queue.push(target)

        let i = 0
        while (i < distance) {
            queue.forEach((tile: Tile) => {
                tile.mapTile.adjacencyList.forEach((_neighbour: MapTile) => {
                    let tileOnMap = this.getTile(_neighbour.x, _neighbour.y)
                    if ((i + 1) < distance && tileOnMap.tileObject == null && !_neighbour.visited) {
                        _neighbour.visited = true
                        _neighbour.parent = tile.mapTile
                        queue.push(tileOnMap)
                    }
                })
            })
            i++
        }

        if (clear) {
            this.clearTiles()
        }


        queue.forEach((tile: Tile) => {
            if (tile != target) {
                if (!(returns.indexOf(tile) > -1)) {
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

        // Do not just return, show selected character stats maybe
        if(this.turnTeam != Team.TEAM_BLUE)
            return

        let tile = this.getTile(position.x, position.y)
        if (this.selectedTile == null) {
            if (tile.mapTile.mapObject) {

            
                let unit = this.units.find(x => x.id == tile.tileObject.id)
                if(unit == null)
                    return
                if(unit.moved)
                    return

                let ao = tile.mapTile.mapObject as AttackableObject
                let tiles = this.getTilesByDistance(tile, ao.heroData.baseMovement, true)
                this.coloredTiles = tiles
                this.animateColorTiles(tile, TileColors.MOVEMENT)
                this.selectedTile = tile
            }
        } else {
            
            let unit = this.units.find(x => x.id == this.selectedTile.tileObject.id)
            if(unit == null)
                return
            
            if (this.coloredTiles.find(x => x == tile)) {
                if(!unit.moved){
                    this.moveObject(this.selectedTile, tile)
                } else {
                    console.log("Unit: " + unit.id + " already moved")
                }
            } else {
                this.selectedTile = null
                this.clearTiles()
            }
        }
    }

    async moveObject(from: Tile, to: Tile) {

        let _this = this

        let waypoints: Tile[] = []
        let movedObject = from.tileObject
        let _tile = to.mapTile

        waypoints.push(to)

        while (_tile != null) {
            if (_tile.parent != null) {
                if (from.mapTile.x != _tile.x && from.mapTile.y != _tile.y)
                    waypoints.push(this.getTile(_tile.parent.x, _tile.parent.y))
            }
            _tile = _tile.parent
        }

        let counts = waypoints.length

        async function asyncTween(toTween: Node, to: Vec3): Promise<boolean> {
            return new Promise<boolean>((resolve, reject) => {
                tween(toTween).to(0.2, { position: to })
                    .call(
                        () => { resolve(true) }
                    )
                    .start()
            })
        }

        async function moveToWayPoint(): Promise<any> {
            return new Promise(async (resolve) => {
                let tile = waypoints.pop()
                await asyncTween(movedObject.node, tile.node.position)
                tile.mapTile.parent = null
                resolve(true)
                if (waypoints.length > 0) {
                    await moveToWayPoint()
                } else {
                    movedObject.getComponent(TileObject).changeAnimation("shihua")
                    _this.units.find(x => x.id == movedObject.getComponent(TileObject).id).moved = true
                }
            })
        }

        moveToWayPoint()

        to.tileObject = from.tileObject
        to.mapTile.mapObject = from.mapTile.mapObject

        from.tileObject = null
        from.mapTile.mapObject = null

        this.selectedTile = null
        this.clearTiles()
        this.updateZIndex()

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

    async animateColorTiles(target: Tile, _color: number[]) {
        let color = new Color(_color[0], _color[1], _color[2], _color[3])
        let longestDelay = 0
        this.coloredTiles.forEach((tile: Tile) => {
            let animationSpeed = 0.1
            let delay = Math.abs(Math.round((tile.mapTile.x) - (target.mapTile.x))) * animationSpeed
            delay += Math.abs(Math.round((tile.mapTile.y) - (target.mapTile.y))) * animationSpeed

            if (longestDelay < delay)
                longestDelay = delay

            let curColor = tile.background.getComponent(Sprite).color
            let outColor = new Color()
            tween(tile.background.node.getComponent(Sprite)).delay(delay - animationSpeed).to(0.1, {}, {
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

    updateZIndex(){
        let tilePriority: {gameObject: Node, priority: number}[] = []

        this.tiles.forEach((_tile) => {
            if(_tile.tileObject){
                tilePriority.push({gameObject: _tile.tileObject.node, priority: _tile.mapTile.x + _tile.mapTile.y})
            }
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

        tilePriority.forEach((tile: {gameObject: Node, priority: number}, index: number) => {
            tile.gameObject.setSiblingIndex(index)
        })
    }
}