use crate::position_utils::PositionUtils;
use crate::squad::Squad;
use std::cell::RefCell;
use std::rc::{Rc, Weak};

pub struct SquadsManager {}

impl SquadsManager {
  pub fn set_positions_in_range(squads: &mut Vec<&Rc<RefCell<Squad>>>, target: (f32, f32)) {
    // TODO: get range of the squads, divide them by range, then divide if are not in the same group maybe?? let range = squads.
    let mut positions = PositionUtils::get_attackers_position(
      squads.len(),
      SquadsManager::calc_army_center(squads),
      target,
    );

    positions.sort_by(|a, b| (a.1).partial_cmp(&b.1).unwrap());

    squads.sort_by(|a, b| {
      (a.borrow().shared.center_point.1)
        .partial_cmp(&b.borrow().shared.center_point.1)
        .unwrap()
    });

    squads.iter().enumerate().for_each(|(index, squad)| {
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
}
