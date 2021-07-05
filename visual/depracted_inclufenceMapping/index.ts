import getMyInfluenceAndTension from './getMyInfluenceAndTension'
import getInfluenceAndVulnerabilityMap from './getInfluenceAndVulnerabilityMap'
import testOnePixelShader from './testOnePixelShader'
import {
  USER_FACTION_ID,
  MAP_WIDTH,
  MAP_HEIGHT,
  INFLUENCE_MAP_WIDTH,
  INFLUENCE_MAP_HEIGHT,
  INFLUENCE_MAP_SCALE_X,
  INFLUENCE_MAP_SCALE_Y,
} from 'Consts'
import { Universe } from '../../crate/pkg/index'

let container: PIXI.Container
let influenceGeometry: PIXI.Geometry
let vulnerabilityGeometry: PIXI.Geometry

const getGeom = () =>
  new PIXI.Geometry()
    .addAttribute(
      'aVertexPosition',
      [
        /* eslint-disable prettier/prettier */
      0, 0,
      INFLUENCE_MAP_WIDTH, 0,
      INFLUENCE_MAP_WIDTH, INFLUENCE_MAP_HEIGHT,
      0, INFLUENCE_MAP_HEIGHT,
      /* eslint-enable prettier/prettier */
      ],
      2,
    )
    .addIndex([0, 1, 2, 0, 2, 3])

const createInfluenceGeom = () => {
  influenceGeometry = getGeom()
}

const createVulnerabilityGeom = () => {
  vulnerabilityGeometry = getGeom().addAttribute('aUvs', [0, 0, 1, 0, 1, 1, 0, 1], 2)
}

const scale: [number, number] = [
  /* eslint-disable prettier/prettier */
  INFLUENCE_MAP_SCALE_X,
  INFLUENCE_MAP_SCALE_Y,
  /* eslint-enable prettier/prettier */
]

export const updateInfluenceMap = (influence: Float32Array, universe: Universe) => {
  if (!influence.length) return

  if (!influenceGeometry) {
    createInfluenceGeom()
  }

  window.world.removeChild(container)
  container = new PIXI.Container()

  const myInfluencesList = getMyInfluenceAndTension(
    influence,
    influenceGeometry,
    INFLUENCE_MAP_WIDTH,
    INFLUENCE_MAP_HEIGHT,
    scale,
  )
  const tensionMap = myInfluencesList[myInfluencesList.length - 1].texture

  if (!vulnerabilityGeometry) {
    createVulnerabilityGeom()
  }

  myInfluencesList.forEach(faction => {
    if (faction.id !== USER_FACTION_ID) {
      const firstFactionInflueneceAndVulnerabilityMap = getInfluenceAndVulnerabilityMap(
        faction.texture,
        tensionMap,
        vulnerabilityGeometry,
        INFLUENCE_MAP_WIDTH,
        INFLUENCE_MAP_HEIGHT,
      )
      if (window.visibleInfluenceMap) {
        const texture = firstFactionInflueneceAndVulnerabilityMap
        texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST
        const sprite = new PIXI.Sprite(texture)
        sprite.filters = [new PIXI.filters.AlphaFilter(10.0)]
        sprite.width = MAP_WIDTH
        sprite.height = MAP_HEIGHT
        container.addChild(sprite)
      }

      const influenceAndVulnerabilityMapPixels = window.app.renderer.extract.pixels(
        firstFactionInflueneceAndVulnerabilityMap,
      )
      // universe.do_ai(faction.id, influenceAndVulnerabilityMapPixels)

      // const circle = new PIXI.Graphics()

      // circle.beginFill(0xaaaaaa)
      // circle.drawRect(0, 0, 1, 1)
      // circle.alpha = 0.5
      // circle.endFill()
      // console.log(window.app.renderer.extract.pixels(testOnePixelShader()).slice(0, 4))
    }
  })

  if (window.visibleInfluenceMap) {
    window.world.addChild(container)
  }
}
