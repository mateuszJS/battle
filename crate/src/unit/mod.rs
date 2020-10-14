mod utils;

use crate::bullets_manager::BulletsManager;
use crate::constants::{MATH_PI, NORMAL_SQUAD_RADIUS, WEAPON_RANGE};
use crate::id_generator::IdGenerator;
use crate::look_up_table::LookUpTable;
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
  ability_start_point: f32, // TODO: rename this field, it's just additional param for ability, and actually only needed for jumping
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
      self.change_state_to_idle();
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
      // TODO: what in case if unit wants just come closer to the aim?!
      // then wont have track, by actually then we could just set self.track_index = squad_shared_info.track.len() as i8 - 1
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
      // maybe just check if track_index === track.len() - 1
      // and clear track in squad unit should stop
      // and always when set new track also clear index
      self.go_to_current_point_on_track(squad_shared_info);
    } else if squad_shared_info.ability_target.is_some() {
      // assuming that unit cannot be disrupted during using ability,
      // unit is always able to use ability, then squad has ability_target and self.track_index == -1
      self.change_state_to_ability(squad_shared_info)
    } else if let Some(aim) = squad_shared_info.aim.upgrade() {
      self.change_state_to_shoot(aim, true, squad_shared_info);
    } else if let Some(secondary_aim) = squad_shared_info.secondary_aim.upgrade() {
      self.change_state_to_shoot(secondary_aim, false, squad_shared_info);
    }
  }

  // pub fn periodical_check_state_correctness(&mut self, squad_shared_info: &SquadUnitSharedDataSet) {
  //   // TODO: it should just call change_state_to_idle
  //   // rethink it, bc it's related with huntinh
  //   if self.state == STATE_IDLE {
  //     self.set_correct_state(squad_shared_info);
  //   } else if self.state == STATE_SHOOT {
  //     self.check_correction_of_shooting_state(squad_shared_info);
  //   }
  // }

  // fn check_correction_of_shooting_state(&mut self, squad_shared_info: &SquadUnitSharedDataSet) {
  //   // TODO: not needed, will be replaced with change_state_to_idle, eventually can be used inside that method
  //   // rethink it, bc it's related with huntinh
  //   if let Some(ref_cell_aim) = self.aim.upgrade() {
  //     let aim_pos = ref_cell_aim.borrow();
  //     let angle = (aim_pos.x - self.x).atan2(self.y - aim_pos.y);
  //     let distance = (aim_pos.x - self.x).hypot(aim_pos.y - self.y);
  //     self.angle = angle;

  //     if distance > WEAPON_RANGE {
  //       self.change_state_to_idle(squad_shared_info);
  //     }
  //   } else {
  //     self.change_state_to_idle(squad_shared_info);
  //   }
  // }

  fn change_state_to_shoot(
    &mut self,
    aim: Rc<RefCell<Squad>>,
    is_important_aim: bool,
    squad_shared_info: &SquadUnitSharedDataSet,
  ) {
    // TODO: rethink it, bc it's related with hunting
    // but prob this method looks okay
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
      let angle = (self.x - unit_aim.x).atan2(unit_aim.y - self.y);

      if distance_to_nearest_unit_aim <= WEAPON_RANGE {
        self.state = STATE_SHOOT;
        self.angle = angle;
        self.aim = nearest_weak_unit_aim;
      } else if is_important_aim {
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
    // TODO: should be done in other place, related only with certain type of unit
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
    // TODO: should be done in other place, related only with certain type of unit
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
    // TODO: should be done in other place, related only with certain type of unit
    if self.get_upping_progress < 0.0 {
      return;
    }
    squad_shared_info.any_unit_started_using_ability = true;
    let ability_target = squad_shared_info.ability_target.unwrap();
    let target_x = ability_target.0 + self.position_offset_x;
    let target_y = ability_target.1 + self.position_offset_y;

    if self.get_upping_progress > 0.99 {
      self.has_finished_using_ability = true;
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

  fn change_state_to_idle(&mut self) {
    self.state = STATE_IDLE;
    self.reset_state();
  }

  // fn change_state_to_idle(&mut self, squad_shared_info: &SquadUnitSharedDataSet) {
  //   self.state = STATE_IDLE;
  //   // self.set_correct_state(squad_shared_info);
  // }

  fn throw_grenade(
    &mut self,
    squad_shared_info: &mut SquadUnitSharedDataSet,
    bullet_manager: &mut BulletsManager,
  ) {
    // TODO: should be done in other place, related only with certain type of unit
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
      self.change_state_to_idle();
    }
  }

  fn calc_jump_progress(&self) -> f32 {
    // TODO: should be done in other place, related only with certain type of unit
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
