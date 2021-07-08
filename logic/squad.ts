import { SpriteMaskFilter } from "pixi.js"
import { MAX_SQUAD_SPREAD_FROM_CENTER_RADIUS } from "./constants"
import { getId } from "./get-id"
import { getTrack, UNITS_OFFSET } from "./position-utils"
import { SquadDetails, SquadType, SQUAD_DETAILS } from "./squad-details"
import { Unit, UnitState } from "./unit"
import { WeaponDetails, WeaponType, WEAPON_DETAILS } from "./weapon-details"

class TaskTodo {
  trackDestination: Point | null
  attackAim: Squad | null
  // abilityTarget: Point | null
}

export class Squad {
  private id: u32
  private abilityCoolDown: u16
  private isDuringKeepingCoherency: bool
  private taskTodo: TaskTodo
  private anyUnitStartedUsingAbility: bool
  public members: Array<Unit>
  public attackAim: Squad | null
  public secondaryAttackAim: Squad | null
  public track: Array<Point>
  public centerPoint: Point
  public squadDetails: SquadDetails
  public weaponDetails: WeaponDetails

  constructor(
    public factionId: u32,
    public type: SquadType,
  ) {
    this.id = getId()
    this.abilityCoolDown = 0;
    this.members = [];
    this.isDuringKeepingCoherency = false;
    this.taskTodo = {
      // abilityTarget: null,
      trackDestination: null,
      attackAim: null,
    }
    this.anyUnitStartedUsingAbility = false
    this.centerPoint = { x: 0, y: 0 }
    this.track = []
    this.attackAim = null
    this.secondaryAttackAim = null
    this.squadDetails = SQUAD_DETAILS.get(type)
    this.weaponDetails = WEAPON_DETAILS.get(WeaponType.StandardRifle)
  }

  updateCenter() {
    let sumX: f32 = 0
    let sumY: f32 = 0

    this.members.forEach(member => {
      sumX += member.x
      sumY += member.y
    })

    this.centerPoint.x = sumX / this.members.length
    this.centerPoint.y = sumY / this.members.length
  }

  update() {

  }

  keepCoherency() {
    let coherencyNotKept = this.members.some(member => (
      Math.hypot(
        this.centerPoint.x - member.x,
        this.centerPoint.y - member.y
      ) > MAX_SQUAD_SPREAD_FROM_CENTER_RADIUS
    ));

    if (coherencyNotKept) {
      if (!this.isDuringKeepingCoherency) {
        this.isDuringKeepingCoherency = true
        this.taskTodo = {
          trackDestination: this.track.length > 0
            ? unchecked(this.track[this.track.length - 1])
            : null,
            attackAim: this.attackAim,
        }
      }
      this.setDestination(this.centerPoint)
    } else if (this.isDuringKeepingCoherency) {
      this.isDuringKeepingCoherency = false
      this.restoreTaskTodo()
    }
  }

  addMember(x: f32, y: f32, angle: f32, state: UnitState) {
    this.members.push(new Unit(x, y, angle, state, this));

    this.recalculateMembersPosition();
  }

  recalculateMembersPosition() {
    unchecked(UNITS_OFFSET[this.members.length]).forEach((position, index) => {
      this.members[index].positionOffset = position;
    })
  }

  resetState() {
    // this.abilityTarget = null
    this.attackAim = null
    this.track = []

    this.members.forEach(member => {
      member.resetState()
    })
  }

  setDestination(destination: Point) {
    this.track = getTrack(this.centerPoint, destination);

    this.members.forEach(unit => {
      unit.changeStateToRun();
    });
  }

  taskSetDestination(destination: Point) {
    if (this.isTakingNewTaskDisabled()) {
      this.taskTodo = {
        trackDestination: destination,
        attackAim: null,
      }
      return
    }

    this.resetState()
    this.setDestination(destination)
  }

  isTakingNewTaskDisabled(): bool {
    return this.isDuringKeepingCoherency
  }

  restoreTaskTodo() {
    this.resetState()

    if (this.taskTodo.trackDestination) {
      this.setDestination(this.taskTodo.trackDestination)
    }
    this.attackAim = this.taskTodo.attackAim

    this.checkMembersCorrectness()
  }

  checkMembersCorrectness() {
    this.members.forEach(member => member.checkCorrectness())
  }
}
