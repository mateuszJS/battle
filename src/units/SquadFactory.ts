import Squad from './Squad'
import UnitFactory from './UnitFactory'
import SquadTypes from './SquadTypes'
import Unit from './Unit' //but this import is only for typescript, it's a good way to add interface?
import generateArray from '~/modules/generateArray'
import Utils from 'Utils'
import { UNIT_TYPE } from 'Consts'

class SquadFactory {
  static createSquad(
    sourcePos: Point,
    angle = 0,
    faction: number,
    type: UNIT_TYPE,
  ): Squad {
    let abilities = []
    if (type === UNIT_TYPE.SOLIDER_REGULAR) {
      abilities = [
        {
          name: 'SOLIDER_GRENADE',
          time: 0,
          rechargeTime: 1000,
        },
      ]
    } else if (type === UNIT_TYPE.WARRIOR_ASSAULT) {
      abilities = [
        {
          name: 'ASSAULT_JUMP',
          time: 0,
          rechargeTime: 1000,
        },
      ]
    }

    const size: number = SquadTypes[type].size
    const squad = new Squad(faction, abilities, type)
    const { points } = generateArray(size)
    const zeroPoint: Point = { x: 0, y: 0 }

    angle = Math.PI / 2 - angle // don't know why
    points.forEach(point => {
      const dis = Utils.dis(zeroPoint, point)
      const ang = Utils.ang(zeroPoint, point)
      point.x =
        Math.sin(ang + angle) * dis + sourcePos.x + Math.sin(angle) * -25
      point.y =
        -Math.cos(ang + angle) * dis + sourcePos.y - Math.cos(angle) * -25
    })

    points.map(point => {
      const unit: Unit = UnitFactory.createUnit(point, faction, type, squad)
      squad.members.push(unit)
      unit.setTargetToGo({
        x: unit.x + Math.sin(angle) * 150,
        y: unit.y - Math.cos(angle) * 150,
      })
    })

    squad.updateProps()

    return squad
  }
}

export default SquadFactory
