import Solider from './Solider'
import Warrior from './Warrior'
import WarriorAssault from './WarriorAssault'
import createSoliderSprite from '~/sprites/soliderSprites'
import createWarriorSprite from '~/sprites/warriorSprites'
import createWarriorAssaultSprite from '~/sprites/warriorAssaultSprites'
import createMySelectionSprite from '~/sprites/mySelectionSprite'
import Squad from './Squad'
import { UNIT_TYPE } from '~/consts/consts'
import { ModelDetails } from '~/sprites/types'

class UnitsFactory {
  private static getSoliderSprite: () => ModelDetails
  private static getWarriorSprite: () => ModelDetails
  private static getWarriorAssaultSprite: () => ModelDetails
  private static getMySelection: () => PIXI.Sprite
  private static layerGroup: PIXI.display.Group

  static initializationTypes(layerGroup: PIXI.display.Group) {
    this.getSoliderSprite = createSoliderSprite()
    this.getWarriorSprite = createWarriorSprite()
    this.getWarriorAssaultSprite = createWarriorAssaultSprite()
    this.getMySelection = createMySelectionSprite()
    this.layerGroup = layerGroup
  }

  static createUnit(
    position: Point,
    faction: number,
    type: UNIT_TYPE,
    squad: Squad,
  ) {
    const graphicParams = {
      parentGroup: this.layerGroup,
      unit: new PIXI.Container(),
      selection: this.getMySelection(),
    }

    switch (type) {
      case UNIT_TYPE.WARRIOR_REGULAR:
        return new Warrior(
          graphicParams,
          this.getWarriorAssaultSprite(),
          position,
          faction,
          type,
          squad,
        )

      case UNIT_TYPE.SOLIDER_REGULAR:
        return new Solider(
          graphicParams,
          this.getSoliderSprite(),
          position,
          faction,
          type,
          squad,
        )

      case UNIT_TYPE.SOLIDER_LASER:
        return new Solider(
          graphicParams,
          this.getSoliderSprite(),
          position,
          faction,
          type,
          squad,
        )

      case UNIT_TYPE.WARRIOR_ASSAULT:
        return new WarriorAssault(
          graphicParams,
          this.getWarriorAssaultSprite(),
          position,
          faction,
          type,
          squad,
        )
    }
  }
}

export default UnitsFactory
