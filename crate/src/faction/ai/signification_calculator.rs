use super::EnhancedPurpose;
use super::Squad;
use crate::weapon_types::MAX_POSSIBLE_WEAPON_RANGE;

use std::cell::Ref;

const LEVERAGE_RESERVED_SQUAD_OVER_OTHER: f32 = 1.5 * MAX_POSSIBLE_WEAPON_RANGE;
pub const COMMON_PURPOSE_SIGNIFICATION_BASE: f32 = 2.0; // common => attack, capture point

pub struct SignificationCalculator {
  our_power_factor: f32,
  influence_factor_already_engagement_squads: f32,
}

impl SignificationCalculator {
  pub fn new() -> SignificationCalculator {
    SignificationCalculator {
      our_power_factor: 0.8, // lower -> less desperation
      influence_factor_already_engagement_squads: 1.2,
    }
  }

  pub fn signification_strategic_point(&self) -> f32 {
    0.5
  }

  pub fn signification_enemy_squads(&self, enemy_squads: &Ref<Squad>) -> f32 {
    0.1
  }

  pub fn signification_enemy_portal(&self, portal_squad: &Ref<Squad>) -> f32 {
    let portal_unit = portal_squad.members[0].borrow();

    1.0 + (1.0 - portal_unit.hp / portal_squad.squad_details.hp) * 0.5 // <0, 1.5>
  }
  // it never should be like squad instead of running away will attack on the enemy just because there is a lot of enemy squads!
  pub fn signification_running_to_safe_place(&self) -> f32 {
    4.5
  }

  pub fn additional_signification_enemy_around_our_building(
    &self,
    enemy_squad: &Ref<Squad>,
  ) -> f32 {
    self.signification_enemy_squads(enemy_squad) * 0.9
  }

  pub fn additional_signification_enemy_attacks_our_building(
    &self,
    enemy_squad: &Ref<Squad>,
  ) -> f32 {
    self.signification_enemy_squads(enemy_squad) * 33.0 // can be compared with running away
  }

  pub fn influence_our_squad(
    &self,
    our_squad: &Ref<Squad>,
    reservations_for_this_purpose: &Vec<u32>,
  ) -> f32 {
    let factor = if reservations_for_this_purpose.contains(&our_squad.id) {
      self.influence_factor_already_engagement_squads
    } else {
      self.our_power_factor
    };

    factor * our_squad.get_influence()
  }

  pub fn influence_our_squads_in_danger_situation(&self, our_squad: &Ref<Squad>) -> f32 {
    our_squad.get_influence() * self.our_power_factor // faster version of influence_our_squad
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
    reservations_for_this_purpose: &Vec<u32>,
    reservations_for_other_purposes: &Vec<u32>,
  ) -> f32 {
    let is_squad_reserved_for_this_purpose =
      if reservations_for_this_purpose.contains(&our_squad.id) {
        1.0
      } else if reservations_for_other_purposes.contains(&our_squad.id) {
        -1.0
      } else {
        0.0
      };

    // just to make it bigger, if both squads got the same distance
    let distance_to_purpose = ((purpose.place.x - our_squad.shared.center_point.0)
      .hypot(purpose.place.y - our_squad.shared.center_point.1)
      - our_squad.squad_details.weapon.range)
      .max(0.0);

    LEVERAGE_RESERVED_SQUAD_OVER_OTHER * is_squad_reserved_for_this_purpose
      - (distance_to_purpose / our_squad.squad_details.movement_speed)
  }
}
