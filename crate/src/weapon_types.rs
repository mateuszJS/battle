pub enum WeaponType {
  StandardRifle,
}

pub struct WeaponDetails {
  pub speed: f32,
  pub damage: u8,
  pub representation_id: f32,
}

static STANDARD_RIFLE_DETAILS: WeaponDetails = WeaponDetails {
  speed: 10.0,
  damage: 10,
  representation_id: 1.0,
};

pub fn get_weapon_details(weapon_type: &WeaponType) -> &'static WeaponDetails {
  match *weapon_type {
    WeaponType::StandardRifle => &STANDARD_RIFLE_DETAILS,
  }
}
