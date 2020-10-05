use crate::id_generator::IdGenerator;
use crate::position_utils::PositionUtils;
use crate::squad_types::{get_squad_details, SquadDetails, SquadType};
use crate::unit::{Unit, STATE_DIE};
use crate::weapon_types::Weapon;

use crate::World;
use std::cell::RefCell;
use std::rc::{Rc, Weak};

pub struct SquadUnitSharedDataSet {
  pub units_started_using_ability: bool,
  pub units_which_finished_using_ability: u8,
  pub ability_target: Option<(f32, f32)>,
  pub center_point: (f32, f32),
  pub track: Vec<(f32, f32)>,
  pub aim: Weak<RefCell<Squad>>,
  pub secondary_aim: Weak<RefCell<Squad>>,
  pub weapon: &'static Weapon,
  pub stored_track_destination: Option<(f32, f32)>, // to store destination, bc units are regrouping rn
}

pub struct Squad {
  pub id: u32,
  pub faction_id: u32,
  pub members: Vec<Rc<RefCell<Unit>>>,
  pub shared: SquadUnitSharedDataSet,
  pub squad_details: &'static SquadDetails,
  pub was_moved_in_previous_loop: bool,
  pub last_center_point: (f32, f32), // it's pub only bc TODO: nto sure if useful, when we will introduce a grid
                                     // in squads_manager we are calc distance, to detect if aim is coming closer or farther
}

impl Squad {
  pub fn new(faction_id: u32, squad_type: SquadType) -> Squad {
    let details = get_squad_details(&squad_type);
    Squad {
      id: IdGenerator::generate_id(),
      faction_id,
      members: vec![],
      squad_details: details,
      last_center_point: (0.0, 0.0),
      was_moved_in_previous_loop: true,
      shared: SquadUnitSharedDataSet {
        units_started_using_ability: false,
        units_which_finished_using_ability: 0,
        ability_target: None,
        center_point: (0.0, 0.0),
        stored_track_destination: None,
        track: vec![],
        aim: Weak::new(),
        secondary_aim: Weak::new(),
        weapon: &details.weapon,
      },
    }
  }

  pub fn update_center(&mut self) {
    let Self {
      ref members,
      ref mut shared,
      ..
    } = self;
    let (sum_x, sum_y) = members
      .iter()
      .fold((0.0, 0.0), |(sum_x, sum_y), ref_cell_unit| {
        let unit = ref_cell_unit.borrow();
        (sum_x + unit.x, sum_y + unit.y)
      });
    let members_len = members.len() as f32;
    shared.center_point = (sum_x / members_len, sum_y / members_len);
  }

  pub fn update(&mut self, world: &mut World) {
    let shared = &mut self.shared;
    self
      .members
      .iter_mut()
      .for_each(|unit| unit.borrow_mut().update(shared, &mut world.bullets_manager));
  }

  pub fn get_representation(&self) -> Vec<f32> {
    self
      .members
      .iter()
      .flat_map(|unit| unit.borrow().get_representation().to_vec())
      .collect()
  }

  pub fn add_member(&mut self, position_x: f32, position_y: f32) {
    self.members.push(Rc::new(RefCell::new(Unit::new(
      position_x,
      position_y,
      self.squad_details,
    ))));

    if self.members.len() == self.squad_details.members_number {
      self.recalculate_members_positions();
    }
  }

  fn recalculate_members_positions(&mut self) {
    let positions_list = PositionUtils::get_units_in_squad_position(self.members.len());

    positions_list
      .into_iter()
      .enumerate()
      .for_each(|(index, position)| {
        let unit = &mut self.members[index];
        unit
          .borrow_mut()
          .set_position_offset(position.0, position.1);
      })
  }

  pub fn add_target(&mut self, destination_x: f32, destination_y: f32, clear_aim: bool) {
    if self.is_allowed_to_take_task() {
      return;
    }
    // let is_center_inside_obstacle =
    //   CalcPositions::get_is_point_inside_any_obstacle((destination_x as i16, destination_y as i16));
    // if is_center_inside_obstacle {
    //   // have to avoid squad center in a obstacle or in the boundaries of obstacle
    //   let (distance, closest_point) =
    //     CalcPositions::get_nearest_line((destination_x, destination_y));
    //   // TODO: calc segment, from squad_center thought closest_point to outsite (like plus 5?)
    //   // also handle case when distance is 0, then add 5, check if it's okay, if not, minsu 5, and this is have to be okay
    // }

    // TODO: clearing aim should be moved to other method
    if clear_aim {
      // if clear_aim || self.shared.ability_target.is_some() {
      self.shared.ability_target = None;
      self.shared.aim = Weak::new();
      self.shared.secondary_aim = Weak::new();
    }

    // TODO: we should rename target, to something more describable, like dest_place
    if self.shared.stored_track_destination.is_some() {
      self.shared.stored_track_destination = Some((destination_x, destination_y));
      return;
    }

    self.shared.track = PositionUtils::get_track(
      self.shared.center_point.0,
      self.shared.center_point.1,
      destination_x,
      destination_y,
    );
    let shared = &self.shared;
    self.members.iter_mut().for_each(|unit| {
      unit
        .borrow_mut()
        .change_state_to_run_though_track(shared, true);
      // it should just set track_index in units, nothing else
    });
  }

  pub fn stop_running(&mut self) {
    // TODO: replace with method to clear all current things, target, ability, aim, stored_track_destination
    // and call reset also in members, but remember that coherency is most important, then no reset in members
    // but actually it's not used rn, will be in hunting prob used
    // so maybe wait until we will rethink hunting
    if self.is_allowed_to_take_task() {
      return;
    }

    // TODO: rename stored_track_destination to indicate desire of keeping coherency
    if self.shared.stored_track_destination.is_none() {
      self.members.iter().for_each(|unit| {
        unit.borrow_mut().stop_running(&self.shared);
      });
    } else {
      self.shared.stored_track_destination = None;
    }
  }

  pub fn attack_enemy(&mut self, enemy: &Weak<RefCell<Squad>>) {
    if self.is_allowed_to_take_task() {
      return;
    }
    self.shared.aim = Weak::clone(enemy);
    self.shared.secondary_aim = Weak::new();
    // TODO: secondary_aim can be useful if we are going to add running and shooting
    self.shared.ability_target = None;
    // self.shared.track = vec![];
    // if, stop running only if the squad is running
    // TODO: replace it with calling reset
    self.stop_running();
  }

  pub fn was_center_point_changed(&self) -> bool {
    // TODO: not sure if will be useful, grid should be better
    (self.shared.center_point.0 - self.last_center_point.0)
      .hypot(self.shared.center_point.1 - self.last_center_point.1)
      >= 30.0 // std::f32::EPSILON
              // TODO: find a better solution
  }

  pub fn update_moved_status(&mut self) {
    // TODO: not sure if will be useful, grid should be better
    self.was_moved_in_previous_loop = if self.was_center_point_changed() {
      self.last_center_point = self.shared.center_point;
      true
    } else {
      false
    }
  }

  fn is_allowed_to_take_task(&self) -> bool {
    self.shared.units_started_using_ability
      && self.shared.units_which_finished_using_ability < self.members.len() as u8
  }

  pub fn check_units_correctness(&mut self) {
    self.remove_died_members();

    if self.is_allowed_to_take_task() {
      return;
    }

    if self.shared.ability_target.is_some()
      && self.shared.units_which_finished_using_ability == self.members.len() as u8
    {
      self.shared.ability_target = None;
      self.shared.units_which_finished_using_ability = 0;
      self.shared.units_started_using_ability = false;
      // TODO: don't check correctness here, just go forward, it should happen later, after check coherency
      self.members.iter().for_each(|ref_cell_unit| {
        ref_cell_unit
          .borrow_mut()
          .change_state_to_idle(&self.shared)
      })
    }

    let coherency_not_kept = self.members.iter().any(|ref_cell_unit| {
      ref_cell_unit
        .borrow()
        .check_if_too_far_from_squad_center(&self.shared)
    });
    if coherency_not_kept {
      if self.shared.stored_track_destination.is_none() {
        // TODO: Coherency is during the keeping
        // but for example some units have achieved the target, and then got destructed and fly from that place, in that case we should recalculate target
        // prob above if self.shared.stored_track_destination.is_none() should call in body only storing the point (stored_track_destination)
        let track_len = self.shared.track.len();
        // store point, instead of saving to "self" because self.add_target is checking self
        let point_to_store = if track_len > 0 {
          self.shared.track[track_len - 1]
        } else {
          (-1.0, -1.0)
        };
        // TODO: add target should be without any
        self.add_target(
          self.shared.center_point.0,
          self.shared.center_point.1,
          false,
        );
        self.shared.stored_track_destination = Some(point_to_store);
      }
    } else if let Some(stored_track_destination) = self.shared.stored_track_destination {
      // it's the next step of previous if, if coherency is kept and some track was stored
      // (bc keeping coherency is more important) then restore old track
      self.shared.stored_track_destination = None;
      if stored_track_destination.0 >= 0.0 {
        // if smaller, then
        self.add_target(
          stored_track_destination.0,
          stored_track_destination.1,
          false,
        );
      }
    } else {
      // if coherency is kept,
      self.members.iter().for_each(|ref_cell_unit| {
        ref_cell_unit
          .borrow_mut()
          .periodical_check_state_correctness(&self.shared);
      });
    }
  }

  pub fn remove_died_members(&mut self) {
    // let number_of_members = self.members.len();
    self
      .members
      .retain(|member| member.borrow().state != STATE_DIE);
    // if number_of_members != self.members.len() {
    //   self.recalculate_members_positions();
    // }
  }

  pub fn start_using_ability(&mut self, target: (f32, f32)) {
    if self.is_allowed_to_take_task() {
      return;
    }
    self.shared.ability_target = Some(target);
    self.members.iter().for_each(|unit| {
      unit.borrow_mut().change_state_to_idle(&self.shared);
    });
  }
}
