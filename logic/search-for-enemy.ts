import { MAX_SQUAD_SPREAD_FROM_CENTER_RADIUS, MoveStates, USER_FACTION_ID } from "./constants"
import { Faction } from "./faction"
import { getAngleDiff } from "./get-angle-diff"
import getMeanAngle from "./get-mean-angle"
import { getSquadsFromGridByCircle } from './grid-manager'
import { Squad } from "./squad"

function searchForEnemy(factions: Faction[]): void {
  factions.forEach(faction => {
    faction.squads.forEach(squad => {
      // if you cannot run and shoot and you have attackAim, then you don't need secondaryAttackAim
      if (!squad.weaponDetails.shotDuringRun && squad.attackAim) return

      // TODO: check if current aim is in the range

      const squadPosition = squad.centerPoint
      const maxRange = squad.weaponDetails.range + 2 * MAX_SQUAD_SPREAD_FROM_CENTER_RADIUS
      const squadsAround = getSquadsFromGridByCircle(squadPosition, maxRange)

      let minDistance = Infinity
      let closestEnemySquadIndex = -1

      for (let i = 0; i < squadsAround.length; i++) {
        const enemySquad = unchecked(squadsAround[i])

        if (enemySquad.factionId == squad.factionId) continue
    
        const enemySquadPosition = enemySquad.centerPoint
        const distance = Math.hypot(
          enemySquadPosition.x - squadPosition.x,
          enemySquadPosition.y - squadPosition.y,
        )
  
        if (distance < minDistance) {
          const isRunning = squad.members.filter(
            member => MoveStates.includes(member.state)
          ).length > (squad.members.length / 2 as i32)
          // so if half of the squad is running
          if (isRunning) {
            const squadDirectionAngle = getMeanAngle(squad.members)
            const angleFromSquadToEnemy = Mathf.atan2(
              enemySquadPosition.x - squadPosition.x,
              squadPosition.y - enemySquadPosition.y,
            )
            if (getAngleDiff(squadDirectionAngle, angleFromSquadToEnemy) > squad.weaponDetails.maxChasingShootAngle) {
              // unit out of angle
              continue 
            }
          }
          closestEnemySquadIndex = i
          minDistance = distance
        }
      }
      
      if (closestEnemySquadIndex != -1) {
        squad.secondaryAttackAim = unchecked(squadsAround[closestEnemySquadIndex])
      }
    })
  })
}

export default searchForEnemy
