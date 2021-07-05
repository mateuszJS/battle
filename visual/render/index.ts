import REPRESENTATION_IDS, { ObjectType } from './representationsIds'
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
  universeData: number[],
  universeRepresentation: UniverseRepresentation,
) => {
  const universeLength = universeData.length
  let factionId
  let index = 0

  while (index < universeLength) {
    const nextItemType = universeData[index]

    switch (nextItemType) {
      case REPRESENTATION_IDS.FACTION: {
        const indexOfId = index + 1
        factionId = universeData[indexOfId]
        index = indexOfId + 1
        break
      }
      case REPRESENTATION_IDS.ENEMY_FACTORY: {
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
      case REPRESENTATION_IDS.SOLIDER: {
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
            REPRESENTATION_IDS.SOLIDER,
          )
        }

        index = newIndexValue
        break
      }
      case REPRESENTATION_IDS.USER_FACTORY: {
        const indexOfId = index + 1
        const newIndexValue = indexOfId + 7
        const factoryId = universeData[indexOfId]
        const factory = universeRepresentation[factoryId]
        representationUpdaters.updateFactory(
          factory as Factory,
          universeData.slice(indexOfId + 1, newIndexValue),
        )
        index = newIndexValue
        break
      }
      case REPRESENTATION_IDS.BULLETS: {
        BulletFactory.create(universeData.slice(index + 1), universeRepresentation)
        index = universeLength
        break
      }
      case REPRESENTATION_IDS.RAPTOR: {
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
            REPRESENTATION_IDS.RAPTOR,
          )
        }

        index = newIndexValue
        break
      }
      case REPRESENTATION_IDS.STRATEGIC_POINT: {
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
