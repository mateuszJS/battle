use super::{
  DangerPlace, EnemyInfo, EnhancedPurpose, FactionInfo, OurSquadsGroupSafetyInfo, Place, PlaceType,
  PurposeType, SignificationCalculator,
};
use crate::constants::{MATH_PI, NORMAL_SQUAD_RADIUS};
use crate::squads_grid_manager::{SquadsGrid, SquadsGridManager};
use crate::unit::{STATE_CHASING, STATE_SHOOT};
use crate::weapon_types::MAX_POSSIBLE_WEAPON_RANGE;
use crate::Squad;
use std::cell::Ref;

pub const MIN_DISTANCE_OF_SEARCHING_ENEMY: f32 = 1.3 * MAX_POSSIBLE_WEAPON_RANGE;

const SEARCHING_RANGE_ENEMIES_AROUND_SQUAD: f32 = MAX_POSSIBLE_WEAPON_RANGE * 1.5;
const SEARCHING_RANGE_ENEMIES_AROUND_PORTAL: f32 = MAX_POSSIBLE_WEAPON_RANGE * 2.0;
const SEARCHING_RANGE_ENEMIES_AROUND_STRATEGIC_POINT: f32 = MAX_POSSIBLE_WEAPON_RANGE * 1.5;

pub struct SafetyManager {}

impl SafetyManager {
  fn get_squad_group_angle_info(place: &Place) -> (f32, f32) {
    let mut mean_angle_sin = 0.0;
    let mut mean_angle_cos = 0.0;
    let mut interrupted_angle_mean_calc = false;

    for ref_cell_squad in place.squads.iter() {
      let squad = ref_cell_squad.borrow();
      let track_max_index = squad
        .members
        .iter()
        .fold(-1, |acc_track_index, ref_cell_member| {
          acc_track_index.max(ref_cell_member.borrow().track_index)
        });
      if track_max_index == -1 {
        interrupted_angle_mean_calc = true;
        break;
      }

      let (source_x, source_y) = squad.shared.center_point;
      let (track_dest_x, track_dest_y) =
        squad.shared.track[(squad.shared.track.len() as isize - 1) as usize];
      let distance_to_dest = (source_x - track_dest_x).hypot(source_y - track_dest_y);

      if distance_to_dest < MIN_DISTANCE_OF_SEARCHING_ENEMY {
        interrupted_angle_mean_calc = true;
        break;
      }
      let (track_next_point_x, track_next_point_y) = squad.shared.track[track_max_index as usize];
      let angle = (track_next_point_x - source_x).atan2(source_y - track_next_point_y);

      mean_angle_sin += angle.sin();
      mean_angle_cos += angle.cos();
    }
    if interrupted_angle_mean_calc {
      let squads_number = place.squads.len() as f32;
      let angle_mean = (mean_angle_sin / squads_number).atan2(mean_angle_cos / squads_number);
      (MATH_PI * 0.3, angle_mean)
    } else {
      // squad are almost in the destination, so search around, instead of front only
      (MATH_PI, 0.0)
    }
  }

  pub fn get_info_about_safety<'a>(
    our_faction_id: u32,
    all_factions_info: &'a Vec<FactionInfo>,
    signi_calc: &SignificationCalculator,
  ) -> (Vec<&'a Place>, Vec<DangerPlace<'a>>) {
    let our_faction_info = all_factions_info
      .iter()
      .find(|faction_info| faction_info.id == our_faction_id)
      .unwrap();

    let mut danger_places: Vec<DangerPlace> = vec![];
    let mut safe_places: Vec<&Place> = vec![];

    our_faction_info.places.iter().for_each(|our_place| {
      let threshold_enemies_around = match our_place.place_type {
        PlaceType::Portal => SEARCHING_RANGE_ENEMIES_AROUND_PORTAL,
        PlaceType::Squads => SEARCHING_RANGE_ENEMIES_AROUND_SQUAD,
        PlaceType::StrategicPoint => SEARCHING_RANGE_ENEMIES_AROUND_STRATEGIC_POINT,
      };

      let our_squads_ids = our_place
        .squads
        .iter()
        .map(|ref_cell_squad| ref_cell_squad.borrow().id)
        .collect::<Vec<u32>>();

      let number_of_collected_so_far_danger_places = danger_places.len();

      all_factions_info.iter().for_each(|faction_info| {
        if faction_info.id != our_faction_id {
          faction_info.places.iter().for_each(|enemy_place| {
            if enemy_place.place_type != PlaceType::Squads {
              return;
            }

            let distance_our_place_to_enemy_place =
              (our_place.x - enemy_place.x).hypot(our_place.y - enemy_place.y);
            if distance_our_place_to_enemy_place > threshold_enemies_around {
              return;
            }

            let is_attacking_us = enemy_place.squads.iter().any(|ref_cell_enemy_squad| {
              let enemy_squad = ref_cell_enemy_squad.borrow();

              let option_enemy_aim = if enemy_squad.shared.aim.upgrade().is_some() {
                enemy_squad.shared.aim.upgrade()
              } else {
                enemy_squad.shared.secondary_aim.upgrade()
              };

              if let Some(enemy_aim) = option_enemy_aim {
                if our_squads_ids.contains(&enemy_aim.borrow().id) {
                  enemy_squad.members.iter().any(|ref_cell_unit| {
                    let state = ref_cell_unit.borrow().state;
                    state == STATE_SHOOT || state == STATE_CHASING
                  })
                } else {
                  false
                }
              } else {
                false
              }
            });

            let additional_signification = match our_place.place_type {
              PlaceType::Squads => signi_calc
                .additional_signification_enemy_place_around_our_squad(
                  distance_our_place_to_enemy_place,
                  threshold_enemies_around,
                  is_attacking_us,
                ),
              PlaceType::Portal => signi_calc
                .additional_signification_enemy_place_around_our_portal(
                  distance_our_place_to_enemy_place,
                  threshold_enemies_around,
                  is_attacking_us,
                ),
              PlaceType::StrategicPoint => signi_calc
                .additional_signification_enemy_place_around_our_strategic_point(
                  distance_our_place_to_enemy_place,
                  threshold_enemies_around,
                ),
            };

            /*
            if our_place.place_type == PlaceType::Squads {
              let (angle_threshold, angle_mean) = SafetyManager::get_squad_group_angle_info(our_place);

              let angle_from_our_place_to_enemy = (some_squad.shared.center_point.0 - our_place.x)
              .atan2(our_place.y - some_squad.shared.center_point.1);
              let not_on_the_way =
                angle_diff!(angle_from_our_place_to_enemy, angle_mean) > angle_threshold;
              // TODO: do something with not_on_the_way
            }
            */

            let already_existing_danger_place = danger_places
              .iter_mut()
              .find(|danger_place| danger_place.enemy_place.id == enemy_place.id);

            if let Some(danger_place) = already_existing_danger_place {
              danger_place.our_places.push(our_place);
              if danger_place.additional_signification < additional_signification {
                danger_place.additional_signification = additional_signification
              }
              if !danger_place.is_attacking_us {
                danger_place.is_attacking_us = true;
              }
            } else {
              danger_places.push(DangerPlace {
                enemy_place,
                additional_signification,
                our_places: vec![our_place],
                is_attacking_us,
              })
            }

            // 1. Do we have already
          })
        }
      });
      if (number_of_collected_so_far_danger_places == danger_places.len()
        && our_place.place_type == PlaceType::StrategicPoint)
        || our_place.place_type == PlaceType::Portal
      {
        // no danger places related with this place!
        safe_places.push(our_place);
      }
    });

    (safe_places, danger_places)
  }
}
