use super::{Squad, SquadsGrid, SquadsGridManager};
use crate::constants::THRESHOLD_MAX_UNIT_DISTANCE_FROM_SQUAD_CENTER;
use crate::unit::Unit;
use crate::weapon_types::{get_weapon_details, WeaponType};
use std::cell::RefCell;
use std::rc::Weak;

struct BulletRepresentation {
  unit_id: f32,
  angle: f32,
  speed: f32,
  representation_id: f32,
  lifetime: f32,
}

struct BulletData {
  owner_faction_id: u32,
  weapon_type: &'static WeaponType,
  aim: Weak<RefCell<Unit>>,
  lifetime: f32,
  target: Option<(f32, f32)>,
}

pub struct BulletsManager {
  bullets_representation: Vec<BulletRepresentation>,
  bullets_data: Vec<BulletData>,
}

impl BulletsManager {
  pub fn new() -> BulletsManager {
    BulletsManager {
      bullets_representation: vec![],
      bullets_data: vec![],
    }
  }

  pub fn add_explosion(
    &mut self,
    owner_faction_id: u32,
    unit_id: f32,
    source_x: f32,
    source_y: f32,
    target: (f32, f32),
    weapon_type: &'static WeaponType,
  ) {
    let weapon_details = get_weapon_details(weapon_type);
    let distance = (source_x - target.0).hypot(source_y - target.1);
    let lifetime = distance / weapon_details.bullets_speed;
    let angle = (target.0 - source_x).atan2(source_y - target.1);

    self.bullets_representation.push(BulletRepresentation {
      unit_id,
      angle,
      speed: weapon_details.bullets_speed,
      representation_id: weapon_details.representation_id,
      lifetime,
    });

    self.bullets_data.push(BulletData {
      owner_faction_id,
      weapon_type: weapon_type,
      aim: Weak::new(),
      lifetime,
      target: Some(target),
    });
  }

  pub fn add_fake_bullet(
    &mut self,
    unit_id: f32,
    distance: f32,
    angle: f32,
    weapon_type: &'static WeaponType,
  ) {
    let weapon_details = get_weapon_details(weapon_type);
    let lifetime = distance / weapon_details.bullets_speed;

    self.bullets_representation.push(BulletRepresentation {
      unit_id,
      angle,
      speed: weapon_details.bullets_speed,
      representation_id: weapon_details.representation_id,
      lifetime,
    });
  }

  pub fn add_bullet(
    &mut self,
    unit_id: f32,
    x: f32,
    y: f32,
    angle: f32,
    weapon_type: &'static WeaponType,
    weak_aim: Weak<RefCell<Unit>>,
    distance_mod: f32,
    hit: bool,
  ) {
    let weapon_details = get_weapon_details(weapon_type);
    if let Some(ref_cell_aim) = weak_aim.upgrade() {
      let aim = ref_cell_aim.borrow();
      let distance = (x - aim.x).hypot(y - aim.y) * distance_mod;
      let lifetime = distance / weapon_details.bullets_speed;

      self.bullets_representation.push(BulletRepresentation {
        unit_id,
        angle,
        speed: weapon_details.bullets_speed,
        representation_id: weapon_details.representation_id,
        lifetime,
      });

      if hit {
        self.bullets_data.push(BulletData {
          owner_faction_id: 0, // not needed for bullet, only for explosion
          weapon_type,
          aim: weak_aim,
          lifetime,
          target: None,
        });
      }
    }
  }

  fn do_explosion(bullet: &BulletData, squads_on_grid: &SquadsGrid) {
    let weapon_details = get_weapon_details(bullet.weapon_type);
    let target = bullet.target.unwrap();

    let squads_nearby = SquadsGridManager::get_squads_in_area(
      squads_on_grid,
      target.0,
      target.1,
      weapon_details.explosion_range,
    );

    squads_nearby.iter().for_each(|weak_squad| {
      if let Some(ref_cell_squad) = weak_squad.upgrade() {
        let mut squad = ref_cell_squad.borrow_mut();
        let squad_center = squad.shared.center_point;
        let squad_in_range = (squad_center.0 - target.0).hypot(squad_center.1 - target.1)
          <= weapon_details.explosion_range + THRESHOLD_MAX_UNIT_DISTANCE_FROM_SQUAD_CENTER;

        if squad_in_range
          && (weapon_details.is_hitting_allies || squad.faction_id != bullet.owner_faction_id)
        {
          squad.members.iter_mut().for_each(|ref_cell_unit| {
            let mut unit = ref_cell_unit.borrow_mut();
            let distance = (unit.x - target.0).hypot(unit.y - target.1);
            if distance <= weapon_details.explosion_range {
              let angle = (unit.x - target.0).atan2(target.1 - unit.y);
              let strength = (weapon_details.explosion_range - distance) * 0.05;
              unit.take_damage(
                weapon_details.damage * (1.0 - distance / weapon_details.explosion_range),
              );
              unit.change_state_to_fly(angle, strength);
            }
          })
        }
      }
    })
  }

  pub fn update(&mut self, squads_on_grid: &SquadsGrid) {
    self.bullets_data.iter_mut().for_each(|bullet| {
      if bullet.lifetime <= std::f32::EPSILON {
        if bullet.target.is_some() {
          BulletsManager::do_explosion(bullet, squads_on_grid);
        } else {
          if let Some(ref_cell_aim) = bullet.aim.upgrade() {
            let weapon_details = get_weapon_details(bullet.weapon_type);
            ref_cell_aim.borrow_mut().take_damage(weapon_details.damage);
          }
        }
      }
    });

    // combine those two into one, bc unit still fails
    self
      .bullets_data
      .retain(|bullet| bullet.lifetime > std::f32::EPSILON);

    self
      .bullets_data
      .iter_mut()
      .for_each(|bullet| bullet.lifetime -= 1.0);
  }

  pub fn get_representation(&mut self) -> Vec<f32> {
    let result = self
      .bullets_representation
      .iter()
      .flat_map(|bullet| {
        vec![
          bullet.representation_id,
          bullet.unit_id,
          bullet.angle,
          bullet.speed,
          bullet.lifetime,
        ]
      })
      .collect();
    self.bullets_representation.clear();
    result
  }
}
