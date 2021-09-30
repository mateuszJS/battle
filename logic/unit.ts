import { MAP_SKEW_ANGLE, MATH_PI_2, UnitState } from "./constants"
import { getAngleDiff } from "./get-angle-diff"
import { FLY_DECELERATION, FLY_MIN_SPEED, getFlyModes } from "./get-fly-modes"
import { getId } from "./get-id"
import { getInitialTrackIndex } from "./get-initial-track-index"
import { getRandom } from "./get-random"
import { Point } from "./geom-types"
import { Squad } from "./squad"
import { convertLogicCoordsToVisual } from "./convert-coords-between-logic-and-visual";

export class Unit {
  public id: f32
  private modX: f32
  private modY: f32
  private destination: Point
  private trackIndex: i8
  private timeToNextShoot: u16
  private attackAim: Unit | null
  private hp: i16
  private gettingUpProgress: f32
  private weaponAngleDuringChasing: f32
  public positionOffset: Point
  public state: UnitState
  public x: f32
  public y: f32
  private angle: f32
  public squad: Squad

  constructor(
    x: f32,
    y: f32,
    angle: f32,
    squad: Squad
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
    if (this.hp <= 0.0) {
      this.changeStateToDie()
    } else {
      this.state = UnitState.GETUP;
      this.gettingUpProgress = 0.0;
    }
  }

  updateGetup(): void {
    this.gettingUpProgress += 0.01
    if (this.gettingUpProgress >= 1.0) {
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
    return this.state > 3
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
    this.setAngle(destination.x, destination.y)
    this.modX = Mathf.sin(this.angle) * this.squad.squadDetails.movementSpeed
    this.modY = -Mathf.cos(this.angle) * this.squad.squadDetails.movementSpeed
  }

  goToCurrentPointOnTrack(): void {
    let currPoint = unchecked(this.squad.track[this.trackIndex])
    this.setDestination({
      x: currPoint.x + this.positionOffset.x,
      y: currPoint.y + this.positionOffset.y,
    });
  }

  updateRun(): void {
    let isTargetAchieved = Math.hypot(
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

      if (this.squad.squadDetails.isAllowedToChase && this.attackAim != null) {
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
    // this method always should be called after check correctness for squad (bc if enemy can be out of whole squad range in shooting)
    if (this.trackIndex != -1) {
      if (this.state != UnitState.RUN && this.state != UnitState.CHASING) {
        this.goToCurrentPointOnTrack()
      }
      if (secondaryAttackAim != null) {
        this.changeStateToShootDuringRunning(secondaryAttackAim)
      }
    } else if (squadAttackAim != null) {
      this.changeStateToShoot(squadAttackAim, true)
    } else if (secondaryAttackAim != null) {
      this.changeStateToShoot(secondaryAttackAim, false)
    } else {
      this.state = UnitState.IDLE
    }
  }

  setNewAttackAimDuringRunning(squadToAttack: Squad): void {
    let availableEnemyUnits: Unit[] = []
    for (let i = 0; i < squadToAttack.members.length; i++) {
      const member = unchecked(squadToAttack.members[i])
      let angleFroUnitToEnemyMember = Mathf.atan2(member.x - this.x, this.y - member.y)
      let angleDiff = getAngleDiff(this.angle, angleFroUnitToEnemyMember)
      if (Mathf.abs(angleDiff) < this.squad.squadDetails.maxChasingShootAngle) {
        availableEnemyUnits.push(member)
      }
    }

    let minDistance = Infinity
    let closestEnemy: Unit | null = null
    for (let i = 0; i < availableEnemyUnits.length; i++) {
      let enemyUnit = unchecked(availableEnemyUnits[i])
      let distance = Math.hypot(enemyUnit.x - this.x, enemyUnit.y - this.y)
      if (distance < minDistance) {
        closestEnemy = enemyUnit
        minDistance = distance
      }
    }
    // TODO: what in case if still enemy is out of weapon range???
    if (closestEnemy && minDistance < this.squad.weaponDetails.range) {
      this.attackAim = closestEnemy
      this.weaponAngleDuringChasing = Mathf.atan2(closestEnemy.x - this.x, this.y - closestEnemy.y)
    } else {
      this.attackAim = null
    }
  }

  changeStateToShootDuringRunning(squadToAttack: Squad): void {
    // check if unit can keep current aim
    const attackAim = this.attackAim 
    if (attackAim != null) {
      let distance = Mathf.hypot(attackAim.x - this.x, attackAim.y - this.y)
      if (distance <= this.squad.weaponDetails.range) {
        let angleFromUnitToAim = Mathf.atan2(attackAim.x - this.x, this.y - attackAim.y)
        if (getAngleDiff(this.angle, angleFromUnitToAim) < this.squad.squadDetails.maxChasingShootAngle) {
          this.weaponAngleDuringChasing = angleFromUnitToAim;
          return // it's okay, don't have to find an aim
        }
      }
    }

    this.setNewAttackAimDuringRunning(squadToAttack);
  }

  setAngle(destinationX: f32, destinationY: f32): void {
    this.angle = (Mathf.atan2(destinationX - this.x, this.y - destinationY) + MATH_PI_2) % MATH_PI_2
  }


  changeStateToShoot(squadToAttack: Squad, isImportantAim: bool): void {
    // check if unit can keep current aim
    const attackAim = this.attackAim
    if (attackAim != null) {
      let distance = Math.hypot(attackAim.x - this.x, attackAim.y - this.y)
      if (distance <= this.squad.weaponDetails.range) {
        this.state = UnitState.SHOOT // if changed from RUN -> IDLE and still has secondary aim from run
        this.setAngle(attackAim.x, attackAim.y)
        return // it's okay, don't have to find an aim
      }
    }

    let minDistance = Infinity
    let closestEnemyUnitIndex = -1
    for (let i = 0; i < squadToAttack.members.length; i++) {
      let enemyUnit = unchecked(squadToAttack.members[i])
      let distance = Math.hypot(enemyUnit.x - this.x, enemyUnit.y - this.y)

      if (distance < minDistance) {
        closestEnemyUnitIndex = i
        minDistance = distance
      }
    }

    if (closestEnemyUnitIndex != -1 && minDistance < this.squad.weaponDetails.range) {
      let enemyUnit = unchecked(squadToAttack.members[closestEnemyUnitIndex])
      this.setAngle(enemyUnit.x, enemyUnit.y)
      this.state = UnitState.SHOOT
      this.attackAim = enemyUnit
    } else if (isImportantAim) {
      let enemyUnit = unchecked(squadToAttack.members[closestEnemyUnitIndex])
      let angle = Mathf.atan2(this.x - enemyUnit.x, enemyUnit.y - this.y)
      let distanceToEnemy = this.squad.weaponDetails.range - this.squad.squadDetails.movementSpeed
      this.trackIndex = this.squad.track.length - 1 as u8;
      if (enemyUnit.state != UnitState.RUN && enemyUnit.state != UnitState.CHASING) {
        // if the enemy is running, then the faction's hunters should handle it
        this.setDestination({
          x: Mathf.sin(angle) * distanceToEnemy + enemyUnit.x,
          y: -Mathf.cos(angle) * distanceToEnemy + enemyUnit.y,
        });
      }
    } else {
      this.state = UnitState.IDLE
    }
  }


  updateShoot(): void {
    if (this.timeToNextShoot == 0) {
      let weapon = this.squad.weaponDetails
      let scatter = weapon.scatter * 2.0 * (getRandom() - 0.5)
      let distance = 80.0 * weapon.scatter * getRandom()

      let angle = this.state == UnitState.SHOOT
        ? this.angle
        : this.weaponAngleDuringChasing

      // bullet_manager.add_bullet(
      //   self.id as f32,
      //   self.x,
      //   self.y,
      //   angle + weaponDeviation,
      //   &squad_shared_info.weapon.name,
      //   self.aim.clone(),
      //   distance_mod,
      //   weaponDeviation.abs() < MAX_WEAPON_DEVIATION_TO_HIT,
      // );

      this.timeToNextShoot = getRandom() > weapon.chanceForReload
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
        // Abilities::updateAbility()
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
  }
}