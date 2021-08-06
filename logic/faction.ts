import { REPRESENTATION_FACTION_ID } from "./constants"
import { Factory } from "./factory"
import { Squad } from "./squad"
import { SquadType } from "./squad-details"

export class Faction {
  public factory: Factory
  public squads: Squad[]
  private resource: u32

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
    portal.addMember(factoryX, factoryY, factoryAngle)
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
    const squadsRepresentation = this.squads.map<Array<f32>>(
      squad => squad.getRepresentation()
    ).flat()
    return factionDetails
      .concat(factoryRepresentation)
      .concat(squadsRepresentation)

    // this.squads.forEach(squad => squad.getRepresentation())
  }
}
