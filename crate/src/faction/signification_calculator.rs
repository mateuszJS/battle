use super::ai::{EnhancedPurpose, OurSquadsGroupSafetyInfo, Place, ReservedSquad};
use super::Squad;
use crate::weapon_types::MAX_POSSIBLE_WEAPON_RANGE;
use std::cell::Ref;

const RADIUS_OF_DANGER_ZONE_AROUND_THE_PORTAL: f32 = MAX_POSSIBLE_WEAPON_RANGE * 1.5;

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
  pub fn signification_enemy_portal(&self) -> f32 {
    1.0
  }

  pub fn signification_enemy_squads(&self, enemy_squads: &Place) -> f32 {
    enemy_squads.influence
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

  pub fn signification_our_portal(
    &self,
    place: &Place,
    enemies_influence_around_our_portal: f32,
    enemies_influence_who_attacks_our_portal: f32,
  ) -> f32 {
    enemies_influence_around_our_portal * 0.5 + enemies_influence_who_attacks_our_portal
  }

  pub fn influence_our_squad_new_purpose(&self, our_squad: &Ref<Squad>) -> f32 {
    self.our_power_factor * our_squad.get_influence()
  }

  pub fn influence_squad_already_involved_in_purpose(&self, our_squad: &Ref<Squad>) -> f32 {
    our_squad.get_influence() * self.influence_factor_already_engagement_squads
  }

  pub fn influence_enemy_squad_on_the_track(&self, enemy_squad: &Ref<Squad>) -> f32 {
    enemy_squad.get_influence()
  }

  // used to compare if purpose where squad is reserved got almost the same signification
  // or it's much less important, so can be taken by more important purpose
  pub fn is_reserved_purpose_much_less_important(
    &self,
    reserved_squad: &ReservedSquad,
    purpose: &EnhancedPurpose,
  ) -> bool {
    reserved_squad.reserved_purpose_signification * 0.85 < purpose.signification
  }

  pub fn influence_enemy_squad_attacks_us(&self, enemy_squad: &Ref<Squad>) -> f32 {
    enemy_squad.get_influence()
  }

  pub fn influence_enemy_squad_around_us(&self, enemy_squad: &Ref<Squad>) -> f32 {
    enemy_squad.get_influence()
  }

  pub fn is_purpose_less_important_than_danger(
    &self,
    reserved_squad: &ReservedSquad,
    safety_info: &OurSquadsGroupSafetyInfo,
  ) -> bool {
    // TODO: rn we have signification od running away = 2
    // we should do it in smarter way
    // like if there is too many enemies, then don't run though them
    // bc our units will be killed
    reserved_squad.reserved_purpose_signification * 4.0
      < safety_info.collected_enemies_influence_around
    // also handle enemies which attacks us
  }

  pub fn influence_our_squads_in_danger_situation(&self, our_squad: &Ref<Squad>) -> f32 {
    our_squad.get_influence()
  }

  pub fn signification_running_to_safe_place(&self) -> f32 {
    2.0
  }

  pub fn influence_enemy_squads_around_our_portal(
    &self,
    enemy_squads: &Place,
    our_portal: &Place,
  ) -> f32 {
    let distance = (enemy_squads.x - our_portal.x).hypot(enemy_squads.y - our_portal.y);
    if distance < RADIUS_OF_DANGER_ZONE_AROUND_THE_PORTAL {
      enemy_squads.influence
    } else {
      0.0
    }
  }
}
