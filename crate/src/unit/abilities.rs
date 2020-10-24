use super::{
  BulletsManager, LookUpTable, SquadUnitSharedDataSet, Unit, WeaponType, RAPTOR_REPRESENTATION_ID,
  SOLIDER_REPRESENTATION_ID, STATE_ABILITY, STATE_IDLE,
};

const RAPTOR_REPRESENTATION_ID_U8: u8 = RAPTOR_REPRESENTATION_ID as u8;
const SOLIDER_REPRESENTATION_ID_U8: u8 = SOLIDER_REPRESENTATION_ID as u8;

const JUMPING_SPEED: f32 = 5.0;
const MAX_JUMP_HEIGHT: f32 = 1200.0; // the same constant exists in JS

pub struct Abilities {}

impl Abilities {
  pub fn change_state_to_ability(unit: &mut Unit, squad_shared_info: &SquadUnitSharedDataSet) {
    if unit.state == STATE_ABILITY || unit.has_finished_using_ability {
      return;
    }
    unit.state = STATE_ABILITY;
    match unit.squad_details.representation_type as u8 {
      RAPTOR_REPRESENTATION_ID_U8 => Abilities::start_jump(unit, squad_shared_info),
      _ => {}
    }
  }

  pub fn update_ability(
    unit: &mut Unit,
    squad_shared_info: &mut SquadUnitSharedDataSet,
    bullet_manager: &mut BulletsManager,
  ) {
    match unit.squad_details.representation_type as u8 {
      SOLIDER_REPRESENTATION_ID_U8 => {
        Abilities::throw_grenade(unit, squad_shared_info, bullet_manager)
      }
      RAPTOR_REPRESENTATION_ID_U8 => Abilities::jump(unit, squad_shared_info, bullet_manager),
      _ => {}
    }
  }

  fn start_jump(unit: &mut Unit, squad_shared_info: &SquadUnitSharedDataSet) {
    let ability_target = squad_shared_info.ability_target.unwrap();
    let target_x = ability_target.0 + unit.position_offset_x;
    let target_y = ability_target.1 + unit.position_offset_y;

    unit.angle = (target_x - unit.x).atan2(unit.y - target_y);
    unit.mod_x = unit.angle.sin() * JUMPING_SPEED;
    unit.mod_y = -unit.angle.cos() * JUMPING_SPEED;
    unit.ability_start_point = unit.x;
    unit.get_upping_progress = 0.0;
    unit.time_to_next_shoot = 0;
  }

  fn jump(
    unit: &mut Unit,
    squad_shared_info: &mut SquadUnitSharedDataSet,
    bullet_manager: &mut BulletsManager,
  ) {
    if unit.get_upping_progress < 0.0 {
      return;
    }
    squad_shared_info.any_unit_started_using_ability = true;
    let ability_target = squad_shared_info.ability_target.unwrap();
    let target_x = ability_target.0 + unit.position_offset_x;
    let target_y = ability_target.1 + unit.position_offset_y;

    if unit.get_upping_progress > 0.99 {
      unit.has_finished_using_ability = true;
      unit.get_upping_progress = -1.0;
      bullet_manager.add_explosion(
        unit.id as f32,
        unit.x,
        unit.y,
        (unit.x, unit.y),
        &WeaponType::HitTheGround,
      );
      unit.state = STATE_IDLE;
    } else {
      let acceleration = if unit.get_upping_progress < 0.7 {
        1.3 - unit.get_upping_progress
      } else {
        unit.get_upping_progress * 4.0
      };

      if unit.get_upping_progress > 0.3 && unit.get_upping_progress < 0.7 {
        if unit.time_to_next_shoot == 0 {
          let random = LookUpTable::get_random() - 0.5;
          let y_modifier = Abilities::calc_jump_progress(unit) * MAX_JUMP_HEIGHT;
          let unit_y = unit.y - y_modifier;
          let aim_x = target_x + random * 140.0;
          let aim_y = target_y + random * 140.0;
          bullet_manager.add_fake_bullet(
            unit.id as f32,
            (unit.x - aim_x).hypot(unit_y - aim_y) + random * 0.1,
            (aim_x - unit.x).atan2(unit_y - aim_y),
            &WeaponType::StandardRifle,
          );
          unit.time_to_next_shoot = 10
        } else {
          unit.time_to_next_shoot -= 1;
        }
      }
      unit.x += unit.mod_x * acceleration;
      unit.y += unit.mod_y * acceleration;
      unit.get_upping_progress =
        (unit.x - unit.ability_start_point) / (target_x - unit.ability_start_point);
      // (1460.3317 - 1454.0729) / (1455.5663 - 1454.0729)
      if unit.get_upping_progress > 1.0 {
        log!(
          "{} - {} - {} - {}",
          unit.get_upping_progress,
          unit.x,
          unit.ability_start_point,
          target_x
        );
      }
    }
  }

  fn throw_grenade(
    unit: &mut Unit,
    squad_shared_info: &mut SquadUnitSharedDataSet,
    bullet_manager: &mut BulletsManager,
  ) {
    if let Some(ability_target) = squad_shared_info.ability_target {
      bullet_manager.add_explosion(
        unit.id as f32,
        unit.x,
        unit.y,
        ability_target,
        &WeaponType::Grenade,
      );
      squad_shared_info.ability_target = None; // for grenade it works, but for jump when every unit needs to make a jump NOT!
    } else {
      // We can do it at the same time as add explosion but then get_representation
      // will never returns self.state = ABILITY_STATE
      // so ability icon will never be disabled
      // self.change_state_to_idle();
      unit.state = STATE_IDLE;
    }
  }

  fn calc_jump_progress(unit: &Unit) -> f32 {
    0.25 - (0.5 - unit.get_upping_progress.max(0.0)).powi(2)
  }

  pub fn get_representation_state(unit: &Unit) -> f32 {
    match unit.squad_details.representation_type as u8 {
      RAPTOR_REPRESENTATION_ID_U8 => Abilities::calc_jump_progress(unit),
      _ => 0.0,
    }
  }
}
