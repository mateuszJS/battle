use super::EnhancedPurpose;
use super::Squad;
use crate::strategic_point::STRATEGIC_POINT_EMPTY_OWNER;

use std::cell::Ref;

const CAPTURE_POINT_SIGNIFICATION: f32 = 0.5;
const ENEMY_PLACE_AROUND_STRATEGIC_POINT_MAX_ADDITIONAL_SIGNIFICATION: f32 = 1.0; // met enemy should be bigger signification than enemy capturing point!
const MET_DANGER_PURPOSE_MAX_ADDITIONAL_SIGNIFICATION: f32 = 1.5; // met enemy, danger place (100% used if attack us)
const CAPTURE_POINT_MAX_ADDITIONAL_SIGNIFICATION: f32 = 2.0;
const ENEMY_SQUADS_MAX_BASE_SIGNIFICATION: f32 = 2.0;
const ENEMY_PLACE_AROUND_OUR_BASE_MAX_ADDITIONAL_SIGNIFICATION: f32 = 3.0;
pub const THRESHOLD_SIGNIFICATION_URGENT_PURPOSE: f32 = 3.6;

/* 3.6 =
  + max of base influence (ENEMY_SQUADS_MAX_BASE_SIGNIFICATION)
  + max additional influence MET_DANGER_PURPOSE_MAX_ADDITIONAL_SIGNIFICATION
  + 0.1
*/

/*
COUPLE OF USEFUL RULES RELATED TO SETTING SIGNIFICATION
- attacking on an enemy portal or enemy who is capturing our point should be always smaller than minimal signification of enemy who attacks us
- remember that aim of this calculator, is also to sort purposes correctly (by calculating correct signification)
*/

pub struct SignificationCalculator {
  faction_id: u32,
  attack_enemy_place_mod: f32,
  run_away_enemy_place_mod: f32,
}

impl SignificationCalculator {
  pub fn new(faction_id: u32) -> SignificationCalculator {
    SignificationCalculator {
      faction_id,
      attack_enemy_place_mod: 1.2,
      run_away_enemy_place_mod: 0.8,
    }
  }

  pub fn base_signification_strategic_point(&self, strategic_point: Ref<Squad>) -> f32 {
    if strategic_point
      .all_faction_ids_around
      .contains(&self.faction_id)
      && strategic_point.id == STRATEGIC_POINT_EMPTY_OWNER
    {
      CAPTURE_POINT_SIGNIFICATION
        + (1.0 - strategic_point.capturing_progress) * CAPTURE_POINT_MAX_ADDITIONAL_SIGNIFICATION
    } else {
      CAPTURE_POINT_SIGNIFICATION
    }
  }

  pub fn base_signification_enemy_squads_place(&self, place_influence: f32) -> f32 {
    (place_influence * 0.02).min(ENEMY_SQUADS_MAX_BASE_SIGNIFICATION)
  }

  pub fn base_signification_enemy_portal(&self, portal_squad: &Ref<Squad>) -> f32 {
    let portal_unit = portal_squad.members[0].borrow();

    1.0 + (1.0 - portal_unit.hp / portal_squad.squad_details.hp) * 0.5 // <0, 1.5>
  }

  pub fn additional_signification_enemy_place_around_our_squad(
    &self,
    distance: f32,
    max_distance_threshold: f32,
    is_attacking_us: bool,
  ) -> f32 {
    if is_attacking_us {
      MET_DANGER_PURPOSE_MAX_ADDITIONAL_SIGNIFICATION
    } else {
      MET_DANGER_PURPOSE_MAX_ADDITIONAL_SIGNIFICATION * 0.2
    }
  }

  pub fn additional_signification_enemy_place_around_our_portal(
    &self,
    distance: f32,
    max_distance_threshold: f32,
    is_attacking_us: bool,
  ) -> f32 {
    let normalized_distance = if is_attacking_us {
      0.0
    } else {
      (distance / max_distance_threshold).powi(3)
    };
    (1.0 - normalized_distance) * ENEMY_PLACE_AROUND_OUR_BASE_MAX_ADDITIONAL_SIGNIFICATION
  }

  pub fn additional_signification_enemy_place_around_our_strategic_point(
    &self,
    distance: f32,
    max_distance_threshold: f32,
  ) -> f32 {
    let normalized_distance = (distance / max_distance_threshold).powi(3);
    (1.0 - normalized_distance) * ENEMY_PLACE_AROUND_STRATEGIC_POINT_MAX_ADDITIONAL_SIGNIFICATION
  }

  pub fn attack_influence_enemy_place(&self, enemy_place_influence: f32) -> f32 {
    self.attack_enemy_place_mod * enemy_place_influence
  }

  pub fn running_away_influence_enemy_place(&self, enemy_place_influence: f32) -> f32 {
    self.run_away_enemy_place_mod * enemy_place_influence
  }

  pub fn how_much_squad_fits_to_take_purpose(
    &self,
    purpose: &EnhancedPurpose,
    our_squad: &Ref<Squad>,
  ) -> f32 {
    // just to make it bigger, if both squads got the same distance
    let distance_to_purpose = ((purpose.place.x - our_squad.shared.center_point.0)
      .hypot(purpose.place.y - our_squad.shared.center_point.1)
      - our_squad.squad_details.weapon.range)
      .max(1.0 / our_squad.id as f32); // should be zero, but to keep always the same order, used squad.id to calc small (< 1.0) diff

    -(distance_to_purpose / our_squad.squad_details.movement_speed)
  }

  pub fn get_purpose_sort_value(&self, purpose: &EnhancedPurpose) -> f32 {
    purpose.signification
    // TODO: handle influence, how far is from our portal
  }
}
