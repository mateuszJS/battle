use super::signification_calculator::COMMON_PURPOSE_SIGNIFICATION_BASE;
use super::SignificationCalculator;
use super::{EnhancedPurpose, FactionInfo, Place, PlaceType, PurposeType, ReservedSquad};
use crate::constants::MAX_SQUAD_SPREAD_FROM_CENTER_RADIUS;
use crate::squads_grid_manager::{SquadsGrid, SquadsGridManager};
use crate::unit::STATE_SHOOT;
use crate::weapon_types::MAX_POSSIBLE_WEAPON_RANGE;
use crate::Squad;
use std::cell::Ref;

pub const MIN_DISTANCE_OF_SEARCHING_ENEMY: f32 =
  2.0 * (MAX_POSSIBLE_WEAPON_RANGE + MAX_SQUAD_SPREAD_FROM_CENTER_RADIUS);

struct EnemyInfo {
  id: u32,
  influence: f32,
  x: f32,
  y: f32,
  is_attacking_us: bool,
}

struct OurSquadsGroupSafetyInfo<'a> {
  enemies_squads: Vec<EnemyInfo>,
  our_squads_ids: Vec<u32>,
  place: &'a Place,
}

pub struct SafetyManager {}

impl SafetyManager {
  fn get_info_about_safety<'a>(
    our_faction_id: u32,
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
          PlaceType::StrategicPoint => MAX_POSSIBLE_WEAPON_RANGE * 1.25,
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

        /*==========CHECK IF THERE ARE ANY ENEMIES AROUND THE POINT============*/
        let enemies_squads = squads_nearby
          .iter()
          .filter_map(|some_weak_squad| {
            if let Some(some_ref_cell_squad) = some_weak_squad.upgrade() {
              let some_squad = some_ref_cell_squad.borrow();
              if some_squad.faction_id != our_faction_id {
                let option_enemy_aim = if some_squad.shared.aim.upgrade().is_some() {
                  some_squad.shared.aim.upgrade()
                } else {
                  some_squad.shared.secondary_aim.upgrade()
                };

                let is_attacking_us = if let Some(enemy_aim) = option_enemy_aim {
                  if our_squads_ids.contains(&enemy_aim.borrow().id) {
                    some_squad
                      .members
                      .iter()
                      .any(|ref_cell_unit| ref_cell_unit.borrow().state == STATE_SHOOT)
                  } else {
                    false
                  }
                } else {
                  false
                };

                Some(EnemyInfo {
                  id: some_squad.id,
                  influence: some_squad.get_influence(),
                  x: some_squad.shared.center_point.0,
                  y: some_squad.shared.center_point.1,
                  is_attacking_us,
                })
              } else {
                None
              }
            } else {
              None
            }
          })
          .collect::<Vec<EnemyInfo>>();

        OurSquadsGroupSafetyInfo {
          enemies_squads,
          our_squads_ids,
          place,
        }
      })
      .collect::<Vec<OurSquadsGroupSafetyInfo>>()
  }

  fn does_squad_care_about_danger(
    squad_id: u32,
    reserved_squads: &mut Vec<ReservedSquad>,
    new_purposes: &Vec<EnhancedPurpose>,
    safety_info: &OurSquadsGroupSafetyInfo,
    signi_calc: &SignificationCalculator,
  ) -> (bool, f32) {
    let option_reserved_squad_index = reserved_squads
      .iter()
      .position(|reserved_squad| reserved_squad.squad_id == squad_id);

    if let Some(reserved_squad_index) = option_reserved_squad_index {
      let reservation_purpose_id = reserved_squads[reserved_squad_index].purpose_id;
      let purpose = &new_purposes[reservation_purpose_id];
      let distance_our_place_to_purpose = (purpose.place.x - safety_info.place.x)
        .hypot(purpose.place.y - safety_info.place.y)
        .max(MIN_DISTANCE_OF_SEARCHING_ENEMY);

      let is_enemy_on_the_way = safety_info.enemies_squads.iter().any(|enemy_squad| {
        let distance_enemy_to_purpose =
          (purpose.place.x - enemy_squad.x).hypot(purpose.place.y - enemy_squad.y);
        distance_our_place_to_purpose > distance_enemy_to_purpose
      });

      let reservation_purpose_signification =
        reserved_squads[reserved_squad_index].purpose_signification;
      if !is_enemy_on_the_way {
        (false, 0.0)
      } else if signi_calc
        .should_single_squad_react_on_met_danger(reservation_purpose_signification)
      {
        reserved_squads.remove(reserved_squad_index);

        (true, reservation_purpose_signification)
      } else {
        (false, 0.0)
      }
    } else {
      (true, 0.0)
    }
  }

  fn calc_new_purpose_non_squad_signification(
    new_purpose: &EnhancedPurpose,
    safety_info: &OurSquadsGroupSafetyInfo,
    signi_calc: &SignificationCalculator,
  ) -> f32 {
    new_purpose
      .place
      .squads
      .iter()
      .fold(new_purpose.signification, |acc, ref_cell_enemy_squad| {
        let enemy_squad = ref_cell_enemy_squad.borrow();

        let option_enemy_info = safety_info
          .enemies_squads
          .iter()
          .find(|enemy_info| enemy_info.id == enemy_squad.id);

        if let Some(enemy_info) = option_enemy_info {
          if enemy_info.is_attacking_us {
            acc + signi_calc.additional_signification_enemy_attacks_our_building(&enemy_squad)
          } else {
            acc + signi_calc.additional_signification_enemy_around_our_building(&enemy_squad)
          }
        } else {
          acc
        }
      })
  }

  pub fn handle_squads_safety(
    our_faction_id: u32,
    signi_calc: &SignificationCalculator,
    our_squads: &Vec<Ref<Squad>>,
    reserved_squads: &mut Vec<ReservedSquad>,
    all_factions_info: &Vec<FactionInfo>,
    squads_grid: &SquadsGrid,
    new_purposes: &mut Vec<EnhancedPurpose>,
  ) {
    let our_squads_safety =
      SafetyManager::get_info_about_safety(our_faction_id, all_factions_info, squads_grid);

    our_squads_safety.iter().for_each(|safety_info| {
      if safety_info.enemies_squads.len() > 0 {
        let mut collected_our_influence = 0.0;
        let mut squads_ids_which_will_react = vec![];
        let mut greatest_signification_of_blocker_purposes = 0.0;

        safety_info.our_squads_ids.iter().for_each(|squad_id| {
          let (squad_cares_about_danger, reservation_purpose_signification) =
            SafetyManager::does_squad_care_about_danger(
              *squad_id,
              reserved_squads,
              &new_purposes,
              safety_info,
              signi_calc,
            );
          if greatest_signification_of_blocker_purposes < reservation_purpose_signification {
            greatest_signification_of_blocker_purposes = reservation_purpose_signification;
          }
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
                    SafetyManager::calc_new_purpose_non_squad_signification(
                      new_purpose,
                      safety_info,
                      signi_calc,
                    );
                }
              });
            }
          }
        });

        let enemies_influence_who_attacks_us =
          safety_info
            .enemies_squads
            .iter()
            .fold(0.0, |acc, enemy_info| {
              if enemy_info.is_attacking_us {
                acc + enemy_info.influence
              } else {
                acc
              }
            });

        if squads_ids_which_will_react.len() > 0
          && signi_calc.should_our_squads_group_do_anything_in_danger(
            collected_our_influence,
            enemies_influence_who_attacks_us,
            safety_info.enemies_squads.len(),
          )
        {
          // Portal and strategic point won't get here!
          let (purpose_id, purpose_signification) = if signi_calc
            .should_our_group_squads_in_danger_attack_enemy(
              collected_our_influence,
              enemies_influence_who_attacks_us,
              safety_info.enemies_squads.len(),
            ) {
            let mut nearest_enemy_id = 0;
            let mut nearest_distance = std::f32::MAX;

            safety_info.enemies_squads.iter().for_each(|enemy_squad| {
              let distance =
                (enemy_squad.x - safety_info.place.x).hypot(enemy_squad.y - safety_info.place.y);
              if distance < nearest_distance {
                nearest_distance = distance;
                nearest_enemy_id = enemy_squad.id;
              }
            });

            let nearest_new_purpose = new_purposes
              .iter()
              .find(|new_purpose| {
                new_purpose
                  .place
                  .squads
                  .iter()
                  .any(|ref_cell_squad| ref_cell_squad.borrow().id == nearest_enemy_id)
              })
              .unwrap();

            // yea we are adding two times signification, but it's okay, squad which attacks us should be market as with bigger signification

            (
              nearest_new_purpose.id,
              (nearest_new_purpose.signification
                + greatest_signification_of_blocker_purposes
                + COMMON_PURPOSE_SIGNIFICATION_BASE),
              // We should do similar stuff in collecting new purposes, when there is an enemy of the track
              // or if there is enemy of the track, we should avoid adding that squad to purpose, one case if signification is mroe than 6.0
            )
          } else {
            let new_id = new_purposes.len();
            let signification = signi_calc.signification_running_to_safe_place();
            let safe_destination_index =
              SafetyManager::get_safe_destination_index(&safety_info, &our_squads_safety);
            new_purposes.push(EnhancedPurpose {
              id: new_id,
              purpose_type: PurposeType::RunToSafePlace,
              signification,
              place: our_squads_safety[safe_destination_index].place.clone(),
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
        let value = if distance < 1.0 {
          std::f32::MAX // it's the same place
        } else {
          distance + safety_place.enemies_squads.len() as f32 * 700.0
        };

        if min_value > value {
          min_value = value;
          min_index = index;
        }
      });

    min_index
  }
}
