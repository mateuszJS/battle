pub const MATH_PI: f32 = std::f64::consts::PI as f32;
pub const MAX_NUMBER_ITEMS_IN_PRODUCTION_LINE: usize = 5;
pub const NORMAL_SQUAD_RADIUS: f32 = 60.0;
pub const MAX_SQUAD_SPREAD_FROM_CENTER_RADIUS: f32 = NORMAL_SQUAD_RADIUS + 100.0;
pub const THRESHOLD_MAX_UNIT_DISTANCE_FROM_SQUAD_CENTER: f32 =
  MAX_SQUAD_SPREAD_FROM_CENTER_RADIUS + 200.0; // above this distance squad is recognized as too far
pub const WEAPON_RANGE: f32 = 600.0;
pub const ATTACKERS_DISTANCE: f32 = WEAPON_RANGE - NORMAL_SQUAD_RADIUS;

pub const SEARCH_FOR_ENEMIES_PERIOD: u32 = 40;
pub const MANAGE_HUNTERS_PERIOD: u32 = 2 * SEARCH_FOR_ENEMIES_PERIOD;
// times 2 because in SEARCH_FOR_ENEMIES_PERIOD we update "was_moved_in_previous_loop" field
// which is used in MANAGE_HUNTERS_PERIOD
pub const UPDATE_SQUAD_CENTER_PERIOD: u32 = 5;

pub const FACTORY_INFLUENCE_VALUE: f32 = 0.1;
pub const FACTORY_INFLUENCE_RANGE: f32 = 350.0;
