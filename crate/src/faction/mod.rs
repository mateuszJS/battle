mod ai;
use crate::constants::{
  ATTACKERS_DISTANCE, FACTORY_INFLUENCE_RANGE, FACTORY_INFLUENCE_VALUE,
  MAX_NUMBER_ITEMS_IN_PRODUCTION_LINE, MAX_SQUAD_SPREAD_FROM_CENTER_RADIUS, WEAPON_RANGE,
};

use crate::look_up_table::LookUpTable;
use crate::position_utils::PositionUtils;
use crate::representations_ids::FACTION_REPRESENTATION_ID;
use crate::squad::Squad;
use crate::squad_types::SquadType;
use crate::unit::STATE_IDLE;
use crate::Factory;
use crate::World;
use ai::ArtificialIntelligence;
use std::cell::RefCell;
use std::rc::{Rc, Weak};

const TIME_BETWEEN_CREATION: u8 = 10;

pub struct SquadDuringCreation {
  pub time_to_create_another_unit: u8,
  pub squad: Squad,
}

pub struct Faction {
  pub id: u32,
  pub resources: u32,
  pub squads: Vec<Rc<RefCell<Squad>>>, // call borrow() and share that Ref<Squad>, if it's not possible then wrap in Rc like Vec<Rc<RefCell<Squad>>>
  pub factory: Factory,
  pub squads_during_creation: Vec<SquadDuringCreation>,
  pub portal: Rc<RefCell<Squad>>,
  ai: ArtificialIntelligence,
}

impl Faction {
  pub fn new(
    id: u32,
    factory_x: f32,
    factory_y: f32,
    factory_angle: f32,
    is_user: bool,
    world: &mut World,
  ) -> Faction {
    let mut portal = Squad::new(id, SquadType::Portal);
    portal.add_member(factory_x, factory_y);
    portal.update_center();
    let portal_id = portal.members[0].borrow().id;
    let factory = Factory::new(portal_id, factory_x, factory_y, factory_angle, is_user);
    let portal_squad = Rc::new(RefCell::new(portal));
    // TODO: add portal to grid!!!
    // world.all_squads.push(Rc::downgrade(&portal_squad));
    let ai = ArtificialIntelligence::new();

    Faction {
      id,
      factory,
      resources: 0,
      squads: vec![],
      portal: portal_squad,
      squads_during_creation: vec![],
      ai,
    }
  }

  fn update_squads_during_creation(&mut self, world: &mut World) {
    let factory = &mut self.factory;
    let mut squad_index: usize = MAX_NUMBER_ITEMS_IN_PRODUCTION_LINE;

    self
      .squads_during_creation
      .iter_mut()
      .enumerate()
      .for_each(|(index, creating_squad)| {
        creating_squad.time_to_create_another_unit += 1;

        if creating_squad.time_to_create_another_unit == TIME_BETWEEN_CREATION {
          creating_squad.time_to_create_another_unit = 0;

          let (position_x, position_y, factory_angle) = factory.get_creation_point();

          creating_squad.squad.add_member(position_x, position_y);

          let seed_throwing_strength = LookUpTable::get_random(); // TODO: move it to factory code, or faction
          let throwing_strength = 8.0 + seed_throwing_strength * 15.0;
          creating_squad
            .squad
            .members
            .last_mut()
            .unwrap()
            .borrow_mut()
            .change_state_to_fly(factory_angle, throwing_strength);

          if creating_squad.squad.members.len() == creating_squad.squad.squad_details.members_number
          {
            squad_index = index;
          } else {
            creating_squad.time_to_create_another_unit = 0;
          }
        }
      });

    if squad_index != MAX_NUMBER_ITEMS_IN_PRODUCTION_LINE {
      let squad = Rc::new(RefCell::new(
        self.squads_during_creation.remove(squad_index).squad,
      ));
      squad.borrow_mut().update_center();
      // world.all_squads.push(Rc::downgrade(&squad));
      self.squads.push(squad);
    }
  }

  pub fn update(&mut self, world: &mut World) {
    let result: Option<SquadType> = self.factory.update();

    match result {
      Some(squad_type) => {
        let new_squad = SquadDuringCreation {
          squad: Squad::new(self.id, squad_type),
          time_to_create_another_unit: 0,
        };
        self.squads_during_creation.push(new_squad);
      }
      None => {}
    }

    self
      .squads
      .iter()
      .for_each(|squad| squad.borrow_mut().update(world));
    self
      .squads_during_creation
      .iter_mut()
      .for_each(|squad_during_creation| squad_during_creation.squad.update(world));

    self.update_squads_during_creation(world);
  }

  pub fn get_representation(&self) -> Vec<f32> {
    let start_representation = [
      &[FACTION_REPRESENTATION_ID, self.id as f32],
      &self.factory.get_representation()[..],
    ]
    .concat();

    let active_squads_representation: Vec<f32> = self
      .squads
      .iter()
      .flat_map(|squad| squad.borrow().get_representation())
      .collect();

    let squads_during_creation_representation: Vec<f32> = self
      .squads_during_creation
      .iter()
      .flat_map(|squad_during_creation| squad_during_creation.squad.get_representation())
      .collect();

    // everything I'm combining into vector, maybe it is possible just with slices?
    [
      &start_representation[..],
      &active_squads_representation[..],
      &squads_during_creation_representation[..],
    ]
    .concat()
  }

  pub fn move_squads(&mut self, squads_ids: Vec<u32>, target_x: f32, target_y: f32) {
    let position = PositionUtils::get_squads_positions(squads_ids.len(), target_x, target_y);
    let mut index = 0;
    self.squads.iter_mut().for_each(|squad| {
      if squads_ids.contains(&squad.borrow().id) {
        squad.borrow_mut().task_add_target(position[index]);
        index += 1;
      }
    });
  }

  pub fn attack_enemy(&mut self, squads_ids: Vec<u32>, enemy: &Weak<RefCell<Squad>>) {
    let attackers: Vec<&Rc<RefCell<Squad>>> = self
      .squads
      .iter()
      .filter(|squad| squads_ids.contains(&squad.borrow().id))
      .collect();

    attackers
      .iter()
      .for_each(|squad| squad.borrow_mut().task_attack_enemy(enemy));

    // let aim_position = enemy.upgrade().unwrap().borrow().shared.center_point;

    // let mut attackers_out_of_range: Vec<&Rc<RefCell<Squad>>> = attackers
    //   .into_iter()
    //   .filter(|squad| {
    //     let squad_position = squad.borrow().shared.center_point;
    //     (squad_position.0 - aim_position.0).hypot(squad_position.1 - aim_position.1)
    //       > ATTACKERS_DISTANCE
    //   })
    //   .collect();

    // SquadsManager::set_positions_in_range(&mut attackers_out_of_range, aim_position, false);
  }

  pub fn search_for_enemies(
    &mut self,
    squads_which_moved: &Vec<Rc<RefCell<Squad>>>,
    all_squads: &Vec<Rc<RefCell<Squad>>>,
  ) {
    self.squads.iter().for_each(|squad| {
      squad.borrow_mut().shared.secondary_aim = Weak::new();
    });

    let idle_squads: Vec<&Rc<RefCell<Squad>>> = self
      .squads
      .iter()
      .filter(|ref_cell_squad| {
        ref_cell_squad
          .borrow()
          .members
          .iter()
          .any(|unit| unit.borrow().state == STATE_IDLE)
      })
      .collect();

    // let moved_enemies_squads: Vec<&Rc<RefCell<Squad>>> = squads_which_moved
    //   .iter()
    //   .filter(|squad| squad.borrow().faction_id != self.id)
    //   .collect();

    // let all_enemies_squads: Vec<&Rc<RefCell<Squad>>> = all_squads
    //   .iter()
    //   .filter(|squad| squad.borrow().faction_id != self.id)
    //   .collect();

    // SquadsManager::search_for_enemies(idle_squads, moved_enemies_squads, all_enemies_squads);
  }

  pub fn update_squads_centers(&mut self) {
    self.squads.iter_mut().for_each(|ref_cell_squad| {
      let mut squad = ref_cell_squad.borrow_mut();
      squad.update_center();
    });
  }

  pub fn check_squads_correctness(&mut self) {
    self.squads.iter_mut().for_each(|ref_cell_squad| {
      let mut squad = ref_cell_squad.borrow_mut();
      squad.check_units_correctness();
    });

    self.squads.retain(|squad| squad.borrow().members.len() > 0);
  }

  fn get_squads_from_ids(&self, squads_ids: Vec<u32>) -> Vec<&Rc<RefCell<Squad>>> {
    self
      .squads
      .iter()
      .filter(|ref_cell_squad| squads_ids.contains(&ref_cell_squad.borrow().id))
      .collect()
  }

  pub fn use_ability(&mut self, squads_ids: Vec<u32>, target_x: f32, target_y: f32) {
    let squads = self.get_squads_from_ids(squads_ids);

    let positions = PositionUtils::get_squads_positions(squads.len(), target_x, target_y);

    // TODO: maybe it should be done along the attacks/hunters
    let squads_out_of_range: Vec<Option<&Rc<RefCell<Squad>>>> = squads
      .clone()
      .into_iter()
      .enumerate()
      .map(|(index, ref_cell_squad)| {
        let mut squad = ref_cell_squad.borrow_mut();
        let squad_position = squad.shared.center_point;
        let target = positions[index];
        let out_of_range = (squad_position.0 - target.0).hypot(squad_position.1 - target.1)
          > WEAPON_RANGE - MAX_SQUAD_SPREAD_FROM_CENTER_RADIUS;
        if !out_of_range {
          // squad.stop_running();
          None
        } else {
          Some(ref_cell_squad)
        }
      })
      .collect();

    // squads_out_of_range
    //   .iter()
    //   .enumerate()
    //   .for_each(|(index, option_squad)| {
    //     if let Some(squad) = option_squad {
    //       let target = positions[index];
    //       SquadsManager::set_positions_in_range(&mut vec![squad], target, true);
    //     }
    //   });

    squads.iter().enumerate().for_each(|(index, rc_hunter)| {
      let target = positions[index];
      rc_hunter.borrow_mut().task_use_ability(target)
    });
  }

  pub fn get_influence(&self) -> Vec<f32> {
    let faction_info_and_portal_influence = [
      -1.0,
      self.id as f32,
      0.0,
      self.factory.x,
      self.factory.y,
      FACTORY_INFLUENCE_VALUE,
      FACTORY_INFLUENCE_RANGE,
    ];

    let squads_influence = self
      .squads
      .iter()
      .flat_map(|ref_cell_squad: &Rc<RefCell<Squad>>| {
        let squad = ref_cell_squad.borrow();
        vec![
          squad.id as f32,
          squad.shared.center_point.0,
          squad.shared.center_point.1,
          (squad.members.len() as f32) * squad.squad_details.influence_value,
          WEAPON_RANGE * 1.2,
        ]
      })
      .collect::<Vec<f32>>();
    [
      &faction_info_and_portal_influence[..],
      &squads_influence[..],
    ]
    .concat()
  }

  pub fn do_ai(&mut self, texture: &Vec<u8>, factions: &Vec<Faction>) {
    let squads = self
      .squads
      .iter()
      .map(|ref_cell_squad| ref_cell_squad.borrow_mut())
      .collect();

    let enemy_factories = factions
      .iter()
      .filter_map(|faction: &Faction| {
        if faction.id != self.id {
          Some((faction.factory.x, faction.factory.y))
        } else {
          None
        }
      })
      .collect();

    let squads_plans = self
      .ai
      .work(&self.factory, squads, texture, enemy_factories);
  }
}
