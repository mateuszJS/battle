// import mouseControllerInitialize from '~/modules/mouseController'
import UnitFactory from '~/representation/UnitFactory'
import Unit from '~/representation/Unit'
import EffectsFactory from '~/representation/EffectFactory'

// import influenceController from '~/ai/influenceMap'
// import aiController from '~/ai/ai'
// import Icons from '~/modules/icons'
import getSortableLayer from '~/modules/getSortableLayer'

// import createFactories from './createFactories'
// import addProductionIcons from './addProductionIcons'
// import createSmokeContainer from './createSmokeContainer'
import addBackground from './addBackground'
import render from './render'

import { memory } from '../crate/pkg/index_bg'
import { Universe } from '../crate/pkg/index'

import Factory from '~/representation/Factory'
import initializeMouseController from './mouseController'
import { drawPolygons, drawGraph } from './draw'

export type UniverseRepresentation = {
  [id: number]: Factory | Unit
}

const mapIconToRepresentationType = (icon: 'solider') => {
  switch (icon) {
    case 'solider':
      return 2
  }
}

// eslint-disable-next-line prettier/prettier
const playersList = [
  1.0,
  2.0,
  3.0,
  4.0,
  5.0,
  6.0,
]

const setup = () => {
  EffectsFactory.initialize()
  // const factionsCount = playersList.length
  // const createEmptyArr = () => Array.from({ length: factionsCount }, () => [])

  const mapSprite = addBackground()
  const sortingLayer = getSortableLayer(mapSprite)
  UnitFactory.initializationTypes(sortingLayer)

  // influenceController.init(window.mapWidth, window.mapHeight)
  // Icons.init()

  // window.bulletContainer = []
  // window.allSquads = []

  // const { factories, resourcesPoints } = createFactories(
  //   factionsCount,
  //   sortingLayer,
  // )

  // const updateStage = mouseControllerInitialize()

  // aiController.abilityHistory = createEmptyArr()
  // window.squadsWereMoved = window.allSquads

  //we don't need initial value, because in first loop all units
  // use window.allUnits to search targets to attack
  // window.hunters = createEmptyArr()
  // Array called "hunters" will contains Arrays, and this Arrays will collects Units

  window.hutningTimer = 0 //if time === 0, manageHunters()
  window.timer = 0
  window.icons = []
  window.flamesUpdaters = []

  // const getUnitType = faction => {
  //   if (playersList[faction] === 'HUMANS') {
  //     return 'SOLIDER_REGULAR'
  //   } else {
  //     return 'WARRIOR_ASSAULT' //'WARRIOR_REGULAR';
  //   }
  // }

  // window.userIcons = []

  // addProductionIcons(playersList, factories)
  // createSmokeContainer()

  // const resCounter = document.querySelector('#res-counter')
  // const updateResCounter = () => {
  //   let resX = 0
  //   resourcesPoints.forEach(rp => {
  //     if (rp.owner === 0) {
  //       resX++
  //     }
  //   })
  //   resCounter.innerHTML = `${factories[0].resources} /+${28 + resX * 7}`
  // }
  const universeRepresentation: UniverseRepresentation = {}

  const universe = Universe.new(new Float32Array(playersList))
  const factoriesInitData = universe.get_factories_init_data()

  for (let i = 0; i < factoriesInitData.length; i += 5) {
    const factoryId = factoriesInitData[i + 1]
    const factionId = factoriesInitData[i]
    const factoryRepresentation = new Factory(
      factoriesInitData[i + 2], // x
      factoriesInitData[i + 3], // y
      factoriesInitData[i + 4], // angle
      sortingLayer,
    )
    universeRepresentation[factoryId] = factoryRepresentation
  }
  const onClickCreateUnit = () => {
    console.log(universe.create_squad(mapIconToRepresentationType('solider')))
  }

  const button = document.createElement('button')
  button.className = 'solider-product'
  button.addEventListener('click', onClickCreateUnit)

  document.getElementById('shop-list').appendChild(button)

  initializeMouseController(universe, universeRepresentation)

  drawPolygons()
  drawGraph()

  window.app.ticker.add((delta: number) => {
    universe.update()
    const [pointer, length] = universe.get_pointer()
    const universeData = new Float32Array(memory.buffer, pointer, length)

    render(
      delta,
      Array.from(universeData), // TODO: check how long does it take
      universeRepresentation,
      // updateStage,
      // factories,
      // getUnitType,
      // updateResCounter,
      // createEmptyArr,
      // resourcesPoints,
    )
  })
}

export default setup
