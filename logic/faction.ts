import { RepresentationId } from "./constants"
import { Factory } from "./factory"
import { Point } from "./geom-types"
import {
  getSquadPositions,
  setAggressorPositions,
  setAbilityPositions,
} from "./hex-positions"
import { Squad } from "./squad"
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
    this.portal = new Squad(id, RepresentationId.EnemyFactory)
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
    // first update squad, later squads form factory
    // otherwise we will update new squad from factories twice
    const newCreatedSquad = this.factory.update()
    if (newCreatedSquad) {
      this.squads.push(newCreatedSquad)
    }
  }

  getRepresentation(): Array<f32> {
    const factionDetails = [
      RepresentationId.FactionId as f32,
      this.id as f32,
    ];
    
    const factoryRepresentation = this.factory.getRepresentation()
    const squadsRepresentation = this.squads.map<Array<f32>>(
      squad => squad.getRepresentation()
    ).flat()
    return factionDetails
      .concat(factoryRepresentation)
      .concat(squadsRepresentation)
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
    this.squads = this.squads.filter(squad => {
      if (squad.abilityCoolDown > 0) {
        squad.abilityCoolDown --
      }
      squad.checkMembersCorrectness()
      return squad.members.length != 0
    })
  }
}
