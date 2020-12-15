use crate::id_generator::IdGenerator;
use crate::representations_ids::STRATEGIC_POINT;
use crate::squads_grid_manager::{SquadsGrid, SquadsGridManager};

const POINT_RADIUS: f32 = 100.0;
const MAX_PROGRESS: u8 = 100;
pub static STRATEGIC_POINT_EMPTY_OWNER: u32 = 0; // ids start's from 100

pub struct StrategicPoint {
  pub id: u32,
  pub owner_faction_id: u32,
  pub progress: u8,
  pub x: f32,
  pub y: f32,
}

impl StrategicPoint {
  pub fn new(x: f32, y: f32) -> StrategicPoint {
    StrategicPoint {
      id: IdGenerator::generate_id(),
      owner_faction_id: STRATEGIC_POINT_EMPTY_OWNER,
      progress: MAX_PROGRESS,
      x,
      y,
    }
  }

  pub fn update(&mut self, squads_grid: &SquadsGrid) {
    let squads_nearby =
      SquadsGridManager::get_squads_in_area(squads_grid, self.x, self.y, POINT_RADIUS);

    if squads_nearby.len() == 0 {
      return;
    }

    let mut new_owner_id = STRATEGIC_POINT_EMPTY_OWNER;

    for some_weak_squad in squads_nearby.iter() {
      if let Some(some_ref_cell_squad) = some_weak_squad.upgrade() {
        let some_squad = some_ref_cell_squad.borrow();
        let some_squad_position = some_squad.shared.center_point;
        let distance = (self.x - some_squad_position.0).hypot(self.y - some_squad_position.1);
        if distance < POINT_RADIUS {
          if new_owner_id == STRATEGIC_POINT_EMPTY_OWNER {
            new_owner_id = some_squad.faction_id
          } else if new_owner_id != some_squad.faction_id {
            new_owner_id = self.owner_faction_id;
            break;
          }
        }
      }
    }

    /* when progress will go to zero, then point is captured by other faction */

    if new_owner_id != STRATEGIC_POINT_EMPTY_OWNER && new_owner_id != self.owner_faction_id {
      if self.progress == 0 {
        self.progress = MAX_PROGRESS;
        self.owner_faction_id = new_owner_id;
      } else {
        self.progress -= 1;
      }
    } else if self.progress < MAX_PROGRESS {
      self.progress += 1;
    }
  }

  pub fn get_representation(&self) -> Vec<f32> {
    vec![
      STRATEGIC_POINT,
      self.id as f32,
      self.progress as f32,
      self.owner_faction_id as f32,
    ]
  }

  pub fn get_influence(&self) -> f32 {
    1.0 - self.progress as f32 / MAX_PROGRESS as f32
  }
}
