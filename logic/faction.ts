import { Factory } from "./factory"
import { Squad } from "./squad"
import { SquadType } from "./squad-details"
import { UnitState } from "./unit"

export class Faction {
  private factory: Factory
  private resource: u32
  private squads: Squad[]

  constructor(
    public id: u32,
    public isUser: bool,
    private factoryX: f32,
    private factoryY: f32,
    private factoryAngle: f32,
  ) {
    this.factory = new Factory(id, factoryX, factoryY, factoryAngle, isUser)
    this.resource = 0
    this.squads = []
    let portal = new Squad(id, SquadType.Portal)
    portal.addMember(factoryX, factoryY, factoryAngle, UnitState.IDLE)
  }

  update(): void {
    this.factory.update()
  }
}
