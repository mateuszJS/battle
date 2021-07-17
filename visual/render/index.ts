import {
  REPRESENTATION_FACTION_ID,
  REPRESENTATION_ENEMY_FACTORY,
  REPRESENTATION_SOLIDER,
  REPRESENTATION_USER_FACTORY,
  REPRESENTATION_BULLETS,
  REPRESENTATION_RAPTOR,
  REPRESENTATION_STRATEGIC_POINT,
  PRODUCTION_LINE_LENGTH,
} from '../../logic/constants'

import * as representationUpdaters from './representationUpdaters'
import { UniverseRepresentation } from '~/initGame'
import Factory from '~/representation/Factory'
import Unit from '~/representation/Unit'
import UnitsFactory from '~/representation/UnitFactory'
import { USER_FACTION_ID } from 'Consts'
import BulletFactory from '~/representation/BulletFactory'
import StrategicPoint from '~/representation/StrategicPoint'

const render = (
  delta: number,
  universeData: Float32Array,
  universeRepresentation: UniverseRepresentation,
) => {
  const universeLength = universeData.length
  let factionId
  let index = 0

  while (index < universeLength) {
    const nextItemType = universeData[index]

    switch (nextItemType) {
      case REPRESENTATION_FACTION_ID: {
        const indexOfId = index + 1
        factionId = universeData[indexOfId]
        index = indexOfId + 1
        break
      }
      case REPRESENTATION_ENEMY_FACTORY: {
        const indexOfId = index + 1
        const newIndexValue = indexOfId + 3
        const factoryId = universeData[indexOfId]
        const factory = universeRepresentation[factoryId]
        representationUpdaters.updateFactory(
          factory as Factory,
          universeData.slice(indexOfId + 1, newIndexValue),
        )
        index = newIndexValue
        break
      }
      case REPRESENTATION_SOLIDER: {
        const indexOfId = index + 1
        const newIndexValue = indexOfId + 6
        const unitId = universeData[indexOfId]
        const unit = universeRepresentation[unitId]
        if (unit) {
          representationUpdaters.updateUnit(
            unit as Unit,
            universeData.slice(indexOfId + 1, newIndexValue),
          )
        } else {
          universeRepresentation[unitId] = UnitsFactory.createUnit(
            unitId,
            universeData[indexOfId + 1],
            universeData[indexOfId + 2],
            universeData[indexOfId + 3],
            factionId === USER_FACTION_ID,
            universeData[indexOfId + 4],
            REPRESENTATION_SOLIDER,
          )
        }

        index = newIndexValue
        break
      }
      case REPRESENTATION_USER_FACTORY: {
        const indexOfId = index + 1
        const newIndexValue = indexOfId + 2 + PRODUCTION_LINE_LENGTH
        const factoryId = universeData[indexOfId]
        const factory = universeRepresentation[factoryId]
        representationUpdaters.updateFactory(
          factory as Factory,
          universeData.slice(indexOfId + 1, newIndexValue),
        )
        index = newIndexValue
        break
      }
      case REPRESENTATION_BULLETS: {
        BulletFactory.create(universeData.slice(index + 1), universeRepresentation)
        index = universeLength
        break
      }
      case REPRESENTATION_RAPTOR: {
        const indexOfId = index + 1
        const newIndexValue = indexOfId + 6
        const unitId = universeData[indexOfId]
        const unit = universeRepresentation[unitId]
        if (unit) {
          representationUpdaters.updateUnit(
            unit as Unit,
            universeData.slice(indexOfId + 1, newIndexValue),
          )
        } else {
          universeRepresentation[unitId] = UnitsFactory.createUnit(
            unitId,
            universeData[indexOfId + 1],
            universeData[indexOfId + 2],
            universeData[indexOfId + 3],
            factionId === USER_FACTION_ID,
            universeData[indexOfId + 4],
            REPRESENTATION_RAPTOR,
          )
        }

        index = newIndexValue
        break
      }
      case REPRESENTATION_STRATEGIC_POINT: {
        const indexOfId = index + 1
        const newIndexValue = indexOfId + 3
        const strategicPointId = universeData[indexOfId]
        const strategicPoint = universeRepresentation[strategicPointId]
        representationUpdaters.updateStrategicPoint(
          strategicPoint as StrategicPoint,
          universeData.slice(indexOfId + 1, newIndexValue),
        )
        index = newIndexValue
        break
      }
      default:
        debugger
    }
  }

  BulletFactory.update()
}

export default render
