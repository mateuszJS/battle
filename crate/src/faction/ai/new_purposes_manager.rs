use super::SignificationCalculator;
use super::{
  EnhancedPurpose, FactionInfo, MetEnemyOnTrack, PlaceType, Plan, PurposeType, ReservedSquad,
};
use crate::position_utils::PositionUtils;
use crate::squads_grid_manager::{SquadsGrid, SquadsGridManager};
use crate::Squad;
use std::cell::{Ref, RefCell};
use std::rc::{Rc, Weak};

pub struct NewPurposesManager {}

impl NewPurposesManager {
  fn get_first_enemy_groups_on_track(
    our_faction_id: u32,
    signi_calc: &SignificationCalculator,
    purpose: &EnhancedPurpose,
    our_squad: &Ref<Squad>,
    squads_grid: &SquadsGrid,
    our_aim_enemy_squads_ids: &Vec<u32>,
  ) -> Option<(Vec<u32>, f32)> /* (enemy_squads_ids, enemy_influence) */ {
    let track = PositionUtils::get_track(
      our_squad.shared.center_point.0,
      our_squad.shared.center_point.1,
      purpose.place.x,
      purpose.place.y,
    );

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

      /*==========CHECK IF THERE ARE ANY ENEMIES AROUND THE POINT============*/
      let mut collected_enemy_influence = 0.0;
      let mut collected_enemy_squads_ids = vec![];
      for some_weak_squad in squads_nearby.iter() {
        if let Some(some_ref_cell_squad) = some_weak_squad.upgrade() {
          let some_squad = some_ref_cell_squad.borrow();
          if some_squad.faction_id != our_faction_id
            && !our_aim_enemy_squads_ids.contains(&some_squad.id)
          {
            collected_enemy_squads_ids.push(some_squad.id);
            collected_enemy_influence += signi_calc.influence_enemy_squad_on_the_track(&some_squad);
          }
        }
      }

      if collected_enemy_squads_ids.len() > 0 {
        return Some((collected_enemy_squads_ids, collected_enemy_influence));
      }
    }
    return None;
  }

  pub fn get_purposes<'a>(
    our_faction_id: u32,
    signi_calc: &SignificationCalculator,
    all_factions_info: &'a Vec<FactionInfo>,
    current_plans: &Vec<Plan>,
  ) -> Vec<EnhancedPurpose<'a>> {
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
                PlaceType::Portal => (PurposeType::Attack, signi_calc.signification_enemy_portal()),
                PlaceType::Squads => (
                  PurposeType::Attack,
                  signi_calc.signification_enemy_squads(place),
                ),
              };

              new_id += 1;

              EnhancedPurpose {
                id: new_id as usize,
                purpose_type,
                signification,
                place,
              }
            })
            .collect::<Vec<EnhancedPurpose>>()
        } else {
          faction_info
            .places
            .iter()
            .filter_map(|place| {
              let exists_in_current_plans = current_plans.iter().any(|current_plan| {
                (current_plan.x - place.x).hypot(current_plan.y - place.y) < 1.0
              });

              if exists_in_current_plans {
                new_id += 1;
                Some(EnhancedPurpose {
                  id: new_id as usize,
                  purpose_type: PurposeType::RunToSafePlace,
                  signification: signi_calc.signification_running_to_safe_place(),
                  place,
                })
              } else {
                None
              }
            })
            .collect::<Vec<EnhancedPurpose>>()
        }
      })
      .collect::<Vec<EnhancedPurpose>>()
  }

  pub fn handle_new_purposes(
    our_faction_id: u32,
    signi_calc: &SignificationCalculator,
    our_squads: &mut Vec<Ref<Squad>>,
    purpose: &EnhancedPurpose,
    squads_reserved_for_this_purpose: &Vec<&ReservedSquad>,
    squads_grid: &SquadsGrid,
  ) -> Option<Plan> {
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
      let option_reserved_squad = squads_reserved_for_this_purpose
        .iter()
        .find(|reserved_squad| reserved_squad.squad_id == our_squad.id);

      let squad_can_be_taken_by_purpose = if let Some(reserved_squad) = option_reserved_squad {
        signi_calc.is_reserved_purpose_much_less_important(reserved_squad, purpose)
      } else {
        true
      };

      if squad_can_be_taken_by_purpose {
        // TODO: each purposes should have their own modifier/factor of our influence
        // TODO: also influence should be multiplied by distance, longer distance then smaller influence!

        //******************** EXTRACT TO ANOTHER FUNCTION
        let option_enemy_on_track = NewPurposesManager::get_first_enemy_groups_on_track(
          our_faction_id,
          signi_calc,
          purpose,
          our_squad,
          squads_grid,
          &enemy_squads_ids,
        );
        // definitely we are tacking enemies much from too big range
        if let Some((enemy_squads_ids, enemy_influence)) = option_enemy_on_track {
          // here we are counting how many our squads will got enemy on the track
          // if this one particular group of enemy was met a couple of times, and we got
          // enough influence to bet them, then we can use our influence as there is no enemy of the track
          // otherwise, our squads are blocked, and cannot be used in current processed purpose ;(
          let option_met_enemy = already_met_enemies.iter_mut().find(|met_enemy| {
            enemy_squads_ids
              .iter()
              .all(|enemy_squad_id| met_enemy.enemy_squads_ids.contains(&enemy_squad_id))
          });

          let our_squad_influence = signi_calc.influence_our_squad_new_purpose(our_squad);
          let (mut our_blocked_squads_ids, our_blocked_influence, blocking_enemy_influence) =
            if let Some(met_enemy) = option_met_enemy {
              met_enemy.our_collected_squads_ids.push(our_squad.id);
              met_enemy.our_collected_influence += our_squad_influence;
              (
                &mut met_enemy.our_collected_squads_ids,
                met_enemy.our_collected_influence,
                met_enemy.enemy_influence, // raised up, weirdo!
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
                enemy_influence, // raised up, weirdo!
              )
            };
          if blocking_enemy_influence <= our_blocked_influence {
            collected_our_influence += our_blocked_influence;
            used_squads_ids.append(&mut our_blocked_squads_ids);
          }
          continue;
        }

        //********************
        used_squads_ids.push(our_squad.id);
        collected_our_influence += signi_calc.influence_our_squad_new_purpose(our_squad);
      }
    }

    if collected_our_influence >= purpose.place.influence {
      our_squads.retain(|squad| !used_squads_ids.contains(&squad.id));

      let enemy_squads = purpose
        .place
        .squads
        .iter()
        .map(|ref_cell_squad| Rc::downgrade(ref_cell_squad))
        .collect::<Vec<Weak<RefCell<Squad>>>>();

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
