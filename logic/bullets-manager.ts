import { REPRESENTATION_BULLETS } from "./constants"
import { Point } from "./geom-types"
import { Unit } from "./unit"
import { WeaponDetails } from "./weapon-details"

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
  singleTarget: Unit
  lifetime: f32
  explosionTarget: Point | null
}

var bullets_representation: BulletRepresentation[] = []
var bullets_data: BulletData[] = []

// function add_explosion(
//     owner_faction_id: u32,
//     unit_id: f32,
//     source_x: f32,
//     source_y: f32,
//     target: Point,
//     weapon_type: &'static WeaponType,
//   ) {
//     let weapon_details = get_weapon_details(weapon_type);
//     let distance = (source_x - target.0).hypot(source_y - target.1);
//     let lifetime = distance / weapon_details.bullets_speed;
//     let angle = (target.0 - source_x).atan2(source_y - target.1);

//     self.bullets_representation.push(BulletRepresentation {
//       unit_id,
//       angle,
//       speed: weapon_details.bullets_speed,
//       representation_id: weapon_details.representation_id,
//       lifetime,
//     });

//     self.bullets_data.push(BulletData {
//       owner_faction_id,
//       weapon_type: weapon_type,
//       aim: Weak::new(),
//       lifetime,
//       target: Some(target),
//     });
//   }

  // function add_fake_bullet(
  //   &mut self,
  //   unit_id: f32,
  //   distance: f32,
  //   angle: f32,
  //   weapon_type: &'static WeaponType,
  // ) {
  //   let weapon_details = get_weapon_details(weapon_type);
  //   let lifetime = distance / weapon_details.bullets_speed;

  //   self.bullets_representation.push(BulletRepresentation {
  //     unit_id,
  //     angle,
  //     speed: weapon_details.bullets_speed,
  //     representation_id: weapon_details.representation_id,
  //     lifetime,
  //   });
  // }

export function addBullet(
  sourceId: f32,
  x: f32,
  y: f32,
  angle: f32,
  weaponDetails: WeaponDetails,
  target: Unit,
  distance_mod: f32,
  hit: bool,
): void {
  const distance = Mathf.hypot(x - target.x, y - target.y) * distance_mod
  const lifetime = distance / weaponDetails.bulletSpeed

  bullets_representation.push({
    sourceId,
    angle,
    speed: weaponDetails.bulletSpeed,
    representationId: weaponDetails.representationId,
    lifetime,
  });

  if (hit) {
    bullets_data.push({
      owner_faction_id: 0, // not needed for bullet, only for explosion
      weaponDetails,
      singleTarget: target,
      lifetime,
      explosionTarget: null,
    });
  }
}

  // fn do_explosion(bullet: &BulletData, squads_on_grid: &SquadsGrid) {
  //   let weapon_details = get_weapon_details(bullet.weapon_type);
  //   let target = bullet.target.unwrap();

  //   let squads_nearby = SquadsGridManager::get_squads_in_area(
  //     squads_on_grid,
  //     target.0,
  //     target.1,
  //     weapon_details.explosion_range,
  //   );

  //   squads_nearby.iter().for_each(|weak_squad| {
  //     if let Some(ref_cell_squad) = weak_squad.upgrade() {
  //       let mut squad = ref_cell_squad.borrow_mut();
  //       let squad_center = squad.shared.center_point;
  //       let squad_in_range = (squad_center.0 - target.0).hypot(squad_center.1 - target.1)
  //         <= weapon_details.explosion_range + THRESHOLD_MAX_UNIT_DISTANCE_FROM_SQUAD_CENTER;

  //       if squad_in_range
  //         && (weapon_details.is_hitting_allies || squad.faction_id != bullet.owner_faction_id)
  //       {
  //         squad.members.iter_mut().for_each(|ref_cell_unit| {
  //           let mut unit = ref_cell_unit.borrow_mut();
  //           let distance = (unit.x - target.0).hypot(unit.y - target.1);
  //           if distance <= weapon_details.explosion_range {
  //             let angle = (unit.x - target.0).atan2(target.1 - unit.y);
  //             let strength = (weapon_details.explosion_range - distance) * 0.05;
  //             unit.take_damage(
  //               weapon_details.damage * (1.0 - distance / weapon_details.explosion_range),
  //             );
  //             unit.change_state_to_fly(angle, strength);
  //           }
  //         })
  //       }
  //     }
  //   })
  // }

export function updateBullets(/*squads_on_grid: &SquadsGrid*/): void {
  let newBulletsData: BulletData[] = []

  for (let i = 0; i < bullets_data.length; i++) {
    const bullet = unchecked(bullets_data[i])
    if (bullet.lifetime <= f32.EPSILON) {
      if (bullet.explosionTarget) {
        // BulletsManager::do_explosion(bullet, squads_on_grid);
      } else {
        bullet.singleTarget.takeDamage(bullet.weaponDetails.damage);
      }
    } else {
      bullet.lifetime--
      newBulletsData.push(bullet)
    }
  }

  bullets_data = newBulletsData
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
  result.unshift(REPRESENTATION_BULLETS)
  bullets_representation = []
  return result
}
