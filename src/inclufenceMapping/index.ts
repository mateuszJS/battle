import getMyInfluenceAndTension from './getMyInfluenceAndTension'
import getInfluenceAndVulnerabilityMap from './getInfluenceAndVulnerabilityMap'
import getBestPlace from './getBestPlace'
import { MAP_WIDTH, MAP_HEIGHT, INFLUENCE_MAP_SCALE } from 'Consts'
import { Universe } from '../../crate/pkg/index'

let container: PIXI.Container
let influenceGeometry: PIXI.Geometry
let vulnerabilityGeometry: PIXI.Geometry
let mapWidth: number
let mapHeight: number

export const updateInfluenceMap = (influence: Float32Array, universe: Universe) => {
  if (!influence.length) return

  if (!influenceGeometry) {
    mapWidth = MAP_WIDTH * INFLUENCE_MAP_SCALE
    mapHeight = MAP_HEIGHT * INFLUENCE_MAP_SCALE
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
    INFLUENCE_MAP_SCALE,
  )
  const myInfluenceTextures = Object.values(myInfluencesList).map(influInfo => influInfo.texture) // red channel
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

  const firstFactionInflueneceAndVulnerabilityMap = getInfluenceAndVulnerabilityMap(
    myInfluenceTextures[0],
    tensionMap,
    vulnerabilityGeometry,
    mapWidth,
    mapHeight,
  )
  firstFactionInflueneceAndVulnerabilityMap.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST

  const { mode } = window
  let sprite
  if (mode === 0) {
    // is black area myInfluenceTextures[0]
    sprite = new PIXI.Sprite(myInfluenceTextures[0])
  } else if (mode === 1) {
    // is black area myInfluenceTextures[0]
    sprite = new PIXI.Sprite(myInfluenceTextures[1])
  } else if (mode === 2) {
    sprite = new PIXI.Sprite(tensionMap)
  } else {
    sprite = new PIXI.Sprite(firstFactionInflueneceAndVulnerabilityMap)
  }
  sprite.filters = [new PIXI.filters.AlphaFilter(10.0)]
  sprite.width = MAP_WIDTH
  sprite.height = MAP_HEIGHT

  container.addChild(sprite)

  const faction = myInfluencesList[0]
  if (faction.data.length > 6) {
    // there is any squad
    const myInfluencePixels = window.app.renderer.extract.pixels(faction.texture)
    const influenceAndVulnerabilityMapPixels = window.app.renderer.extract.pixels(
      firstFactionInflueneceAndVulnerabilityMap,
    )
    const squadId = faction.data[5]
    const squadX = faction.data[6]
    const squadY = faction.data[7]
    // console.log(faction.data)
    // console.log(squadX, squadY)
    const x = Math.round(squadX * INFLUENCE_MAP_SCALE)
    const y = Math.round(squadY * INFLUENCE_MAP_SCALE)
    const textureIndex = mapWidth * 4 * y + x * 4
    // TODO: isntead of calculating in JS, we should create one useful texture for wasm, and do everything there
    const isSafe =
      myInfluencePixels[textureIndex] * 0.7 < influenceAndVulnerabilityMapPixels[textureIndex]
    universe.do_ai(faction.id, influenceAndVulnerabilityMapPixels)
    // if (isSafe) {
    // const placesBySafe = getBestPlace(
    //   firstFactionInflueneceAndVulnerabilityMap,
    //   x,
    //   y,
    //   1.0,
    //   vulnerabilityGeometry,
    //   mapWidth,
    //   mapHeight,
    //   SCALE,
    // )
    // const placesBySafePixels = window.app.renderer.extract.pixels(placesBySafe)
    // const index = findMaxIndex(placesBySafePixels)
    // const resultX = index % (4 * mapWidth)
    // const resultY = Math.floor(index / (mapWidth * 4))
    // console.log(resultX, resultY)
    // }
    // console.log(myInfluencePixels.length, mapHeight * mapWidth * 4)
  }

  // sprite.width = 500
  // sprite.height = 500
  // we have to create texture with added all the units
  // then create for each faction all - faction
  // then for each squad in the faction (or for each army(?)) we should calculate value of the each pixel
  // then just choose pixel with the highest value, get index, calc x and y

  // to figure out, somehow we have to know id of the squads under the pixels
  window.world.addChild(container)
}
