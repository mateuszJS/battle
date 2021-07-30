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
import drawBridge from './draw-bridge'

export type UniverseRepresentation = {
  [id: number]: Factory | Unit | StrategicPoint
}

export type WasmModule = ASUtil & typeof ExportedWasmModule

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

  let mouseX = 0
  let mouseY = 0
  document.addEventListener('mousemove', event => {
    mouseX = event.clientX
    mouseY = event.clientY
  })

  // debugController.init()
  // let timeToCreateEnemy = 0
  // let nextIsRaptor = false



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

    drawBridge([
      // { x: 1200, y: 1000 },
      // { x: 200, y: 500 },
      // { x: 380, y: 400 },
      // { x: 1450, y: 800 },
  
      { x: mouseX + Math.sin(angle) * 100 * 2, y: mouseY - Math.cos(angle) * 35 * 2 },
      { x: pointB.x + Math.sin(angle) * 100 * 2, y: pointB.y - Math.cos(angle) * 35 * 2 },
      { x: pointB.x + Math.sin(angle) * -100 * 2, y: pointB.y - Math.cos(angle) * -35 * 2  },
      { x: mouseX + Math.sin(angle) * -100 * 2, y: mouseY - Math.cos(angle) * -35 * 2 },

      // { x: mouseX + Math.sin(angle) * 100, y: mouseY - Math.cos(angle) * 35 },
      // { x: pointB.x + Math.sin(angle) * 100, y: pointB.y - Math.cos(angle) * 35 },
      // { x: pointB.x + Math.sin(angle) * -100, y: pointB.y - Math.cos(angle) * -35  },
      // { x: mouseX + Math.sin(angle) * -100, y: mouseY - Math.cos(angle) * -35 },
  
      // { x: 0, y: 500 },
      // { x: 1000, y: 0 },
      // { x: 1250, y: 100 },
      // { x: 180, y: 600 },
    
      // { x: 200, y: 1000 },
      // { x: 1200, y: 500 },
      // { x: 1450, y: 600 },
      // { x: 380, y: 1100 },
    ])

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
