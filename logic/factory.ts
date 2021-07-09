import { REPRESENTATION_ENEMY_FACTORY, REPRESENTATION_USER_FACTORY } from "./constants";
import { getId } from "./get-id";
import { getRandom } from "./get-random";
import { Squad } from "./squad";
import { SquadType, SQUAD_DETAILS } from "./squad-details";
import { UnitState } from "./unit";

const FACTORY_WIDTH: f32 = 400.0;
const TIME_BETWEEN_MEMBERS_PRODUCTION: u8 = 10

class ProductionItem {
  representationId: f32
  totalTime: f32
  squadType: SquadType
}

export class Factory {
  private id: f32
  private productionLine: Array<ProductionItem>
  private timeToCreate: u16
  private lastCreatedSquad: Squad | null
  private timeToCreateAnotherMember: u8
  
  
  constructor(
    private factionId: u32,
    private x: f32,
    private y: f32,
    private angle: f32,
    private isOwnByUser: bool,
  ) {
    this.id = getId() as f32
    this.productionLine = []
    this.timeToCreate = 0
    this.lastCreatedSquad = null
    this.timeToCreateAnotherMember = 0
  }

  update(): Squad | null {
    if (this.lastCreatedSquad != null) {
      if (this.timeToCreateAnotherMember == 0) {
        this.timeToCreateAnotherMember = TIME_BETWEEN_MEMBERS_PRODUCTION
        let position = this.getCreationPoint()
        let newUnit = this.lastCreatedSquad.addMember(
          unchecked(position[0]),
          unchecked(position[1]),
          unchecked(position[2]),
          UnitState.IDLE,
        )
        // TODO: make newUnit fly

        if (this.lastCreatedSquad.members.length == this.lastCreatedSquad.squadDetails.numberOfMembers) {
          this.lastCreatedSquad = null
        }
      } else {
        this.timeToCreateAnotherMember --
      }
    }

    if (this.productionLine.length > 0) {
      if (this.timeToCreate == 0) {
        if (this.productionLine.length > 1) {
          let nextSquadDetails = SQUAD_DETAILS.get(unchecked(this.productionLine[1].squadType))
          this.timeToCreate == nextSquadDetails.productionTime
        }
        this.lastCreatedSquad = new Squad(
          this.factionId,
          this.productionLine.shift().squadType
        )

        return this.lastCreatedSquad
      } else {
        this.timeToCreate --
      }
    }

    return null
  }

  addSquadDoProduction(squadType: SquadType): void {
    const squadDetails = SQUAD_DETAILS.get(squadType)
    if (this.productionLine.length == 0) {
      this.timeToCreate == squadDetails.productionTime
    }
    this.productionLine.push({
      squadType,
      totalTime: squadDetails.productionTime,
      representationId: squadDetails.representationId,
    })
  }

  getCreationPoint(): Array<f32> {
    let seedDistance = getRandom() - 0.5;
    let distance = seedDistance * FACTORY_WIDTH;
    let perpendicularAngle = this.angle + Math.PI / 2.0;
    let positionX = this.x + Math.sin(perpendicularAngle) * distance;
    let positionY = this.y - Math.cos(perpendicularAngle) * distance;
    let unitAngle = this.angle + seedDistance / 2.0;
    return [positionX, positionY, unitAngle]
  }

  getRepresentation(): Array<f32> {
    let progress = this.productionLine.length > 0
      ? this.timeToCreate / unchecked(this.productionLine[0]).totalTime
      : 0

    if (this.isOwnByUser) {
      let results = [
        REPRESENTATION_USER_FACTORY,
        this.id,
        progress,
      ]
      this.productionLine.forEach(productionItem => {
        results.push(productionItem.representationId)
      })
      return results
    } else {
      return [
        REPRESENTATION_ENEMY_FACTORY,
        this.id,
        progress,
      ]
    }
  }
}