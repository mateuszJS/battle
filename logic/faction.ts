import { REPRESENTATION_FACTION_ID } from "./constants"
import { Factory } from "./factory"
import { Squad } from "./squad"
import { SquadType } from "./squad-details"
import { UnitState } from "./unit"

export class Faction {
  public factory: Factory
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
    this.squads.forEach(squad => {
      squad.update()
    })
    // first update factory, later squads, otherwise we will update new squad twice
    let newCreatedSquad = this.factory.update()
    if (newCreatedSquad) {
      this.squads.push(newCreatedSquad)
    }
  }

  getRepresentation(): Array<f32> {
    let factionDetails = [
      REPRESENTATION_FACTION_ID,
      this.id as f32,
    ];
    
    const factoryRepresentation = this.factory.getRepresentation()
    return factionDetails.concat(factoryRepresentation)

    // this.squads.forEach(squad => squad.getRepresentation())
  }
}
