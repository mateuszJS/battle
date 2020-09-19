import UnitFactory from '~/representation/UnitFactory'
import Unit from '~/representation/Unit'
import EffectsFactory from '~/representation/EffectFactory'
import getSortableLayer from '~/modules/getSortableLayer'
import createBackgroundTexture from './createBackgroundTexture'
import render from './render'
import { USER_FACTION_ID } from 'Consts'
import { Universe } from '../crate/pkg/index'
import Factory from '~/representation/Factory'
import initializeMouseController from './mouseController'
import getSerializedInfoAboutWorld from './getSerializedInfoAboutWorld'
import { createFactoryButtons } from './buttons/factory'
import REPRESENTATION_IDS from '~/render/representationsIds'
import { updateAbilitiesButtons, clearAbilitiesIcons } from '~/buttons/abilities'
import { updateInfluenceMap } from '~/inclufenceMapping'

export type UniverseRepresentation = {
  [id: number]: Factory | Unit
}

const initGame = () => {
  const mapSprite = createBackgroundTexture()
  getSortableLayer(mapSprite)
  EffectsFactory.initialize()

  UnitFactory.initializationTypes()

  const universeRepresentation: UniverseRepresentation = {}
  window.universeRepresentation = universeRepresentation // used to remove unit

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
    )
    universeRepresentation[factoryId] = factoryRepresentation

    if (factionId === USER_FACTION_ID) {
      createFactoryButtons(factoriesInitData[i + 2], factoriesInitData[i + 3], type =>
        universe.create_squad(type),
      )
    }
  }

  const mouseController = new initializeMouseController(universe, universeRepresentation)

  universe.create_enemy_squad(REPRESENTATION_IDS.SOLIDER)

  let timeToClearAbilitiesIcons = 1000

  window.app.ticker.add((delta: number) => {
    mouseController.updateScenePosition()

    universe.update()
    const universeData = universe.get_universe_data()

    render(
      delta,
      Array.from(universeData), // TODO: check how long does it take, and try with raw Float32Array
      universeRepresentation,
    )

    updateAbilitiesButtons(universeRepresentation)

    if (timeToClearAbilitiesIcons % 200 === 0) {
      const influence = universe.get_influence()
      // updateInfluenceMap(new Float32Array([500.0, 500.0, 100, 200]))
      updateInfluenceMap(influence)
    }

    if (timeToClearAbilitiesIcons === 0) {
      clearAbilitiesIcons(universeRepresentation)
      timeToClearAbilitiesIcons = 1000
    }
    timeToClearAbilitiesIcons--
  })
}

export default initGame
