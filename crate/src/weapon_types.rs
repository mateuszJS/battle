pub enum WeaponType {
  StandardRifle,
}

pub struct Weapon {
  pub name: WeaponType,
  pub chances_to_reload: f32,
  pub reload_time: u16,
  pub shoot_time: u16,
  pub scatter: f32,
  pub bullets_speed: f32,
  pub damage: u16,
  pub representation_id: f32,
}

pub static STANDARD_RIFLE_DETAILS: Weapon = Weapon {
  name: WeaponType::StandardRifle,
  chances_to_reload: 0.4,
  reload_time: 200,
  shoot_time: 40,
  scatter: 0.3, // (smaller -> more precise)
  bullets_speed: 10.0,
  damage: 10,
  representation_id: 1.0,
};

pub fn get_weapon_details(weapon_type: &WeaponType) -> &'static Weapon {
  match *weapon_type {
    WeaponType::StandardRifle => &STANDARD_RIFLE_DETAILS,
  }
}
