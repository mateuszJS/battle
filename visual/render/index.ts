import * as representationUpdaters from './representationUpdaters'
import { FactionsList, UniverseRepresentation } from 'initGame'
import Factory from 'representation/Factory'
import Unit from 'representation/Unit'
import UnitsFactory from 'representation/UnitFactory'
import BulletFactory from 'representation/BulletFactory'
import StrategicPoint from 'representation/StrategicPoint'
import { PRODUCTION_LINE_LENGTH, RepresentationId, USER_FACTION_ID } from 'logic-contants'



const render = (
  delta: number,
  universeData: Float32Array,
  universeRepresentation: UniverseRepresentation,
  factionDetails: FactionsList
) => {
  const universeLength = universeData.length
  let factionId
  let index = 0

  while (index < universeLength) {
    const nextItemType = universeData[index]
    switch (nextItemType) {
      case RepresentationId.Faction: {
        const indexOfId = index + 1
        factionId = universeData[indexOfId]
        index = indexOfId + 1
        break
      }
      case RepresentationId.EnemyFactory: {
        const indexOfId = index + 1
        const factoryId = universeData[indexOfId]
        const factory = universeRepresentation.get(factoryId) as Factory
        representationUpdaters.updateFactory(
          factory,
          universeData[indexOfId + 1], // progress
        )
        index = indexOfId + 2
        break
      }
      case RepresentationId.Solider: {
        const indexOfId = index + 1
        const newIndexValue = indexOfId + 6
        const unitId = universeData[indexOfId]
        const unit = universeRepresentation.get(unitId)

        if (unit) {
          representationUpdaters.updateUnit(
            unit as Unit,
            universeData.slice(indexOfId + 1, newIndexValue),
          )
        } else {
          const newUnit = UnitsFactory.createUnit(
            unitId, // id
            universeData[indexOfId + 1], // x
            universeData[indexOfId + 2], // y
            universeData[indexOfId + 3], // angle
            factionId === USER_FACTION_ID,
            universeData[indexOfId + 4], // state
            RepresentationId.Solider,
            factionDetails.get(factionId),
          )
          universeRepresentation.set(unitId, newUnit)
        }
        index = newIndexValue
        break
      }
      case RepresentationId.UserFactory: {
        const indexOfId = index + 1
        const newIndexValue = indexOfId + 1 + PRODUCTION_LINE_LENGTH + 1 // id, progress, 5 items of production line
        const factoryId = universeData[indexOfId]
        const factory = universeRepresentation.get(factoryId) as Factory
        representationUpdaters.updateFactory(
          factory,
          universeData[indexOfId + 1],
          universeData.slice(indexOfId + 2, indexOfId + 2 + PRODUCTION_LINE_LENGTH),
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
        const unit = universeRepresentation.get(unitId)
        if (unit) {
          representationUpdaters.updateUnit(
            unit as Unit,
            universeData.slice(indexOfId + 1, newIndexValue),
          )
        } else {
          const newUnit = UnitsFactory.createUnit(
            unitId,
            universeData[indexOfId + 1],
            universeData[indexOfId + 2],
            universeData[indexOfId + 3],
            factionId === USER_FACTION_ID,
            universeData[indexOfId + 4],
            RepresentationId.Raptor,
            factionDetails.get(factionId)
          )
          universeRepresentation.set(unitId, newUnit)
        }

        index = newIndexValue
        break
      }
      case RepresentationId.StrategicPoint: {
        const indexOfId = index + 1
        const newIndexValue = indexOfId + 3
        const strategicPointId = universeData[indexOfId]
        const strategicPoint = universeRepresentation.get(strategicPointId) as StrategicPoint
        representationUpdaters.updateStrategicPoint(
          strategicPoint,
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
