import { MAX_SQUAD_SPREAD_FROM_CENTER_RADIUS, NORMAL_SQUAD_RADIUS, UnitState } from "./constants"
import { Faction } from "./faction"
import { getAngleDiff } from "./get-angle-diff"
import getMeanAngle from "./get-mean-angle"
import { getSquadsFromGridByCircle } from './grid-manager'
import { Squad } from "./squad"

function isCurrentSecondaryAimInRange(
  onlyEnemiesInFrontOf: bool,
  squadDirectionAngle: f32,
  squad: Squad
): bool {
  const squadPosition = squad.centerPoint
  const secondaryAttackAim = squad.secondaryAttackAim

  if (!secondaryAttackAim) return false

  const currSecAimPos = secondaryAttackAim.centerPoint
  const distance = Mathf.hypot(squadPosition.x - currSecAimPos.x, squadPosition.y - currSecAimPos.y)

  if (distance < squad.weaponDetails.range - NORMAL_SQUAD_RADIUS) {
    // minus NORMAL_SQUAD_RADIUS so most of members should have aim in the range
    if (onlyEnemiesInFrontOf) {
      const angleFromSquadToEnemy = Mathf.atan2(
        currSecAimPos.x - squadPosition.x,
        squadPosition.y - currSecAimPos.y,
      )
      return getAngleDiff(squadDirectionAngle, angleFromSquadToEnemy) < squad.weaponDetails.maxChasingShootAngle
    }

    return true
  }

  return false
}

function searchForEnemy(factions: Faction[]): void {
  factions.forEach(faction => {
    faction.squads.forEach(squad => {
      // if you cannot run and shoot and you have attackAim, then you don't need secondaryAttackAim
      // when you have attackAim then you are running or in range with the enemy squad
      if (!squad.weaponDetails.shotDuringRun && squad.attackAim) {
        squad.secondaryAttackAim = null
        return
      }

      // so if half of the squad is running
      const squadIsRunning = squad.members.filter(
        member => member.state == UnitState.RUN || member.state == UnitState.CHASING
      ).length > (squad.members.length / 2 as i32)
      const onlyEnemiesInFrontOf = !squad.isDuringFixingSquadCenter && squadIsRunning

      // is staying, has aim to attack
      // no reason to look for secondary aim
      if (!onlyEnemiesInFrontOf && squad.attackAim) {
        squad.secondaryAttackAim = null
        return
      }

      const squadDirectionAngle = onlyEnemiesInFrontOf ? getMeanAngle(squad.members) : 0
      // we don't need direction if squad is not running

      if (isCurrentSecondaryAimInRange(onlyEnemiesInFrontOf, squadDirectionAngle, squad)) {
        return
      }

      /*===========LOOK FOR A NEW ENEMY============*/
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
          if (onlyEnemiesInFrontOf) {
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
      
      squad.secondaryAttackAim = closestEnemySquadIndex != -1
        ? unchecked(squadsAround[closestEnemySquadIndex])
        : null
    })
  })
}

export default searchForEnemy
