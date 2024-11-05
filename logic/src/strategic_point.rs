use crate::id_generator::IdGenerator;
use crate::representations_ids::STRATEGIC_POINT;
use crate::squad::Squad;
use crate::squad_types::SquadType;
use crate::squads_grid_manager::{SquadsGrid, SquadsGridManager};
use std::cell::RefCell;
use std::rc::Rc;

pub const POINT_RADIUS: f32 = 100.0;
const CAPTURING_PROGRESS_STEP: f32 = 0.01;
pub static STRATEGIC_POINT_EMPTY_OWNER: u32 = 0; // ids start's from 100

pub struct StrategicPoint {
  pub id: u32,
  pub squad: Rc<RefCell<Squad>>,
}

impl StrategicPoint {
  pub fn new(x: f32, y: f32) -> StrategicPoint {
    let id = IdGenerator::generate_id();
    let mut strategic_point_squad = Squad::new(
      STRATEGIC_POINT_EMPTY_OWNER,
      STRATEGIC_POINT_EMPTY_OWNER,
      SquadType::StrategicPoint,
    );
    strategic_point_squad.add_member(x, y);
    strategic_point_squad.update_center();
    strategic_point_squad.capturing_progress = 1.0;

    StrategicPoint {
      id,
      squad: Rc::new(RefCell::new(strategic_point_squad)),
    }
  }

  pub fn update(&mut self, squads_grid: &SquadsGrid) {
    let mut strategic_point_squad = self.squad.borrow_mut();
    let (x, y) = strategic_point_squad.shared.center_point;

    let squads_nearby = SquadsGridManager::get_squads_in_area(squads_grid, x, y, POINT_RADIUS);

    let mut new_owner_id = STRATEGIC_POINT_EMPTY_OWNER;

    let mut all_faction_ids_around = vec![];

    for some_weak_squad in squads_nearby.iter() {
      if let Some(some_ref_cell_squad) = some_weak_squad.upgrade() {
        let some_squad = some_ref_cell_squad.borrow();
        let some_squad_position = some_squad.shared.center_point;
        let distance = (x - some_squad_position.0).hypot(y - some_squad_position.1);

        all_faction_ids_around.push(some_squad.faction_id);

        if distance < POINT_RADIUS {
          if new_owner_id == STRATEGIC_POINT_EMPTY_OWNER {
            new_owner_id = some_squad.faction_id
          } else if new_owner_id != some_squad.faction_id {
            new_owner_id = strategic_point_squad.id;
            break;
          }
        }
      }
    }
    strategic_point_squad.all_faction_ids_around = all_faction_ids_around;

    /* when progress will go to zero, then point is captured by other faction */
    if new_owner_id != STRATEGIC_POINT_EMPTY_OWNER && new_owner_id != strategic_point_squad.id {
      if strategic_point_squad.capturing_progress <= std::f32::EPSILON {
        strategic_point_squad.capturing_progress = 1.0;
        strategic_point_squad.id = new_owner_id;
      } else {
        strategic_point_squad.capturing_progress -= CAPTURING_PROGRESS_STEP;
      }
    } else if strategic_point_squad.capturing_progress < 1.0 {
      strategic_point_squad.capturing_progress += CAPTURING_PROGRESS_STEP;
    }
  }

  pub fn get_representation(&self) -> Vec<f32> {
    let squad = self.squad.borrow();

    vec![
      STRATEGIC_POINT,
      self.id as f32,
      squad.capturing_progress as f32,
      squad.id as f32,
    ]
  }

  pub fn get_squad_copy(&self) -> Rc<RefCell<Squad>> {
    self.squad.clone()
  }
}
