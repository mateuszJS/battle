// import SETTINGS from 'Settings'
// import EffectsFactory from '~/effects/EffectsFactory'
// import manageHunters from '~/modules/manageHunters'
// import ResPoint from './modules/resPoint'
// import influenceController from '~/ai/influenceMap'
// import aiController from '~/ai/ai'
// import Icons from '~/modules/icons'
import getRepresentationsDetails from './getRepresentationsDetails'
import { UniverseRepresentation } from '../setup'

const representationsDetails = getRepresentationsDetails()

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
  let index = 0

  while (index < universeLength) {
    const itemId = universeData[index]
    const details = representationsDetails.find(({ baseId }) => itemId > baseId)
    const newIndexValue = index + details.length
    if (details.updater) {
      details.updater(
        universeRepresentation[itemId],
        universeData.slice(index + 1, newIndexValue),
      )
    }

    index = newIndexValue
  }
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
