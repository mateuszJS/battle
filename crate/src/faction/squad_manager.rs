use crate::constants::NORMAL_SQUAD_RADIUS;
use crate::position_utils::PositionUtils;
use crate::squad::Squad;
use std::cell::RefCell;
use std::rc::Rc;

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
}
