use super::{Faction, Squad};
use crate::constants::{
  GRID_CELL_SIZE, GRID_MAP_HEIGHT, GRID_MAP_SCALE_AVG, GRID_MAP_SCALE_X, GRID_MAP_SCALE_Y,
  GRID_MAP_WIDTH, NORMAL_SQUAD_RADIUS, THRESHOLD_MAX_UNIT_DISTANCE_FROM_SQUAD_CENTER,
};
use crate::weapon_types::MAX_POSSIBLE_WEAPON_RANGE;
use std::cell::RefCell;
use std::collections::HashMap;
use std::rc::{Rc, Weak};

// TODO: if portals are too close to each other, then it should be smaller!
const DISTANCE_THRESHOLD_THERE_IS_ENEMY_ON_PATH: f32 = 0.75 * MAX_POSSIBLE_WEAPON_RANGE;

pub type SquadsGrid = HashMap<usize, Vec<Weak<RefCell<Squad>>>>;

pub struct SquadsGridManager {}

impl SquadsGridManager {
  pub fn create(factions: &Vec<Faction>) -> SquadsGrid {
    let mut grid: SquadsGrid = HashMap::new();

    factions.iter().for_each(|faction| {
      SquadsGridManager::grid_add_entry(&faction.portal_squad, &mut grid);
      faction
        .squads
        .iter()
        .for_each(|squad| SquadsGridManager::grid_add_entry(squad, &mut grid));
    });

    grid
  }

  fn grid_add_entry(ref_cell_squad: &Rc<RefCell<Squad>>, grid: &mut SquadsGrid) {
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

  pub fn get_squads_in_line(
    grid: &SquadsGrid,
    line_start_x: f32,
    line_start_y: f32,
    line_end_x: f32,
    line_end_y: f32,
  ) -> Vec<Weak<RefCell<Squad>>> {
    let angle_from_start = (line_end_x - line_start_x).atan2(line_start_y - line_end_y);
    let step_distance = 2.0 * DISTANCE_THRESHOLD_THERE_IS_ENEMY_ON_PATH;
    let mod_x = angle_from_start.sin() * step_distance;
    let mod_y = -angle_from_start.cos() * step_distance;
    let total_distance = (line_start_x - line_end_x).hypot(line_start_y - line_end_y);

    let mut indexes = (0..=(total_distance / step_distance).ceil() as usize)
      .collect::<Vec<usize>>()
      .into_iter()
      .flat_map(|index| {
        SquadsGridManager::get_indexes_in_area(
          line_start_x + index as f32 * mod_x,
          line_start_y + index as f32 * mod_y,
          DISTANCE_THRESHOLD_THERE_IS_ENEMY_ON_PATH,
        )
      })
      .collect::<Vec<usize>>();

    indexes.sort_by(|a, b| (a).partial_cmp(&b).unwrap());
    indexes.dedup();

    indexes
      .iter()
      .flat_map(|index| match grid.get(&index) {
        Some(squads_list) => squads_list.clone(),
        None => vec![],
      })
      .collect::<Vec<Weak<RefCell<Squad>>>>()
  }

  fn get_indexes_in_area(raw_x: f32, raw_y: f32, raw_radius: f32) -> Vec<usize> {
    let radius = (NORMAL_SQUAD_RADIUS + raw_radius + THRESHOLD_MAX_UNIT_DISTANCE_FROM_SQUAD_CENTER)
      * GRID_MAP_SCALE_AVG;
    let x = raw_x * GRID_MAP_SCALE_X;
    let y = raw_y * GRID_MAP_SCALE_Y;
    let min_x = ((x - radius) as usize).max(0).min(GRID_MAP_WIDTH - 1);
    let max_x = ((x + radius) as usize).max(0).min(GRID_MAP_WIDTH - 1);
    let min_y = ((y - radius) as usize).max(0).min(GRID_MAP_HEIGHT - 1);
    let max_y = ((y + radius) as usize).max(0).min(GRID_MAP_HEIGHT - 1);

    let y_vector = (min_y..=max_y).collect::<Vec<usize>>();
    (min_x..=max_x)
      .collect::<Vec<usize>>()
      .iter()
      .flat_map(|x| {
        y_vector
          .iter()
          .map(|y| y * GRID_MAP_WIDTH + x)
          .collect::<Vec<usize>>()
      })
      .collect::<Vec<usize>>()
  }

  pub fn get_squads_in_area(
    grid: &SquadsGrid,
    raw_x: f32,
    raw_y: f32,
    raw_radius: f32,
  ) -> Vec<Weak<RefCell<Squad>>> {
    SquadsGridManager::get_indexes_in_area(raw_x, raw_y, raw_radius)
      .iter()
      .flat_map(|index| match grid.get(&index) {
        Some(squads_list) => squads_list.clone(),
        None => vec![],
      })
      .collect::<Vec<Weak<RefCell<Squad>>>>()
  }

  pub fn get_squads_in_area_debug(
    grid: &SquadsGrid,
    raw_x: f32,
    raw_y: f32,
    raw_radius: f32,
  ) -> Vec<f32> {
    let radius = (NORMAL_SQUAD_RADIUS + raw_radius + THRESHOLD_MAX_UNIT_DISTANCE_FROM_SQUAD_CENTER)
      * GRID_MAP_SCALE_AVG;
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

  pub fn get_indexes_in_line_debug(
    line_start_x: f32,
    line_start_y: f32,
    line_end_x: f32,
    line_end_y: f32,
  ) -> Vec<f32> {
    let angle_from_start = (line_end_x - line_start_x).atan2(line_start_y - line_end_y);
    let range = GRID_CELL_SIZE;
    let step_distance = 2.0 * range;
    let mod_x = angle_from_start.sin() * step_distance;
    let mod_y = -angle_from_start.cos() * step_distance;
    let total_distance = (line_start_x - line_end_x).hypot(line_start_y - line_end_y);

    (0..=(total_distance / step_distance).round() as usize)
      .collect::<Vec<usize>>()
      .into_iter()
      .flat_map(|index| {
        vec![
          line_start_x + index as f32 * mod_x,
          line_start_y + index as f32 * mod_y,
        ]
      })
      .collect::<Vec<f32>>()
  }
}
