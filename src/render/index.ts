// import SETTINGS from 'Settings'
// import EffectsFactory from '~/effects/EffectsFactory'
// import manageHunters from '~/modules/manageHunters'
// import ResPoint from './modules/resPoint'
// import influenceController from '~/ai/influenceMap'
// import aiController from '~/ai/ai'
// import Icons from '~/modules/icons'
import REPRESENTATION_IDS, { ObjectType } from './representationsIds'
import * as representationUpdaters from './representationUpdaters'
import { UniverseRepresentation } from '../setup'
import Factory from '~/representation/Factory'
import Unit from '~/representation/Unit'
import UnitsFactory from '~/representation/UnitFactory'
import { USER_FACTION_ID } from 'Consts'
import BulletFactory from '~/representation/BulletFactory'

const render = (
  delta: number,
  universeData: number[],
  universeRepresentation: UniverseRepresentation,
  // updateStage: Function,
  // factories: Factory[],
  // getUnitType: Function,
  // updateResCounter: Function,
  // createEmptyArr: Function,
  // resourcesPoints: ResPoint[],
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
      default:
        debugger
    }
  }

  BulletFactory.update()

  // updateStage()
  // window.flamesUpdaters.forEach(update => update())
  // window.smokeContainer.elements.forEach(EffectsFactory.updateSmoke)
  // if (window.timer % 2) {
  //   factories.forEach((factory, index) => {
  //     factory.update()
  //     if (factory.resources >= 1000 && index > 0) {
  //       factory.buySquad(getUnitType(index))
  //     }
  //     if (index === 0) {
  //       updateResCounter()
  //       if (factory.resources >= 1000) {
  //         window.userIcons.forEach(icon => (icon.alpha = 1))
  //       } else {
  //         window.userIcons.forEach(icon => (icon.alpha = 0.5))
  //       }
  //     }
  //   })
  // }
  // if (window.timer % SETTINGS.CHANGE_STATE_THROTTLE === 0) {
  //   window.allSquads.forEach(faction =>
  //     faction.forEach(squad => squad.updateProps()),
  //   )
  //   window.squadsWereMoved = createEmptyArr()
  //   window.allSquads.forEach(faction => {
  //     faction.forEach(squad => {
  //       squad.updateStayingStatus()
  //       if (!squad.isStaying) {
  //         window.squadsWereMoved[squad.faction].push(squad)
  //       }
  //     })
  //   })
  //   window.allSquads.forEach(faction => {
  //     faction.forEach(squad => squad.update())
  //   })
  //   //patrz czy jendsotki na siebie w jednym obrocie pętli nie wpływają
  //   resourcesPoints.forEach(resPoint => resPoint.update())
  // }
  // window.allSquads.forEach(faction => {
  //   faction.forEach(squad => squad.animate())
  // })
  // window.bulletContainer.forEach(bullet => bullet.update()) //patrz czy pociski na siebie nie wpływaja w jednym obrocie pętli
  // if (++window.hutningTimer >= SETTINGS.HUNTING_REFRESH_TIME) {
  //   window.allSquads.forEach(faction => {
  //     faction.forEach(squad => squad.regroupMembers())
  //   })
  //   manageHunters(window.hunters)
  //   window.hunters = createEmptyArr()
  //   window.hutningTimer = 0
  // }
  // if (window.timer === 10) {
  //   const maps = influenceController.calcMapsValues(resourcesPoints)
  //   //pass maps here to AiController
  //   window.allSquads.forEach((fac, idx) => {
  //     if (idx !== 0) {
  //       aiController.manageFaction(idx, maps, resourcesPoints, factories[idx])
  //     }
  //   })
  // }
  // window.timer++
  // if (window.timer > 60) {
  //   window.timer = 0
  // }
  // Icons.showIcons()
  // window.allSquads.forEach(faction =>
  //   faction.forEach(squad => {
  //     squad.abilities.forEach(ability => {
  //       if (ability.time > 0) {
  //         ability.time--
  //       }
  //     })
  //   }),
  // )
}

export default render
