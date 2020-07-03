import UnitFactory from '~/representation/UnitFactory'
import Unit from '~/representation/Unit'
import EffectsFactory from '~/representation/EffectFactory'
import getSortableLayer from '~/modules/getSortableLayer'
import addBackground from './addBackground'
import render from './render'

import { Universe } from '../crate/pkg/index'
import REPRESENTATION_IDS from './render/representationsIds'
import Factory from '~/representation/Factory'
import initializeMouseController from './mouseController'
import getSerializedInfoAboutWorld from './getSerializedInfoAboutWorld'

export type UniverseRepresentation = {
  [id: number]: Factory | Unit
}

// const grenade = new PIXI.Sprite(window.app.loader.resources['assets/grenade-icon.png'].texture);
// grenade.width = SETTINGS.ABILITY_ICON_SIZE;
// grenade.height = SETTINGS.ABILITY_ICON_SIZE;

const mapIconToRepresentationType = (icon: 'solider') => {
  switch (icon) {
    case 'solider':
      return REPRESENTATION_IDS.SOLIDER
  }
}

const setup = () => {
  EffectsFactory.initialize()

  const mapSprite = addBackground()
  const sortingLayer = getSortableLayer(mapSprite)
  UnitFactory.initializationTypes(sortingLayer)

  const universeRepresentation: UniverseRepresentation = {}

  const serializedInfoAboutWorld = getSerializedInfoAboutWorld()
  const universe = Universe.new(
    serializedInfoAboutWorld.factions,
    serializedInfoAboutWorld.obstacles,
  )
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

  const mouseController = new initializeMouseController(
    universe,
    universeRepresentation,
  )

  window.sceneX = 0
  window.sceneY = 0

  universe.create_enemy_squad(mapIconToRepresentationType('solider'))

  window.app.ticker.add((delta: number) => {
    mouseController.updateScenePosition()

    universe.update()
    const universeData = universe.get_universe_data()

    render(
      delta,
      Array.from(universeData), // TODO: check how long does it take, and try with raw Float32Array
      universeRepresentation,
    )
  })
}

export default setup
