mod utils;

use crate::bullets_manager::BulletsManager;
use crate::constants::{
  MATH_PI, MAX_SQUAD_SPREAD_FROM_CENTER_RADIUS, NORMAL_SQUAD_RADIUS, WEAPON_RANGE,
};
use crate::id_generator::IdGenerator;
use crate::look_up_table::LookUpTable;
use crate::position_utils::basic_utils::{BasicUtils, Line, Point};
use crate::position_utils::obstacles_lazy_statics::ObstaclesLazyStatics;
use crate::representations_ids::{RAPTOR_REPRESENTATION_ID, SOLIDER_REPRESENTATION_ID};
use crate::squad::{Squad, SquadUnitSharedDataSet};
use crate::squad_types::SquadDetails;
use crate::weapon_types::WeaponType;
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
const RAPTOR_REPRESENTATION_ID_U8: u8 = RAPTOR_REPRESENTATION_ID as u8;
const SOLIDER_REPRESENTATION_ID_U8: u8 = SOLIDER_REPRESENTATION_ID as u8;
const JUMPING_SPEED: f32 = 5.0;
const MAX_JUMP_HEIGHT: f32 = 1200.0; // the same constant exists in JS

pub struct Unit {
  pub id: u32,
  pub x: f32,
  pub y: f32,
  pub angle: f32,
  pub state: u8,
  pub get_upping_progress: f32, // <0, 1>, 0 -> start get up, 1 -> change state to IDLE
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

  fn update_getup(&mut self, squad_shared_info: &SquadUnitSharedDataSet) {
    self.get_upping_progress += 0.01;
    if self.get_upping_progress >= 1.0 {
      self.change_state_to_idle(squad_shared_info);
    }
  }

  pub fn check_if_too_far_from_squad_center(
    &self,
    squad_shared_info: &SquadUnitSharedDataSet,
  ) -> bool {
    (squad_shared_info.center_point.0 - self.x).hypot(squad_shared_info.center_point.1 - self.y)
      > MAX_SQUAD_SPREAD_FROM_CENTER_RADIUS
  }

  fn check_if_close_to_squad_center(&self, squad_shared_info: &SquadUnitSharedDataSet) -> bool {
    (squad_shared_info.center_point.0 - self.x).hypot(squad_shared_info.center_point.1 - self.y)
      <= NORMAL_SQUAD_RADIUS + 20.0
  }

  fn can_change_state(&mut self) -> bool {
    self.state != STATE_DIE
      && self.state != STATE_FLY
      && self.state != STATE_GETUP
      && self.state != STATE_ABILITY
  }

  fn check_if_can_go_to_next_point_on_track(
    &self,
    squad_shared_info: &SquadUnitSharedDataSet,
  ) -> bool {
    let obstacles_lines = ObstaclesLazyStatics::get_obstacles_lines();
    let next_track_point = squad_shared_info.track[1];
    let start_point = Point {
      id: 0,
      x: self.x,
      y: self.y,
    };
    let end_point = Point {
      id: 0,
      x: next_track_point.0,
      y: next_track_point.1,
    };
    let line_to_next_track_point = Line {
      p1: &start_point,
      p2: &end_point,
    };

    !obstacles_lines
      .iter()
      .any(|obstacle_line| BasicUtils::check_intersection(&line_to_next_track_point, obstacle_line))
  }

  pub fn change_state_to_run_though_track(
    &mut self,
    squad_shared_info: &SquadUnitSharedDataSet,
    from_start: bool, // after GETUP will be false, bc have to start with last point where was
  ) {
    if from_start {
      self.track_index = 0;
    }

    self.track_index += if self.check_if_close_to_squad_center(squad_shared_info) {
      1
    } else {
      if self.check_if_can_go_to_next_point_on_track(squad_shared_info) {
        1
      } else {
        0
      }
    };

    if self.can_change_state() {
      self.state = STATE_RUN;
      self.go_to_current_point_on_track(squad_shared_info);
    }
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

  fn is_target_achieved(&self) -> bool {
    (self.x - self.target_x).hypot(self.y - self.target_y) < self.squad_details.movement_speed
  }

  fn update_run(&mut self, squad_shared_info: &SquadUnitSharedDataSet) {
    if self.is_target_achieved() {
      if squad_shared_info.track.len() as i8 - 1 == self.track_index || self.track_index == -1 {
        self.track_index = -1;
        // --------------- handle hunting ----------------- START
        // if squad_shared_info.stored_track_destination.is_some() {
        //   self.change_state_to_idle(squad_shared_info);
        // // stay and don't
        // } else
        // if let Some(ref_cell_aim) = squad_shared_info.aim.upgrade() {
        // check if you are in range with aim, if no, go ahead, so there won't be effect like
        // to avoid effect like stopping and running all the time
        // if ref_cell_aim.borrow().was_moved_in_previous_loop {
        // in this case it's current loop, because "update" goes after updating the "was_moved_in_previous_loop"
        // self.set_target(
        //   self.mod_x * MANAGE_HUNTERS_PERIOD as f32 + self.target_x,
        //   self.mod_y * MANAGE_HUNTERS_PERIOD as f32 + self.target_y,
        // );
        // } else {
        // self.change_state_to_shoot(ref_cell_aim, true, squad_shared_info);
        // }
        // --------------- handle hunting ----------------- END
        // } else {
        self.change_state_to_idle(squad_shared_info);
      // }
      } else {
        self.track_index += 1;
        self.go_to_current_point_on_track(squad_shared_info);
      }
    } else {
      self.x += self.mod_x;
      self.y += self.mod_y;
    }
  }

  pub fn stop_running(&mut self, squad_shared_info: &SquadUnitSharedDataSet) {
    if self.track_index != -1 || self.state == STATE_RUN {
      self.track_index = -1;
      self.change_state_to_idle(squad_shared_info);
    }
  }

  pub fn change_state_to_idle(&mut self, squad_shared_info: &SquadUnitSharedDataSet) {
    self.mod_x = 0.0;
    self.mod_y = 0.0;
    self.state = STATE_IDLE;
    if self.track_index != -1 {
      self.go_to_current_point_on_track(squad_shared_info);
    } else if let Some(ability_target) = squad_shared_info.ability_target {
      if (self.x - ability_target.0).hypot(self.y - ability_target.1) <= WEAPON_RANGE {
        self.change_state_to_ability(squad_shared_info)
      }
    } else if let Some(aim) = squad_shared_info.aim.upgrade() {
      self.change_state_to_shoot(aim, true, squad_shared_info);
    } else if let Some(secondary_aim) = squad_shared_info.secondary_aim.upgrade() {
      self.change_state_to_shoot(secondary_aim, false, squad_shared_info);
    }
  }

  pub fn check_state_correctness(&mut self, squad_shared_info: &SquadUnitSharedDataSet) {
    if self.state == STATE_IDLE {
      self.change_state_to_idle(squad_shared_info);
    } else if self.state == STATE_SHOOT {
      self.check_correction_of_shooting_state(squad_shared_info);
    }
  }

  fn check_correction_of_shooting_state(&mut self, squad_shared_info: &SquadUnitSharedDataSet) {
    if let Some(ref_cell_aim) = self.aim.upgrade() {
      let aim_pos = ref_cell_aim.borrow();
      let angle = (aim_pos.x - self.x).atan2(self.y - aim_pos.y);
      let distance = (aim_pos.x - self.x).hypot(aim_pos.y - self.y);
      self.angle = angle;

      if distance > WEAPON_RANGE {
        self.change_state_to_idle(squad_shared_info);
      }
    } else {
      self.change_state_to_idle(squad_shared_info);
    }
  }

  fn change_state_to_shoot(
    &mut self,
    aim: Rc<RefCell<Squad>>,
    is_important_aim: bool,
    squad_shared_info: &SquadUnitSharedDataSet,
  ) {
    let borrowed_members = &aim.borrow().members;
    let (weak_unit_aim, distance) =
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
    if let Some(ref_cell_unit_aim) = weak_unit_aim.upgrade() {
      let unit_aim = ref_cell_unit_aim.borrow();
      if distance <= WEAPON_RANGE {
        self.state = STATE_SHOOT;
        self.angle = (unit_aim.x - self.x).atan2(self.y - unit_aim.y);
        self.aim = weak_unit_aim;
      } else if is_important_aim && squad_shared_info.stored_track_destination.is_none() {
        let angle = (self.x - unit_aim.x).atan2(unit_aim.y - self.y);
        self.set_target(
          angle.sin() * WEAPON_RANGE + unit_aim.x,
          -angle.cos() * WEAPON_RANGE + unit_aim.y,
        );
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

  fn change_state_to_ability(&mut self, squad_shared_info: &SquadUnitSharedDataSet) {
    self.state = STATE_ABILITY;
    match self.squad_details.representation_type as u8 {
      RAPTOR_REPRESENTATION_ID_U8 => {
        let ability_target = squad_shared_info.ability_target.unwrap();
        let target_x = ability_target.0 + self.position_offset_x;
        let target_y = ability_target.1 + self.position_offset_y;
        // let distance = (self.x - target.0).hypot(self.y - target.1);
        self.angle = (target_x - self.x).atan2(self.y - target_y);
        self.mod_x = self.angle.sin() * JUMPING_SPEED;
        self.mod_y = -self.angle.cos() * JUMPING_SPEED;
        self.ability_start_point = self.x;
        self.get_upping_progress = 0.0;
        self.time_to_next_shoot = 0;
      }
      _ => {}
    }
  }

  fn update_ability(
    &mut self,
    squad_shared_info: &mut SquadUnitSharedDataSet,
    bullet_manager: &mut BulletsManager,
  ) {
    match self.squad_details.representation_type as u8 {
      SOLIDER_REPRESENTATION_ID_U8 => self.throw_grenade(squad_shared_info, bullet_manager),
      RAPTOR_REPRESENTATION_ID_U8 => self.jump(squad_shared_info, bullet_manager),
      _ => {}
    }
  }

  fn jump(
    &mut self,
    squad_shared_info: &mut SquadUnitSharedDataSet,
    bullet_manager: &mut BulletsManager,
  ) {
    if self.get_upping_progress < 0.0 {
      return;
    }
    if !squad_shared_info.units_started_using_ability {
      squad_shared_info.units_started_using_ability = true
    }
    let ability_target = squad_shared_info.ability_target.unwrap();
    let target_x = ability_target.0 + self.position_offset_x;
    let target_y = ability_target.1 + self.position_offset_y;

    if self.get_upping_progress > 0.99 {
      squad_shared_info.units_which_finished_using_ability += 1;
      self.get_upping_progress = -1.0;
      bullet_manager.add_explosion(
        self.id as f32,
        self.x,
        self.y,
        (self.x, self.y),
        &WeaponType::HitTheGround,
      )
    } else {
      let acceleration = if self.get_upping_progress < 0.7 {
        1.3 - self.get_upping_progress
      } else {
        self.get_upping_progress * 4.0
      };

      if self.get_upping_progress > 0.3 && self.get_upping_progress < 0.7 {
        if self.time_to_next_shoot == 0 {
          let random = LookUpTable::get_random() - 0.5;
          let y_modifier = self.calc_jump_progress() * MAX_JUMP_HEIGHT;
          let unit_y = self.y - y_modifier;
          let aim_x = target_x + random * 140.0;
          let aim_y = target_y + random * 140.0;
          bullet_manager.add_fake_bullet(
            self.id as f32,
            (self.x - aim_x).hypot(unit_y - aim_y) + random * 0.1,
            (aim_x - self.x).atan2(unit_y - aim_y),
            &WeaponType::StandardRifle,
          );
          self.time_to_next_shoot = 10
        } else {
          self.time_to_next_shoot -= 1;
        }
      }
      self.x += self.mod_x * acceleration;
      self.y += self.mod_y * acceleration;
      self.get_upping_progress =
        (self.x - self.ability_start_point) / (target_x - self.ability_start_point);
    }
  }

  fn throw_grenade(
    &mut self,
    squad_shared_info: &mut SquadUnitSharedDataSet,
    bullet_manager: &mut BulletsManager,
  ) {
    if let Some(ability_target) = squad_shared_info.ability_target {
      bullet_manager.add_explosion(
        self.id as f32,
        self.x,
        self.y,
        ability_target,
        &WeaponType::Grenade,
      );
      squad_shared_info.ability_target = None; // for grenade it works, but for jump when every unit needs to make a jump NOT!
    } else {
      // We can do it at the same time as add explosion but then get_representation
      // will never returns self.state = ABILITY_STATE
      // so ability icon will never be disabled
      self.change_state_to_idle(squad_shared_info);
    }
  }

  fn calc_jump_progress(&self) -> f32 {
    0.25 - (0.5 - self.get_upping_progress.max(0.0)).powi(2)
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
      STATE_ABILITY => self.update_ability(squad_shared_info, bullet_manager),
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
        STATE_ABILITY => self.calc_jump_progress(),
        _ => 0.0,
      },
    ]
  }

  pub fn set_position_offset(&mut self, offset_x: f32, offset_y: f32) {
    self.position_offset_x = offset_x;
    self.position_offset_y = offset_y;
  }

  fn change_state_to_die(&mut self) {
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
