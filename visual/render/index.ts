import { RepresentationId, PRODUCTION_LINE_LENGTH } from '../../logic/constants'

import * as representationUpdaters from './representationUpdaters'
import { UniverseRepresentation } from '~/initGame'
import Factory from '~/representation/Factory'
import Unit from '~/representation/Unit'
import UnitsFactory from '~/representation/UnitFactory'
import { USER_FACTION_ID } from '../../logic/constants'
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
      case RepresentationId.FactionId: {
        const indexOfId = index + 1
        factionId = universeData[indexOfId]
        index = indexOfId + 1
        break
      }
      case RepresentationId.EnemyFactory: {
        const indexOfId = index + 1
        const factoryId = universeData[indexOfId]
        const factory = universeRepresentation[factoryId]
        representationUpdaters.updateFactory(
          factory as Factory,
          universeData[indexOfId + 1], // progress
        )
        index = indexOfId + 2
        break
      }
      case RepresentationId.Solider: {
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
            RepresentationId.Solider,
          )
        }

        index = newIndexValue
        break
      }
      case RepresentationId.UserFactory: {
        const indexOfId = index + 1
        const newIndexValue = indexOfId + 2 + PRODUCTION_LINE_LENGTH
        const factoryId = universeData[indexOfId]
        const factory = universeRepresentation[factoryId]
        representationUpdaters.updateFactory(
          factory as Factory,
          universeData[indexOfId + 1],
          universeData.slice(indexOfId + 2, newIndexValue),
        )
        index = newIndexValue
        break
      }
      case RepresentationId.Bullets: {
        BulletFactory.create(universeData.slice(index + 1), universeRepresentation)
        index = universeLength
        break
      }
      case RepresentationId.Raptor: {
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
            RepresentationId.Raptor,
          )
        }

        index = newIndexValue
        break
      }
      case RepresentationId.StrategicPoint: {
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
