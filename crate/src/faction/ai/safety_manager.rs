use super::SignificationCalculator;
use super::{
  EnhancedPurpose, FactionInfo, OurSquadsGroupSafetyInfo, PlaceType, PurposeType, ReservedSquad,
};
use crate::squads_grid_manager::{SquadsGrid, SquadsGridManager};
use crate::Squad;
use std::cell::Ref;

use crate::weapon_types::MAX_POSSIBLE_WEAPON_RANGE;

pub struct SafetyManager {}

impl SafetyManager {
  fn get_info_about_safety<'a>(
    our_faction_id: u32,
    signi_calc: &SignificationCalculator,
    all_factions_info: &'a Vec<FactionInfo>,
    squads_grid: &SquadsGrid,
  ) -> Vec<OurSquadsGroupSafetyInfo<'a>> {
    // in params we should get our squads group
    let our_faction_info = all_factions_info
      .iter()
      .find(|faction_info| faction_info.id == our_faction_id)
      .unwrap();

    our_faction_info
      .places
      .iter()
      .map(|place| {
        let threshold_enemies_around = match place.place_type {
          PlaceType::Portal => MAX_POSSIBLE_WEAPON_RANGE * 1.5,
          PlaceType::Squads => MAX_POSSIBLE_WEAPON_RANGE,
        };
        let squads_nearby = SquadsGridManager::get_squads_in_area(
          squads_grid,
          place.x,
          place.y,
          threshold_enemies_around,
        );

        let our_squads_ids = place
          .squads
          .iter()
          .map(|ref_cell_squad| ref_cell_squad.borrow().id)
          .collect::<Vec<u32>>();
        let mut collected_enemies_squads_ids_who_attacks_us = vec![];
        let mut collected_enemies_squads_ids_around = vec![];
        let mut collected_enemies_influence_who_attacks_us = 0.0;
        let mut collected_enemies_influence_around = 0.0;
        /*==========CHECK IF THERE ARE ANY ENEMIES AROUND THE POINT============*/

        for some_weak_squad in squads_nearby.iter() {
          if let Some(some_ref_cell_squad) = some_weak_squad.upgrade() {
            let some_squad = some_ref_cell_squad.borrow();
            if some_squad.faction_id != our_faction_id {
              collected_enemies_squads_ids_around.push(some_squad.id);
              collected_enemies_influence_around +=
                signi_calc.influence_enemy_squad_around_us(&some_squad);
              if let Some(enemy_aim) = some_squad.shared.aim.upgrade() {
                if our_squads_ids.contains(&enemy_aim.borrow().id) {
                  collected_enemies_squads_ids_who_attacks_us.push(some_squad.id);
                  collected_enemies_influence_who_attacks_us +=
                    signi_calc.influence_enemy_squad_attacks_us(&some_squad);
                }
              }
            }
          }
        }

        OurSquadsGroupSafetyInfo {
          collected_enemies_influence_who_attacks_us,
          collected_enemies_influence_around,
          collected_enemies_squads_ids_who_attacks_us,
          collected_enemies_squads_ids_around,
          our_squads_ids,
          place,
        }
      })
      .collect::<Vec<OurSquadsGroupSafetyInfo>>()
  }

  pub fn handle_squads_safety<'a>(
    our_faction_id: u32,
    signi_calc: &SignificationCalculator,
    our_squads: &Vec<Ref<Squad>>,
    reserved_squads: &mut Vec<ReservedSquad>,
    all_factions_info: &'a Vec<FactionInfo>,
    squads_grid: &SquadsGrid,
    new_purposes: &mut Vec<EnhancedPurpose<'a>>,
  ) -> Vec<OurSquadsGroupSafetyInfo<'a>> {
    let our_squads_safety = SafetyManager::get_info_about_safety(
      our_faction_id,
      signi_calc,
      all_factions_info,
      squads_grid,
    );

    our_squads_safety.iter().for_each(|safety_info| {
      if safety_info.collected_enemies_influence_around > std::f32::EPSILON {
        let mut collected_our_influence = 0.0;
        let mut squads_ids_which_will_react = vec![];
        let mut greatest_signification_of_blocker_purposes = 0.0;

        safety_info.our_squads_ids.iter().for_each(|squad_id| {
          let option_reserved_squad_index = reserved_squads
            .iter()
            .position(|reserved_squad| reserved_squad.squad_id == *squad_id);

          let squad_cares_about_danger = if let Some(reserved_squad_index) =
            option_reserved_squad_index
          {
            log!(
              "reserved_squads[reserved_squad_index]: squad id: {}, singification: {}",
              reserved_squads[reserved_squad_index].squad_id,
              reserved_squads[reserved_squad_index].purpose_signification
            );

            let reservation_purpose_signification =
              reserved_squads[reserved_squad_index].purpose_signification;
            if signi_calc.should_single_squad_react_on_met_danger(reservation_purpose_signification)
            {
              reserved_squads.remove(reserved_squad_index);
              if greatest_signification_of_blocker_purposes < reservation_purpose_signification {
                greatest_signification_of_blocker_purposes = reservation_purpose_signification;
              }
              true
            } else {
              false
            }
          } else {
            true
          };

          if squad_cares_about_danger {
            // otherwise squads continue doing purposes, don't care about enemy nearby
            let option_our_squad = our_squads.iter().find(|squad| squad.id == *squad_id);
            if let Some(our_squad) = option_our_squad {
              squads_ids_which_will_react.push(*squad_id);
              collected_our_influence +=
                signi_calc.influence_our_squads_in_danger_situation(our_squad);
            } else {
              // IT"S NOT A SQUAD, IT"S PORTAL, STRATEGIC POINT etc.
              new_purposes.iter_mut().for_each(|new_purpose| {
                // because this is not a squad, so cannot run away or attack
                // so have to increase purposes with attackers
                if new_purpose.purpose_type == PurposeType::Attack {
                  new_purpose.signification =
                    new_purpose
                      .place
                      .squads
                      .iter()
                      .fold(0.0, |acc, ref_cell_enemy_squad| {
                        let enemy_squad = ref_cell_enemy_squad.borrow();
                        if safety_info
                          .collected_enemies_squads_ids_who_attacks_us
                          .contains(&enemy_squad.id)
                        {
                          acc + signi_calc.signification_enemy_attacks_our_building(&enemy_squad)
                        } else if safety_info
                          .collected_enemies_squads_ids_around
                          .contains(&enemy_squad.id)
                        {
                          acc + signi_calc.signification_enemy_around_our_building(&enemy_squad)
                        } else {
                          acc
                        }
                      });
                }
              });
            }
          }
          log!(
            "greatest_signification_of_blocker_purposes: {}",
            greatest_signification_of_blocker_purposes
          );
        });

        if squads_ids_which_will_react.len() > 0
          && signi_calc.should_our_squads_group_do_anything_in_danger(
            safety_info.collected_enemies_influence_who_attacks_us,
            safety_info.collected_enemies_influence_around,
            collected_our_influence,
          )
        {
          // Portal and strategic point won't get here!
          let (purpose_id, purpose_signification) = if signi_calc
            .should_our_group_squads_in_danger_attack_enemy(
              collected_our_influence,
              safety_info.collected_enemies_influence_who_attacks_us,
              safety_info.collected_enemies_influence_around,
            ) {
            // When we are attacking enemy, then this is active, I don't think it should...
            log!("danger place - attack");
            let mut nearest_index = 0;
            let mut nearest_distance = std::f32::MAX;
            log!("new_purposes: {}", new_purposes.len());
            log!(
              "safety_info.collected_enemies_squads_ids_around: {:?}",
              safety_info.collected_enemies_squads_ids_around
            );
            new_purposes
              .iter()
              .enumerate()
              .for_each(|(index, new_purpose)| {
                log!("---------------------");
                if new_purpose.purpose_type == PurposeType::Attack
                  && new_purpose.place.squads.iter().any(|ref_cell_squad| {
                    log!("new purpose enemy id: {}", ref_cell_squad.borrow().id);
                    safety_info
                      .collected_enemies_squads_ids_around
                      .contains(&ref_cell_squad.borrow().id)
                  })
                {
                  let distance = (safety_info.place.x - new_purpose.place.x)
                    .hypot(safety_info.place.y - new_purpose.place.y);
                  log!("attack distance: {}, index: {}", distance, index);
                  if distance < nearest_distance {
                    nearest_distance = distance;
                    nearest_index = index;
                  }
                }
              });
            let nearest_new_purpose = &mut new_purposes[nearest_index];
            doesn't work! add additional signification even if it's the same enem!
            So enemy is blocker of it'self, so the nearest purpose got signification * 2
            nearest_new_purpose.signification += greatest_signification_of_blocker_purposes;
            // to be more significate than blocked purpose! Otherwise our squads won't care about this danger, because got less signification
            (nearest_new_purpose.id, nearest_new_purpose.signification)
          } else {
            log!("danger place - running away");
            let new_id = new_purposes.len();
            let signification = signi_calc.signification_running_to_safe_place();
            let safe_destination_index =
              SafetyManager::get_safe_destination_index(&safety_info, &our_squads_safety);
            new_purposes.push(EnhancedPurpose {
              id: new_id,
              purpose_type: PurposeType::RunToSafePlace,
              signification,
              place: our_squads_safety[safe_destination_index].place,
            });

            (new_id, signification)
          };

          squads_ids_which_will_react
            .into_iter()
            .for_each(|squad_id| {
              reserved_squads.push(ReservedSquad {
                purpose_id,
                purpose_signification: purpose_signification,
                squad_id,
              });
            });
        }
      }
    });

    our_squads_safety
  }

  fn get_safe_destination_index(
    safety_info: &OurSquadsGroupSafetyInfo,
    our_squads_safety: &Vec<OurSquadsGroupSafetyInfo>,
  ) -> usize {
    let place_x = safety_info.place.x;
    let place_y = safety_info.place.y;
    // enemy is sitll attacking ,even fi we got two squads
    let mut min_index = 0;
    let mut min_value = std::f32::MAX;
    our_squads_safety
      .iter()
      .enumerate()
      .for_each(|(index, safety_place)| {
        let distance = (place_x - safety_place.place.x).hypot(place_y - safety_place.place.y);
        log!("distance: {}, index: {}", distance, index);
        let value = if distance < 1.0 {
          std::f32::MAX // it's the same place
        } else {
          distance * 0.5 + safety_place.collected_enemies_influence_around
        };

        if min_value > value {
          min_value = value;
          min_index = index;
        }
      });

    min_index
  }
}
