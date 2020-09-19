import addFactionInfluence from './addFactionInfluence'
import { Sprite } from 'pixi.js'

let container: PIXI.Container

export const updateInfluenceMap = (influence: Float32Array) => {
  if (!influence.length) return
  window.world.removeChild(container)
  container = new PIXI.Container()

  const factionsAddedInfluence = addFactionInfluence(influence)
  const maps = Object.values(factionsAddedInfluence)
  const allInfluence = maps[maps.length - 1]
  const sprite = new Sprite(allInfluence)
  container.addChild(sprite)

  // sprite.width = 500
  // sprite.height = 500
  // we have to create texture with added all the units
  // then create for each faction all - faction
  // then for each squad in the faction (or for each army(?)) we should calculate value of the each pixel
  // then just choose pixel with the highest value, get index, calc x and y

  // to figure out, somehow we have to know id of the squads under the pixels
  window.world.addChild(container)
}
