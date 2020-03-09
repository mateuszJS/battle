pub enum UnitType {
  Solider,
}

pub struct UnitDetails {
  movement_speed: u8,
  hp: u8,
  production_time: u16,
}

const SOLIDER_DETAILS: UnitDetails = UnitDetails {
  movement_speed: 2,
  hp: 100,
  production_time: 120,
};

pub fn get_unit_details(unit_type: UnitType) -> UnitDetails {
  match unit_type {
    UnitType::Solider => SOLIDER_DETAILS,
  }
}
