use super::Squad;
use super::{EnhancedPurpose, OurSquadsGroupSafetyInfo, Place, ReservedSquad};

use std::cell::Ref;

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

  pub fn signification_enemy_squads(&self, enemy_squads: &Ref<Squad>) -> f32 {
    0.1
  }

  pub fn signification_enemy_portal(&self, portal_squad: &Ref<Squad>) -> f32 {
    let portal_unit = portal_squad.members[0].borrow();

    1.0 + (1.0 - portal_unit.hp / portal_squad.squad_details.hp) // <0, 2>
  }
  // it never should be like squad instead of running away will attack on the enemy just because there is a lot of enemy squads!
  pub fn signification_running_to_safe_place(&self) -> f32 {
    4.5
  }

  pub fn signification_enemy_around_our_building(&self, enemy_squad: &Ref<Squad>) -> f32 {
    self.signification_enemy_squads(enemy_squad) * 1.1
  }

  pub fn signification_enemy_attacks_our_building(&self, enemy_squad: &Ref<Squad>) -> f32 {
    self.signification_enemy_squads(enemy_squad) * 35.0 // can be compared with running away
  }

  pub fn is_reserved_purpose_much_less_important(
    &self,
    reserved_squad: &ReservedSquad,
    purpose: &EnhancedPurpose,
  ) -> bool {
    // used to compare if purpose where squad is reserved got almost the same signification
    // or it's much less important, so can be taken by more important purpose
    reserved_squad.purpose_signification * 0.85 < purpose.signification
  }

  pub fn influence_our_squad_new_purpose(&self, our_squad: &Ref<Squad>) -> f32 {
    self.our_power_factor * our_squad.get_influence()
  }

  pub fn influence_squad_already_involved_in_purpose(&self, our_squad: &Ref<Squad>) -> f32 {
    our_squad.get_influence() * self.influence_factor_already_engagement_squads
  }

  pub fn influence_enemy_squad_on_the_track(&self, enemy_squad: &Ref<Squad>) -> f32 {
    enemy_squad.get_influence() * 1.2
  }

  pub fn influence_enemy_squad_attacks_us(&self, enemy_squad: &Ref<Squad>) -> f32 {
    enemy_squad.get_influence()
  }

  pub fn influence_enemy_squad_around_us(&self, enemy_squad: &Ref<Squad>) -> f32 {
    enemy_squad.get_influence() * 0.5
  }

  pub fn influence_our_squads_in_danger_situation(&self, our_squad: &Ref<Squad>) -> f32 {
    our_squad.get_influence() * 0.7
  }

  pub fn should_single_squad_react_on_met_danger(&self, reserved_squad: &ReservedSquad) -> bool {
    reserved_squad.purpose_signification < 6.0
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
    influence_enemies_who_attacks_us: f32,
    influence_enemies_around_us: f32,
    collected_our_influence: f32,
  ) -> bool {
    influence_enemies_who_attacks_us > collected_our_influence * 0.15
      || influence_enemies_around_us > collected_our_influence * 0.0 // not really sure
                                                                     // || influence_enemies_around_us > collected_our_influence * 7.0 // not really sure
  }

  pub fn should_our_group_squads_in_danger_attack_enemy(
    &self,
    our_influence: f32,
    enemies_influence_who_attacks_us: f32,
    enemies_influence_around: f32,
  ) -> bool {
    // our_influence >= enemies_influence_who_attacks_us
    //   && 2.5 * our_influence >= enemies_influence_around
    our_influence >= enemies_influence_around
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
      .max(0.0);

    -distance_to_purpose / our_squad.squad_details.movement_speed
  }
}
