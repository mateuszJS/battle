import UnitFactory from '~/representation/UnitFactory'
import Unit from '~/representation/Unit'
import EffectsFactory from '~/representation/EffectFactory'
import setAllLayers, { addItemToBackground, updateBackground } from './set-all-layers'
import render from './render'
// import { Universe } from 'crate/'
import Factory from '~/representation/Factory'
import StrategicPoint from '~/representation/StrategicPoint'
import initializeMouseController from './mouseController'
import { createFactoryButtons } from './buttons/factory'
import debugController from '~/debug'
import drawEnvironment from './draw-environment'
// import { startDebug as debugObstacles } from './debug/obstacles'
import { startDebug as debugInnerTrack } from './debug/innerTrack'
import { startDebug as debugOuterTrack } from './debug/outerTrack'
import { startDebug as startDebugObstacles } from './debug/obstacles'
import { startDebug as gridDebug } from './debug/grid'
// import { startDebug as startDebugObstaclesMap } from './debug/obstaclesMap'
import enhanceAnimatedSprites from '~/attachUtils/enhance-animated-sprites'
import attachMethodToConvertLogicCoordsToVisual from '~/attachUtils/attach-method-covert-logic-coords-to-visual'
import { SerializedMapInfo } from './map-creator/get-serialized-map-info'
import getSerializedWorldInfo from './serializedWorldInfo'
import { PREDEFINED_FACTION_VISUAL_DETAILS, PREDEFINED_MAP } from './predefined-maps/test-bridges'
import printPredefinedMap from './print-predefined-map'
import { FactionVisualDetails } from './map-creator/menu'
import { USER_FACTION_ID } from './logic-contants'
import { Universe } from '../crate/pkg'

export type UniverseRepresentation = Map<number, Factory | Unit | StrategicPoint>
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

const initGame = (
  wasmModule: Universe,
  serializedMapInfo: SerializedMapInfo,
  mapWidth: number,
  mapHeight: number,
  factionVisualDetails: FactionVisualDetails[]
) => {
  serializedMapInfo = PREDEFINED_MAP
  factionVisualDetails = PREDEFINED_FACTION_VISUAL_DETAILS

  enhanceAnimatedSprites()
  attachMethodToConvertLogicCoordsToVisual(mapHeight)
  const mapPoints = getMapPoints(mapWidth, mapHeight)
  const envContainer = drawEnvironment(serializedMapInfo)
  setAllLayers(mapPoints)
  addItemToBackground(envContainer.background)
  window.world.addChild(...envContainer.sortableItems)
  EffectsFactory.initialize()

  UnitFactory.initializationTypes()

  const universeRepresentation: UniverseRepresentation = new Map()
  window.universeRepresentation = universeRepresentation // used to remove unit's PIXI.Container

  const {
    serializedWorldInfo,
    unpinSerializedWorldInfo,
  } = getSerializedWorldInfo(serializedMapInfo, wasmModule)

  // this function to create unvierse is not compatible
  const universe = Universe.new(
    serializedWorldInfo.factions,
    serializedWorldInfo.obstacles,
    new Float32Array([])
  )
  unpinSerializedWorldInfo()

  const factionsVisualDetails: FactionsList = new Map()

  const factoriesData = universe.get_factories_init_data()
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
      createFactoryButtons(factoriesData[i + 2], factoriesData[i + 3], type => {
        return universe.create_squad(type)
      },
      )
    }

    factionsVisualDetails.set(factionId, factionVisualDetails.splice(0, 1)[0]) 
  }

  const mouseController = new initializeMouseController(universe, universeRepresentation, mapPoints)

  window.app.ticker.add((delta: number) => {
    mouseController.updateScenePosition()
    universe.update();
    const universeData = universe.get_universe_data();

    render(
      0,
      universeData,
      universeRepresentation,
      factionsVisualDetails,
    )

    updateBackground()

    window.updateClouds()
  })
}

export default initGame
