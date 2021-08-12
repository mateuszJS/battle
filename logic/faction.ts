import { REPRESENTATION_FACTION_ID } from "./constants"
import { Factory } from "./factory"
import { Point } from "./geom-types"
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

  taskAddDestination(squadsIds: Uint32Array, destination: Point): void {
    for (let i = 0; i < this.squads.length; i++) {
      const squad = this.squads[i]
      if (squadsIds.includes(squad.id)) {
        squad.taskSetDestination(destination)
      }
    }

    // let position = PositionUtils::get_squads_positions(squads_ids.len(), target_x, target_y);
    // let mut index = 0;
    // self.squads.iter_mut().for_each(|ref_cell_squad| {
    //   let mut squad = ref_cell_squad.borrow_mut();
    //   if squads_ids.contains(&squad.id) {
    //     squad.task_add_target(position[index], false);
    //     index += 1;
    //   }
    // });
  }

  checkSquadsCorrectness(): void {
    for (let i = 0; i < this.squads.length; i++) {
      this.squads[i].checkMembersCorrectness()
    }
  }
}
