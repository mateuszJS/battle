use super::signification_calculator::{
  COMMON_PURPOSE_MAX_SIGNIFICATION, MET_DANGER_PURPOSE_MAX_SIGNIFICATION,
};
use super::{
  EnemyInfo, EnhancedPurpose, FactionInfo, OurSquadsGroupSafetyInfo, Place, PlaceType, PurposeType,
  SignificationCalculator,
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
    squads_grid: &SquadsGrid,
  ) -> Vec<OurSquadsGroupSafetyInfo<'a>> {
    // How it looks like rn:

    // pub struct OurSquadsGroupSafetyInfo<'a> {
    //   enemies_squads: Vec<EnemyInfo>,
    //   our_squads_ids: Vec<u32>,
    //   place: &'a Place,
    // }

    // let's change it, to focus on enemy! Like one item per one enemy group, not like focus on place where we are!
    // Vec<{
    //   enemy_place: &Place,
    //   our_squads_ids: -> to check, add all the enemies groups which attacks us, and decide if we are in danger or not
    //   and also useful, to calc later by how many signification should be increase (of course if signification increase will depend on our squads)

    //   TODO: BUT how to use it, to figure out if we should run away, or stay!!
    //   we should just add here information, how much this enemy_place is covered with our squads
    //   if it's fully covered, then don't care about this enemy, is not a danger
    //   but if not covered enough, then care about it

    //   enemy squad is covered by out squads, when our squads has the enemy as the aim/secondary aim

    //   so THEN, we are add together all around non covered enemies, and check, if we are able to face them
    //   but what in case, if we got two our squads groups. influence 1, 1, and enemy influence 1.5
    //   so our single group is not able to face that 1.5 group, but together are able!!
    //   SOOOoooo.... before running away we should increase signification, and then check if we should run away, of that enemy will be covered?

    // }> only enemies that are in area of our Squads, Portal, Strategic Point

    // 1. Increase signification
    // 2. Do all calculation related with table, so we now know, which one squad should go where
    // BUT here, we add tasks also to squads which are in danger!!! Now if we will run away, we won't support some purposes!

    // Sooooo, running away should be included in the table? with very high signification?
    // But how to include action with two options:
    //   a) run away
    //   b) attack met enemy!

    // Yea, it should be in this way:
    //   In the table, we cna include all our squads, but those ones who are in danger, can be included only in attacking met enemy, or running away!

    //   TODO: so we are here rn

    //   ----- At very end of all table calcs lets check:
    //     1. Calc all enemies who attacks us
    //     2. Go though all those enemies, and find how many of the are our purpose no
    //     3. Go tohugh all squad from 2. (though our suqads) and find how many enemies are attacking usize
    //     4. Go over enemies from point 3., and check how many our squads got purpose with them
    //     After sum all those our and enemies squads, let's compare them, and decide to run away with those squads, or stay

    // Maybe firstly we should figure out how table will work at all...
    //   cell will means "How much squad will fits/ how much value will that squad in that purpose gives for us/ how much it costs"

    // If we want to calc result for purpose x our_squad, then we should limit number of purposes :x

    // When we will limit somehow purposes, then we should calc for each purpose minimum required squads.

    // Then we should compare purposes, how much value will we got (signification) and how much costs will we pay (squad number or squad influence)

    // Remember to calc distance correctly to the purpose.
    // Also we should include it in purposes comparsion, if squads are far away from purpose, then lower signification/higher costs

    // When squads are sharing between different purposes in their minimal required squad number, then we should somehow decide,
    // compare, which set of purposes will be best overall

    // IMPORTANT INFO: We could try to include distance in the costs of squad!!!! Farther squad is, is bigger cost!
    // and also include here id squad can even attack this enemy. If our squad is in danger, then can attack or run away! (alternativly attack enemies which attacks portal)

    // ALGORYTM PLECAKOWY! (knapsack problem)
    // https://gist.github.com/lqt0223/21f033450a9d762ce8aee4da336363b1

    // in params we should get our squads group
    let our_faction_info = all_factions_info
      .iter()
      .find(|faction_info| faction_info.id == our_faction_id)
      .unwrap();

    our_faction_info
      .places
      .iter()
      .map(|our_place| {
        let threshold_enemies_around = match our_place.place_type {
          PlaceType::Portal => SEARCHING_RANGE_ENEMIES_AROUND_PORTAL,
          PlaceType::Squads => SEARCHING_RANGE_ENEMIES_AROUND_SQUAD,
          PlaceType::StrategicPoint => SEARCHING_RANGE_ENEMIES_AROUND_STRATEGIC_POINT,
        };

        all_factions_info
          .iter()
          .for_each(|faction_info| {
            if faction_info.id != our_faction_id {
              faction_info.places.iter().for_each(|enemy_place| {
                let distance_our_place_to_enemy_place = (our_place.x - enemy_place.x).hypot(our_place.y - enemy_place.y);
                if distance_our_place_to_enemy_place < threshold_enemies_around {
                  1. Do we have already 
                }
              })
            }
          });

        // let squads_nearby = SquadsGridManager::get_squads_in_area(
        //   squads_grid,
        //   place.x,
        //   place.y,
        //   threshold_enemies_around,
        // );

        let our_squads_ids = our_place
          .squads
          .iter()
          .map(|ref_cell_squad| ref_cell_squad.borrow().id)
          .collect::<Vec<u32>>();

        let (angle_threshold, angle_mean) = SafetyManager::get_squad_group_angle_info(our_place);

        let enemies_squads = squads_nearby
          .iter()
          .filter_map(|some_weak_squad| {
            if let Some(some_ref_cell_squad) = some_weak_squad.upgrade() {
              let some_squad = some_ref_cell_squad.borrow();
              if some_squad.faction_id == our_faction_id {
                return None;
              }
              let option_enemy_aim = if some_squad.shared.aim.upgrade().is_some() {
                some_squad.shared.aim.upgrade()
              } else {
                some_squad.shared.secondary_aim.upgrade()
              };

              let is_attacking_us = if let Some(enemy_aim) = option_enemy_aim {
                if our_squads_ids.contains(&enemy_aim.borrow().id) {
                  some_squad.members.iter().any(|ref_cell_unit| {
                    let state = ref_cell_unit.borrow().state;
                    state == STATE_SHOOT || state == STATE_CHASING
                  })
                } else {
                  false
                }
              } else {
                false
              };

              let angle_from_our_place_to_enemy = (some_squad.shared.center_point.0 - our_place.x)
                .atan2(our_place.y - some_squad.shared.center_point.1);
              let not_on_the_way =
                angle_diff!(angle_from_our_place_to_enemy, angle_mean) > angle_threshold;

              Some(EnemyInfo {
                id: some_squad.id,
                influence: some_squad.get_influence(),
                x: some_squad.shared.center_point.0,
                y: some_squad.shared.center_point.1,
                is_attacking_us,
                not_on_the_way,
              })
            } else {
              None
            }
          })
          .collect::<Vec<EnemyInfo>>();
        // TODO: add enemies in groups! Not like rn, each signle oen squad in counted
        OurSquadsGroupSafetyInfo {
          enemies_squads,
          our_squads_ids,
          place: our_place,
        }
      })
      .collect::<Vec<OurSquadsGroupSafetyInfo>>()
  }

  //   fn does_squad_care_about_danger(
  //     squad_id: u32,
  //     our_squads: &Vec<Ref<Squad>>,
  //     // reserved_squads: &mut Vec<ReservedSquad>,
  //     // new_purposes: &Vec<EnhancedPurpose>,
  //     safety_info: &OurSquadsGroupSafetyInfo, do we need squad_id or our_squads? safety_info is not enough?
  //     signi_calc: &SignificationCalculator,
  //   ) -> bool {

  // /*
  //     struct EnemyInfo {
  //       id: u32,
  //       influence: f32,
  //       x: f32,
  //       y: f32,
  //       is_attacking_us: bool,
  //     }
  //     struct OurSquadsGroupSafetyInfo<'a> {
  //       enemies_squads: Vec<EnemyInfo>,
  //       our_squads_ids: Vec<u32>,
  //       place: &'a Place,
  //     }
  //     pub struct Place {
  //       pub place_type: PlaceType,
  //       pub squads: Vec<Rc<RefCell<Squad>>>,
  //       pub influence: f32,
  //       pub x: f32,
  //       pub y: f32,
  //     }
  // */
  //     // let option_reserved_squad_index = reserved_squads
  //     //   .iter()
  //     //   .position(|reserved_squad| reserved_squad.squad_id == squad_id);

  //     // if let Some(reserved_squad_index) = option_reserved_squad_index {
  //       // let reservation_purpose_id = reserved_squads[reserved_squad_index].purpose_id;
  //       // let purpose = &new_purposes[reservation_purpose_id];
  //       // let distance_our_place_to_purpose = (purpose.place.x - safety_info.place.x)
  //       //   .hypot(purpose.place.y - safety_info.place.y)
  //       //   .max(MIN_DISTANCE_OF_SEARCHING_ENEMY);

  //       1. Check how much enemy is on the front of our track
  //       2. Check if enemy is attacking us

  //       let squad_destination =
  //       let distance_our_place_to_destination = (purpose.place.x - safety_info.place.x)
  //         .hypot(purpose.place.y - safety_info.place.y)
  //         .max(MIN_DISTANCE_OF_SEARCHING_ENEMY);
  //       TODO: instead of purpose, we should just use squad destination, and this will be even better. And instead of 2 * MAX_RANGE we can use just 1.3 * MAX_RANGE for example
  //       Also seems liek that max_range should include squad_normal_radius...
  //       let is_enemy_on_the_way = safety_info.enemies_squads.iter().any(|enemy_squad| {
  //         let distance_enemy_to_purpose =
  //           (purpose.place.x - enemy_squad.x).hypot(purpose.place.y - enemy_squad.y);
  //         distance_our_place_to_purpose > distance_enemy_to_purpose
  //       });
  //       TODO: do we really need to handle if enemy is in frotn of us or not? So if enemy will attakc us behind, then we shouldn't care???
  //       let reservation_purpose_signification =
  //         reserved_squads[reserved_squad_index].purpose_signification;
  //       if !is_enemy_on_the_way {
  //         (false, 0.0)
  //       } else if signi_calc
  //         .should_single_squad_react_on_met_danger(reservation_purpose_signification)
  //       {
  //         reserved_squads.remove(reserved_squad_index);

  //         (true, reservation_purpose_signification)
  //       } else {
  //         (false, 0.0)
  //       }
  //     // } else {
  //     //   (true, 0.0)
  //     // }
  //   }

  fn recalculate_attack_purpose_signification(
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
          let distance =
            (safety_info.place.x - enemy_info.x).hypot(safety_info.place.y - enemy_info.y);

          if safety_info.place.place_type == PlaceType::Squads {
            return MET_DANGER_PURPOSE_MAX_SIGNIFICATION.max(acc);
          } else if safety_info.place.place_type == PlaceType::Portal {
            // if there will be more our building, rename it to PlaceType::AttackableSquad
            if enemy_info.is_attacking_us {
              return signi_calc
                .additional_signification_enemy_around_our_portal(&enemy_squad, 0.0)
                .max(acc); // prob should happen, with current implementation, but just in case
            }
            if distance < SEARCHING_RANGE_ENEMIES_AROUND_PORTAL {
              return signi_calc
                .additional_signification_enemy_around_our_portal(
                  &enemy_squad,
                  (distance / SEARCHING_RANGE_ENEMIES_AROUND_PORTAL).powi(3), // power to make it more significate if is closer
                )
                .max(acc);
            }
          } else if safety_info.place.place_type == PlaceType::StrategicPoint {
            if distance < SEARCHING_RANGE_ENEMIES_AROUND_STRATEGIC_POINT {
              return signi_calc
                .signification_enemy_around_our_strategic_point(
                  &enemy_squad,
                  (distance / SEARCHING_RANGE_ENEMIES_AROUND_STRATEGIC_POINT).powi(3),
                )
                .max(acc);
            }
          }
        }
        return acc;
      })
  }

  pub fn handle_squads_safety(
    our_faction_id: u32,
    signi_calc: &SignificationCalculator,
    our_squads: &Vec<Ref<Squad>>,
    all_factions_info: &Vec<FactionInfo>,
    squads_grid: &SquadsGrid,
    new_purposes: &mut Vec<EnhancedPurpose>,
    our_squads_safety: &Vec<OurSquadsGroupSafetyInfo>,
  ) {
    our_squads_safety.iter().for_each(|safety_info| {
      if safety_info.enemies_squads.len() > 0 {
        // let mut collected_our_influence = 0.0;
        // let mut squads_ids_which_will_react = vec![];
        // let mut greatest_signification_of_blocker_purposes = 0.0;

        // TODO: use in handling purposes:
        // safety_info.enemies_squads[0].is_attacking or is_in_the_front

        safety_info.our_squads_ids.iter().for_each(|squad_id| {
          // let (squad_cares_about_danger, reservation_purpose_signification) =
          //   SafetyManager::does_squad_care_about_danger(
          //     *squad_id,
          //     reserved_squads,
          //     &new_purposes,
          //     safety_info,
          //     signi_calc,
          //   );
          // if greatest_signification_of_blocker_purposes < reservation_purpose_signification {
          //   greatest_signification_of_blocker_purposes = reservation_purpose_signification;
          // }

          new_purposes.iter_mut().for_each(|new_purpose| {
            if new_purpose.purpose_type == PurposeType::Attack {
              new_purpose.signification = SafetyManager::recalculate_attack_purpose_signification(
                new_purpose,
                safety_info,
                signi_calc,
              );
            }
          });
        });

        // let enemies_influence_who_attacks_us =
        //   safety_info
        //     .enemies_squads
        //     .iter()
        //     .fold(0.0, |acc, enemy_info| {
        //       if enemy_info.is_attacking_us {
        //         acc + enemy_info.influence
        //       } else {
        //         acc
        //       }
        //     });

        // if signi_calc.should_our_squads_group_do_anything_in_danger(
        //   collected_our_influence,
        //   enemies_influence_who_attacks_us,
        //   safety_info.enemies_squads.len(),
        // ) {
        //   log!("signi_calc.should_our_squads_group_do_anything_in_dange");
        //   // Portal won't get here!
        //   let (purpose_id, purpose_signification) = if signi_calc
        //     // We should take care also about our squads, which are not in this group, but are heading here, and will fight also!
        //     .should_our_group_squads_in_danger_attack_enemy(
        //       collected_our_influence,
        //       enemies_influence_who_attacks_us,
        //       safety_info.enemies_squads.len(),
        //     ) {
        //     let mut nearest_enemy_id = 0;
        //     let mut nearest_distance = std::f32::MAX;

        //     safety_info.enemies_squads.iter().for_each(|enemy_squad| {
        //       let distance =
        //         (enemy_squad.x - safety_info.place.x).hypot(enemy_squad.y - safety_info.place.y);
        //       if distance < nearest_distance {
        //         nearest_distance = distance;
        //         nearest_enemy_id = enemy_squad.id;
        //       }
        //     });

        //     let nearest_new_purpose = new_purposes
        //       .iter()
        //       .find(|new_purpose| {
        //         new_purpose
        //           .place
        //           .squads
        //           .iter()
        //           .any(|ref_cell_squad| ref_cell_squad.borrow().id == nearest_enemy_id)
        //       })
        //       .unwrap();

        //     // yea we are adding two times signification, but it's okay, squad which attacks us should be market as with bigger signification
        //     log!(
        //       "danger situation, enemy influence: {}",
        //       (nearest_new_purpose.signification
        //         + greatest_signification_of_blocker_purposes
        //         + COMMON_PURPOSE_MAX_SIGNIFICATION)
        //         .min(MET_DANGER_PURPOSE_MAX_SIGNIFICATION)
        //     );
        //     (
        //       nearest_new_purpose.id,
        //       (nearest_new_purpose.signification
        //         + greatest_signification_of_blocker_purposes
        //         + COMMON_PURPOSE_MAX_SIGNIFICATION)
        //         .min(MET_DANGER_PURPOSE_MAX_SIGNIFICATION),
        //       // We should do similar stuff in collecting new purposes, when there is an enemy of the track
        //       // or if there is enemy of the track, we should avoid adding that squad to purpose, one case if signification is more than 6.0
        //     )
        //   } else {
        //     let new_id = new_purposes.len();
        //     let signification = signi_calc.signification_running_to_safe_place();
        //     let safe_destination_index =
        //       SafetyManager::get_safe_destination_index(&safety_info, &our_squads_safety);
        //     new_purposes.push(EnhancedPurpose {
        //       id: new_id,
        //       purpose_type: PurposeType::RunToSafePlace,
        //       signification,
        //       place: our_squads_safety[safe_destination_index].place.clone(),
        //     });

        //     (new_id, signification)
        //   };

        //   squads_ids_which_will_react
        //     .into_iter()
        //     .for_each(|squad_id| {
        //       reserved_squads.push(ReservedSquad {
        //         purpose_id,
        //         purpose_signification: purpose_signification,
        //         squad_id,
        //       });
        //     });
        // } else {
        //   log!("don't care about enemies around");
        // }
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
