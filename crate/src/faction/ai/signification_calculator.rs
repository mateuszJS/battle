use super::EnhancedPurpose;
use super::Squad;
use crate::weapon_types::MAX_POSSIBLE_WEAPON_RANGE;

use std::cell::Ref;

const CAPTURE_POINT_SIGNIFICATION: f32 = 0.5;
const MET_DANGER_PURPOSE_MAX_ADDITIONAL_SIGNIFICATION: f32 = 1.0; // met enemy, danger place, at least COMMON_PURPOSE_MAX_SIGNIFICATION
const ENEMY_PLACE_AROUND_STRATEGIC_POINT_MAX_ADDITIONAL_SIGNIFICATION: f32 = 1.5;
const ENEMY_SQUADS_MAX_BASE_SIGNIFICATION: f32 = 2.0; // attack
const ENEMY_PLACE_AROUND_OUR_BASE_MAX_ADDITIONAL_SIGNIFICATION: f32 = 2.5;
pub const THRESHOLD_SIGNIFICATION_URGENT_PURPOSE: f32 = 3.6;
/* 3.6 =
  + max of base influence (ENEMY_SQUADS_MAX_BASE_SIGNIFICATION)
  + max additional influence ENEMY_PLACE_AROUND_STRATEGIC_POINT_MAX_ADDITIONAL_SIGNIFICATION
  + 0.1
*/

/*
1. Attacking, capturing points <0, COMMON_PURPOSE_MAX_SIGNIFICATION>
2. Attacking met enemy (danger situation) <COMMON_PURPOSE_MAX_SIGNIFICATION, MET_DANGER_PURPOSE_MAX_SIGNIFICATION>
3. Running away MET_DANGER_PURPOSE_MAX_SIGNIFICATION + 0.1
4. Enemies around our portal -> COMMON_PURPOSE_MAX_SIGNIFICATION_BASE, enemies attacking our portal -> MOST_IMPORTANT_PURPOSES_SIGNIFICATION_BASE + 0.1
*/

pub struct SignificationCalculator {
  attack_enemy_place_mod: f32,
  run_away_enemy_place_mod: f32,
}

impl SignificationCalculator {
  pub fn new() -> SignificationCalculator {
    SignificationCalculator {
      attack_enemy_place_mod: 1.2,
      run_away_enemy_place_mod: 0.8,
    }
  }

  pub fn base_signification_strategic_point(&self) -> f32 {
    // TODO: if capturing already started, then add more signification
    CAPTURE_POINT_SIGNIFICATION
  }

  pub fn base_signification_enemy_squads_place(&self, place_influence: f32) -> f32 {
    (place_influence * 0.14).min(ENEMY_SQUADS_MAX_BASE_SIGNIFICATION)
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

  pub fn influence_enemy_squad_attacks_us(&self, enemy_squad: &Ref<Squad>) -> f32 {
    enemy_squad.get_influence()
  }

  pub fn should_single_squad_react_on_met_danger(
    &self,
    reserved_squad_purpose_signification: f32,
  ) -> bool {
    // TODO: and how away is the enemy! and if the enemy attacks us!
    reserved_squad_purpose_signification < 4.0 // so will run away without attacking
                                               // otherwise squad just do the purpose, don't care about danger around

    // TODO: rn we have signification od running away = 2
    // we should do it in smarter way
    // like if there is too many enemies, then don't run though them
    // bc our units will be killed

    // reserved_squad.purpose_signification * 5.0 < safety_info.collected_enemies_influence_around
    // also handle enemies which attacks us
  }

  pub fn should_our_squads_group_do_anything_in_danger(
    &self,
    collected_our_influence: f32,
    influence_enemies_who_attacks_us: f32,
    number_of_enemies_around: usize,
  ) -> bool {
    influence_enemies_who_attacks_us > 0.0 || number_of_enemies_around > 10 // not really sure
                                                                            // || influence_enemies_around_us > collected_our_influence * 7.0 // not really sure
  }

  pub fn should_our_group_squads_in_danger_attack_enemy(
    &self,
    our_influence: f32,
    enemies_influence_who_attacks_us: f32,
    number_of_enemies_around: usize,
  ) -> bool {
    // our_influence >= enemies_influence_who_attacks_us
    //   && 2.5 * our_influence >= enemies_influence_around
    our_influence >= enemies_influence_who_attacks_us
    // our_influence >= enemies_influence_around
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
}
