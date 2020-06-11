use super::Faction;
use crate::constants::{ATTACKERS_DISTANCE, THRESHOLD_SQUAD_MOVED};
use crate::position_utils::PositionUtils;
use crate::squad::Squad;
use std::cell::RefCell;
use std::collections::HashMap;
use std::rc::Rc;
use std::rc::Weak;

pub struct SquadsManager {}

impl SquadsManager {
  fn get_hunters(faction: &mut Faction) -> HashMap<u32, Vec<&Rc<RefCell<Squad>>>> {
    let mut hunters: HashMap<u32, Vec<&Rc<RefCell<Squad>>>> = HashMap::new();

    faction.squads.iter().for_each(|cell_squad| {
      let mut squad = cell_squad.borrow_mut();
      let upgraded_aim = &squad.shared.aim.upgrade();

      if let Some(ref_cell_aim) = upgraded_aim {
        let aim = ref_cell_aim.borrow();
        let aim_curr_point = aim.shared.center_point;
        let aim_last_point = squad.shared.last_aim_position;
        let diff_distance =
          (aim_curr_point.0 - aim_last_point.0).hypot(aim_curr_point.1 - aim_last_point.1);

        if diff_distance > THRESHOLD_SQUAD_MOVED {
          let distance_to_enemy_curr_pos = (aim_curr_point.0 - squad.shared.center_point.0)
            .hypot(aim_curr_point.1 - squad.shared.center_point.1);
          let distance_to_enemy_last_pos = (aim_last_point.0 - squad.shared.center_point.0)
            .hypot(aim_last_point.1 - squad.shared.center_point.1);

          if distance_to_enemy_curr_pos > ATTACKERS_DISTANCE {
            if hunters.contains_key(&aim.id) {
              hunters.get_mut(&aim.id).unwrap().push(cell_squad);
            } else {
              hunters.insert(aim.id, vec![cell_squad]);
            }
          } else if distance_to_enemy_curr_pos < distance_to_enemy_last_pos - 35.0 {
            // 35.0 to avoid stopping just because aim is a little bit closer to the squad
            squad.stop_running();
          }
          squad.shared.last_aim_position = aim_curr_point;
        }
      }
    });

    hunters
  }

  fn calc_hunters_center(hunters: &Vec<&Rc<RefCell<Squad>>>) -> (f32, f32) {
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

    (sum_x / hunters.len() as f32, sum_y / hunters.len() as f32)
  }

  fn manage_single_hunters_group(hunters: &mut Vec<&Rc<RefCell<Squad>>>) {
    let aim_position = hunters[0].borrow().shared.last_aim_position;
    let mut positions = PositionUtils::get_attackers_position(
      hunters.len(),
      SquadsManager::calc_hunters_center(hunters),
      600.0,
      aim_position,
    );

    positions.sort_by(|a, b| (a.1).partial_cmp(&b.1).unwrap());

    hunters.sort_by(|a, b| {
      let a_squad_pos = a.borrow().shared.center_point;
      let b_squad_pos = b.borrow().shared.center_point;
      (a_squad_pos.1).partial_cmp(&b_squad_pos.1).unwrap()
    });

    hunters.iter().enumerate().for_each(|(index, squad)| {
      let position = positions[index];
      let mut mut_squad = squad.borrow_mut();
      mut_squad.add_target(position.0, position.1, false);
    });
  }

  pub fn search_for_enemies(faction: &mut Faction, all_squads: &Vec<Weak<RefCell<Squad>>>) {}

  pub fn manage_hunters(faction: &mut Faction) {
    let mut hunters = SquadsManager::get_hunters(faction);

    hunters.values_mut().for_each(|squads_list| {
      // mutable to be able to sort
      SquadsManager::manage_single_hunters_group(squads_list);
    });
  }
}
