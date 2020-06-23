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
  weapon_type: &'static WeaponType,
  aim: Weak<RefCell<Unit>>,
  lifetime: f32,
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

  pub fn add(
    &mut self,
    unit_id: f32,
    x: f32,
    y: f32,
    angle: f32,
    weapon_type: &'static WeaponType,
    weak_aim: Weak<RefCell<Unit>>,
  ) {
    let weapon_details = get_weapon_details(weapon_type);
    if let Some(ref_cell_aim) = weak_aim.upgrade() {
      let aim = ref_cell_aim.borrow();
      let distance = (x - aim.x).hypot(y - aim.y);
      let lifetime = distance / weapon_details.bullets_speed;

      self.bullets_representation.push(BulletRepresentation {
        unit_id,
        angle,
        speed: weapon_details.bullets_speed,
        representation_id: weapon_details.representation_id,
        lifetime,
      });
      self.bullets_data.push(BulletData {
        weapon_type,
        aim: weak_aim,
        lifetime,
      });
    }
  }

  pub fn update(&mut self) {
    self
      .bullets_data
      .iter_mut()
      .filter(|bullet| bullet.lifetime <= std::f32::EPSILON)
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
