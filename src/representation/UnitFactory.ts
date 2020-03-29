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
    id: number,
    x: number,
    y: number,
    angle: number,
    state: number,
  ) {
    const { movieClip, ...frameUpdaters } = this.getSoliderSprite()
    const graphicParams = {
      sortingLayer: this.layerGroup,
      container: new PIXI.Container(),
      movieClip: movieClip,
      frameUpdaters,
      selectionSprite: getMySelection(),
    }

    return new Unit(id, x, y, angle, graphicParams)
  }
}

export default UnitsFactory
