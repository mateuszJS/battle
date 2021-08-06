import UnitFactory from '~/representation/UnitFactory'
import Unit from '~/representation/Unit'
import EffectsFactory from '~/representation/EffectFactory'
import getSortableLayer from '~/modules/getSortableLayer'
import createBackgroundTexture from './createBackgroundTexture'
import render from './render'
import { USER_FACTION_ID } from 'Consts'
import { Universe } from '../crate/pkg/index'
import Factory from '~/representation/Factory'
import StrategicPoint from '~/representation/StrategicPoint'
import initializeMouseController from './mouseController'
import getSerializedInfoAboutWorld from './getSerializedInfoAboutWorld'
import { createFactoryButtons } from './buttons/factory'
import { REPRESENTATION_SOLIDER, REPRESENTATION_RAPTOR, MAP_WIDTH, MAP_HEIGHT} from '../logic/constants'
import debugController from '~/debug'
import enhanceAnimatedSprites from '~/enhance-animated-sprites'
import type * as ExportedWasmModule from './logic'
import { ASUtil } from '@assemblyscript/loader'
import initConvertArraysUtils from './initConvertArraysUtils'
import drawBridge from './draw-bridge'
import drawNode from './draw-node'
import { startDebug } from './debug/obstacles'

export type UniverseRepresentation = {
  [id: number]: Factory | Unit | StrategicPoint
}

export type WasmModule = ASUtil & typeof ExportedWasmModule

window.convertLogicCoordToVisual = (x: number, y: number): [number, number] => {
  const angle = Math.atan2(x, MAP_HEIGHT - y) - 0.65
  const distance = Math.hypot(x, MAP_HEIGHT - y)
  return [
    Math.sin(angle) * distance,
    (-Math.cos(angle) * distance + MAP_HEIGHT) * 0.52,
  ]
}

const bridgeAngle = 53.6 * Math.PI / 180
const diagonallyAngle = 37 * Math.PI / 180
let tempAngle = - bridgeAngle / 2
const radius = 600 * 0.483
const geom = Array.from({ length: 8 }, (_, index) => {
  tempAngle += index % 2 === 0 ? bridgeAngle : diagonallyAngle
  return {
    x: Math.sin(tempAngle) * radius,
    y: -Math.cos(tempAngle) * radius,
    angle: tempAngle,
  }
})

const getMapPoints = () => {
  const leftTopCorner = window.convertLogicCoordToVisual(0, 0)
  const rightTopCorner = window.convertLogicCoordToVisual(MAP_WIDTH, 0)
  const rightBottomCorner = window.convertLogicCoordToVisual(MAP_WIDTH, MAP_HEIGHT)
  const leftBottomCorner = window.convertLogicCoordToVisual(0, MAP_HEIGHT)

  return [
    { x: leftTopCorner[0], y: leftTopCorner[1] },
    { x: rightTopCorner[0], y: rightTopCorner[1] },
    { x: rightBottomCorner[0], y: rightBottomCorner[1] },
    { x: leftBottomCorner[0], y: leftBottomCorner[1] },
  ]
}

const initGame = (
  wasmModule: WasmModule,
  nodes: PIXI.Graphics[],
  connections: Array<[PIXI.Graphics, PIXI.Graphics]>,
) => {
  const {
    initUniverse,
    getUniverseRepresentation,
    getFactoriesInitData,
    createSquad,
  } = wasmModule;

  initConvertArraysUtils(wasmModule)

  enhanceAnimatedSprites()

  const mapPoints = getMapPoints()

  const mapSprite = createBackgroundTexture(mapPoints)
  getSortableLayer(mapSprite)
  EffectsFactory.initialize()

  UnitFactory.initializationTypes()

  const universeRepresentation: UniverseRepresentation = {}
  window.universeRepresentation = universeRepresentation // used to remove unit

  const serializedInfoAboutWorld = getSerializedInfoAboutWorld()

  const serializedObstacles = new Float32Array(
    nodes.map(graphic => {
      const points = geom.map(point => [
        point.x + graphic.x,
        point.y + graphic.y,
      ]).flat()
      return [...points, -1]
    }).flat().slice(0, -1) // remove last -1
  )
  console.log('serializedObstacles', serializedObstacles);
  initUniverse(
    window.getFloat32ArrayPointer(serializedInfoAboutWorld.factions),
    window.getFloat32ArrayPointer(serializedObstacles),
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

  window.app.ticker.add((delta: number) => {
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
