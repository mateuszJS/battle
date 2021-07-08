import { PRODUCTION_LINE_LENGTH } from "./constants"
import { getRandom } from "./get-random"
import { Squad } from "./squad"
import { SquadType, SQUAD_DETAILS } from "./squad-details"

const TIME_BETWEEN_MEMBERS_PRODUCTION: u8 = 10

class Faction {
  factory: Factory

  constructor(
    public id: u32,
    public isUser: bool,
    factoryX: f32,
    factoryY: f32,
    factoryAngle: f32,
    public resource: u32 = 0,
    public squads: Squad[] = [],
    public squadsDuringCreation: Array<SquadType> = new Array(),
    private timeToNextCompleteProduction: u8 = 0,
    private lastCreatedSquad: Squad | null = null,
    private timeToNextSquadMember: u8 = 0,
  ) {
    this.factory = new Factory(factoryX, factoryY, factoryAngle, isUser)

    let portal = new Squad(id, SquadType.Portal)
    portal.add_member(factoryX, factoryY)
  }


  updateSquadsDuringCreation() {
    if (this.squadsDuringCreation.length > 0) {
      if (this.timeToNextCompleteProduction == 0) {
        // TODO: make a squad
        this.squadsDuringCreation.shift()
        if (this.squadsDuringCreation.length > 0) {
          let nextSquadType = unchecked(this.squadsDuringCreation[0])
          this.timeToNextCompleteProduction = SQUAD_DETAILS.get(nextSquadType).productionTime
        }
      } else {
        this.timeToNextCompleteProduction --
      }
    }

    if (this.lastCreatedSquad) {
      if (this.timeToNextSquadMember == 0) {
        // TODO: add member
        let maxMembersNumber = SQUAD_DETAILS.get(this.lastCreatedSquad.type).numberOfMembers;
        if (this.lastCreatedSquad.members.length == maxMembersNumber) {
          // todo: move lastCreatedSquad to squads array
          this.lastCreatedSquad = null
        } else {
          this.timeToNextSquadMember = TIME_BETWEEN_MEMBERS_PRODUCTION
        }
      } else {
        this.timeToNextSquadMember --
      }
    }
  }
}
