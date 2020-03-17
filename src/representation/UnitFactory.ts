import Unit from './Unit'
import createSoliderSprite, { Result } from './getSprites'

class UnitsFactory {
  private static getSoliderSprite: () => Result
  private static layerGroup: PIXI.display.Group

  static initializationTypes(layerGroup: PIXI.display.Group) {
    this.getSoliderSprite = createSoliderSprite()
    this.layerGroup = layerGroup
  }

  static createUnit(state: number, x: number, y: number, angle: number) {
    const { movieClip, ...frameUpdaters } = this.getSoliderSprite()
    const graphicParams = {
      sortingLayer: this.layerGroup,
      container: new PIXI.Container(),
      movieClip: movieClip,
      frameUpdaters,
    }

    return new Unit(x, y, angle, graphicParams)
  }
}

export default UnitsFactory
