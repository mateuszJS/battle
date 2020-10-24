mod abilities;
mod utils;

use crate::bullets_manager::BulletsManager;
use crate::constants::MATH_PI;
use crate::id_generator::IdGenerator;
use crate::look_up_table::LookUpTable;
use crate::representations_ids::{RAPTOR_REPRESENTATION_ID, SOLIDER_REPRESENTATION_ID};
use crate::squad::{Squad, SquadUnitSharedDataSet};
use crate::squad_types::SquadDetails;
use crate::weapon_types::WeaponType;
use abilities::Abilities;
use std::cell::RefCell;
use std::rc::Rc;
use std::rc::Weak;
use utils::{Utils, FLY_DECELERATION, FLY_MIN_SPEED};

pub const STATE_ABILITY: u8 = 8;
const STATE_FLY: u8 = 7;
pub const STATE_RUN: u8 = 6;
const STATE_SHOOT: u8 = 5;
pub const STATE_IDLE: u8 = 4;
const STATE_GETUP: u8 = 3;
pub const STATE_DIE: u8 = 0;

const REPRESENTATION_LENGTH: usize = 7;
const MAX_WEAPON_DEVIATION_TO_HIT: f32 = 0.25;

pub struct Unit {
  pub id: u32,
  pub x: f32,
  pub y: f32,
  pub angle: f32,
  pub state: u8,
  pub get_upping_progress: f32, // <0, 1>, 0 -> start get up, 1 -> change state to IDLE
  pub has_finished_using_ability: bool,
  mod_x: f32,
  mod_y: f32,
  target_x: f32,
  target_y: f32,
  position_offset_x: f32,
  position_offset_y: f32,
  track_index: i8,
  squad_details: &'static SquadDetails,
  time_to_next_shoot: u16,
  aim: Weak<RefCell<Unit>>,
  hp: i16,
  ability_start_point: f32,
}

impl Unit {
  pub fn new(x: f32, y: f32, squad_details: &'static SquadDetails) -> Unit {
    Unit {
      id: IdGenerator::generate_id(),
      x,
      y,
      angle: 0.0,
      state: STATE_IDLE,
      get_upping_progress: 0.0,
      mod_x: 0.0,
      mod_y: 0.0,
      target_x: 0.0,
      target_y: 0.0,
      position_offset_x: 0.0,
      position_offset_y: 0.0,
      track_index: -1, // -1 means, there is no needed to go though track
      squad_details,
      time_to_next_shoot: 0,
      aim: Weak::new(),
      hp: squad_details.hp,
      ability_start_point: 0.0,
      has_finished_using_ability: false,
    }
  }

  pub fn change_state_to_fly(&mut self, angle: f32, strength: f32) {
    if self.state != STATE_ABILITY {
      self.state = STATE_FLY;
      self.angle = (angle + MATH_PI) % (2.0 * MATH_PI);
      let fly_mods = Utils::get_fly_mods(angle, self.x, self.y, strength);
      self.mod_x = fly_mods.0;
      self.mod_y = fly_mods.1;
    }
  }

  fn update_fly(&mut self) {
    self.x += self.mod_x;
    self.y += self.mod_y;

    self.mod_x *= FLY_DECELERATION;
    self.mod_y *= FLY_DECELERATION;

    if self.mod_x.hypot(self.mod_y) <= FLY_MIN_SPEED {
      self.change_state_to_getup();
    }
  }

  fn change_state_to_getup(&mut self) {
    self.state = STATE_GETUP;
    self.get_upping_progress = 0.0;
  }

  fn update_getup(&mut self, squad_shared_info: &mut SquadUnitSharedDataSet) {
    self.get_upping_progress += 0.01;
    if self.get_upping_progress >= 1.0 {
      self.state = STATE_IDLE;
      if self.track_index != -1 {
        self.track_index = Utils::get_initial_track_index(
          0.max(self.track_index - 1),
          self.x,
          self.y,
          squad_shared_info,
        );
      }
    }
  }

  fn can_change_state(&mut self) -> bool {
    self.state != STATE_DIE
      && self.state != STATE_FLY
      && self.state != STATE_GETUP
      && self.state != STATE_ABILITY
  }

  pub fn change_state_to_run(&mut self, squad_shared_info: &SquadUnitSharedDataSet) {
    self.track_index = Utils::get_initial_track_index(0, self.x, self.y, squad_shared_info);
  }

  fn set_target(&mut self, x: f32, y: f32) {
    self.state = STATE_RUN;
    self.target_x = x;
    self.target_y = y;
    let angle = (x - self.x).atan2(self.y - y);
    self.mod_x = angle.sin() * self.squad_details.movement_speed;
    self.mod_y = -angle.cos() * self.squad_details.movement_speed;
    self.angle = angle;
  }

  fn go_to_current_point_on_track(&mut self, squad_shared_info: &SquadUnitSharedDataSet) {
    self.set_target(
      squad_shared_info.track[self.track_index as usize].0 + self.position_offset_x,
      squad_shared_info.track[self.track_index as usize].1 + self.position_offset_y,
    );
  }

  fn update_run(&mut self, squad_shared_info: &SquadUnitSharedDataSet) {
    let is_target_achieved =
      (self.x - self.target_x).hypot(self.y - self.target_y) < self.squad_details.movement_speed;

    if is_target_achieved {
      if squad_shared_info.track.len() as i8 - 1 == self.track_index {
        self.reset_state();
      } else {
        self.track_index += 1;
        self.go_to_current_point_on_track(squad_shared_info);
      }
    } else {
      self.x += self.mod_x;
      self.y += self.mod_y;
    }
  }

  pub fn reset_state(&mut self) {
    // never call when is during using ability/keeping coherency
    self.track_index = -1;
    self.aim = Weak::new();

    if self.can_change_state() {
      self.state = STATE_IDLE;
      self.mod_x = 0.0;
      self.mod_y = 0.0;
    }
  }

  pub fn set_correct_state(&mut self, squad_shared_info: &SquadUnitSharedDataSet) {
    if !self.can_change_state() {
      return;
    }

    // it's check_correctness_state method, always should be called after check correctness for squad (bc if enemy can be out of whole squad range in shooting)
    if self.track_index != -1 {
      if self.state != STATE_RUN {
        self.go_to_current_point_on_track(squad_shared_info);
      }
    } else if squad_shared_info.ability_target.is_some() {
      // assuming that unit cannot be disrupted during using ability,
      // unit is always able to use ability, then squad has ability_target and self.track_index == -1
      Abilities::change_state_to_ability(self, squad_shared_info);
    } else if let Some(aim) = squad_shared_info.aim.upgrade() {
      self.change_state_to_shoot(aim, true, squad_shared_info);
    } else if let Some(secondary_aim) = squad_shared_info.secondary_aim.upgrade() {
      self.change_state_to_shoot(secondary_aim, false, squad_shared_info);
    }
  }

  fn change_state_to_shoot(
    &mut self,
    aim: Rc<RefCell<Squad>>,
    is_important_aim: bool,
    squad_shared_info: &SquadUnitSharedDataSet,
  ) {
    let borrowed_members = &aim.borrow().members;
    let (nearest_weak_unit_aim, distance_to_nearest_unit_aim) =
      borrowed_members
        .iter()
        .fold((Weak::new(), std::f32::MAX), |acc, ref_cell_unit| {
          let unit = ref_cell_unit.borrow();
          let dis = (self.x - unit.x).hypot(self.y - unit.y);
          if dis < acc.1 {
            (Rc::downgrade(ref_cell_unit), dis)
          } else {
            acc
          }
        });
    if let Some(ref_cell_unit_aim) = nearest_weak_unit_aim.upgrade() {
      let unit_aim = ref_cell_unit_aim.borrow();
      let angle = (unit_aim.x - self.x).atan2(self.y - unit_aim.y);

      if distance_to_nearest_unit_aim <= squad_shared_info.weapon.range {
        self.state = STATE_SHOOT;
        self.angle = angle;
        self.aim = nearest_weak_unit_aim;
      } else if is_important_aim {
        self.track_index = squad_shared_info.track.len() as i8 - 1;
        let angle_from_aim_to_unit = angle + MATH_PI;
        let distance_to_enemy = squad_shared_info.weapon.range - self.squad_details.movement_speed;
        // 10.0 -> to be little bit closer
        // if there is no enough distance to new position,
        // then it will be in threshold of "target_achieved"
        if unit_aim.state != STATE_RUN {
          // if the enemy is running, then the faction's hunters should handle it
          self.set_target(
            angle_from_aim_to_unit.sin() * distance_to_enemy + unit_aim.x,
            -angle_from_aim_to_unit.cos() * distance_to_enemy + unit_aim.y,
          );
        }
      }
    }
  }

  fn update_shoot(
    &mut self,
    squad_shared_info: &SquadUnitSharedDataSet,
    bullet_manager: &mut BulletsManager,
  ) {
    if self.time_to_next_shoot == 0 {
      let weapon = squad_shared_info.weapon;
      let random = LookUpTable::get_random() - 0.5;
      let random_abs = random.abs();
      let weapon_deviation = random * weapon.scatter;
      let distance_mod = 1.0
        + weapon_deviation
          * if (random_abs * 10.0) as u8 % 2 == 0 {
            -1.0
          } else {
            1.0
          };

      bullet_manager.add_bullet(
        self.id as f32,
        self.x,
        self.y,
        self.angle + weapon_deviation,
        &squad_shared_info.weapon.name,
        self.aim.clone(),
        distance_mod,
        weapon_deviation.abs() < MAX_WEAPON_DEVIATION_TO_HIT,
      );

      self.time_to_next_shoot = if random_abs > weapon.chances_to_reload {
        // 25% chances to reload
        weapon.reload_time
      } else {
        weapon.shoot_time
      };
    } else {
      self.time_to_next_shoot -= 1;
    }
  }

  pub fn update(
    &mut self,
    squad_shared_info: &mut SquadUnitSharedDataSet,
    bullet_manager: &mut BulletsManager,
  ) {
    match self.state {
      STATE_FLY => self.update_fly(),
      STATE_GETUP => self.update_getup(squad_shared_info),
      STATE_RUN => self.update_run(squad_shared_info),
      STATE_SHOOT => self.update_shoot(squad_shared_info, bullet_manager),
      STATE_ABILITY => Abilities::update_ability(self, squad_shared_info, bullet_manager),
      _ => {}
    }
  }

  pub fn get_representation(&self) -> [f32; REPRESENTATION_LENGTH] {
    [
      self.squad_details.representation_type,
      self.id as f32,
      self.x,
      self.y,
      self.angle,
      self.state as f32,
      match self.state {
        // additional parameter for state
        STATE_FLY => self.mod_x.hypot(self.mod_y),
        STATE_GETUP => self.get_upping_progress,
        STATE_SHOOT => self.time_to_next_shoot as f32,
        STATE_ABILITY => Abilities::get_representation_state(self),
        _ => 0.0,
      },
    ]
  }

  pub fn set_position_offset(&mut self, offset_x: f32, offset_y: f32) {
    self.position_offset_x = offset_x;
    self.position_offset_y = offset_y;
  }

  fn change_state_to_die(&mut self) {
    // TODO: not sure but maybe also should be done in function which checking correctness, base on input: target, aim ,ability, hp, own_aim, is_aim_important
    self.state = STATE_DIE;
    self.mod_x = 0.0;
    self.mod_y = 0.0;
  }

  pub fn take_damage(&mut self, damage: u8) {
    if self.state != STATE_ABILITY && self.state != STATE_FLY {
      self.hp -= damage as i16;
      if self.hp <= 0 {
        self.change_state_to_die();
      }
    }
  }
}
