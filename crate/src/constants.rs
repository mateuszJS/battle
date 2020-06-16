pub const MATH_PI: f32 = std::f64::consts::PI as f32;
pub const MAX_NUMBER_ITEMS_IN_PRODUCTION_LINE: usize = 5;
pub const NORMAL_SQUAD_RADIUS: f32 = 60.0;
pub const MAX_SQUAD_SPREAD_FROM_CENTER_RADIUS: f32 = NORMAL_SQUAD_RADIUS + 60.0;
pub const THRESHOLD_MAX_UNIT_DISTANCE_FROM_SQUAD_CENTER: f32 =
  MAX_SQUAD_SPREAD_FROM_CENTER_RADIUS + 200.0; // above this distance squad is recognized as too far
pub const WEAPON_RANGE: f32 = 600.0;
pub const THRESHOLD_SQUAD_MOVED: f32 = 10.0;
pub const ATTACKERS_DISTANCE: f32 = WEAPON_RANGE - NORMAL_SQUAD_RADIUS - THRESHOLD_SQUAD_MOVED;

pub const MANAGE_HUNTERS_PERIOD: u32 = 60;
pub const UPDATE_SQUAD_CENTER_PERIOD: u32 = 20;
pub const SEARCH_FOR_ENEMIES_PERIOD: u32 = 90;
