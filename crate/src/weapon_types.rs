pub enum WeaponType {
  StandardRifle,
  LaserRifle,
  Grenade,
  HitTheGround,
}

pub struct Weapon {
  pub name: WeaponType,
  pub chances_to_reload: f32,
  pub reload_time: u16,
  pub shoot_time: u16,
  pub scatter: f32,
  pub bullets_speed: f32,
  pub damage: f32,
  pub representation_id: f32,
  pub explosion_range: f32,
  pub range: f32, // between <DISTANCE_BETWEEN_ATTACKERS, MAX_WEAPON_RANGE>  from calc_positions
  pub can_shoot_during_running: bool,
  pub max_angle_during_run: f32,
}

pub static STANDARD_RIFLE_DETAILS: Weapon = Weapon {
  name: WeaponType::StandardRifle,
  chances_to_reload: 0.4,
  reload_time: 200,
  shoot_time: 40,
  scatter: 0.3, // (smaller -> more precise)
  bullets_speed: 10.0,
  damage: 10.0,
  representation_id: 1.0,
  explosion_range: 0.0,
  range: 600.0,
  can_shoot_during_running: true,
  max_angle_during_run: 0.7,
};

pub static LASER_RIFLE_DETAILS: Weapon = Weapon {
  name: WeaponType::LaserRifle,
  chances_to_reload: 0.4,
  reload_time: 200,
  shoot_time: 40,
  scatter: 0.3, // (smaller -> more precise)
  bullets_speed: 10.0,
  damage: 10.0,
  representation_id: 1.0,
  explosion_range: 0.0,
  range: 400.0,
  can_shoot_during_running: true,
  max_angle_during_run: 0.7,
};

pub static GRENADE_DETAILS: Weapon = Weapon {
  name: WeaponType::Grenade,
  chances_to_reload: 0.0,
  reload_time: 0,
  shoot_time: 0,
  scatter: 0.0, // (smaller -> more precise)
  bullets_speed: 5.0,
  damage: 30.0,
  representation_id: 2.0,
  explosion_range: 200.0,
  range: 300.0,
  can_shoot_during_running: false,
  max_angle_during_run: 0.0,
};

pub static HIT_THE_GROUND: Weapon = Weapon {
  name: WeaponType::HitTheGround,
  chances_to_reload: 0.0,
  reload_time: 0,
  shoot_time: 0,
  scatter: 0.0, // (smaller -> more precise)
  bullets_speed: 1.0,
  damage: 15.0,
  representation_id: 3.0,
  explosion_range: 80.0,
  range: 900.0,
  can_shoot_during_running: false,
  max_angle_during_run: 0.0,
};

pub static NON_WEAPON: Weapon = Weapon {
  name: WeaponType::HitTheGround,
  chances_to_reload: 0.0,
  reload_time: 0,
  shoot_time: 0,
  scatter: 0.0,
  bullets_speed: 0.0,
  damage: 0.0,
  representation_id: 0.0,
  explosion_range: 0.0,
  range: 0.0,
  can_shoot_during_running: false,
  max_angle_during_run: 0.0,
};

// TODO: always remember to update this const
pub const MAX_POSSIBLE_WEAPON_RANGE: f32 = 600.0;

pub fn get_weapon_details(weapon_type: &WeaponType) -> &'static Weapon {
  match *weapon_type {
    WeaponType::StandardRifle => &STANDARD_RIFLE_DETAILS,
    WeaponType::LaserRifle => &LASER_RIFLE_DETAILS,
    WeaponType::Grenade => &GRENADE_DETAILS,
    WeaponType::HitTheGround => &HIT_THE_GROUND,
  }
}
