import { PRODUCTION_LINE_LENGTH, REPRESENTATION_ENEMY_FACTORY, REPRESENTATION_USER_FACTORY } from "./constants";
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
  public id: f32
  private productionLine: Array<ProductionItem>
  private timeToCreate: u16
  private lastCreatedSquad: Squad | null
  private timeToCreateAnotherMember: u8
  
  
  constructor(
    private factionId: u32,
    public  x: f32,
    public  y: f32,
    public  angle: f32,
    private isOwnByUser: bool,
  ) {
    this.id = getId() as f32
    this.productionLine = []
    this.timeToCreate = 0
    this.lastCreatedSquad = null
    this.timeToCreateAnotherMember = 0
  }

  update(): Squad | null {
    let lastCreatedSquad = this.lastCreatedSquad
    if (lastCreatedSquad) {
      lastCreatedSquad.update()

      if (this.timeToCreateAnotherMember == 0) {
        this.timeToCreateAnotherMember = TIME_BETWEEN_MEMBERS_PRODUCTION
        let position = this.getCreationPoint()
        let newUnit = lastCreatedSquad.addMember(
          unchecked(position[0]),
          unchecked(position[1]),
          unchecked(position[2]),
          UnitState.IDLE,
        )

        let seedThrowingStrength = getRandom()
        let throwingStrength: f32 = 8.0 + seedThrowingStrength * 15.0;
        newUnit.changeStateToFly(this.angle, throwingStrength);
        // TODO: make newUnit fly

        if (lastCreatedSquad.members.length == lastCreatedSquad.squadDetails.numberOfMembers) {
          this.lastCreatedSquad = null
        }
      } else {
        this.timeToCreateAnotherMember --
      }
    }

    if (this.productionLine.length > 0 && this.lastCreatedSquad == null) {
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
    return [positionX as f32, positionY as f32, unitAngle]
  }

  getRepresentation(): Array<f32> {
    let progress = this.productionLine.length > 0
      ? this.timeToCreate / unchecked(this.productionLine[0]).totalTime
      : 0

    let results: Array<f32>

    if (this.isOwnByUser) {
      results = [
        REPRESENTATION_USER_FACTORY,
        this.id,
        progress,
      ]
      for (let i = 0; i < (PRODUCTION_LINE_LENGTH as i32); i++) {
        if (i < this.productionLine.length - 1) {
          results.push(unchecked(this.productionLine[i]).representationId)
        } else {
          results.push(0)
        }
      }
    } else {
      results = [
        REPRESENTATION_ENEMY_FACTORY,
        this.id, // why is it 4?!
        progress,
      ]
    }

    let lastCreatedSquad = this.lastCreatedSquad
    if (lastCreatedSquad != null) {
      return results.concat(lastCreatedSquad.getRepresentation())
    }
    return results
  }
}