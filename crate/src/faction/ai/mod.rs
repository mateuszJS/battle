mod already_handled_purposes_manager;
mod new_purposes_manager;
mod safety_manager;
mod utils;

use super::signification_calculator::SignificationCalculator;
use crate::squad::Squad;
use crate::squads_grid_manager::SquadsGrid;
use already_handled_purposes_manager::AlreadyHandledPurposesManager;
use new_purposes_manager::NewPurposesManager;
use safety_manager::SafetyManager;
use std::cell::{Ref, RefCell};
use std::rc::{Rc, Weak};
use utils::AiUtils;

#[derive(PartialEq, Clone)]
pub enum PurposeType {
  Attack,
  // TakeStrategicPoint,
  RunToSafePlace,
  // RunToSafePlace,
  // HelpInDanger,
}

pub enum PlaceType {
  Squads,
  Portal,
  // StrategicPoint,
}

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

pub struct EnhancedPurpose<'a> {
  pub id: usize,
  pub purpose_type: PurposeType,
  pub signification: f32,
  pub place: &'a Place,
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

pub struct OurSquadsGroupSafetyInfo<'a> {
  pub collected_enemies_influence_who_attacks_us: f32,
  pub collected_enemies_influence_around: f32,
  collected_enemies_squads_ids_who_attacks_us: Vec<u32>,
  collected_enemies_squads_ids_around: Vec<u32>,
  our_squads_ids: Vec<u32>,
  place: &'a Place,
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

  pub fn work(
    &mut self,
    our_squads_ref_cells: &Vec<Rc<RefCell<Squad>>>,
    all_factions_info: &Vec<FactionInfo>,
    squads_grid: &SquadsGrid,
  ) -> Vec<Plan> {
    let mut final_purposes: Vec<Plan> = vec![];
    let mut our_squads = our_squads_ref_cells
      .iter()
      .map(|ref_cell_squad| ref_cell_squad.borrow())
      .collect::<Vec<Ref<Squad>>>();

    let mut new_purposes = NewPurposesManager::get_purposes(
      self.faction_id,
      &self.signi_calc,
      all_factions_info,
      &self.current_plans,
    );

    let mut reserved_squads =
      AiUtils::get_squads_reservations(&self.current_plans, &new_purposes, &our_squads);

    SafetyManager::handle_squads_safety(
      self.faction_id,
      &self.signi_calc,
      &our_squads,
      &mut reserved_squads,
      all_factions_info,
      squads_grid,
      &mut new_purposes,
    );

    AiUtils::sort_purposes(&mut new_purposes);

    for purpose in new_purposes.iter() {
      if our_squads.len() > 0 {
        /*=============CHECKING IF CURRENT PLAN EXISTS IN NEW PURPOSES==================*/
        let squads_reserved_for_this_purpose = reserved_squads
          .iter()
          .filter(|reserved_squad| reserved_squad.purpose_id == purpose.id)
          .collect::<Vec<&ReservedSquad>>();

        if squads_reserved_for_this_purpose.len() > 0 {
          // have to check influence one more, just in case if some squads were stolen
          let option_new_plan = AlreadyHandledPurposesManager::handle_already_involved_purposes(
            &self.signi_calc,
            &mut our_squads,
            &squads_reserved_for_this_purpose,
            purpose,
          );
          if let Some(new_plan) = option_new_plan {
            final_purposes.push(new_plan)
          }
        } else {
          let option_new_plan = NewPurposesManager::handle_new_purposes(
            self.faction_id,
            &self.signi_calc,
            &mut our_squads,
            purpose,
            &squads_reserved_for_this_purpose,
            squads_grid,
          );
          if let Some(new_plan) = option_new_plan {
            final_purposes.push(new_plan)
          }
        }
      }
    }

    if our_squads.len() > 0 {
      our_squads.iter().for_each(|our_squad| {
        let mut min_distance = std::f32::MAX;
        let mut min_index = -1_isize;

        final_purposes
          .iter()
          .enumerate()
          .for_each(|(index, new_plan)| {
            if new_plan.purpose_type == PurposeType::Attack {
              let squad_position = our_squad.shared.center_point;
              let distance = (squad_position.0 - new_plan.x).hypot(squad_position.1 - new_plan.y);
              if min_distance > distance {
                min_distance = distance;
                min_index = index as isize;
              }
            }
          });
        if min_index >= 0 {
          final_purposes[min_index as usize]
            .squads_ids
            .push(our_squad.id);
        }
      });
    }

    self.current_plans = final_purposes;

    self.current_plans.clone()
  }
}
