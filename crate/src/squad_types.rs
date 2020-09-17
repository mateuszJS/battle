use crate::representations_ids::{
  NON_REPRESENTATION_ID, RAPTOR_REPRESENTATION_ID, SOLIDER_REPRESENTATION_ID,
};
use crate::weapon_types::{Weapon, NON_WEAPON, STANDARD_RIFLE_DETAILS};

pub enum SquadType {
  Solider,
  Raptor,
  Portal,
}

pub struct SquadDetails {
  pub movement_speed: f32,
  pub hp: i16,
  pub production_time: u16,
  pub members_number: usize,
  pub representation_type: f32,
  pub unit_model_offset_y: f32, // for selection
  pub selection_threshold: f32, // for selection
  pub weapon: &'static Weapon,
  pub influence_value: f32,
}

static SOLIDER_DETAILS: SquadDetails = SquadDetails {
  movement_speed: 2.5,
  hp: 100,
  production_time: 200,
  members_number: 7,
  // predicted max number of units in squad in utils is 7 MAX_NUMBER_OF_UNITS_IN_SQUAD
  // to increase that number have to update calc position in squad
  representation_type: SOLIDER_REPRESENTATION_ID,
  selection_threshold: 40.0,
  unit_model_offset_y: 20.0,
  weapon: &STANDARD_RIFLE_DETAILS,
  influence_value: 0.1,
};

static RAPTOR_DETAILS: SquadDetails = SquadDetails {
  movement_speed: 2.5,
  hp: 120,
  production_time: 100,
  members_number: 3,
  // predicted max number of units in squad in utils is 7 MAX_NUMBER_OF_UNITS_IN_SQUAD
  // to increase that number have to update calc position in squad
  representation_type: RAPTOR_REPRESENTATION_ID,
  selection_threshold: 40.0,
  unit_model_offset_y: 20.0,
  weapon: &STANDARD_RIFLE_DETAILS,
  influence_value: 0.1,
};

static PORTAL_DETAILS: SquadDetails = SquadDetails {
  movement_speed: 0.0,
  hp: 2000,
  production_time: 0,
  members_number: 1,
  representation_type: NON_REPRESENTATION_ID,
  selection_threshold: 100.0,
  unit_model_offset_y: 40.0,
  weapon: &NON_WEAPON,
  influence_value: 0.1,
};

pub fn get_squad_details(squad_type: &SquadType) -> &'static SquadDetails {
  match *squad_type {
    SquadType::Solider => &SOLIDER_DETAILS,
    SquadType::Raptor => &RAPTOR_DETAILS,
    SquadType::Portal => &PORTAL_DETAILS,
  }
}
