pub enum AbilityType {
  ThrowGrenade,
  Jump,
  NonAbility,
}

pub struct Usage {
  attack: bool,
  transport: bool,
}

pub struct Ability {
  pub name: AbilityType,
  pub reload_time: u16,
  pub is_squad_spread: bool,
  pub range: f32,
  pub usage: Usage,
}

pub static THROW_GRENADE: Ability = Ability {
  name: AbilityType::ThrowGrenade,
  reload_time: 1200,
  is_squad_spread: false,
  range: 600.0,
  usage: Usage {
    attack: true,
    transport: false,
  },
};

pub static JUMP: Ability = Ability {
  name: AbilityType::Jump,
  reload_time: 900,
  is_squad_spread: true,
  range: 900.0,
  usage: Usage {
    attack: true,
    transport: true,
  },
};

pub static NON_ABILITY: Ability = Ability {
  name: AbilityType::Jump,
  reload_time: 0,
  is_squad_spread: false,
  range: 0.0,
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
