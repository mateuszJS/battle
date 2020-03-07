use crate::squad::{
  Squad,
};

#[derive(Clone)]
pub struct Faction {
  pub resources: u32,
  pub squads: Vec<Squad>,
}