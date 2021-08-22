import UnitFactory from '~/representation/UnitFactory'
import Unit from '~/representation/Unit'
import EffectsFactory from '~/representation/EffectFactory'
import getSortableLayer from '~/modules/getSortableLayer'
import createBackgroundTexture from './createBackgroundTexture'
import render from './render'
import { Universe } from '../crate/pkg/index'
import Factory from '~/representation/Factory'
import StrategicPoint from '~/representation/StrategicPoint'
import initializeMouseController from './mouseController'
import { createFactoryButtons } from './buttons/factory'
import { REPRESENTATION_SOLIDER, REPRESENTATION_RAPTOR, USER_FACTION_ID } from '../logic/constants'
import debugController from '~/debug'
import type * as ExportedWasmModule from './logic'
import { ASUtil } from '@assemblyscript/loader'
import drawBridge from './draw-bridge'
import drawNode from './draw-node'
import { startDebug } from './debug/obstacles'
import { startDebug as startDebugGrid } from './debug/grid'
import { startDebug as startDebugObstaclesMap } from './debug/obstaclesMap'
import initConvertArraysUtils from '~/attachUtils/init-convert-arrays-utils'
import enhanceAnimatedSprites from '~/attachUtils/enhance-animated-sprites'
import attachMethodToConvertLogicCoordsToVisual from '~/attachUtils/attach-method-covert-logic-coords-to-visual'
import nodePlatformCoords from '~/consts/node-platform-coords'
import { ConnectionNode, NodeDetails } from './map-creator'

export type UniverseRepresentation = {
  [id: number]: Factory | Unit | StrategicPoint
}

export type WasmModule = ASUtil & typeof ExportedWasmModule

const getMapPoints = (mapWidth: number, mapHeight: number) => {
  const leftTopCorner = window.convertLogicCoordToVisual(0, 0)
  const rightTopCorner = window.convertLogicCoordToVisual(mapWidth, 0)
  const rightBottomCorner = window.convertLogicCoordToVisual(mapWidth, mapHeight)
  const leftBottomCorner = window.convertLogicCoordToVisual(0, mapHeight)

  return [
    { x: leftTopCorner[0], y: leftTopCorner[1] },
    { x: rightTopCorner[0], y: rightTopCorner[1] },
    { x: rightBottomCorner[0], y: rightBottomCorner[1] },
    { x: leftBottomCorner[0], y: leftBottomCorner[1] },
  ]
}

const collectNextPoints = (
  nodes: NodeDetails[],
  connections: [ConnectionNode, ConnectionNode][],
  lastVisitedPoint: ConnectionNode,
): Point[] => {
  // debugger;
  const allNodeConnections = connections
    .filter(connection => (
      [connection[0].node, connection[1].node].includes(lastVisitedPoint.node)
    ))

  const collectedPoints: Point[] = []
  let startJoinIndex = lastVisitedPoint.joinIndex // (lastVisitedPoint.joinIndex + 1) % 4

  for (let i = 0; i < 4; i++) {

    collectedPoints.push({
      x: lastVisitedPoint.node.x + nodePlatformCoords[startJoinIndex * 2].x,
      y: lastVisitedPoint.node.y + nodePlatformCoords[startJoinIndex * 2].y,
    })
    lastVisitedPoint.node.visited[startJoinIndex * 2] = true

    let connection: ConnectionNode | null = null
    for (let j = 0; j < allNodeConnections.length; j++) {
      const conn = allNodeConnections[j]
      const isFirstNode = lastVisitedPoint.node === conn[0].node && startJoinIndex === conn[0].joinIndex
      const isSecondNode = lastVisitedPoint.node === conn[1].node && startJoinIndex === conn[1].joinIndex
      if (isFirstNode) { connection = conn[1] }
      if (isSecondNode) { connection = conn[0] }
      if (connection) { break }
    }

    if (connection) {
      collectedPoints.push({
        x: connection.node.x + nodePlatformCoords[connection.joinIndex * 2 + 1].x,
        y: connection.node.y + nodePlatformCoords[connection.joinIndex * 2 + 1].y,
      })
      connection.node.visited[connection.joinIndex * 2 + 1] = true

      const nextJoinIndex = (connection.joinIndex + 1) % 4
      if (connection.node.visited[nextJoinIndex * 2]) {
        return collectedPoints
      }

      return [
        ...collectedPoints,
        ...collectNextPoints(
          nodes,
          connections,
          // startingPoint,
          {
            node: connection.node,
            joinIndex: nextJoinIndex,
          },
        ),
      ]
    }
    collectedPoints.push({
      x: lastVisitedPoint.node.x + nodePlatformCoords[startJoinIndex * 2 + 1].x,
      y: lastVisitedPoint.node.y + nodePlatformCoords[startJoinIndex * 2 + 1].y,
    })
    lastVisitedPoint.node.visited[startJoinIndex * 2 + 1] = true
    startJoinIndex = (startJoinIndex + 1) % 4

    if (lastVisitedPoint.node.visited[startJoinIndex * 2]) {
      return collectedPoints
    }
  }

  return collectedPoints
}

const getSerializedObstacles = (
  nodes: NodeDetails[],
  connections: [ConnectionNode, ConnectionNode][],
) => {
  let nodeWithMinY = nodes[0]
  nodes.forEach(node => {
    if (node.y < nodeWithMinY.y) {
      nodeWithMinY = node
    }
  })


  let startingNode: ConnectionNode = { node: nodeWithMinY, joinIndex: 0 }
  let results: Array<Point | null> = []

  do {
    results = [
      ...results,
      ...collectNextPoints(nodes, connections, startingNode),
      null,
    ]
    startingNode = null
    for (let j = 0; j < nodes.length; j++) {
      const node = nodes[j]
      for (let i = 0; i < node.visited.length; i+= 2) {
        if (!node.visited[i]) {
          startingNode = { node, joinIndex: i / 2 }
          break;
        }
      }
    }
  } while(!!startingNode)


  return new Float32Array(
    results.map(point => {
      if (point === null) {
        return [-1]
      }
      return [point.x, point.y]
    }).flat()
  )
}

const initGame = (
  wasmModule: WasmModule,
  nodes: NodeDetails[],
  connections: [ConnectionNode, ConnectionNode][],
  portals: PIXI.Graphics[],
  mapWidth: number,
  mapHeight: number,
) => {
  const {
    initUniverse,
    getUniverseRepresentation,
    getFactoriesInitData,
    createSquad,
    debugGrid,
  } = wasmModule;

  initConvertArraysUtils(wasmModule)
  enhanceAnimatedSprites()
  attachMethodToConvertLogicCoordsToVisual(mapHeight)
  const mapPoints = getMapPoints(mapWidth, mapHeight)
  const mapSprite = createBackgroundTexture(mapPoints)
  getSortableLayer(mapSprite)
  EffectsFactory.initialize()

  UnitFactory.initializationTypes()

  const universeRepresentation: UniverseRepresentation = {}
  window.universeRepresentation = universeRepresentation // used to remove unit

  const serializedFactions = new Float32Array(
    portals.map((graphic, index) => 
      [USER_FACTION_ID + index, graphic.x, graphic.y, 0]
    ).flat()
  )

  const serializedObstacles = getSerializedObstacles(nodes, connections)

  initUniverse(
    window.getFloat32ArrayPointer(serializedFactions),
    window.getFloat32ArrayPointer(serializedObstacles),
    mapWidth,
    mapHeight,
    // serializedInfoAboutWorld.obstacles,
    // serializedInfoAboutWorld.strategicPoints,
  )

  window.useFloat32ArrayData(getFactoriesInitData(), (factoriesData) => {
    for (let i = 0; i < factoriesData.length; i += 5) {
      const factoryId = factoriesData[i + 1]
      const factionId = factoriesData[i]
      const factoryRepresentation = new Factory(
        factoriesData[i + 2], // x
        factoriesData[i + 3], // y
        factoriesData[i + 4], // angle
      )
      universeRepresentation[factoryId] = factoryRepresentation
  
      if (factionId === USER_FACTION_ID) {
        createFactoryButtons(factoriesData[i + 2], factoriesData[i + 3], type => createSquad(type),
        )
      }
    }
  })

  // const strategicPointsInitData = universe.get_strategic_points_init_data()
  // for (let i = 0; i < strategicPointsInitData.length; i += 3) {
  //   const strategicPointId = strategicPointsInitData[i]
  //   const factoryRepresentation = new StrategicPoint(
  //     strategicPointsInitData[i + 1],
  //     strategicPointsInitData[i + 2],
  //   )
  //   universeRepresentation[strategicPointId] = factoryRepresentation
  // }

  const mouseController = new initializeMouseController(wasmModule, universeRepresentation, mapPoints)

  let mouseX = 0
  let mouseY = 0
  document.addEventListener('mousemove', event => {
    mouseX = event.clientX
    mouseY = event.clientY
  })

  // debugController.init()
  // let timeToCreateEnemy = 0
  // let nextIsRaptor = false

  startDebug(wasmModule)
  startDebugObstaclesMap(wasmModule)
  

  window.app.ticker.add((delta: number) => {
    startDebugGrid(wasmModule)
    const pointA = {
      x: mouseX,
      y: mouseY,
    }
    const pointB = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    }
    const angle = Math.atan2(pointA.x - pointB.x, pointB.y - pointA.y) + Math.PI / 2

    // drawBridge([
    //   { x: mouseX + Math.sin(angle) * 100 * 2, y: mouseY - Math.cos(angle) * 35 * 2 },
    //   { x: pointB.x + Math.sin(angle) * 100 * 2, y: pointB.y - Math.cos(angle) * 35 * 2 },
    //   { x: pointB.x + Math.sin(angle) * -100 * 2, y: pointB.y - Math.cos(angle) * -35 * 2  },
    //   { x: mouseX + Math.sin(angle) * -100 * 2, y: mouseY - Math.cos(angle) * -35 * 2 },
    // ])

    const node = drawNode(600, 600, [false, true, false, false], 600)
    window.world.addChild(node.graphic)

    // gridDebug(universe)
    // debugController.update(universe)

    // if (window.debugAiMode) return

    // if (timeToCreateEnemy == 0) {
    //   universe.create_enemy_squad(
    //     nextIsRaptor ? REPRESENTATION_RAPTOR : REPRESENTATION_SOLIDER,
    //   )
    //   nextIsRaptor = !nextIsRaptor

    //   timeToCreateEnemy = 1500
    // } else {
    //   timeToCreateEnemy--
    // }
    mouseController.updateScenePosition()
    window.useFloat32ArrayData(getUniverseRepresentation(), (universeData) => {
      render(
        0,
        universeData,
        universeRepresentation,
      )
    })
  })
}

export default initGame
