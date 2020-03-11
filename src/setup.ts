import mouseControllerInitialize from '~/modules/mouseController'
import UnitFactory from '~/units/UnitFactory'

import influenceController from '~/ai/influenceMap'
import aiController from '~/ai/ai'
import Icons from '~/modules/icons'
import getSortableLayer from '~/modules/getSortableLayer'
import EffectsFactory from '~/effects/EffectsFactory'

import createFactories from './createFactories'
import addProductionIcons from './addProductionIcons'
import createSmokeContainer from './createSmokeContainer'
import addBackground from './addBackground'
import render from './render'

import { memory } from '../crate/pkg/index_bg'
import { Universe } from '../crate/pkg/index'

import Factory from '~/representation/Factory'

// eslint-disable-next-line prettier/prettier
const playersList = [
  100000,
  100001,
  100002,
  100003,
  100004,
  100005,
];

const setup = () => {
  EffectsFactory.initialize()
  // const factionsCount = playersList.length
  // const createEmptyArr = () => Array.from({ length: factionsCount }, () => [])

  const mapSprite = addBackground()
  const sortingLayer = getSortableLayer(mapSprite)

  // UnitFactory.initializationTypes(sortingLayer)
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
  window.universeRepresentation = []
  const universe = Universe.new(Float32Array.from(playersList))
  const [pointer, length] = universe.get_pointer()
  const universeData = new Float32Array(memory.buffer, pointer, length)
  const factoriesInitData = universe.get_factories_init_data()
  // faction.id, factory.id, factory.x, factory.y, factory.angle
  console.log(factoriesInitData)
  for (let i = 0; i < factoriesInitData.length; i += 5) {
    const factoryRepresentation = new Factory(
      factoriesInitData[i], // faction id
      factoriesInitData[i + 1], // id
      factoriesInitData[i + 2], // x
      factoriesInitData[i + 3], // y
      factoriesInitData[i + 4], // angle
      sortingLayer,
    )
    window.universeRepresentation.push(factoryRepresentation)
  }

  // window.app.ticker.add((delta: number) =>
  // render(
  //   delta,
  //   universeData,
  //   // updateStage,
  //   // factories,
  //   // getUnitType,
  //   // updateResCounter,
  //   // createEmptyArr,
  //   // resourcesPoints,
  // ),
  // )
}

export default setup
