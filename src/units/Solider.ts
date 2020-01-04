import Unit from './Unit'
import Utils from '../utils/Utils'
import Squad from './Squad'
import { UNIT_TYPE } from 'Consts'
import { AdditionalGraphics } from './types'
import { ModelDetails } from '~/sprites/types'

class Solider extends Unit {
  constructor(
    graphics: AdditionalGraphics,
    model: ModelDetails,
    pos: Point,
    faction: number,
    type: UNIT_TYPE,
    squad: Squad,
  ) {
    //pass only weapons PARAMS, not copy reference to primary weapon object
    super(graphics, model, pos, faction, type, squad)
  }

  getTheMostImportantAim(aims: Unit[]) {
    const index = Utils.getIndexOfTheNearestItem(aims, this)
    return aims[index]
  }
}

export default Solider
