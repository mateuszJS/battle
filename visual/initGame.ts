import UnitFactory from '~/representation/UnitFactory'
import Unit from '~/representation/Unit'
import EffectsFactory from '~/representation/EffectFactory'
import setAllLayers, { addItemToBackground, updateBackground } from './set-all-layers'
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
import { initBackground } from './draw-environment-new'
// import { startDebug as debugObstacles } from './debug/obstacles'
import { startDebug as debugInnerTrack } from './debug/innerTrack'
import { startDebug as debugOuterTrack } from './debug/outerTrack'
import { startDebug as startDebugObstacles } from './debug/obstacles'
import { startDebug as gridDebug } from './debug/grid'
// import { startDebug as startDebugObstaclesMap } from './debug/obstaclesMap'
import initConvertArraysUtils from '~/attachUtils/init-convert-arrays-utils'
import attachMethodToConvertLogicCoordsToVisual from '~/attachUtils/attach-method-covert-logic-coords-to-visual'
import { SerializedMapInfo } from './map-creator/get-serialized-map-info'
import getSerializedWorldInfo from './serializedWorldInfo'
import predefinedMap from './predefined-maps/test-bridges'
import printPredefinedMap from './print-predefined-map'
import { FactionVisualDetails } from './map-creator/menu'
import initWebGL2 from '~/webgl/init'
import loadTextures from '~/webgl/loadTextures'
import compilePrograms from '~/webgl/compilePrograms'
import resizeCanvas from '~/webgl/resizeCanvas'

export type UniverseRepresentation = Map<number, Factory | Unit | StrategicPoint>
export type WasmModule = ASUtil & typeof ExportedWasmModule
export type FactionsList = Map<number, FactionVisualDetails>

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


function startLoadingTextures(input: InitGameInput) {
  window.app.view.parentNode.removeChild(window.app.view)

  const canvas = document.createElement<"canvas">("canvas")
  canvas.id = 'main-game-view'
  document.body.appendChild(canvas)

  resizeCanvas(canvas)
  initWebGL2(canvas)
  const gl = window.gl

  loadTextures(
    gl,
    ['assets/node-platform-shaded.png'],
    () => initGame(gl, input)
  )
  
  compilePrograms(gl)
}

interface InitGameInput {
  wasmModule: WasmModule,
  serializedMapInfo: SerializedMapInfo,
  mapWidth: number,
  mapHeight: number,
  factionVisualDetails: FactionVisualDetails[]
}

function initGame (gl: WebGL2RenderingContext, input: InitGameInput) {
  const {
    wasmModule,
    serializedMapInfo,
    mapWidth,
    mapHeight,
    factionVisualDetails
  } = input

  // serializedMapInfo = predefinedMap
  console.log(printPredefinedMap(serializedMapInfo))
  const {
    initUniverse,
    getUniverseRepresentation,
    getFactoriesInitData,
    createSquad,
    debugGrid,
  } = wasmModule;

  initConvertArraysUtils(wasmModule)
  attachMethodToConvertLogicCoordsToVisual(mapHeight)

  const mapPoints = getMapPoints(mapWidth, mapHeight)
  const envContainer = initBackground(serializedMapInfo)

  return

  // setAllLayers(mapPoints)
  // addItemToBackground(envContainer.background)
  // window.world.addChild(...envContainer.sortableItems)
  // EffectsFactory.initialize()

  // UnitFactory.initializationTypes()

  // const universeRepresentation: UniverseRepresentation = new Map()
  // window.universeRepresentation = universeRepresentation // used to remove unit's PIXI.Container

  // const {
  //   serializedWorldInfo,
  //   unpinSerializedWorldInfo,
  // } = getSerializedWorldInfo(serializedMapInfo, wasmModule)

  // initUniverse(
  //   serializedWorldInfo.factions,
  //   serializedWorldInfo.obstacles,
  //   serializedWorldInfo.blockingTrackPoints,
  //   serializedWorldInfo.rawTrackPoints,
  //   serializedWorldInfo.bridgeSecondToLastPointIndex,
  //   mapWidth,
  //   mapHeight,
  //   // serializedInfoAboutWorld.obstacles,
  //   // serializedInfoAboutWorld.strategicPoints,
  // )
  // unpinSerializedWorldInfo()

  // const factionsVisualDetails: FactionsList = new Map()

  // window.useFloat32ArrayData(getFactoriesInitData(), (factoriesData) => {
  //   for (let i = 0; i < factoriesData.length; i += 5) {
  //     const factoryId = factoriesData[i + 1]
  //     const factionId = factoriesData[i]
  //     const factoryRepresentation = new Factory(
  //       factoriesData[i + 2], // x
  //       factoriesData[i + 3], // y
  //       factoriesData[i + 4], // angle
  //     )
  //     universeRepresentation.set(factoryId, factoryRepresentation)
  
  //     if (factionId === USER_FACTION_ID) {
  //       createFactoryButtons(factoriesData[i + 2], factoriesData[i + 3], type => createSquad(type),
  //       )
  //     }

  //     factionsVisualDetails.set(factionId, factionVisualDetails.splice(0, 1)[0]) 
  //   }
  // })

  // // const strategicPointsInitData = universe.get_strategic_points_init_data()
  // // for (let i = 0; i < strategicPointsInitData.length; i += 3) {
  // //   const strategicPointId = strategicPointsInitData[i]
  // //   const factoryRepresentation = new StrategicPoint(
  // //     strategicPointsInitData[i + 1],
  // //     strategicPointsInitData[i + 2],
  // //   )
  // //   universeRepresentation[strategicPointId] = factoryRepresentation
  // // }

  // const mouseController = new initializeMouseController(wasmModule, universeRepresentation, mapPoints)

  // // debugController.init()
  // // let timeToCreateEnemy = 0
  // // let nextIsRaptor = false

  // // startDebugObstaclesMap(wasmModule)
  // // debugObstacles(wasmModule)


  // // debugInnerTrack(wasmModule)
  // // debugOuterTrack(wasmModule)
  // // startDebugObstacles(wasmModule)

  // window.app.ticker.add((delta: number) => {
  //   // gridDebug(wasmModule)

  //   // startDebugGrid(wasmModule)

  //   // gridDebug(universe)
  //   // debugController.update(universe)

  //   // if (window.debugAiMode) return

  //   // if (timeToCreateEnemy == 0) {
  //   //   universe.create_enemy_squad(
  //   //     nextIsRaptor ? REPRESENTATION_RAPTOR : REPRESENTATION_SOLIDER,
  //   //   )
  //   //   nextIsRaptor = !nextIsRaptor

  //   //   timeToCreateEnemy = 1500
  //   // } else {
  //   //   timeToCreateEnemy--
  //   // }
  //   mouseController.updateScenePosition()
  //   window.useFloat32ArrayData(getUniverseRepresentation(), (universeData) => {
  //     render(
  //       0,
  //       universeData,
  //       universeRepresentation,
  //       factionsVisualDetails,
  //     )
  //   })

  //   updateBackground()

  //   window.updateClouds()
  // })
}

export default startLoadingTextures

