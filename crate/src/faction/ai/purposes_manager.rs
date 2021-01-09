use super::safety_manager::MIN_DISTANCE_OF_SEARCHING_ENEMY;
use super::signification_calculator::{
  COMMON_PURPOSE_MAX_SIGNIFICATION, THRESHOLD_SIGNIFICATION_URGENT_PURPOSE,
};
use super::SignificationCalculator;
use crate::weapon_types::MAX_POSSIBLE_WEAPON_RANGE;
use super::{
  EnhancedPurpose, FactionInfo, MetEnemyOnTrack, OurSquadsGroupSafetyInfo, PlaceType, Plan, PurposeType, ReservedSquad,
};
use crate::position_utils::PositionUtils;
use crate::squads_grid_manager::{SquadsGrid, SquadsGridManager};
use crate::Squad;
use std::cell::{Ref, RefCell};
use std::rc::{Rc, Weak};

struct OurAttackerInfo {
  squad_id: u32,
  pos_before_purpose_x: f32,
  pos_before_purpose_y: f32,
}

pub struct PurposesManager {}

impl PurposesManager {
  fn get_first_enemy_groups_on_track(
    track: &Vec<(f32, f32)>,
    our_faction_id: u32,
    signi_calc: &SignificationCalculator,
    squads_grid: &SquadsGrid,
    our_aim_enemy_squads_ids: &Vec<u32>,
  ) -> Option<(Vec<u32>, f32)> /* (enemy_squads_ids, enemy_influence) */ {
    for (index, point) in track.iter().enumerate() {
      if index == track.len() - 1 {
        break;
      }
      let next_point = &track[index + 1];
      let squads_nearby = SquadsGridManager::get_first_met_squads(
        squads_grid,
        point.0,
        point.1,
        next_point.0,
        next_point.1,
      );
      let distance_our_squads_point_to_purpose = (point.0 - next_point.0)
        .hypot(point.1 - next_point.1)
        .max(MIN_DISTANCE_OF_SEARCHING_ENEMY);

      /*==========CHECK IF THERE ARE ANY ENEMIES AROUND THE POINT============*/
      let mut collected_enemy_influence = 0.0;
      let mut collected_enemy_squads_ids = vec![];
      for some_weak_squad in squads_nearby.iter() {
        if let Some(some_ref_cell_squad) = some_weak_squad.upgrade() {
          let some_squad = some_ref_cell_squad.borrow();
          let some_squad_position = some_squad.shared.center_point;
          let distance_enemy_to_purpose =
            (some_squad_position.0 - next_point.0).hypot(some_squad_position.1 - next_point.1);
          if some_squad.faction_id != our_faction_id
            && !our_aim_enemy_squads_ids.contains(&some_squad.id)
            && distance_our_squads_point_to_purpose > distance_enemy_to_purpose
          {
            collected_enemy_squads_ids.push(some_squad.id);
            collected_enemy_influence += some_squad.get_influence();
          }
        }
      }

      if collected_enemy_squads_ids.len() > 0 {
        return Some((collected_enemy_squads_ids, collected_enemy_influence));
      }
    }
    return None;
  }

  pub fn get_purposes(
    our_faction_id: u32,
    signi_calc: &SignificationCalculator,
    all_factions_info: &Vec<FactionInfo>,
    // current_plans: &Vec<Plan>,
    // our_squads: &Vec<Ref<Squad>>,
    // our_squads_safety: &Vec<OurSquadsGroupSafetyInfo>,
  ) -> Vec<EnhancedPurpose> {
    let mut new_id = -1_isize;

    all_factions_info
      .iter()
      .flat_map(|faction_info| {
        if faction_info.id != our_faction_id {
          faction_info
            .places
            .iter()
            .map(|place| {
              let (purpose_type, signification) = match place.place_type {
                PlaceType::Portal => (
                  PurposeType::Attack,
                  signi_calc.signification_enemy_portal(&place.squads[0].borrow()),
                ),
                PlaceType::Squads => {
                  // here we could check, if enemy is danger for us, and increase signification
                  // or we can do it when we will calculate table for purposes x our_squads
                  let signification = place.squads.iter().fold(0.0, |acc, ref_cell_squad| {
                    acc + signi_calc.signification_enemy_squads(&ref_cell_squad.borrow())
                  });
                  (PurposeType::Attack, signification)
                }
                PlaceType::StrategicPoint => (
                  PurposeType::Capture,
                  signi_calc.signification_strategic_point(),
                ),
              };

              new_id += 1;

              EnhancedPurpose {
                id: new_id as usize,
                purpose_type,
                signification: signification.min(COMMON_PURPOSE_MAX_SIGNIFICATION),
                place: place.clone(),
              }
            })
            .collect::<Vec<EnhancedPurpose>>()
        } else {
          vec![]
          // current_plans
          //   .iter()
          //   .filter_map(|current_plan| {
          //     if current_plan.purpose_type != PurposeType::RunToSafePlace {
          //       return None;
          //     }
          //     let current_plan_our_squads = our_squads
          //       .iter()
          //       .filter(|squad| current_plan.squads_ids.contains(&squad.id))
          //       .collect::<Vec<&Ref<Squad>>>();

          //     if current_plan_our_squads.len() == 0 {
          //       return None;
          //     }

          //     let safety_info = our_squads_safety.iter().filter(|safety_info| {
          //       safety_info.our_squads_ids.contains(&current_plan_our_squads.id)
          //     });

          //     let (sum_x, sum_y) =
          //       current_plan_our_squads
          //         .iter()
          //         .fold((0.0, 0.0), |(sum_x, sum_y), our_squad| {
          //           (
          //             sum_x + our_squad.shared.center_point.0,
          //             sum_y + our_squad.shared.center_point.1,
          //           )
          //         });

          //     let avg_x = sum_x / current_plan_our_squads.len() as f32;
          //     let avg_y = sum_y / current_plan_our_squads.len() as f32;

          //     let distance_to_purpose = (avg_x - current_plan.x).hypot(avg_y - current_plan.y);

          //     if distance_to_purpose > 150.0 {
          //       new_id += 1;
          //       Some(EnhancedPurpose {
          //         id: new_id as usize,
          //         purpose_type: PurposeType::RunToSafePlace,
          //         signification: signi_calc.signification_running_to_safe_place(),
          //         place: Place {
          //           place_type: PlaceType::Squads, // type doesn't matter
          //           squads: vec![],
          //           influence: 0.0,
          //           x: current_plan.x,
          //           y: current_plan.y,
          //         },
          //       })
          //     } else if  {
          //       // check if is in safe place, but didn't reach the destination yet
          //     } else {
          //       // Check if there are any enemy influence around us! if not, then can stop
          //       None
          //     }
          //   })
          //   .collect::<Vec<EnhancedPurpose>>()
        }
      })
      .collect::<Vec<EnhancedPurpose>>()
  }

  pub fn handle_purpose(
    our_faction_id: u32,
    signi_calc: &SignificationCalculator,
    our_squads: &mut Vec<Ref<Squad>>,
    purpose: &EnhancedPurpose,
    squads_grid: &SquadsGrid,
  ) -> Option<Vec<Plan>> {
    if purpose.purpose_type == PurposeType::RunToSafePlace {
      return if reservations_for_this_purpose.len() > 0 {
        TODO: do it in other way, like introduce special vector "willing_squads_ids: Vec<u32>"
        our_squads.retain(|squad| !reservations_for_this_purpose.contains(&squad.id));
        Some(
          vec![
            Plan {
              purpose_type: PurposeType::RunToSafePlace,
              squads_ids: reservations_for_this_purpose,
              enemy_squads: vec![],
              x: purpose.place.x,
              y: purpose.place.y,
            }
          ]
        )
      } else {
        None
      };
    }
    // And we got issue here, we have 2.0 + extra signification in reservations! But purposes are still in old order :/
    our_squads.sort_by(|a_squad, b_squad| {
      let a = signi_calc.how_much_squad_fits_to_take_purpose(&purpose, a_squad);
      let b = signi_calc.how_much_squad_fits_to_take_purpose(&purpose, b_squad);
      (a).partial_cmp(&b).unwrap()
    });

    let mut our_squads_last_index = our_squads.len();
    let mut used_squads_ids = vec![];
    let mut collected_our_influence = 0.0;

    let enemy_squads_ids = purpose
      .place
      .squads
      .iter()
      .map(|ref_cell_squad| ref_cell_squad.borrow().id)
      .collect::<Vec<u32>>();

    let mut already_met_enemies: Vec<MetEnemyOnTrack> = vec![];

    while collected_our_influence < purpose.place.influence && our_squads_last_index > 0 {
      our_squads_last_index -= 1;
      let our_squad = &our_squads[our_squads_last_index];

      // if we have met someone on the track, then check if that enemy is really close us, maybe if exists in safety manager
      // if exists, then avoid adding this purpose
      // if purpose is not bigger than 6.0 signi_calc.should_single_squad_react_on_met_danger()

      let our_squad_influence = signi_calc.influence_our_squad(our_squad);
      
      if our_squad.shared.center_point.0.is_nan() || our_squad.shared.center_point.1.is_nan() {
        log!(
          "get_first_enemy_groups_on_track: {} {}",
          our_squad.shared.center_point.0,
          our_squad.shared.center_point.1
        );
      }
      let track = PositionUtils::get_track(
        our_squad.shared.center_point.0,
        our_squad.shared.center_point.1,
        purpose.place.x,
        purpose.place.y,
      );

      let option_enemy_on_track = PurposesManager::get_first_enemy_groups_on_track(
        &track,
        our_faction_id,
        signi_calc,
        squads_grid,
        &enemy_squads_ids,
      );
      // definitely we are tacking enemies much from too big range
      if let Some((enemy_squads_ids, enemy_influence)) = option_enemy_on_track {
        // here we are counting how many our squads will got enemy on the track
        // if this one particular group of enemy was met a couple of times, and we got
        // enough influence to bet them, then we can use our influence as there is no enemy of the track
        // otherwise, our squads are blocked, and cannot be used in current processed purpose ;(

        // START OF FUNCTION TO MOVE
        let option_met_enemy = already_met_enemies.iter_mut().find(|met_enemy| {
          enemy_squads_ids
            .iter()
            .all(|enemy_squad_id| met_enemy.enemy_squads_ids.contains(&enemy_squad_id))
        });

        let (mut our_blocked_squads_ids, our_blocked_influence, blocking_enemy_influence) =
          if let Some(met_enemy) = option_met_enemy {
            met_enemy.our_collected_squads_ids.push(our_squad.id);
            met_enemy.our_collected_influence += our_squad_influence;
            (
              &mut met_enemy.our_collected_squads_ids,
              met_enemy.our_collected_influence,
              met_enemy.enemy_influence,
            )
          } else {
            let new_entry = MetEnemyOnTrack {
              enemy_squads_ids,
              enemy_influence,
              our_collected_squads_ids: vec![our_squad.id],
              our_collected_influence: our_squad_influence,
            };
            already_met_enemies.push(new_entry);
            (
              &mut already_met_enemies[0].our_collected_squads_ids,
              our_squad_influence,
              enemy_influence,
            )
          };

        if blocking_enemy_influence <= our_blocked_influence
          || purpose.signification >= THRESHOLD_SIGNIFICATION_URGENT_PURPOSE
        {
          if our_blocked_squads_ids.len() == 1 {
            /*if we already added our_blocked_squads_ids (so we bet the enemy and our_blocked_squads_ids.len() == 1)
            then we shouldn't add to collected_our_influence already added influence, only that new one*/
            collected_our_influence += our_squad_influence;
          } else {
            collected_our_influence += our_blocked_influence;
          }
          used_squads_ids.append(&mut our_blocked_squads_ids); // This clears our_blocked_squads_ids vector!
        }
      // END OF FUNCTION TO MOVE
      } else {

        let mut i = track.len() - 1;
        let mut distance_sum = 0.0;
        while i > 0 {
          let distance = (track[i].0 - track[i - 1].0).hypot(track[i].1 - track[i - 1].1);
          distance_sum += distance;
          if distance_sum > 1.5 * MAX_POSSIBLE_WEAPON_RANGE {
            break;
          }
          i -= 1;
        }


        TODO: instead of calculatign stuff liek this, we should set in the attack weapon range to 1.5 * MAX_RANGE!!!!

        if i == 0 {
          // squad is closer than 1.5 * MAX_RANGE to the purpose! 
        } else {

        }

        used_squads_ids.push(OurAttackerInfo {
          squad_id: our_squad.id,
          pos_before_purpose_x: ,
          pos_before_purpose_y: ,
        });
        collected_our_influence += our_squad_influence;
      }
    }
    // log!("{} >= {}", collected_our_influence, purpose.place.influence);
    // log!("squads: {:?}", used_squads_ids);
    if collected_our_influence >= purpose.place.influence
      || purpose.signification >= THRESHOLD_SIGNIFICATION_URGENT_PURPOSE
    {
      our_squads.retain(|squad| !used_squads_ids.contains(&squad.id));

      let enemy_squads = purpose
        .place
        .squads
        .iter()
        .map(|ref_cell_squad| Rc::downgrade(ref_cell_squad))
        .collect::<Vec<Weak<RefCell<Squad>>>>();

      TODO: collect our squads with position also, not only with id! Here we could add purpose to wait, instead of Attack
      point 1.

      we should check track, from last part. Add distance of each line, and if distance then is bigger than 1.5 * MAX_RANGE
      then set it to be equal 1.5 * MAX_RANGE
      Some(Plan {
        purpose_type: purpose.purpose_type.clone(),
        squads_ids: used_squads_ids,
        enemy_squads,
        x: purpose.place.x,
        y: purpose.place.y,
      })
    } else {
      None
    }
  }
}
