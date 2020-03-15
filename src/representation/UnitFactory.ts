import Unit from './Unit'
import createSoliderSprite from '~/sprites/soliderSprites'
import createMySelectionSprite from '~/sprites/mySelectionSprite'
import { ModelDetails } from '~/sprites/types'

class UnitsFactory {
  private static getSoliderSprite: () => ModelDetails
  private static getMySelection: () => PIXI.Sprite
  private static layerGroup: PIXI.display.Group

  static initializationTypes(layerGroup: PIXI.display.Group) {
    this.getSoliderSprite = createSoliderSprite()
    this.getMySelection = createMySelectionSprite()
    this.layerGroup = layerGroup
  }

  static createUnit(x: number, y: number, angle: number) {
    const graphicParams = {
      parentGroup: this.layerGroup,
      unit: new PIXI.Container(),
      selection: this.getMySelection(),
    }

    return new Unit(x, y, angle, graphicParams, this.getSoliderSprite())
  }
}

export default UnitsFactory
