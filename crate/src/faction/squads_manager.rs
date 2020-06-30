use super::Faction;
use crate::constants::{
  ATTACKERS_DISTANCE, MAX_SQUAD_SPREAD_FROM_CENTER_RADIUS,
  THRESHOLD_MAX_UNIT_DISTANCE_FROM_SQUAD_CENTER, WEAPON_RANGE,
};
use crate::position_utils::PositionUtils;
use crate::squad::Squad;
use std::cell::RefCell;
use std::collections::HashMap;
use std::rc::{Rc, Weak};

const POSSIBLE_IN_RANGE: f32 = WEAPON_RANGE
  + THRESHOLD_MAX_UNIT_DISTANCE_FROM_SQUAD_CENTER
  + MAX_SQUAD_SPREAD_FROM_CENTER_RADIUS;
// our weapon range + max distance of enemy unit from enemy squad center + distance of our unit from our squad center

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
        let aim_last_point = aim.last_center_point;

        if aim.was_moved_in_previous_loop || aim.was_center_point_changed() {
          // if was moved in previous loop
          // aim.lops_since_last_move > 5
          let distance_to_enemy_curr_pos = (aim_curr_point.0 - squad.shared.center_point.0)
            .hypot(aim_curr_point.1 - squad.shared.center_point.1);
          let distance_to_enemy_last_pos = (aim_last_point.0 - squad.shared.center_point.0)
            .hypot(aim_last_point.1 - squad.shared.center_point.1);

          /* DO NOT add when:
            - when aim is in the weapon range then check if aim is approach:
              - if aim is approaching, then STOP
              - if not approaching, then check if waiting for a long time
                - if yes, stay
                - if not, go
            -
            - when outside of weapon range, then add to the hunters


            use range as Math.min(MAX_RANGE, distance the further squad, to the aim)
            - then only one wrong one
            that sucks, whole army is moving even when aim is in range of the nearest ones


            - keeps offset, how much squad should be going on the left or right from the center
            - then we could also share tracks, like for big army there is 5 tracks, very left, left, center, right, very right,
            - and each of squad choose one of the tracks (assigned here in hunters, or in squad struct)
            - then when squad is close to the aim, or is in range, then should find position
            HOW should find the position? still not really sure

            -
          */

          if distance_to_enemy_curr_pos > ATTACKERS_DISTANCE {
            // if destination OR current position is not in range, then add to hunters
            // or squad is not moving since 5 loops
            if hunters.contains_key(&aim.id) {
              hunters.get_mut(&aim.id).unwrap().push(cell_squad);
            } else {
              hunters.insert(aim.id, vec![cell_squad]);
            }
          } else if distance_to_enemy_curr_pos < distance_to_enemy_last_pos - 35.0 {
            // 35.0 to avoid stopping just because aim is a little bit closer to the squad
            squad.stop_running();
          }
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

  pub fn manage_single_hunters_group(hunters: &mut Vec<&Rc<RefCell<Squad>>>) {
    let aim_position = hunters[0]
      .borrow()
      .shared
      .aim
      .upgrade()
      .unwrap()
      .borrow()
      .shared
      .center_point;
    let mut positions = PositionUtils::get_attackers_position(
      hunters.len(),
      SquadsManager::calc_hunters_center(hunters),
      600.0,
      aim_position,
    );

    positions.sort_by(|a, b| (a.1).partial_cmp(&b.1).unwrap());

    hunters.sort_by(|a, b| {
      (a.borrow().shared.center_point.1)
        .partial_cmp(&b.borrow().shared.center_point.1)
        .unwrap()
    });

    let positions_number = positions.len();
    hunters.iter().enumerate().for_each(|(index, squad)| {
      let position = positions[index % positions_number];
      let mut mut_squad = squad.borrow_mut();
      mut_squad.add_target(position.0, position.1, false);
    });
  }

  fn get_nearest_enemy_squad(
    squad_center: (f32, f32),
    enemy_squads: Vec<&&Rc<RefCell<Squad>>>,
  ) -> Weak<RefCell<Squad>> {
    let mut sorted_enemy_squads = enemy_squads.clone();
    sorted_enemy_squads.sort_by(|a, b| {
      let a_squad_center = a.borrow().shared.center_point;
      let b_squad_center = b.borrow().shared.center_point;
      let distance_a = (squad_center.0 - a_squad_center.0).hypot(squad_center.1 - a_squad_center.1);
      let distance_b = (squad_center.0 - b_squad_center.0).hypot(squad_center.1 - b_squad_center.1);
      distance_a.partial_cmp(&distance_b).unwrap()
    });

    Rc::downgrade(sorted_enemy_squads[0])
  }

  pub fn search_for_enemies(
    idle_squads: Vec<&Rc<RefCell<Squad>>>,
    moved_enemies_squads: Vec<&Rc<RefCell<Squad>>>,
    all_enemies_squads: Vec<&Rc<RefCell<Squad>>>,
  ) {
    idle_squads.iter().for_each(|ref_cell_squad| {
      let mut squad = ref_cell_squad.borrow_mut();
      let squad_center_point = squad.shared.center_point;
      let enemies_squads = if squad.was_center_point_changed()
        || squad.shared.secondary_aim.upgrade().is_none()
        || squad
          .shared
          .secondary_aim
          .upgrade()
          .unwrap()
          .borrow()
          .was_center_point_changed()
      {
        &all_enemies_squads
      } else {
        // didn't move previously, and also now didn't move
        &moved_enemies_squads
      };
      let enemies_in_range: Vec<&&Rc<RefCell<Squad>>> = enemies_squads
        .iter()
        .filter(|enemy| {
          let enemy_position = enemy.borrow().shared.center_point;
          (squad_center_point.0 - enemy_position.0).hypot(squad_center_point.1 - enemy_position.1)
            < POSSIBLE_IN_RANGE
        })
        .collect();

      if enemies_in_range.len() > 0 {
        squad.shared.secondary_aim =
          SquadsManager::get_nearest_enemy_squad(squad_center_point, enemies_in_range);
      }
    })
  }

  pub fn manage_hunters(faction: &mut Faction) {
    let mut hunters = SquadsManager::get_hunters(faction);

    hunters.values_mut().for_each(|squads_list| {
      // mutable to be able to sort
      SquadsManager::manage_single_hunters_group(squads_list);
    });
  }
}
