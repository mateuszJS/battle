import getMyInfluenceAndTension from './getMyInfluenceAndTension'
import getInfluenceAndVulnerabilityMap from './getInfluenceAndVulnerabilityMap'

const SCALE = 1 // 100 / 600 // the same is in lib.rs

let container: PIXI.Container
let influenceGeometry: PIXI.Geometry
let vulnerabilityGeometry: PIXI.Geometry
let mapWidth: number
let mapHeight: number

export const updateInfluenceMap = (influence: Float32Array) => {
  if (!influence.length) return

  if (!influenceGeometry) {
    mapWidth = window.mapWidth * SCALE
    mapHeight = window.mapHeight * SCALE
    influenceGeometry = new PIXI.Geometry()
      .addAttribute(
        'aVertexPosition',
        [
          /* eslint-disable prettier/prettier */
        0, 0,
        mapWidth, 0,
        mapWidth, mapHeight,
        0, mapHeight,
        /* eslint-enable prettier/prettier */
        ],
        2,
      )
      .addIndex([0, 1, 2, 0, 2, 3])
  }

  window.world.removeChild(container)
  container = new PIXI.Container()

  const myInfluencesList = getMyInfluenceAndTension(
    influence,
    influenceGeometry,
    mapWidth,
    mapHeight,
  )
  const myInfluenceTextures = Object.values(myInfluencesList) // red channel
  const tensionMap = myInfluenceTextures[myInfluenceTextures.length - 1] // green channel

  if (!vulnerabilityGeometry) {
    vulnerabilityGeometry = new PIXI.Geometry()
      .addAttribute(
        'aVertexPosition',
        [
          /* eslint-disable prettier/prettier */
        0, 0,
        mapWidth, 0,
        mapWidth, mapHeight,
        0, mapHeight,
        /* eslint-enable prettier/prettier */
        ],
        2,
      )
      .addAttribute('aUvs', [0, 0, 1, 0, 1, 1, 0, 1], 2)
      .addIndex([0, 1, 2, 0, 2, 3])
  }

  const firstFactionVulnerabilityMap = getInfluenceAndVulnerabilityMap(
    myInfluenceTextures[0],
    tensionMap,
    vulnerabilityGeometry,
    mapWidth,
    mapHeight,
  )
  const sprite = new PIXI.Sprite(firstFactionVulnerabilityMap)
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
