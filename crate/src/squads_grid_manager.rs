use super::{Faction, Squad};
use crate::constants::{
  GRID_MAP_HEIGHT, GRID_MAP_SCALE_AVG, GRID_MAP_SCALE_X, GRID_MAP_SCALE_Y, GRID_MAP_WIDTH,
  NORMAL_SQUAD_RADIUS, THRESHOLD_MAX_UNIT_DISTANCE_FROM_SQUAD_CENTER,
};
use std::cell::RefCell;
use std::collections::HashMap;
use std::rc::{Rc, Weak};

pub struct SquadsGridManager {}

impl SquadsGridManager {
  pub fn create(factions: &Vec<Faction>) -> HashMap<usize, Vec<Weak<RefCell<Squad>>>> {
    let mut grid: HashMap<usize, Vec<Weak<RefCell<Squad>>>> = HashMap::new();

    factions.iter().for_each(|faction| {
      SquadsGridManager::grid_add_entry(&faction.portal_squad, &mut grid);
      faction
        .squads
        .iter()
        .for_each(|squad| SquadsGridManager::grid_add_entry(squad, &mut grid));
    });

    grid
  }

  fn grid_add_entry(
    ref_cell_squad: &Rc<RefCell<Squad>>,
    grid: &mut HashMap<usize, Vec<Weak<RefCell<Squad>>>>,
  ) {
    let (x, y) = ref_cell_squad.borrow().shared.center_point;
    let index = SquadsGridManager::get_index_from_real_position(x, y);
    let weak_ref = Rc::downgrade(&ref_cell_squad);

    match grid.get_mut(&index) {
      Some(squads_list) => {
        squads_list.push(weak_ref);
      }
      None => {
        grid.insert(index, vec![weak_ref]);
      }
    };
  }

  pub fn get_real_position_from_index(index: usize) -> (f32, f32) {
    let scaled_y = (index / GRID_MAP_WIDTH) as f32 / GRID_MAP_SCALE_Y;
    let scaled_x = (index % GRID_MAP_WIDTH) as f32 / GRID_MAP_SCALE_X;
    (scaled_x, scaled_y)
  }

  fn get_index_from_real_position(x: f32, y: f32) -> usize {
    let scaled_x = (x * GRID_MAP_SCALE_X) as usize;
    let scaled_y = (y * GRID_MAP_SCALE_Y) as usize;
    scaled_y * GRID_MAP_WIDTH + scaled_x
  }

  pub fn get_squads_in_area(
    grid: &HashMap<usize, Vec<Weak<RefCell<Squad>>>>,
    raw_x: f32,
    raw_y: f32,
    raw_radius: f32,
  ) -> Vec<Weak<RefCell<Squad>>> {
    let radius = (NORMAL_SQUAD_RADIUS + raw_radius + THRESHOLD_MAX_UNIT_DISTANCE_FROM_SQUAD_CENTER)
      * GRID_MAP_SCALE_AVG; // TODO: should be cos() + sin()
    let x = raw_x * GRID_MAP_SCALE_X;
    let y = raw_y * GRID_MAP_SCALE_Y;
    let min_x = ((x - radius) as usize).max(0).min(GRID_MAP_WIDTH - 1);
    let max_x = ((x + radius) as usize).max(0).min(GRID_MAP_WIDTH - 1);
    let min_y = ((y - radius) as usize).max(0).min(GRID_MAP_HEIGHT - 1);
    let max_y = ((y + radius) as usize).max(0).min(GRID_MAP_HEIGHT - 1);

    let mut result = vec![];

    for x in min_x..=max_x {
      for y in min_y..=max_y {
        // result.push(x as f32 / GRID_MAP_SCALE);
        // result.push(y as f32 / GRID_MAP_SCALE);
        let index = y * GRID_MAP_WIDTH + x;
        match grid.get(&index) {
          Some(squads_list) => result = [&result[..], &squads_list[..]].concat(),
          None => {}
        };
      }
    }

    result
  }

  pub fn get_squads_in_area_debug(
    grid: &HashMap<usize, Vec<Weak<RefCell<Squad>>>>,
    raw_x: f32,
    raw_y: f32,
    raw_radius: f32,
  ) -> Vec<f32> {
    let radius = (raw_radius + THRESHOLD_MAX_UNIT_DISTANCE_FROM_SQUAD_CENTER) * GRID_MAP_SCALE_AVG; // TODO: should be cos() + sin()
    let x = raw_x * GRID_MAP_SCALE_X;
    let y = raw_y * GRID_MAP_SCALE_Y;
    let min_x = ((x - radius) as usize).max(0).min(GRID_MAP_WIDTH - 1);
    let max_x = ((x + radius) as usize).max(0).min(GRID_MAP_WIDTH - 1);
    let min_y = ((y - radius) as usize).max(0).min(GRID_MAP_HEIGHT - 1);
    let max_y = ((y + radius) as usize).max(0).min(GRID_MAP_HEIGHT - 1);

    let mut result = vec![];

    for x in min_x..=max_x {
      for y in min_y..=max_y {
        result.push(x as f32 / GRID_MAP_SCALE_X);
        result.push(y as f32 / GRID_MAP_SCALE_Y);
        let index = y * GRID_MAP_WIDTH + x;
      }
    }

    result
  }
}
