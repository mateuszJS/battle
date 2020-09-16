import REPRESENTATION_IDS, { ObjectType } from '~/render/representationsIds'
import Unit from './Unit'
import createSoliderSprite from './getSprites'
import getMySelection from './getMySelection'

const MAX_JUMP_HEIGHT = 1200
// the same constant exists in rust

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
    this.graphics.y = y - firstStateParam * MAX_JUMP_HEIGHT
    this.graphics.scale.set(1 + firstStateParam * 1.5)
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
    isAllianceUnit: boolean,
    state: number,
    type: ObjectType,
  ) {
    const { movieClip, container, ...frameUpdaters } = this.getSoliderSprite()
    const graphicParams = {
      container,
      movieClip: movieClip,
      frameUpdaters,
      selectionSprite: getMySelection(isAllianceUnit),
    }

    if (type === REPRESENTATION_IDS.RAPTOR) {
      graphicParams.movieClip.tint = 0xffff00
    }

    return new Unit(id, x, y, angle, graphicParams, type, MAP_UPDATE_ABILITY[type])
  }
}

export default UnitsFactory
