import { PRECALCULATED_ATTACKERS_POSITIONS } from "./attacker-positions"
import { REPRESENTATION_FACTION_ID } from "./constants"
import { Factory } from "./factory"
import { Point } from "./geom-types"
import { getSquadPositions, setAggressorPositions, setAbilityPositions } from "./hex-positions"
import { Squad } from "./squad"
import { SquadType } from "./squad-details"
import { getId } from "./get-id"
import { Ability } from "./ability-details"

export class Faction {
  public factory: Factory
  public squads: Squad[]
  public portal: Squad
  private resource: u32

  constructor(
    public id: i32,
    public isUser: bool,
    factoryX: f32,
    factoryY: f32,
    factoryAngle: f32,
  ) {
    this.portal = new Squad(id, SquadType.Portal)
    const portalMember = this.portal.addMember(factoryX, factoryY, factoryAngle)
    this.portal.updateCenter()

    this.factory = new Factory(portalMember.id, id, factoryX, factoryY, factoryAngle, isUser)
    this.resource = 0
    this.squads = []
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

  taskAddAbility(squadsIds: Uint32Array, abilityType: u8, destination: Point): void {
    let squadsToUseAbility: Squad[] = []
    for (let i = 0; i < this.squads.length; i++) {
      const squad = unchecked(this.squads[i])
      const ability = squad.squadDetails.ability

      if (squadsIds.includes(squad.id) && ability && ability.type == abilityType && squad.abilityCoolDown == 0) {
        squadsToUseAbility.push(squad)
      }
    }
    if (squadsToUseAbility.length > 0) {
      const ability = squadsToUseAbility[0].squadDetails.ability as Ability
      setAbilityPositions(squadsToUseAbility, ability, destination)
    }
  }

  taskAddDestination(squadsIds: Uint32Array, destination: Point): void {
    const positions = getSquadPositions(squadsIds.length, destination.x, destination.y)
    let positionIndex = 0
    for (let i = 0; i < this.squads.length; i++) {
      const squad = unchecked(this.squads[i])
      if (squadsIds.includes(squad.id)) {
        squad.setTask(unchecked(positions[positionIndex]), null, null)
        positionIndex ++
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

  taskAddEnemy(squadsIds: Uint32Array, enemySquad: Squad): void {
    let attackers: Squad[] = []
    for (let i = 0; i < this.squads.length; i++) {
      const squad = unchecked(this.squads[i])
      if (squadsIds.includes(squad.id)) {
        attackers.push(squad)
      }
    }
    setAggressorPositions(attackers, enemySquad)
  }

  checkSquadsCorrectness(): void {
    // I kept it because we had already a situation when forEach trowed an error
    // for (let i = 0; i < this.squads.length; i++) {
    //   unchecked(this.squads[i].checkMembersCorrectness())
    // }
    this.squads = this.squads.filter(squad => {
      if (squad.abilityCoolDown > 0) {
        squad.abilityCoolDown --
      }
      squad.checkMembersCorrectness()
      return squad.members.length != 0
    })
  }
}
