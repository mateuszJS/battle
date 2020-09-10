import REPRESENTATION_IDS, { ObjectType } from '~/render/representationsIds'
import Unit from './Unit'
import createSoliderSprite from './getSprites'
import getMySelection from './getMySelection'

export type UpdateAbilityCallback = (
  x: number,
  y: number,
  angle: number,
  firstStateParam: number,
) => void

const MAP_UPDATE_ABILITY = {
  [REPRESENTATION_IDS.SOLIDER]: function(
    x: number,
    y: number,
    angle: number,
    firstStateParam: number,
  ) {
    this.frameUpdaters.goToIdle(angle)
  },
  [REPRESENTATION_IDS.RAPTOR]: function(
    x: number,
    y: number,
    angle: number,
    firstStateParam: number,
  ) {
    const progress = 0.25 - Math.pow(0.5 - Math.max(firstStateParam, 0), 2)
    this.graphics.y = y - progress * 1200
    this.graphics.scale.set(1 + progress * 1.5)
    this.frameUpdaters.goToIdle(angle)
  },
}

class UnitsFactory {
  private static getSoliderSprite: ReturnType<typeof createSoliderSprite>

  static initializationTypes() {
    this.getSoliderSprite = createSoliderSprite()
  }

  static createUnit(
    id: number,
    x: number,
    y: number,
    angle: number,
    isEnemy: boolean,
    state: number,
    type: ObjectType,
  ) {
    const { movieClip, container, ...frameUpdaters } = this.getSoliderSprite()
    const graphicParams = {
      container,
      movieClip: movieClip,
      frameUpdaters,
      selectionSprite: getMySelection(isEnemy),
    }

    if (type === REPRESENTATION_IDS.RAPTOR) {
      graphicParams.movieClip.tint = 0xffff00
    }

    return new Unit(id, x, y, angle, graphicParams, type, MAP_UPDATE_ABILITY[type])
  }
}

export default UnitsFactory
