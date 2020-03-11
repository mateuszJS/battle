pub enum SquadType {
  Solider,
}

pub struct SquadDetails {
  movement_speed: u8,
  hp: u8,
  production_time: u16,
}

const SOLIDER_DETAILS: SquadDetails = SquadDetails {
  movement_speed: 2,
  hp: 100,
  production_time: 120,
};

pub fn get_unit_details(squad_type: SquadType) -> SquadDetails {
  match squad_type {
    SquadType::Solider => SOLIDER_DETAILS,
  }
}
