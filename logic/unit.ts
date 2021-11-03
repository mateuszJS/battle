import { MAP_SKEW_ANGLE, MATH_PI_2, UnitState } from "./constants"
import { getAngleDiff } from "./get-angle-diff"
import { FLY_DECELERATION, FLY_MIN_SPEED, getFlyModes } from "./get-fly-modes"
import { getId } from "./get-id"
import { getInitialTrackIndex } from "./get-initial-track-index"
import { getRandom } from "./get-random"
import { Point } from "./geom-types"
import { Squad } from "./squad"
import { convertLogicCoordsToVisual } from "./convert-coords-between-logic-and-visual"
import { addBullet } from "./bullets-manager"
import { Ability } from "./ability-details"

export class Unit {
  public id: f32
  private modX: f32
  private modY: f32
  private destination: Point
  private trackIndex: i8
  private timeToNextShoot: u16
  private attackAim: Unit | null
  public hp: i16
  private gettingUpProgress: f32
  private weaponAngleDuringChasing: f32
  public positionOffset: Point
  public state: UnitState
  public x: f32
  public y: f32
  public angle: f32
  public squad: Squad
  public hasFinishedUsingAbility: bool

  constructor(
    x: f32,
    y: f32,
    angle: f32,
    squad: Squad,
  ) {
    this.x = x
    this.y = y
    this.angle = angle
    this.squad = squad
    this.id = getId() as f32
    this.positionOffset = { x: 0, y: 0 }
    this.modX = 0
    this.modY = 0
    this.destination = { x: x, y: y }
    this.trackIndex = -1
    this.timeToNextShoot = 0
    this.attackAim = null
    this.hp = squad.squadDetails.maxHealth
    this.gettingUpProgress = 0.0
    this.weaponAngleDuringChasing = 0.0
    this.state = UnitState.IDLE
    this.hasFinishedUsingAbility = false
  }

  changeStateToFly(angle: f32, strength: f32): void {
    this.state = UnitState.FLY;
    this.angle = (angle + Mathf.PI) % MATH_PI_2
    let flyMods = getFlyModes(angle, this.x, this.y, strength);
    this.modX = flyMods.x;
    this.modY = flyMods.y;
  }

  updateFly(): void {
    this.x += this.modX
    this.y += this.modY

    this.modX *= FLY_DECELERATION
    this.modY *= FLY_DECELERATION

    if (Math.hypot(this.modX, this.modY) <= FLY_MIN_SPEED) {
      this.changeStateToGetup()
    }
  }

  changeStateToGetup(): void {
    if (this.hp <= 0) {
      this.changeStateToDie()
    } else {
      this.state = UnitState.GETUP;
      this.gettingUpProgress = 0;
    }
  }

  updateGetup(): void {
    this.gettingUpProgress += 0.01
    if (this.gettingUpProgress >= 1) {
      this.state = UnitState.IDLE
      if (this.trackIndex != -1) {
        this.trackIndex = getInitialTrackIndex(
          Math.max(0, this.trackIndex - 1) as i8,
          this.x,
          this.y,
          this.squad,
        );
      }
    }
  }

  isChangeStateAllowed(): bool {
    return this.state > UnitState.ABILITY
  }

  changeStateToRun(): void {
    this.trackIndex = getInitialTrackIndex(0, this.x, this.y, this.squad)
  }

  setDestination(destination: Point): void {
    if (this.state != UnitState.RUN && this.state != UnitState.CHASING) {
      this.state = UnitState.RUN
    }

    this.destination = destination
    // TODO: I'm not really sure about this atan2
    this.angle = this.getAngle(destination.x, destination.y)
    this.modX = Mathf.sin(this.angle) * this.squad.squadDetails.movementSpeed
    this.modY = -Mathf.cos(this.angle) * this.squad.squadDetails.movementSpeed
  }

  goToCurrentPointOnTrack(): void {
    const currPoint = unchecked(this.squad.track[this.trackIndex])
    this.setDestination({
      x: currPoint.x + this.positionOffset.x,
      y: currPoint.y + this.positionOffset.y,
    });
  }

  updateRun(): void {
    const isTargetAchieved = Math.hypot(
      this.x - this.destination.x,
      this.y - this.destination.y,
    ) < this.squad.squadDetails.movementSpeed

    if (isTargetAchieved) {
      if (this.squad.track.length - 1 == this.trackIndex) {
        this.resetState();
      } else {
        this.trackIndex += 1;
        this.goToCurrentPointOnTrack();
      }
    } else {
      this.x += this.modX;
      this.y += this.modY;

      if (this.squad.weaponDetails.shotDuringRun && this.attackAim != null) {
        this.state = UnitState.CHASING
        this.updateShoot()
      }
    }
  }

  resetState(): void {
    // never call when is during using ability/keeping coherency
    this.trackIndex = -1
    this.attackAim = null

    if (this.isChangeStateAllowed()) {
      this.state = UnitState.IDLE
      this.modX = 0.0
      this.modY = 0.0
    }
  }

  checkCorrectness(): void {
    if (!this.isChangeStateAllowed()) return
    const secondaryAttackAim = this.squad.secondaryAttackAim
    const squadAttackAim = this.squad.attackAim
    const squadAbilityTarget = this.squad.abilityTarget
    // this method always should be called after check correctness for squad (bc if enemy can be out of whole squad range in shooting)
    if (this.trackIndex != -1) {
      if (this.state != UnitState.RUN && this.state != UnitState.CHASING) {
        this.goToCurrentPointOnTrack()
      }
      const squadToAttack = squadAttackAim || secondaryAttackAim
      if (this.squad.weaponDetails.shotDuringRun && squadToAttack) {
        this.changeStateToShoot(squadToAttack, squadAttackAim != null, true)
      }
    } else if (squadAbilityTarget && this.state != UnitState.ABILITY && !this.hasFinishedUsingAbility) {
      (this.squad.squadDetails.ability as Ability).start(this)
      // assuming that unit cannot be disrupted during using ability,
      // unit is always able to use ability, then squad has ability_target and self.track_index == -1
    } else if (squadAttackAim != null) {
      this.changeStateToShoot(squadAttackAim, true, false)
    } else if (secondaryAttackAim != null) {
      this.changeStateToShoot(secondaryAttackAim, false, false)
    } else {
      this.state = UnitState.IDLE
    }
  }



  getAngle(x: f32, y: f32): f32 {
    return (Mathf.atan2(x - this.x, this.y - y) + MATH_PI_2) % MATH_PI_2
  }


  changeStateToShoot(squadToAttack: Squad, isImportantAim: bool, isRunning: bool): void {
    // check if unit can keep current aim
    if (isRunning && !this.squad.weaponDetails.shotDuringRun) return

    const attackAim = this.attackAim
    if (attackAim != null && attackAim.hp > 0) {
      const distance = Math.hypot(attackAim.x - this.x, attackAim.y - this.y)
      if (distance <= this.squad.weaponDetails.range) {

        if (isRunning) {
          // check angle to make sure that is allowed
          const angleFromUnitToAim = Mathf.atan2(attackAim.x - this.x, this.y - attackAim.y)
          if (getAngleDiff(this.angle, angleFromUnitToAim) < this.squad.weaponDetails.maxChasingShootAngle) {
            this.state = UnitState.CHASING
            this.weaponAngleDuringChasing = angleFromUnitToAim
            return // it's okay, don't have to find an aim
          }
        } else {
          // is allowed because is not running, so can rotate, checking angle is not needed
          this.state = UnitState.SHOOT
          this.angle = this.getAngle(attackAim.x, attackAim.y)
          return // it's okay, don't have to find an aim
        }
      }
    }

    let minDistance = Infinity
    let closestEnemyUnitIndex = -1
    for (let i = 0; i < squadToAttack.members.length; i++) {
      const enemyUnit = unchecked(squadToAttack.members[i])
      const distance = Math.hypot(enemyUnit.x - this.x, enemyUnit.y - this.y)

      if (distance < minDistance && enemyUnit.hp > 0) {
        if (isRunning) {
          const angleFromUnitToEnemy = Mathf.atan2(enemyUnit.x - this.x, this.y - enemyUnit.y)
          if (getAngleDiff(this.angle, angleFromUnitToEnemy) > this.squad.weaponDetails.maxChasingShootAngle) {
            // unit out of angle
            continue
          }
        }
        closestEnemyUnitIndex = i
        minDistance = distance
      }
    }

    if (minDistance < this.squad.weaponDetails.range) {
      const enemyUnit = unchecked(squadToAttack.members[closestEnemyUnitIndex])

      if (isRunning) {
        this.weaponAngleDuringChasing = this.getAngle(enemyUnit.x, enemyUnit.y)
        this.state = UnitState.CHASING
      } else {
        this.angle = this.getAngle(enemyUnit.x, enemyUnit.y)
        this.state = UnitState.SHOOT
      }
      this.attackAim = enemyUnit
    } else if (!isRunning && isImportantAim) {
      // unit is not running, but should go for the enemy
      const enemyUnit = unchecked(squadToAttack.members[closestEnemyUnitIndex])
      const angle = Mathf.atan2(this.x - enemyUnit.x, enemyUnit.y - this.y)
      const distanceToEnemy = this.squad.weaponDetails.range - this.squad.squadDetails.movementSpeed
      this.trackIndex = this.squad.track.length - 1 as u8;
      this.setDestination({
        x: Mathf.sin(angle) * distanceToEnemy + enemyUnit.x,
        y: -Mathf.cos(angle) * distanceToEnemy + enemyUnit.y,
      })
    } else if (isRunning) {
      // to make sure it's not chasing
      this.state = UnitState.RUN
      this.attackAim = null
    } else {
      this.resetState()
    }
  }


  updateShoot(): void {
    if (this.timeToNextShoot == 0) {
      const weapon = this.squad.weaponDetails
      const scatterSeed =  getRandom() - 0.5
      const distanceModSeed = getRandom() - 0.5

      const angle = this.state == UnitState.SHOOT
        ? this.angle
        : this.weaponAngleDuringChasing

      const attackAim = this.attackAim as Unit
      const targetRadius = attackAim.squad.squadDetails.unitRadius
      const distance = Mathf.hypot(this.x - attackAim.x, this.y - attackAim.y) * (1 + distanceModSeed / 4)// - this.squad.squadDetails.unitRadius
      // we are subtracting unitRadius * 1.5, because a bullet comes from unit rifle, not from the center of the base

      addBullet(
        this,
        angle + weapon.scatter * 2.0 * scatterSeed, // 2.0 * scatterSeed -> < -1, 1 >
        weapon,
        attackAim,
        null,
        distance,
        Math.abs(scatterSeed) + Math.abs(distanceModSeed) < targetRadius / 100,
      );

      this.timeToNextShoot = getRandom() < weapon.chanceForReload
        ? weapon.reloadTime
        : weapon.shootTime
      
    } else {
      this.timeToNextShoot -= 1
    }
  }

  update(): void {
    switch (this.state) {
      case UnitState.FLY:
        this.updateFly()
        break;
      case UnitState.GETUP:
        this.updateGetup()
        break;
      case UnitState.RUN:
      case UnitState.CHASING:
        this.updateRun()
        break;
      case UnitState.SHOOT:
        this.updateShoot()
        break;
      case UnitState.ABILITY:
        (this.squad.squadDetails.ability as Ability).update(this)
        break;
    }
  }

  getAdditionalRepresentationParam(): f32 {
    switch (this.state) {
      case UnitState.FLY : return Mathf.hypot(this.modX, this.modY)
      case UnitState.GETUP: return this.gettingUpProgress
      case UnitState.SHOOT : return this.timeToNextShoot
      case UnitState.ABILITY: return 0 //Abilities::get_representation_state(self)
      case UnitState.CHASING: return this.attackAim != null
        ? this.timeToNextShoot
        : 0
      default: return 0
    }
  }

  getRepresentation(): Array<f32> {
    const unitPos = convertLogicCoordsToVisual(this.x, this.y)
    return [
      this.squad.squadDetails.representationId,
      this.id,
      unitPos.x,
      unitPos.y,
      this.angle + MAP_SKEW_ANGLE,
      this.state as f32,
      this.getAdditionalRepresentationParam(),
    ]
  }

  changeStateToDie(): void {
    this.state = UnitState.DIE;
    this.modX = 0.0;
    this.modY = 0.0;
  }

  takeDamage(damage: u16): void {
    this.hp -= damage

    if (this.hp <= 0 && this.isChangeStateAllowed()) {
      this.changeStateToDie()
    }
  }
}