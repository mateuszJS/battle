import { MATH_PI_HALF, PRODUCTION_LINE_LENGTH, RepresentationId } from "./constants";
import { getId } from "./get-id";
import { getRandom } from "./get-random";
import { Squad } from "./squad";
import { SQUAD_DETAILS } from "./squad-details";

const FACTORY_WIDTH: f32 = 400.0;
const TIME_BETWEEN_MEMBERS_PRODUCTION: u8 = 10

class ProductionItem {
  totalTime: f32
  representationId: RepresentationId
}

export class Factory {
  private productionLine: Array<ProductionItem>
  private timeToCreate: u16
  private lastCreatedSquad: Squad | null
  private timeToCreateAnotherMember: u8

  constructor(
    public id: f32,
    private factionId: i32,
    public  x: f32,
    public  y: f32,
    public  angle: f32,
    private isOwnByUser: bool,
  ) {
    this.productionLine = []
    this.timeToCreate = 0
    this.lastCreatedSquad = null
    this.timeToCreateAnotherMember = 0
  }

  update(): Squad | null {
    const lastCreatedSquad = this.lastCreatedSquad
    if (lastCreatedSquad) {
      lastCreatedSquad.update()

      if (this.timeToCreateAnotherMember == 0) {
        this.timeToCreateAnotherMember = TIME_BETWEEN_MEMBERS_PRODUCTION
        const position = this.getCreationPoint()
        const newUnit = lastCreatedSquad.addMember(
          unchecked(position[0]),
          unchecked(position[1]),
          unchecked(position[2]),
        )

        const seedThrowingStrength = getRandom()
        const throwingStrength: f32 = 4.5 + seedThrowingStrength * 7.0;
        newUnit.changeStateToFly(this.angle, throwingStrength);

        if (lastCreatedSquad.members.length == lastCreatedSquad.squadDetails.numberOfMembers) {
          this.lastCreatedSquad = null
          return lastCreatedSquad
        }
      } else {
        this.timeToCreateAnotherMember --
      }
    } else if (this.productionLine.length > 0) {
      if (this.timeToCreate == 0) {
        if (this.productionLine.length > 1) {
          const nextSquadDetails = SQUAD_DETAILS.get(unchecked(this.productionLine[1].representationId))
          this.timeToCreate == nextSquadDetails.productionTime
        }
        this.lastCreatedSquad = new Squad(
          this.factionId,
          this.productionLine.shift().representationId
        )
      } else {
        this.timeToCreate --
      }
    }

    return null
  }

  addSquadDoProduction(representationId: RepresentationId): void {
    const squadDetails = SQUAD_DETAILS.get(representationId)
    if (this.productionLine.length == 0) {
      this.timeToCreate == squadDetails.productionTime
    }
    this.productionLine.push({
      totalTime: squadDetails.productionTime,
      representationId,
    })
  }

  getCreationPoint(): Array<f32> {
    const seedDistance = getRandom() - 0.5
    const distance = seedDistance * FACTORY_WIDTH
    const perpendicularAngle = this.angle + MATH_PI_HALF
    const positionX = this.x + Mathf.sin(perpendicularAngle) * distance
    const positionY = this.y - Mathf.cos(perpendicularAngle) * distance
    const unitAngle = this.angle + seedDistance / 2
    return [positionX, positionY, unitAngle]
  }

  getRepresentation(): Array<f32> {
    const progress = this.productionLine.length > 0
      ? this.timeToCreate / unchecked(this.productionLine[0]).totalTime
      : 0

    let results: f32[] = [
      (this.isOwnByUser ? RepresentationId.UserFactory : RepresentationId.EnemyFactory) as f32,
      this.id,
      progress,
    ]

    if (this.isOwnByUser) {
      for (let i = 0; i < (PRODUCTION_LINE_LENGTH as i32); i++) {
        if (i < this.productionLine.length - 1) {
          results.push(unchecked(this.productionLine[i]).representationId as f32)
        } else {
          results.push(0)
        }
      }
    }

    const lastCreatedSquad = this.lastCreatedSquad
    if (lastCreatedSquad != null) {
      // it's returned from factory getRepresentation but it's actually representation of the squad
      return results.concat(lastCreatedSquad.getRepresentation())
    }
    return results
  }
}