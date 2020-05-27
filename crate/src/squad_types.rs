pub enum SquadType {
  Solider,
}

pub struct SquadDetails {
  pub movement_speed: f32,
  pub hp: u8,
  pub production_time: u16,
  pub members_number: usize,
  pub representation_type: f32,
}

static SOLIDER_DETAILS: SquadDetails = SquadDetails {
  movement_speed: 2.5,
  hp: 100,
  production_time: 3,
  members_number: 7, // predicted max number of units in squad in utils is 7 MAX_NUMBER_OF_UNITS_IN_SQUAD
  representation_type: 2.0,
};

pub fn get_squad_details(squad_type: &SquadType) -> &'static SquadDetails {
  match *squad_type {
    SquadType::Solider => &SOLIDER_DETAILS,
  }
}
