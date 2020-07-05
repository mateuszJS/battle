import REPRESENTATION_IDS from '~/render/representationsIds'
import Unit from './Unit'
import createSoliderSprite from './getSprites'
import getMySelection from './getMySelection'

class UnitsFactory {
  private static getSoliderSprite: ReturnType<typeof createSoliderSprite>
  private static layerGroup: PIXI.display.Group

  static initializationTypes(layerGroup: PIXI.display.Group) {
    this.getSoliderSprite = createSoliderSprite()
    this.layerGroup = layerGroup
  }

  static createUnit(
    x: number,
    y: number,
    angle: number,
    isEnemy: boolean,
    state: number,
  ) {
    const { movieClip, ...frameUpdaters } = this.getSoliderSprite()
    const graphicParams = {
      sortingLayer: this.layerGroup,
      container: new PIXI.Container(),
      movieClip: movieClip,
      frameUpdaters,
      selectionSprite: getMySelection(isEnemy),
    }

    return new Unit(x, y, angle, graphicParams, REPRESENTATION_IDS.SOLIDER)
  }
}

export default UnitsFactory
