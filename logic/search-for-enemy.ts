import { NORMAL_SQUAD_RADIUS } from "./constants"
import { Faction } from "./faction"
import { getSquadsFromGridByCircle } from './grid-manager'
import { Squad } from "./squad"

function searchForEnemy(factions: Faction[]): void {
  factions.forEach(faction => {
    faction.squads.forEach(squad => {
      if (!squad.weaponDetails.shotDuringRun && squad.attackAim) return
      const maxRange = squad.weaponDetails.range + 2 * NORMAL_SQUAD_RADIUS
      const squadsAround = getSquadsFromGridByCircle(squad.centerPoint, maxRange)
      const squadsToCheck: Squad[] = []

      for (let i = 0; i < squadsAround.length; i++) {
        const squadAround = unchecked(squadsAround[i])
        if (squadAround.factionId != squad.factionId) {
          if (Mathf.hypot(
            squad.centerPoint.x - squadAround.centerPoint.x,
            squad.centerPoint.y - squadAround.centerPoint.y,
          ) < maxRange) {
            squadsToCheck.push(squadAround)
          }
        }
      }

      if (squadsToCheck.length > 0) {
        squad.secondaryAttackAim = squadsToCheck[0]
      }

    })
  })
}

export default searchForEnemy
