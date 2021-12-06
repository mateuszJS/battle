import { MAX_SQUAD_SPREAD_FROM_CENTER_RADIUS, RepresentationId } from "./constants"
import { Point } from "./geom-types"
import { Unit } from "./unit"
import { WeaponDetails } from "./weapon-details"
import { convertLogicAngleToVisual, convertLogicOffsetToVisual } from './convert-coords-between-logic-and-visual'
import { getSquadsFromGridByCircle } from "./grid-manager"

const MIN_EXPLOSION_STRENGTH: f32 = 3

class BulletRepresentation {
  sourceId: f32
  angle: f32
  speed: f32
  representationId: f32
  lifetime: f32
}

class BulletData {
  owner_faction_id: u32
  weaponDetails: WeaponDetails
  singleTarget: Unit | null
  explosionTarget: Point | null
  lifetime: f32
}

var bullets_representation: BulletRepresentation[] = []
var bullets_data: BulletData[] = []

export function addBullet(
  unit: Unit,
  angle: f32,
  weaponDetails: WeaponDetails,
  singleTarget: Unit | null,
  explosionTarget: Point | null,
  distance: f32,
  hit: bool,
): void {
  const lifetime = distance / weaponDetails.bulletSpeed
  const visualSpeedCoords = convertLogicOffsetToVisual(angle, weaponDetails.bulletSpeed)

  bullets_representation.push({
    sourceId: unit.id as f32,
    angle: convertLogicAngleToVisual(angle),
    speed: Mathf.hypot(visualSpeedCoords.x, visualSpeedCoords.y),
    representationId: weaponDetails.representationId,
    lifetime: lifetime,
  });

  if (hit) {
    bullets_data.push({
      owner_faction_id: explosionTarget ? unit.squad.factionId : 0, // not needed for bullet, only for explosion
      weaponDetails,
      singleTarget: singleTarget,
      explosionTarget: explosionTarget,
      lifetime,
    });
  }
}

function doExplosion(bullet: BulletData): void {
  const explosionSource = bullet.explosionTarget as Point
  const explosionRange = bullet.weaponDetails.explosionRange
  const squadsAround = getSquadsFromGridByCircle(explosionSource, explosionRange)
  const maxSquadDistance = explosionRange + MAX_SQUAD_SPREAD_FROM_CENTER_RADIUS

  for (let i = 0; i < squadsAround.length; i++) {
    const squad = unchecked(squadsAround[i])
    const squadDistance = Mathf.hypot(
      squad.centerPoint.x - explosionSource.x,
      squad.centerPoint.y - explosionSource.y,
    )
    if (squadDistance < maxSquadDistance) {
      for (let j = 0; j < squad.members.length; j++) {
        const unit = unchecked(squad.members[j])
        const unitDistance = Mathf.hypot(unit.x - explosionSource.x, unit.y - explosionSource.y)
        if (unitDistance < explosionRange) {
          const angle = Mathf.atan2(unit.x - explosionSource.x, explosionSource.y - unit.y)
          const strength = Mathf.max(MIN_EXPLOSION_STRENGTH, (explosionRange - unitDistance) * 0.1)
          unit.takeDamage(
            bullet.weaponDetails.damage * (1 - unitDistance / explosionRange) as i16,
          )
          unit.changeStateToFly(angle, strength)
        }
      }
    }
  }
}

export function updateBullets(): void {
  bullets_data = bullets_data.filter(bullet => {
    if (bullet.lifetime < f32.EPSILON) {
      if (bullet.weaponDetails.explosionRange > f32.EPSILON) {
        doExplosion(bullet)
      } else {
        (bullet.singleTarget as Unit).takeDamage(bullet.weaponDetails.damage)
      }
      return false
    }

    bullet.lifetime--
    return true
  })
}

export function getBulletsRepresentation(): f32[] {
  const result = bullets_representation
    .map<f32[]>(bullet => [
      bullet.representationId,
      bullet.sourceId,
      bullet.angle,
      bullet.speed,
      bullet.lifetime,
    ]).flat()
  result.unshift(RepresentationId.Bullets as f32)
  bullets_representation = []
  return result
}
