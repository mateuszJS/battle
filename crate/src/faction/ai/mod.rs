mod purposes_manager;
mod safety_manager;
mod signification_calculator;

use crate::squad::Squad;
use crate::squads_grid_manager::SquadsGrid;
use crate::weapon_types::MAX_POSSIBLE_WEAPON_RANGE;
use purposes_manager::PurposesManager;
use safety_manager::SafetyManager;
use signification_calculator::SignificationCalculator;
use std::cell::{Ref, RefCell};
use std::collections::HashMap;
use std::rc::{Rc, Weak};

#[derive(PartialEq, Clone)]
pub enum PurposeType {
  Attack,
  RunToSafePlace,
  Capture,
  Ability,
}
#[derive(PartialEq, Clone)]
pub enum PlaceType {
  Squads,
  Portal,
  StrategicPoint,
}

#[derive(Clone)]
pub struct Place {
  pub id: u32,
  pub place_type: PlaceType,
  pub squads: Vec<Rc<RefCell<Squad>>>,
  pub influence: f32,
  pub x: f32,
  pub y: f32,
}

pub struct FactionInfo {
  pub id: u32,
  pub places: Vec<Place>,
  pub influence_total: f32,
}

pub struct EnhancedPurpose {
  pub id: usize,
  pub purpose_type: PurposeType,
  pub signification: f32,
  pub place: Place,
  pub is_attacking_us: bool, // used to handle purpose, if it's true then we can attack even is we got slightly weaker army
}

#[derive(Clone)]
pub struct Plan {
  pub place_id: u32,
  pub purpose_type: PurposeType,
  pub squads_ids: Vec<u32>,
  pub enemy_squads: Vec<Weak<RefCell<Squad>>>,
  pub x: f32,
  pub y: f32,
}

struct MetEnemyOnTrack {
  enemy_squads_ids: Vec<u32>,
  enemy_influence: f32,
  our_collected_squads_ids: Vec<u32>,
  our_collected_influence: f32,
}

pub struct DangerPlace<'a> {
  enemy_place: &'a Place,
  additional_signification: f32,
  our_places: Vec<&'a Place>, // TODO: is it needed?
  is_attacking_us: bool,
}

pub struct ArtificialIntelligence {
  pub current_plans: Vec<Plan>,
  faction_id: u32,
  signi_calc: SignificationCalculator,
}

impl ArtificialIntelligence {
  pub fn new(faction_id: u32) -> ArtificialIntelligence {
    ArtificialIntelligence {
      current_plans: vec![],
      faction_id,
      signi_calc: SignificationCalculator::new(faction_id),
    }
  }

  fn find_index_of_closest_purpose<'a>(x: f32, y: f32, plans: &Vec<Plan>) -> isize {
    let mut min_index = -1;
    let mut min_distance = std::f32::MAX;
    plans.iter().enumerate().for_each(|(index, plan)| {
      let distance = (x - plan.x).hypot(y - plan.y);

      if [PurposeType::Attack, PurposeType::Capture].contains(&plan.purpose_type)
        && distance < min_distance
      {
        min_distance = distance;
        min_index = index as isize;
      }
    });

    min_index
  }

  fn find_index_of_best_place_to_run<'a>(
    x: f32,
    y: f32,
    safe_places: &Vec<&Place>,
    min_distance_away: f32,
  ) -> usize {
    let mut min_index = 0;
    let mut min_value = std::f32::MAX;
    safe_places
      .iter()
      .enumerate()
      .for_each(|(index, safe_place)| {
        let distance = (x - safe_place.x).hypot(y - safe_place.y);
        let value = if distance < min_distance_away && safe_place.place_type != PlaceType::Portal {
          std::f32::MAX
        } else {
          distance
        };

        if min_value > value {
          min_value = value;
          min_index = index;
        }
      });

    min_index
  }

  pub fn work(
    &mut self,
    our_squads_ref_cells: &Vec<Rc<RefCell<Squad>>>,
    all_factions_info: &Vec<FactionInfo>,
    squads_grid: &SquadsGrid,
  ) -> Vec<Plan> {
    let mut final_plans: Vec<Plan> = vec![];
    let mut our_squads = our_squads_ref_cells
      .iter()
      .map(|ref_cell_squad| ref_cell_squad.borrow())
      .collect::<Vec<Ref<Squad>>>();

    let (safe_places, danger_places) =
      SafetyManager::get_info_about_safety(self.faction_id, all_factions_info, &self.signi_calc);

    let mut new_purposes = PurposesManager::get_purposes(
      self.faction_id,
      &self.signi_calc,
      all_factions_info,
      // &self.current_plans,
      // &our_squads,
      &danger_places,
    );

    new_purposes.sort_by(|a_purpose, b_purpose| {
      (self.signi_calc.get_purpose_sort_value(&b_purpose))
        .partial_cmp(&self.signi_calc.get_purpose_sort_value(&a_purpose))
        .unwrap()
    });

    for purpose in new_purposes.iter() {
      /*=============CHECKING IF CURRENT PLAN EXISTS IN NEW PURPOSES==================*/
      let mut new_plans = PurposesManager::handle_purpose(
        self.faction_id,
        &self.signi_calc,
        &mut our_squads,
        purpose,
        squads_grid,
      );

      final_plans.append(&mut new_plans); // bc we can receive plans to do purpose, and to cast abilities

      if our_squads.len() == 0 {
        break;
      }
    }

    let mut our_squads_to_running_to_safe_places: HashMap<usize, Vec<u32>> = HashMap::new();

    //=================HANDLE DANGER PLACES====================
    danger_places.iter().for_each(|danger_place| {
      if !danger_place.is_attacking_us {
        return;
      }
      let enemy_handled = final_plans
        .iter()
        .any(|plan| danger_place.enemy_place.id == plan.place_id);

      if !enemy_handled {
        danger_place.our_places.iter().for_each(|our_place| {
          if danger_place.enemy_place.influence > our_place.influence {
            // TODO: include signi_calc here!
            // and also handle case when one our place is attacked by multiple enemies! Not only one place with enemy
            let best_safe_place_index = ArtificialIntelligence::find_index_of_best_place_to_run(
              our_place.x,
              our_place.y,
              &safe_places,
              MAX_POSSIBLE_WEAPON_RANGE,
            );

            let best_safe_place_position = &safe_places[best_safe_place_index];
            let distance_to_best_safe_place = (our_place.x - best_safe_place_position.x)
              .hypot(our_place.y - best_safe_place_position.y);

            let mut squads_to_cast_ability = vec![]; // squads which can cast ability to get faster to safe place
            let mut squads_ids_to_run = vec![]; // squads which will run in a standard way

            let mut squads_ids = our_place
              .squads
              .iter()
              .map(|ref_cell_our_squad| {
                let squad = ref_cell_our_squad.borrow();

                if squad.squad_details.ability.usage.transport
                  && squad.ability_cool_down == 0
                  && distance_to_best_safe_place > squad.squad_details.ability.range / 2.0
                {
                  squads_to_cast_ability.push(squad.id)
                } else {
                  squads_ids_to_run.push(squad.id)
                }

                squad.id
              })
              .collect::<Vec<u32>>();

            our_squads.retain(|our_squad| !squads_ids.contains(&our_squad.id));

            final_plans.iter_mut().for_each(|final_plan| {
              final_plan
                .squads_ids
                .retain(|our_squad_id| !squads_ids.contains(our_squad_id));
            });

            if squads_to_cast_ability.len() > 0 {
              // check if type of the ability is transport
              final_plans.push(Plan {
                purpose_type: PurposeType::Ability,
                place_id: best_safe_place_position.id,
                squads_ids: squads_to_cast_ability,
                x: best_safe_place_position.x,
                y: best_safe_place_position.y,
                enemy_squads: vec![],
              })
            }

            if squads_ids_to_run.len() > 0 {
              // if cannot use ability to get faster, then go in standard way, by running
              if our_squads_to_running_to_safe_places.contains_key(&best_safe_place_index) {
                let squads_list = &mut our_squads_to_running_to_safe_places
                  .get_mut(&best_safe_place_index)
                  .unwrap();
                squads_list.append(&mut squads_ids);
              } else {
                our_squads_to_running_to_safe_places.insert(best_safe_place_index, squads_ids);
              }
            }
          }
        });
      }
    });

    //=================HANDLE IDLE SQUADS====================
    if our_squads.len() > 0 {
      let is_any_plan_without_ability = final_plans
        .iter()
        .any(|purpose| purpose.purpose_type != PurposeType::Ability);

      if is_any_plan_without_ability {
        our_squads.iter().for_each(|our_squad| {
          let squad_position = our_squad.shared.center_point;
          let closes_plan_index = ArtificialIntelligence::find_index_of_closest_purpose(
            squad_position.0,
            squad_position.1,
            &final_plans,
          );
          if closes_plan_index != -1 {
            final_plans[closes_plan_index as usize]
              .squads_ids
              .push(our_squad.id);
          }
        });
      } else {
        // We do not have any plans
        our_squads.iter().for_each(|our_squad| {
          let squad_position = our_squad.shared.center_point;
          // there is always at least one safe place, our portal
          let best_safe_place_index = ArtificialIntelligence::find_index_of_best_place_to_run(
            squad_position.0,
            squad_position.1,
            &safe_places,
            0.0, // maybe should be minus epsilon?
          );

          if our_squads_to_running_to_safe_places.contains_key(&best_safe_place_index) {
            let squads_list = &mut our_squads_to_running_to_safe_places
              .get_mut(&best_safe_place_index)
              .unwrap();
            squads_list.push(our_squad.id);
          } else {
            our_squads_to_running_to_safe_places.insert(best_safe_place_index, vec![our_squad.id]);
          }
        });
      }
    }

    //=================HANDLE RESULTS OF DANGER PLACES AND IDLE SQUADS====================
    for (safe_place_index, our_squads_ids) in our_squads_to_running_to_safe_places {
      let best_safe_place = safe_places[safe_place_index];
      final_plans.push(Plan {
        place_id: best_safe_place.id,
        purpose_type: PurposeType::RunToSafePlace,
        squads_ids: our_squads_ids,
        enemy_squads: vec![],
        x: best_safe_place.x,
        y: best_safe_place.y,
      });
    }

    let plans_needed_to_update = final_plans
      .clone()
      .into_iter()
      .filter(|final_plan| {
        // remove all plans that didn't change
        !self.current_plans.iter().any(|current_plan| {
          current_plan.purpose_type == final_plan.purpose_type
            && current_plan.squads_ids.len() == final_plan.squads_ids.len()
            && current_plan
              .squads_ids
              .iter()
              .all(|squad_id| final_plan.squads_ids.contains(&squad_id))
            && (current_plan.x - final_plan.x).hypot(current_plan.y - final_plan.y) < 10.0
            && current_plan.enemy_squads.len() == final_plan.enemy_squads.len() // do not check exactly each enemy
        })
      })
      .collect::<Vec<Plan>>();

    self.current_plans = final_plans;

    plans_needed_to_update
  }
}
