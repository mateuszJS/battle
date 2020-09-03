pub enum WeaponType {
  StandardRifle,
  Grenade,
}

pub struct Weapon {
  pub name: WeaponType,
  pub chances_to_reload: f32,
  pub reload_time: u16,
  pub shoot_time: u16,
  pub scatter: f32,
  pub bullets_speed: f32,
  pub damage: u8,
  pub representation_id: f32,
  pub explosion_range: f32,
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
  explosion_range: 0.0,
};

pub static GRENADE_DETAILS: Weapon = Weapon {
  name: WeaponType::Grenade,
  chances_to_reload: 0.0,
  reload_time: 0,
  shoot_time: 0,
  scatter: 0.0, // (smaller -> more precise)
  bullets_speed: 5.0,
  damage: 30,
  representation_id: 2.0,
  explosion_range: 200.0,
};

pub fn get_weapon_details(weapon_type: &WeaponType) -> &'static Weapon {
  match *weapon_type {
    WeaponType::StandardRifle => &STANDARD_RIFLE_DETAILS,
    WeaponType::Grenade => &GRENADE_DETAILS,
  }
}
