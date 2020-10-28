use crate::constants::{
  MATH_PI, NORMAL_SQUAD_RADIUS, THRESHOLD_MAX_UNIT_DISTANCE_FROM_SQUAD_CENTER,
};
use crate::position_utils::PositionUtils;
use crate::squad::Squad;
use crate::SquadsGridManager;
use std::cell::{Ref, RefCell};
use std::collections::HashMap;
use std::rc::{Rc, Weak};

pub struct SquadsManager {}

impl SquadsManager {
  pub fn set_positions_in_range(squads: &Vec<&Rc<RefCell<Squad>>>, target: (f32, f32), range: f32) {
    let mut squads_out_of_range = squads
      .into_iter()
      .filter_map(|ref_cell_squad| {
        let squad = ref_cell_squad.borrow_mut();
        let (x, y) = squad.shared.center_point;
        if (x - target.0).hypot(y - target.1) + NORMAL_SQUAD_RADIUS < range {
          None
        } else {
          Some(*ref_cell_squad)
        }
      })
      .collect::<Vec<&Rc<RefCell<Squad>>>>();
    // TODO: divide squads_out_of_range into smaller groups by weapon and range (range should be included in squads_out_of_range closure)
    let mut positions = PositionUtils::get_attackers_position(
      squads_out_of_range.len(),
      SquadsManager::calc_army_center(&squads_out_of_range),
      target,
      range,
    );

    positions.sort_by(|a, b| (a.1).partial_cmp(&b.1).unwrap());

    squads_out_of_range.sort_by(|a, b| {
      (a.borrow().shared.center_point.1)
        .partial_cmp(&b.borrow().shared.center_point.1)
        .unwrap()
    });

    squads_out_of_range
      .iter()
      .enumerate()
      .for_each(|(index, squad)| {
        squad.borrow_mut().task_add_target(positions[index], true);
      });
  }

  fn calc_army_center(hunters: &Vec<&Rc<RefCell<Squad>>>) -> (f32, f32) {
    let (sum_x, sum_y) =
      hunters
        .iter()
        .fold((0.0, 0.0), |(sum_x, sum_y), squad: &&Rc<RefCell<Squad>>| {
          let squad = squad.borrow();
          (
            sum_x + squad.shared.center_point.0,
            sum_y + squad.shared.center_point.1,
          )
        });
    let len = hunters.len() as f32;

    (sum_x / len, sum_y / len)
  }

  fn search_for_enemy(
    ref_cell_squad: &mut Rc<RefCell<Squad>>,
    squads_grid: &HashMap<usize, Vec<Weak<RefCell<Squad>>>>,
  ) {
    // Current secondary aim can be totally okay
    let (faction_id, squad_position, squad_weapon, is_squad_running, weak_secondary_aim) = {
      let squad = ref_cell_squad.borrow();
      (
        squad.faction_id,
        squad.shared.center_point,
        &squad.squad_details.weapon,
        squad.is_squad_running(),
        squad.shared.secondary_aim.clone(),
      )
    };

    let max_distance =
      squad_weapon.range + NORMAL_SQUAD_RADIUS + THRESHOLD_MAX_UNIT_DISTANCE_FROM_SQUAD_CENTER;

    let squad_angle = if let Some(angle) = is_squad_running {
      angle
    } else {
      0.0
    };

    let get_value: Box<dyn Fn(Ref<Squad>) -> f32> = if is_squad_running.is_some() {
      Box::new(|enemy_squad: Ref<Squad>| {
        let enemy_position = enemy_squad.shared.center_point;
        let distance =
          (enemy_position.0 - squad_position.0).hypot(enemy_position.1 - squad_position.1);
        if distance > max_distance {
          std::f32::MAX
        } else {
          let angle_from_squad_to_enemy =
            (enemy_position.0 - squad_position.0).atan2(squad_position.1 - enemy_position.1);
          let angle_diff = angle_diff!(squad_angle, angle_from_squad_to_enemy);

          if angle_diff > squad_weapon.max_angle_during_run {
            std::f32::MAX
          } else {
            // get min value by angle diff and distance
            distance / max_distance + angle_diff / squad_weapon.max_angle_during_run
          }
        }
      })
    } else {
      Box::new(|enemy_squad: Ref<Squad>| {
        let enemy_position = enemy_squad.shared.center_point;
        (enemy_position.0 - squad_position.0).hypot(enemy_position.1 - squad_position.1)
      })
    };

    let mut min_value = std::f32::MAX;
    let mut weak_enemy = Weak::new();

    let squads_nearby = SquadsGridManager::get_squads_in_area(
      squads_grid,
      squad_position.0,
      squad_position.1,
      squad_weapon.range,
    );

    squads_nearby.iter().for_each(|some_weak_squad| {
      if let Some(some_ref_cell_squad) = some_weak_squad.upgrade() {
        let some_squad = some_ref_cell_squad.borrow();
        if some_squad.faction_id == faction_id {
          return;
        }
        let new_value = get_value(some_squad);
        if new_value < min_value {
          min_value = new_value;
          weak_enemy = some_weak_squad.clone();
        }
      }
    });

    // when it's find by smallest angle, then okay, if by distance, then check if we are close enough
    let new_secondary_aim = if weak_enemy.upgrade().is_some()
      && (is_squad_running.is_some() || min_value < max_distance)
    {
      if weak_secondary_aim.upgrade().is_some()
        && weak_enemy.upgrade().unwrap().borrow().id
          == weak_secondary_aim.upgrade().unwrap().borrow().id
      {
        return; // this is the same aim as current one
                // to avoid calling squad.set_secondary_aim because it will erase the unit.aim
      }
      weak_enemy
    } else {
      Weak::new()
    };
    ref_cell_squad
      .borrow_mut()
      .set_secondary_aim(new_secondary_aim);
  }

  pub fn manage_hunters(
    all_squads: &mut Vec<Rc<RefCell<Squad>>>,
    hunters_aims: &HashMap<u32, (Weak<RefCell<Squad>>, (f32, f32))>,
    squads_grid: &HashMap<usize, Vec<Weak<RefCell<Squad>>>>,
  ) -> HashMap<u32, (Weak<RefCell<Squad>>, (f32, f32))> {
    /*=======COLLECT_ENEMIES_THAT_MOVED_AND_THEIR_NEW_POSITION=====*/
    let mut enemies_that_moved: Vec<(u32, (f32, f32))> = vec![]; // value is to check, if we are using still this enemy
    for (key, (weak_enemy, old_position)) in hunters_aims {
      if let Some(ref_cell_enemy) = weak_enemy.upgrade() {
        let new_position = ref_cell_enemy.borrow().shared.center_point;
        let distance = (old_position.0 - new_position.0).hypot(old_position.1 - new_position.1);
        if distance > 10.0 {
          enemies_that_moved.push((*key, new_position));
        }
      }
    }

    /*=======GROUP OUR SQUADS BY ENEMY AND KEEP INFO IF ENEMY HAS MOVED=====*/
    let mut used_enemies: HashMap<u32, (bool, Vec<&Rc<RefCell<Squad>>>)> = HashMap::new();
    // was enemy moved, list of out squads which have that aim
    all_squads.iter_mut().for_each(|mut ref_cell_squad| {
      if let Some(ref_cell_aim) = ref_cell_squad.borrow().shared.aim.upgrade() {
        let aim = ref_cell_aim.borrow();
        if used_enemies.contains_key(&aim.id) {
          let squads_list = &mut used_enemies.get_mut(&aim.id).unwrap().1;
          squads_list.push(ref_cell_squad);
        } else {
          let was_enemy_moved = enemies_that_moved
            .iter()
            .find(|(id, ..)| *id == aim.id)
            .is_some();
          used_enemies.insert(aim.id, (was_enemy_moved, vec![ref_cell_squad]));
        }
        // TODO: unit which has aim out of the range, also should get the secondary_aim
        return;
      }
      SquadsManager::search_for_enemy(&mut ref_cell_squad, squads_grid);
    });

    /*=====CONSUME GROUPED OUR SQUADS AND CREATE NEW HUNTERS HASH MAP======*/
    let mut new_hunters_aims: HashMap<u32, (Weak<RefCell<Squad>>, (f32, f32))> = HashMap::new();
    for (enemy_id, (was_moved, squads_list)) in used_enemies {
      if squads_list.len() > 1 {
        let (range, enemy_position) = {
          let first_squad = squads_list[0].borrow();
          let weak_aim = &first_squad.shared.aim;
          let curr_enemy_position = weak_aim.upgrade().unwrap().borrow().shared.center_point;
          new_hunters_aims.insert(enemy_id, (weak_aim.clone(), curr_enemy_position));
          let range = first_squad.squad_details.weapon.range;
          (range, curr_enemy_position)
        };
        if was_moved {
          SquadsManager::set_positions_in_range(&squads_list, enemy_position, range);
        }
      }
    }

    new_hunters_aims
  }
}
