mod purposes_manager;
mod safety_manager;
mod signification_calculator;
mod utils;

use crate::squad::Squad;
use crate::squads_grid_manager::SquadsGrid;
use purposes_manager::PurposesManager;
use safety_manager::SafetyManager;
use signification_calculator::SignificationCalculator;
use std::cell::{Ref, RefCell};
use std::rc::{Rc, Weak};
use utils::AiUtils;

pub struct EnemyInfo {
  id: u32,
  influence: f32,
  x: f32,
  y: f32,
  is_attacking_us: bool,
  not_on_the_way: bool,
}

pub struct OurSquadsGroupSafetyInfo<'a> {
  enemies_squads: Vec<EnemyInfo>,
  our_squads_ids: Vec<u32>,
  place: &'a Place,
}

#[derive(PartialEq, Clone)]
pub enum PurposeType {
  Attack,
  RunToSafePlace,
  Capture,
  ReGroupBeforeAttack,
}
#[derive(PartialEq, Clone)]
pub enum PlaceType {
  Squads,
  Portal,
  StrategicPoint,
}

#[derive(Clone)]
pub struct Place {
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
}

#[derive(Clone)]
pub struct Plan {
  pub purpose_type: PurposeType,
  pub squads_ids: Vec<u32>,
  pub enemy_squads: Vec<Weak<RefCell<Squad>>>,
  pub x: f32,
  pub y: f32,
}

pub struct ReservedSquad {
  pub purpose_signification: f32,
  squad_id: u32,
  purpose_id: usize,
}

struct MetEnemyOnTrack {
  enemy_squads_ids: Vec<u32>,
  enemy_influence: f32,
  our_collected_squads_ids: Vec<u32>,
  our_collected_influence: f32,
}

#[derive(Clone)]
struct Item {
  w: usize,
  v: usize,
}

struct SubSolution {
  max_value: usize,
  subset: Vec<Item>,
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
      signi_calc: SignificationCalculator::new(),
    }
  }

  fn get_solution(
    row: usize,
    cap: usize,
    items: &Vec<Item>,
    memo: &Vec<Vec<SubSolution>>,
  ) -> SubSolution {
    let NO_SOLUTION = SubSolution {
      max_value: 0,
      subset: vec![],
    };
    // the column number starts from zero.
    let col = cap - 1;
    let last_item = items[row];
    // The remaining capacity for the sub-problem to solve.
    let remaining = cap - last_item.w; // TODO: here we should include if squad can be taken (danger situation)

    // Refer to the last solution for this capacity,
    // which is in the cell of the previous row with the same column
    let last_solution = if row > 0 {
      &memo[row - 1][col]
    } else {
      &NO_SOLUTION
    };
    // Refer to the last solution for the remaining capacity,
    // which is in the cell of the previous row with the corresponding column
    let last_sub_solution = if row > 0 {
      &memo[row - 1][remaining - 1]
    } else {
      &NO_SOLUTION
    };

    // If any one of the items weights greater than the 'cap', return the last solution
    if remaining < 0 {
      return *last_solution.clone();
    }

    // Compare the current best solution for the sub-problem with a specific capacity
    // to a new solution trial with the lastItem(new item) added
    let last_value = last_solution.max_value;
    let last_sub_value = last_sub_solution.max_value;

    let new_value = last_sub_value + last_item.v;
    if new_value >= last_value {
      // copy the subset of the last sub-problem solution
      let _last_sub_set = last_sub_solution.subset.clone();
      _last_sub_set.push(last_item);
      return SubSolution {
        max_value: new_value,
        subset: _last_sub_set,
      };
    } else {
      return *last_solution.clone();
    }
  }

  fn zero_one_knapsack_problem_dynamic_programming(items: Vec<Item>, capacity: usize) {
    let memo = vec![];
    // Filling the sub-problem solutions grid.
    let mut i = 0;
    while i < items.len() {
      let row = vec![];
      let mut cap = 1;
      while cap <= capacity {
        row.push(ArtificialIntelligence::get_solution(i, cap, &items, &memo));
        cap += 1;
      }
      memo.push(row);
      i += 1;
    }

    let last_wow = memo[memo.len() - 1];
    last_wow[last_wow.len() - 1];
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

    let our_squads_safety =
      SafetyManager::get_info_about_safety(self.faction_id, all_factions_info, squads_grid);

    let mut new_purposes = PurposesManager::get_purposes(
      self.faction_id,
      &self.signi_calc,
      all_factions_info,
      // &self.current_plans,
      // &our_squads,
      // &our_squads_safety,
    );

    // let mut reserved_squads =
    //   AiUtils::get_squads_reservations(&self.current_plans, &new_purposes, &our_squads);

    // If we want to do thins like this (increase purpose signification) then do it in purpose creation
    // SafetyManager::handle_squads_safety(
    //   self.faction_id,
    //   &self.signi_calc,
    //   &our_squads,
    //   // &mut reserved_squads,
    //   all_factions_info,
    //   squads_grid,
    //   &mut new_purposes,
    //   &our_squads_safety,
    // );

    // We should prob do it when we calculate whole table purposes x our_squads
    // AiUtils::sort_purposes(&mut new_purposes);

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

    for purpose in new_purposes.iter() {
      /*=============CHECKING IF CURRENT PLAN EXISTS IN NEW PURPOSES==================*/

      // let option_new_plan = PurposesManager::handle_purpose(
      //   self.faction_id,
      //   &self.signi_calc,
      //   &mut our_squads,
      //   purpose,
      //   // &reserved_squads,
      //   squads_grid,
      // );
      // if let Some(new_plans) = option_new_plan {
      //   final_plans.append(&mut new_plans)
      // }

      // if our_squads.len() == 0 {
      //   break;
      // }
    }

    if our_squads.len() > 0 {
      our_squads.iter().for_each(|our_squad| {
        let mut min_distance = std::f32::MAX;
        let mut min_index = -1_isize;

        final_plans
          .iter()
          .enumerate()
          .for_each(|(index, final_plan)| {
            if final_plan.purpose_type == PurposeType::Attack {
              // e should care about safety?!
              let squad_position = our_squad.shared.center_point;
              let distance =
                (squad_position.0 - final_plan.x).hypot(squad_position.1 - final_plan.y);
              if min_distance > distance {
                min_distance = distance;
                min_index = index as isize;
              }
            }
          });
        if min_index >= 0 {
          final_plans[min_index as usize]
            .squads_ids
            .push(our_squad.id);
        }
        //WRONG! rn some squads shoudl sto pattacking but will go!
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
            && (current_plan.x - final_plan.x).hypot(current_plan.y - final_plan.y) < 1.0
            && current_plan.enemy_squads.len() == final_plan.enemy_squads.len() // do not check exactly each enemy
        })
      })
      .collect::<Vec<Plan>>();

    self.current_plans = final_plans;
    // self
    //   .current_plans
    //   .iter()
    //   .for_each(|plan| match plan.purpose_type {
    //     PurposeType::RunToSafePlace => log!(
    //       "final purpose: run to save place x: {}, y: {}, squads_ids: {:?}",
    //       plan.x,
    //       plan.y,
    //       plan.squads_ids
    //     ),
    //     PurposeType::Attack => log!(
    //       "final purpose: attack x: {}, y: {}, squads_ids: {:?}",
    //       plan.x,
    //       plan.y,
    //       plan.squads_ids
    //     ),
    //     PurposeType::Capture => log!(
    //       "final purpose: capture x: {}, y: {}, squads_ids: {:?}",
    //       plan.x,
    //       plan.y,
    //       plan.squads_ids
    //     ),
    //   });

    plans_needed_to_update
  }
}
