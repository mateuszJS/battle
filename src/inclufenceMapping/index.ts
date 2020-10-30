import getMyInfluenceAndTension from './getMyInfluenceAndTension'
import getInfluenceAndVulnerabilityMap from './getInfluenceAndVulnerabilityMap'
import {
  USER_FACTION_ID,
  MAP_WIDTH,
  MAP_HEIGHT,
  INFLUENCE_MAP_WIDTH,
  INFLUENCE_MAP_HEIGHT,
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
    INFLUENCE_MAP_WIDTH / MAP_WIDTH,
  )
  const tensionMap = myInfluencesList[myInfluencesList.length - 1].texture

  if (!vulnerabilityGeometry) {
    createVulnerabilityGeom()
  }

  myInfluencesList.forEach(faction => {
    if (faction.id === USER_FACTION_ID) {
      const firstFactionInflueneceAndVulnerabilityMap = getInfluenceAndVulnerabilityMap(
        faction.texture,
        tensionMap,
        vulnerabilityGeometry,
        INFLUENCE_MAP_WIDTH,
        INFLUENCE_MAP_HEIGHT,
      )
      firstFactionInflueneceAndVulnerabilityMap.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST

      const sprite = new PIXI.Sprite(firstFactionInflueneceAndVulnerabilityMap)
      sprite.filters = [new PIXI.filters.AlphaFilter(10.0)]
      sprite.width = MAP_WIDTH
      sprite.height = MAP_HEIGHT

      container.addChild(sprite)

      const influenceAndVulnerabilityMapPixels = window.app.renderer.extract.pixels(
        firstFactionInflueneceAndVulnerabilityMap,
      )
      universe.do_ai(faction.id, influenceAndVulnerabilityMapPixels)
    }
  })

  if (window.visibleInfluenceMap) {
    window.world.addChild(container)
  }
}
