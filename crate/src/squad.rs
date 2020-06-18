use crate::id_generator::IdGenerator;
use crate::position_utils::PositionUtils;
use crate::squad_types::{get_squad_details, SquadDetails, SquadType};
use crate::unit::{Unit, STATE_RUN};
use std::cell::RefCell;
use std::rc::Rc;
use std::rc::Weak;

pub struct SquadUnitSharedDataSet {
  pub center_point: (f32, f32),
  pub track: Vec<(f32, f32)>,
  pub aim: Weak<RefCell<Squad>>,
  pub secondary_aim: Weak<RefCell<Squad>>,
}

pub struct Squad {
  pub id: u32,
  pub faction_id: u32,
  pub members: Vec<Rc<RefCell<Unit>>>,
  pub shared: SquadUnitSharedDataSet,
  pub squad_details: &'static SquadDetails,
  pub was_moved_in_previous_loop: bool,
  pub last_center_point: (f32, f32), // it's pub only bc
                                     // in squads_manager we are calc distance, to detect if aim is coming closer or farther
}

impl Squad {
  pub fn new(faction_id: u32, squad_type: SquadType) -> Squad {
    Squad {
      id: IdGenerator::generate_id(),
      faction_id,
      members: vec![],
      squad_details: get_squad_details(&squad_type),
      last_center_point: (0.0, 0.0),
      was_moved_in_previous_loop: true,
      shared: SquadUnitSharedDataSet {
        center_point: (0.0, 0.0),
        track: vec![],
        aim: Weak::new(),
        secondary_aim: Weak::new(),
      },
    }
  }

  pub fn update_center(&mut self) {
    let Self {
      ref mut members,
      ref mut shared,
      ..
    } = self;
    let (sum_x, sum_y) = members
      .iter()
      .fold((0.0, 0.0), |(sum_x, sum_y), ref_cell_unit| {
        let unit = ref_cell_unit.borrow();
        (sum_x + unit.x, sum_y + unit.y)
      });
    shared.center_point = (sum_x / members.len() as f32, sum_y / members.len() as f32);
  }

  pub fn update(&mut self) {
    let shared = &self.shared;
    self
      .members
      .iter_mut()
      .for_each(|unit| unit.borrow_mut().update(shared));
  }

  pub fn get_representation(&self) -> Vec<f32> {
    self
      .members
      .iter()
      .flat_map(|unit| unit.borrow().get_representation().to_vec())
      .collect()
  }

  pub fn add_member(&mut self, position_x: f32, position_y: f32, unit_angle: f32) {
    self.members.push(Rc::new(RefCell::new(Unit::new(
      position_x,
      position_y,
      unit_angle,
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
    // let is_center_inside_obstacle =
    //   CalcPositions::get_is_point_inside_any_obstacle((destination_x as i16, destination_y as i16));
    // if is_center_inside_obstacle {
    //   // have to avoid squad center in a obstacle or in the boundaries of obstacle
    //   let (distance, closest_point) =
    //     CalcPositions::get_nearest_line((destination_x, destination_y));
    //   // TODO: calc segment, from squad_center thought closest_point to outsite (like plus 5?)
    //   // also handle case when distance is 0, then add 5, check if it's okay, if not, minsu 5, and this is have to be okay
    // }
    if clear_aim {
      self.shared.aim = Weak::new();
      self.shared.secondary_aim = Weak::new();
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
    });
  }

  pub fn stop_running(&mut self) {
    let Self {
      ref mut members,
      ref shared,
      ..
    } = self;
    members.iter_mut().for_each(|unit| {
      if unit.borrow().state == STATE_RUN {
        unit.borrow_mut().change_state_to_idle(shared);
      }
    });
  }

  pub fn attack_enemy(&mut self, enemy: &Weak<RefCell<Squad>>) {
    self.shared.aim = Weak::clone(enemy);
    self.shared.secondary_aim = Weak::new();
    // self.shared.track = vec![];
    // if, stop running only if the squad is running
    self.stop_running();
  }

  pub fn was_center_point_changed(&self) -> bool {
    (self.shared.center_point.0 - self.last_center_point.0)
      .hypot(self.shared.center_point.1 - self.last_center_point.1)
      >= std::f32::EPSILON
  }

  pub fn update_moved_status(&mut self) {
    self.was_moved_in_previous_loop = if self.was_center_point_changed() {
      self.last_center_point = self.shared.center_point;
      true
    } else {
      false
    }
  }

  pub fn remove_member(&mut self) {
    // TODO: self.members.remove
    self.recalculate_members_positions();
  }
}
