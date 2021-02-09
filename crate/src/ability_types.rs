pub enum AbilityType {
  ThrowGrenade,
  Jump,
  NonAbility,
}

pub struct Usage {
  pub attack: bool,
  pub transport: bool,
}

pub struct Ability {
  pub id: u32,
  pub name: AbilityType,
  pub reload_time: u16,
  pub is_squad_spread: bool,
  pub range: f32,
  pub called_by_one_members: bool,

  /* rest are useful only for AI */
  pub usage: Usage,
  pub effect_lifetime: u16,
}

pub static THROW_GRENADE: Ability = Ability {
  id: 1,
  name: AbilityType::ThrowGrenade,
  reload_time: 1200,
  is_squad_spread: false,
  range: 600.0,
  called_by_one_members: true,
  effect_lifetime: 75,
  usage: Usage {
    attack: true,
    transport: false,
  },
};

pub static JUMP: Ability = Ability {
  id: 2,
  name: AbilityType::Jump,
  reload_time: 900,
  is_squad_spread: true,
  range: 900.0,
  called_by_one_members: false,
  effect_lifetime: 45,
  usage: Usage {
    attack: true,
    transport: true,
  },
};

pub static NON_ABILITY: Ability = Ability {
  id: 0,
  name: AbilityType::Jump,
  reload_time: 0,
  is_squad_spread: false,
  range: 0.0,
  called_by_one_members: false,
  effect_lifetime: 0,
  usage: Usage {
    attack: false,
    transport: false,
  },
};

pub fn get_ability_details(weapon_type: &AbilityType) -> &'static Ability {
  match *weapon_type {
    AbilityType::ThrowGrenade => &THROW_GRENADE,
    AbilityType::Jump => &JUMP,
    AbilityType::NonAbility => &NON_ABILITY,
  }
}
