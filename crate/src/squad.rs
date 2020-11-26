use crate::constants::MAX_SQUAD_SPREAD_FROM_CENTER_RADIUS;
use crate::position_utils::PositionUtils;
use crate::squad_types::{get_squad_details, SquadDetails, SquadType};
use crate::unit::{Unit, STATE_DIE};
use crate::weapon_types::Weapon;
use crate::World;
use std::cell::RefCell;
use std::rc::{Rc, Weak};

pub struct SquadUnitSharedDataSet {
  pub any_unit_started_using_ability: bool, // used in unit, only for jump
  pub ability_target: Option<(f32, f32)>,   // grenade ability will remove it inside the unit
  pub center_point: (f32, f32),
  pub track: Vec<(f32, f32)>,
  pub aim: Weak<RefCell<Squad>>,
  pub secondary_aim: Weak<RefCell<Squad>>,
  pub weapon: &'static Weapon,
}

pub struct TaskTodo {
  ability_target: Option<(f32, f32)>,
  track_destination: Option<(f32, f32)>,
  aim: Weak<RefCell<Squad>>,
}

pub struct Squad {
  pub id: u32,
  pub faction_id: u32,
  is_during_keeping_coherency: bool,
  pub members: Vec<Rc<RefCell<Unit>>>,
  pub shared: SquadUnitSharedDataSet,
  pub squad_details: &'static SquadDetails,
  task_todo: TaskTodo,
  require_check_correctness: bool,
}

impl Squad {
  pub fn new(faction_id: u32, id: u32, squad_type: SquadType) -> Squad {
    let details = get_squad_details(&squad_type);
    Squad {
      id,
      faction_id,
      members: vec![],
      squad_details: details,
      is_during_keeping_coherency: false,
      require_check_correctness: false,
      task_todo: TaskTodo {
        ability_target: None,
        track_destination: None,
        aim: Weak::new(),
      },
      shared: SquadUnitSharedDataSet {
        any_unit_started_using_ability: false,
        ability_target: None,
        center_point: (0.0, 0.0),
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

    if self.require_check_correctness {
      self
        .members
        .iter_mut()
        .for_each(|unit| unit.borrow_mut().set_correct_state(shared));
      self.require_check_correctness = false;
    }

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

  fn reset_state(&mut self, keep_aim_and_ability_target: bool) {
    // never call when is during using ability/keeping coherency
    if !keep_aim_and_ability_target {
      self.shared.ability_target = None;
      self.shared.aim = Weak::new();
    }
    self.shared.track = vec![];

    self.members.iter().for_each(|member| {
      member.borrow_mut().reset_state();
    });
  }

  fn add_target(&mut self, destination: (f32, f32), keep_aim_and_ability_target: bool) {
    self.reset_state(keep_aim_and_ability_target);

    self.shared.track = PositionUtils::get_track(
      self.shared.center_point.0,
      self.shared.center_point.1,
      destination.0,
      destination.1,
    );

    let shared = &self.shared;
    self.members.iter_mut().for_each(|unit| {
      unit.borrow_mut().change_state_to_run(shared);
    });
  }

  pub fn task_add_target(&mut self, destination: (f32, f32), keep_aim_and_ability_target: bool) {
    if self.is_taking_new_task_disabled() {
      self.task_todo = if keep_aim_and_ability_target {
        TaskTodo {
          aim: self.task_todo.aim.clone(),
          ability_target: self.task_todo.ability_target,
          track_destination: Some(destination),
        }
      } else {
        TaskTodo {
          aim: Weak::new(),
          ability_target: None,
          track_destination: Some(destination),
        }
      };
      return;
    }

    self.add_target(destination, keep_aim_and_ability_target);
    self.require_check_correctness = true;
  }

  pub fn task_attack_enemy(&mut self, enemy: &Weak<RefCell<Squad>>) {
    if self.is_taking_new_task_disabled() {
      self.task_todo = TaskTodo {
        aim: Weak::clone(enemy),
        ability_target: None,
        track_destination: None,
      };
      return;
    }

    self.reset_state(false);
    self.shared.aim = Weak::clone(enemy);
    self.require_check_correctness = true;
  }

  pub fn task_use_ability(&mut self, target: (f32, f32)) {
    if self.is_taking_new_task_disabled() {
      self.task_todo = TaskTodo {
        aim: Weak::new(),
        ability_target: Some(target),
        track_destination: None,
      };
      return;
    }
    self.reset_state(false);
    self.shared.ability_target = Some(target);
    self.require_check_correctness = true;
  }

  fn is_taking_new_task_disabled(&self) -> bool {
    self.is_during_keeping_coherency
      || (self.shared.any_unit_started_using_ability
        && !self.has_all_members_finish_using_ability())
  }

  fn has_all_members_finish_using_ability(&self) -> bool {
    // some abilities don't have to be used by all members!
    !self
      .members
      .iter()
      .any(|member| !member.borrow().has_finished_using_ability)
  }

  fn store_current_task_as_todo_task(&mut self) {
    let shared = &self.shared;
    let point_to_store = if shared.track.len() > 0 {
      Some(shared.track[shared.track.len() - 1])
    } else {
      None
    };

    self.task_todo = TaskTodo {
      aim: shared.aim.clone(),
      ability_target: shared.ability_target,
      track_destination: point_to_store,
    };
  }

  fn restore_todo_task(&mut self) {
    self.reset_state(false);

    self.shared.aim = self.task_todo.aim.clone();
    self.shared.ability_target = self.task_todo.ability_target;

    if let Some(new_target) = self.task_todo.track_destination {
      self.add_target(new_target, true);
    }

    self.task_todo = TaskTodo {
      aim: Weak::new(),
      ability_target: None,
      track_destination: None,
    };
    self.require_check_correctness = true;
  }

  pub fn check_units_correctness(&mut self) {
    self.remove_died_members();
    /*=================USING ABILITY START===================*/
    if self.shared.any_unit_started_using_ability {
      if self.has_all_members_finish_using_ability() {
        self.shared.ability_target = None;
        self.shared.any_unit_started_using_ability = false;
        self.members.iter().for_each(|member| {
          member.borrow_mut().has_finished_using_ability = false;
        });
        self.restore_todo_task();
      }
    }
    /*=================USING ABILITY END===================*/

    /*=================KEEPING COHERENCY START===================*/
    if !self.shared.any_unit_started_using_ability {
      let (x, y) = self.shared.center_point;
      let coherency_not_kept = self.members.iter().any(|ref_cell_unit| {
        let unit = ref_cell_unit.borrow();
        (x - unit.x).hypot(y - unit.y) > MAX_SQUAD_SPREAD_FROM_CENTER_RADIUS
      });

      if coherency_not_kept {
        if !self.is_during_keeping_coherency {
          self.store_current_task_as_todo_task();
          self.is_during_keeping_coherency = true;
        }
        self.add_target(self.shared.center_point, false);
      } else if self.is_during_keeping_coherency {
        self.is_during_keeping_coherency = false;
        self.restore_todo_task();
      }
    }
    /*=================KEEPING COHERENCY END===================*/

    self.members.iter().for_each(|ref_cell_unit| {
      ref_cell_unit.borrow_mut().set_correct_state(&self.shared);
    });
  }

  fn remove_died_members(&mut self) {
    // let number_of_members = self.members.len();
    self
      .members
      .retain(|member| member.borrow().state != STATE_DIE);
    // if number_of_members != self.members.len() {
    //   self.recalculate_members_positions();
    // }
  }

  pub fn is_squad_running(&self) -> Option<f32> {
    // returns [-pi/2, pi/2]
    // it's the angle where squad is directed
    let is_running = self
      .members
      .iter()
      .any(|member| member.borrow().track_index != -1);

    if is_running {
      let (sin_sum, cos_sum) =
        self
          .members
          .iter()
          .fold((0.0, 0.0), |(sin_sum, cos_sum), ref_cell_unit| {
            let angle = ref_cell_unit.borrow().angle;
            (sin_sum + angle.sin(), cos_sum + angle.cos())
          });
      // calc angels mean
      let sin_mean = sin_sum / self.members.len() as f32;
      let cos_mean = cos_sum / self.members.len() as f32;
      Some(sin_mean.atan2(cos_mean))
    } else {
      None
    }
  }

  pub fn set_secondary_aim(&mut self, enemy: Weak<RefCell<Squad>>) {
    self.shared.secondary_aim = enemy;
    self
      .members
      .iter_mut()
      .for_each(|member| member.borrow_mut().aim = Weak::new());
  }

  pub fn get_influence(&self) -> f32 {
    self.members.len() as f32 * self.squad_details.influence_value
  }
}
