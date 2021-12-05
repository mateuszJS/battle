import { MAX_SQUAD_SPREAD_FROM_CENTER_RADIUS, RepresentationId, UnitState, WeaponType } from "./constants"
import { getId } from "./get-id"
import { Point } from "./geom-types"
import { UNITS_OFFSET } from "./position-utils"
import { SquadDetails, SQUAD_DETAILS } from "./squad-details"
import { Unit } from "./unit"
import { WeaponDetails, WEAPON_DETAILS } from "./weapon-details"
import { getDirectTrack, getTrack } from "./track-manager"
import { UniquePoint } from "./geom-types"
import { getSquadPositions } from "./hex-positions"
import { getIsPointAvailable } from "./obstacles-manager"

class TaskTodo {
  trackDestination: Point | null
  attackAim: Squad | null
  abilityTarget: Point | null
}

export class Squad {
  public id: u32
  public abilityCoolDown: u16
  public isDuringFixingSquadCenter: bool // public to read destination from taskTodo if is during keeping coherency
  public taskTodo: TaskTodo // public to read destination for the user market, when is during keeping coherency
  private anyUnitStartedUsingAbility: bool
  public members: Array<Unit>
  public attackAim: Squad | null
  public secondaryAttackAim: Squad | null
  public abilityTarget: Point | null
  public track: Array<UniquePoint>
  public centerPoint: Point
  public squadDetails: SquadDetails
  public weaponDetails: WeaponDetails

  constructor(
    public factionId: u32,
    public type: RepresentationId,
  ) {
    this.id = getId()
    this.abilityCoolDown = 0;
    this.members = [];
    this.isDuringFixingSquadCenter = false;
    this.taskTodo = {
      abilityTarget: null,
      trackDestination: null,
      attackAim: null,
    }
    this.anyUnitStartedUsingAbility = false
    this.centerPoint = { x: 0, y: 0 }
    this.track = []
    this.attackAim = null
    this.secondaryAttackAim = null
    this.abilityTarget = null
    this.squadDetails = SQUAD_DETAILS.get(type)
    this.weaponDetails = WEAPON_DETAILS.get(WeaponType.StandardRifle)
  }

  updateCenter(): void {
    const sum = this.members.reduce((acc, member) => ({
      x: acc.x + member.x,
      y: acc.y + member.y,
    }), { x: 0, y: 0 } as Point)

    const len = this.members.length as f32

    this.centerPoint.x = sum.x / len
    this.centerPoint.y = sum.y / len
  }

  update(): void {
    if (this.abilityCoolDown > 0) {
      this.abilityCoolDown --
    }
    this.members.forEach(member => {
      member.update()
    })
  }

  keepCoherency(): void {
    const coherencyNotKept = this.members.some(member => {
      const centerPoint = member.squad.centerPoint
      return Math.hypot(
        centerPoint.x - member.x,
        centerPoint.y - member.y
      ) > MAX_SQUAD_SPREAD_FROM_CENTER_RADIUS
    });

    if (coherencyNotKept || this.getIsSquadCenterInvalid()) {
      this.fixSquadCenter()
    } else if (this.isDuringFixingSquadCenter) {
      this.isDuringFixingSquadCenter = false
      this.restoreTaskTodo()
    }
  }

  addMember(x: f32, y: f32, angle: f32): Unit {
    const newUnit = new Unit(x, y, angle, this)
    this.members.push(newUnit);
    this.recalculateMembersPosition();
    return newUnit
  }

  recalculateMembersPosition(): void {
    const positions = unchecked(UNITS_OFFSET[this.members.length - 1])
    for (let i = 0; i < positions.length; i++) {
      unchecked(this.members[i].positionOffset = positions[i])
    }
  }

  resetState(): void {
    this.abilityTarget = null
    this.attackAim = null
    this.track = []

    this.members.forEach(member => {
      member.resetState()
    })
  }

  fixSquadCenter(): void {
    if (!this.isDuringFixingSquadCenter) {
      this.isDuringFixingSquadCenter = true
      this.taskTodo = {
        trackDestination: this.track.length > 0
        ? unchecked(this.track[this.track.length - 1])
        : null,
        attackAim: this.attackAim,
        abilityTarget: this.abilityTarget,
      }
    }

    const correctPosition = unchecked(getSquadPositions(1, this.centerPoint.x, this.centerPoint.y)[0])
    this.resetState()
    this.track = getDirectTrack(this.centerPoint, correctPosition)
    this.members.forEach(unit => {
      unit.changeStateToRun()
    })
  }

  getIsSquadCenterInvalid(): bool {
    return !getIsPointAvailable(this.centerPoint.x, this.centerPoint.y, true)
  }

  setTask(
    destination: Point | null,
    enemyToAttack: Squad | null,
    abilityTarget: Point | null,
  ): void {
    if (this.isTakingNewTaskDisabled()) {
      this.taskTodo = {
        trackDestination: destination,
        attackAim: enemyToAttack,
        abilityTarget: abilityTarget,
      }
      return
    }

    if (this.getIsSquadCenterInvalid()) {
      this.fixSquadCenter()
      return
    }

    this.resetState()

    if (destination) {
      this.track = getTrack(this.centerPoint, destination);
      this.members.forEach(unit => {
        unit.changeStateToRun();
      });
    }

    this.attackAim = enemyToAttack
    this.abilityTarget = abilityTarget
  }

  isTakingNewTaskDisabled(): bool {
    return this.isDuringFixingSquadCenter
  }

  restoreTaskTodo(): void {
    this.resetState()

    if (this.taskTodo.trackDestination) {
      this.setTask(
        this.taskTodo.trackDestination,
        this.taskTodo.attackAim,
        this.taskTodo.abilityTarget,
      )
    }

    this.checkMembersCorrectness()
  }

  checkMembersCorrectness(): void {
    this.members = this.members.filter(member => member.state != UnitState.DIE)

    const attackAim = this.attackAim
    const secondaryAttackAim = this.secondaryAttackAim
    if (attackAim && attackAim.members.length == 0) {
      this.attackAim = null
    }
    if (secondaryAttackAim && secondaryAttackAim.members.length == 0) {
      this.secondaryAttackAim = null
    }

    this.keepCoherency()

    this.members.forEach(unit => {
      unit.checkCorrectness()
    })
  }

  getRepresentation(): Array<f32> {
    return this.members.map<Array<f32>>(unit => unit.getRepresentation()).flat()
  }
}
