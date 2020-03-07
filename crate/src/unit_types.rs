pub enum UnitType {
  Solider
}

struct UnitDetails {
  movement_speed: u8,
  hp: u8,
}

static SOLIDER_DETAILS = UnitDetails { movement_speed: 2, hp: 100 }

pub fn get_unit_details(unit_type: UnitType) -> UnitDetails {
  match unit_types {
    UnitType::Solider => SOLIDER_DETAILS
  }
}