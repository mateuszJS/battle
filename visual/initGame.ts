import UnitFactory from '~/representation/UnitFactory'
import Unit from '~/representation/Unit'
import EffectsFactory from '~/representation/EffectFactory'
import setAllLayers from './set-all-layers'
import render from './render'
import { Universe } from '../crate/pkg/index'
import Factory from '~/representation/Factory'
import StrategicPoint from '~/representation/StrategicPoint'
import initializeMouseController from './mouseController'
import { createFactoryButtons } from './buttons/factory'
import { USER_FACTION_ID } from '../logic/constants'
import debugController from '~/debug'
import type * as ExportedWasmModule from './logic'
import { ASUtil } from '@assemblyscript/loader'
import drawEnvironment from './draw-environment'
// import { startDebug as debugObstacles } from './debug/obstacles'
import { startDebug as debugInnerTrack } from './debug/innerTrack'
import { startDebug as debugOuterTrack } from './debug/outerTrack'
import { startDebug as startDebugObstacles } from './debug/obstacles'
import { startDebug as gridDebug } from './debug/grid'
// import { startDebug as startDebugObstaclesMap } from './debug/obstaclesMap'
import initConvertArraysUtils from '~/attachUtils/init-convert-arrays-utils'
import enhanceAnimatedSprites from '~/attachUtils/enhance-animated-sprites'
import attachMethodToConvertLogicCoordsToVisual from '~/attachUtils/attach-method-covert-logic-coords-to-visual'
import { SerializedMapInfo } from './map-creator/get-serialized-map-info'
import getSerializedWorldInfo from './serializedWorldInfo'
import predefinedMap from './predefined-maps/portals-spam'

export type UniverseRepresentation = Map<number, Factory | Unit | StrategicPoint>

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

const initGame = (
  wasmModule: WasmModule,
  serializedMapInfo: SerializedMapInfo,
  mapWidth: number,
  mapHeight: number,
) => {
  // serializedMapInfo = predefinedMap
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
  const environmentContainer = drawEnvironment(serializedMapInfo)
  setAllLayers(mapPoints, environmentContainer)
  EffectsFactory.initialize()

  UnitFactory.initializationTypes()

  const universeRepresentation: UniverseRepresentation = new Map()
  window.universeRepresentation = universeRepresentation // used to remove unit's PIXI.Container

  const {
    serializedWorldInfo,
    unpinSerializedWorldInfo,
  } = getSerializedWorldInfo(serializedMapInfo, wasmModule)

  initUniverse(
    serializedWorldInfo.factions,
    serializedWorldInfo.obstacles,
    serializedWorldInfo.blockingTrackPoints,
    serializedWorldInfo.rawTrackPoints,
    serializedWorldInfo.bridgeSecondToLastPointIndex,
    mapWidth,
    mapHeight,
    // serializedInfoAboutWorld.obstacles,
    // serializedInfoAboutWorld.strategicPoints,
  )
  unpinSerializedWorldInfo()

  window.useFloat32ArrayData(getFactoriesInitData(), (factoriesData) => {
    for (let i = 0; i < factoriesData.length; i += 5) {
      const factoryId = factoriesData[i + 1]
      const factionId = factoriesData[i]
      const factoryRepresentation = new Factory(
        factoriesData[i + 2], // x
        factoriesData[i + 3], // y
        factoriesData[i + 4], // angle
      )
      universeRepresentation.set(factoryId, factoryRepresentation)
  
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

  // startDebugObstaclesMap(wasmModule)
  // debugObstacles(wasmModule)
  // debugInnerTrack(wasmModule)
  debugOuterTrack(wasmModule)
  startDebugObstacles(wasmModule)
  
  window.app.ticker.add((delta: number) => {
    gridDebug(wasmModule)

    // startDebugGrid(wasmModule)
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
