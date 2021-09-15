import { MAX_SQUAD_SPREAD_FROM_CENTER_RADIUS } from "./constants"
import { getId } from "./get-id"
import { Point } from "./geom-types"
import { UNITS_OFFSET } from "./position-utils"
import { SquadDetails, SquadType, SQUAD_DETAILS } from "./squad-details"
import { Unit } from "./unit"
import { WeaponDetails, WeaponType, WEAPON_DETAILS } from "./weapon-details"
import { getTrack } from "./track-manager"
import { UniquePoint } from "./geom-types"

class TaskTodo {
  trackDestination: Point | null
  attackAim: Squad | null
  // abilityTarget: Point | null
}

export class Squad {
  public id: u32
  private abilityCoolDown: u16
  private isDuringKeepingCoherency: bool
  private taskTodo: TaskTodo
  private anyUnitStartedUsingAbility: bool
  public members: Array<Unit>
  public attackAim: Squad | null
  public secondaryAttackAim: Squad | null
  public track: Array<UniquePoint>
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
    this.members.forEach(member => {
      member.update()
    })
  }

  keepCoherency(): void {
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

  addMember(x: f32, y: f32, angle: f32): Unit {
    let newUnit = new Unit(x, y, angle, this)
    this.members.push(newUnit);
    this.recalculateMembersPosition();
    return newUnit
  }

  recalculateMembersPosition(): void {
    let positions = unchecked(UNITS_OFFSET[this.members.length - 1])
    for (let i = 0; i < positions.length; i++) {
      unchecked(this.members[i]).positionOffset = unchecked(positions[i])
    }
  }

  resetState(): void {
    // this.abilityTarget = null
    this.attackAim = null
    this.track = []

    this.members.forEach(member => {
      member.resetState()
    })
  }

  setDestination(destination: Point): void {
    trace("before setDestination", 2, destination.x, destination.y)
    // 1346.0924072265625, 1326.694580078125
    this.track = getTrack(this.centerPoint, destination);
    trace("this.track.length", 1, this.track.length)
    this.members.forEach(unit => {
      unit.changeStateToRun();
    });
  }

  taskSetDestination(destination: Point): void {
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

  restoreTaskTodo(): void {
    this.resetState()

    if (this.taskTodo.trackDestination) {
      this.setDestination(this.taskTodo.trackDestination)
    }
    this.attackAim = this.taskTodo.attackAim

    this.checkMembersCorrectness()
  }

  checkMembersCorrectness(): void {
    for (let i = 0; i < this.members.length; i++) {
      unchecked(this.members[i].checkCorrectness())
    }
  }

  getRepresentation(): Array<f32> {
    return this.members.map<Array<f32>>(unit => unit.getRepresentation()).flat()
  }
}
