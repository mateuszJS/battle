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
import { REPRESENTATION_SOLIDER, REPRESENTATION_RAPTOR } from '../logic/constants'
import debugController from '~/debug'
import enhanceAnimatedSprites from '~/enhance-animated-sprites'
import type * as ExportedWasmModule from './logic'
import { ASUtil } from '@assemblyscript/loader'
import initConvertArraysUtils from './initConvertArraysUtils'

export type UniverseRepresentation = {
  [id: number]: Factory | Unit | StrategicPoint
}

export type WasmModule = ASUtil & typeof ExportedWasmModule

const initGame = (wasmModule: WasmModule) => {
  const {
    initUniverse,
    getUniverseRepresentation,
    getFactoriesInitData,
    createSquad,
  } = wasmModule;

  initConvertArraysUtils(wasmModule)

  enhanceAnimatedSprites()

  const mapSprite = createBackgroundTexture()
  getSortableLayer(mapSprite)
  EffectsFactory.initialize()

  UnitFactory.initializationTypes()

  const universeRepresentation: UniverseRepresentation = {}
  window.universeRepresentation = universeRepresentation // used to remove unit

  const serializedInfoAboutWorld = getSerializedInfoAboutWorld()

  initUniverse(
    window.getFloat32ArrayPointer(serializedInfoAboutWorld.factions),
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

  const mouseController = new initializeMouseController(wasmModule, universeRepresentation)

  // debugController.init()
  // let timeToCreateEnemy = 0
  // let nextIsRaptor = false

  window.app.ticker.add((delta: number) => {
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
