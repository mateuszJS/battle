import Unit from '~/units/Unit'
import setDestinationPoint from '~/modules/setDestination'
import Squad from '~/units/Squad'

interface theSameAim {
  aim: Squad
  units: Unit[]
}

const getIndexWithTheSameAim = (arr: theSameAim[], attackAim: Squad) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].aim === attackAim) {
      return i
    }
  }
  return -1
}

export default (hunters: Unit[][]) => {
  hunters.forEach(faction => {
    if (faction.length === 0) return
    const unitsWithSameAim: theSameAim[] = []
    faction.forEach(unit => {
      if (unit.squad.aim && unit.squad.aim.members.length > 0) {
        const index = getIndexWithTheSameAim(unitsWithSameAim, unit.squad.aim)
        if (index === -1) {
          unitsWithSameAim.push({
            aim: unit.squad.aim,
            units: [unit],
          })
        } else {
          unitsWithSameAim[index].units.push(unit)
        }
      } else {
        unit.stay()
      }
    })

    unitsWithSameAim.forEach(theSameAim => {
      setDestinationPoint(theSameAim.aim, theSameAim.units, true, false, false)
    })
  })
}
