import Unit from './Unit'
import createSoliderSprite from '~/sprites/soliderSprites'
import { ModelDetails } from '~/sprites/types'

class UnitsFactory {
  private static getSoliderSprite: () => ModelDetails
  private static layerGroup: PIXI.display.Group

  static initializationTypes(layerGroup: PIXI.display.Group) {
    this.getSoliderSprite = createSoliderSprite()
    this.layerGroup = layerGroup
  }

  static createUnit(x: number, y: number, angle: number) {
    const graphicParams = {
      parentGroup: this.layerGroup,
      unit: new PIXI.Container(),
    }

    return new Unit(x, y, angle, graphicParams, this.getSoliderSprite())
  }
}

export default UnitsFactory
