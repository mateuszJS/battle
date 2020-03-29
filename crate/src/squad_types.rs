pub enum SquadType {
  Solider,
}

pub struct SquadDetails {
  pub movement_speed: u8,
  pub hp: u8,
  pub production_time: u16,
  pub members_number: usize,
  pub representation_type: f32,
}

const SOLIDER_DETAILS: SquadDetails = SquadDetails {
  movement_speed: 2,
  hp: 100,
  production_time: 300,
  members_number: 6,
  representation_type: 2.0,
};

pub fn get_squad_details(squad_type: &SquadType) -> SquadDetails {
  match *squad_type {
    SquadType::Solider => SOLIDER_DETAILS,
  }
}
