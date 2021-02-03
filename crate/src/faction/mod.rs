mod ai;
mod squad_manager;
use crate::constants::MAX_NUMBER_ITEMS_IN_PRODUCTION_LINE;
use crate::id_generator::IdGenerator;
use crate::look_up_table::LookUpTable;
use crate::position_utils::PositionUtils;
use crate::representations_ids::FACTION_REPRESENTATION_ID;
use crate::squad::Squad;
use crate::squad_types::SquadType;
use crate::squads_grid_manager::SquadsGrid;
use crate::Factory;
use crate::World;
pub use ai::{ArtificialIntelligence, FactionInfo, Place, PlaceType, Plan, PurposeType};
use squad_manager::SquadsManager;
use std::cell::RefCell;
use std::collections::HashMap;
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
  pub portal_squad: Rc<RefCell<Squad>>,
  ai: ArtificialIntelligence,
  hunters_aims: HashMap<u32, (Weak<RefCell<Squad>>, (f32, f32))>,
  // hunters: HashMap<enemy_squad_id, (refenrece_to_enemy_squad, old_position)>
}

impl Faction {
  pub fn new(
    id: u32,
    factory_id: u32,
    factory_x: f32,
    factory_y: f32,
    factory_angle: f32,
    is_user: bool,
  ) -> Faction {
    let mut portal = Squad::new(id, factory_id, SquadType::Portal);
    portal.add_member(factory_x, factory_y);
    portal.update_center();
    let portal_id = portal.members[0].borrow().id;
    let factory = Factory::new(portal_id, factory_x, factory_y, factory_angle, is_user);
    let portal_squad = Rc::new(RefCell::new(portal));
    let ai = ArtificialIntelligence::new(id);

    Faction {
      id,
      factory,
      resources: 0,
      squads: vec![],
      portal_squad,
      squads_during_creation: vec![],
      ai,
      hunters_aims: HashMap::new(),
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

          let seed_throwing_strength = LookUpTable::get_random();
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
          squad: Squad::new(self.id, IdGenerator::generate_id(), squad_type),
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

  pub fn task_add_target(&mut self, squads_ids: &Vec<u32>, target_x: f32, target_y: f32) {
    // TODO: Check if suqad can jump away
    let position = PositionUtils::get_squads_positions(squads_ids.len(), target_x, target_y);
    let mut index = 0;
    self.squads.iter_mut().for_each(|ref_cell_squad| {
      let mut squad = ref_cell_squad.borrow_mut();
      if squads_ids.contains(&squad.id) {
        squad.task_add_target(position[index], false);
        index += 1;
      }
    });
  }

  pub fn task_attack_enemy(&mut self, squads_ids: &Vec<u32>, weak_enemy: &Weak<RefCell<Squad>>) {
    let mut attackers: Vec<&Rc<RefCell<Squad>>> = self
      .squads
      .iter()
      .filter(|squad| squads_ids.contains(&squad.borrow().id))
      .collect();

    if attackers.len() == 0 {
      return;
    }
    /*==========ADD ENEMY TO HUNTERS HashMap===========*/
    let enemy_ref_cell = weak_enemy.upgrade().unwrap();
    let enemy_squad = enemy_ref_cell.borrow();
    if !self.hunters_aims.contains_key(&enemy_squad.id) {
      self.hunters_aims.insert(
        enemy_squad.id,
        (weak_enemy.clone(), enemy_squad.shared.center_point),
      );
    }
    attackers
      .iter()
      .for_each(|squad| squad.borrow_mut().task_attack_enemy(weak_enemy));

    SquadsManager::set_aggressor_positions(&attackers, enemy_squad.shared.center_point);
  }

  pub fn update_squads_centers(&mut self) {
    self.squads.iter_mut().for_each(|ref_cell_squad| {
      let mut squad = ref_cell_squad.borrow_mut();
      squad.update_center();
    });
  }

  pub fn check_squads_correctness(&mut self) {
    self.squads.iter_mut().for_each(|ref_cell_squad| {
      ref_cell_squad.borrow_mut().check_units_correctness();
    });

    self.squads.retain(|squad| squad.borrow().members.len() > 0);
  }

  fn get_squads_from_ids(&self, squads_ids: &Vec<u32>) -> Vec<&Rc<RefCell<Squad>>> {
    self
      .squads
      .iter()
      .filter(|ref_cell_squad| squads_ids.contains(&ref_cell_squad.borrow().id))
      .collect()
  }

  pub fn task_use_ability(&mut self, squads_ids: &Vec<u32>, target_x: f32, target_y: f32) {
    let squads = self.get_squads_from_ids(squads_ids);

    if squads.len() == 0 {
      return;
    }

    let ability = squads[0].borrow().squad_details.ability;

    // let ability_targets = PositionUtils::get_squads_positions(squads.len(), target_x, target_y);
    let is_big_spread_between_abilities_target = ability.scatter > 1.0;

    let (target_position_offsets, origin_x, origin_y) = if is_big_spread_between_abilities_target {
      (
        PositionUtils::get_squads_positions(squads.len(), target_x, target_y),
        0.0,
        0.0,
      ) // only vector with positions is used
    } else {
      let (x, y) = PositionUtils::get_squads_positions(1, target_x, target_y)[0];
      (
        PositionUtils::get_units_in_squad_position(squads.len().min(7)).clone(), // clone just change it from read reference to value
        x,
        y,
      )
    };

    let offsets_number = target_position_offsets.len();

    squads
      .iter()
      .enumerate()
      .for_each(|(index, ref_cell_squad)| {
        let ability_target = if is_big_spread_between_abilities_target {
          target_position_offsets[index]
        } else {
          let (offset_x, offset_y) = target_position_offsets[index % offsets_number];
          (origin_x + offset_x, origin_y + offset_y)
        };

        ref_cell_squad.borrow_mut().task_use_ability(ability_target);
        SquadsManager::set_positions_to_use_ability(
          &mut vec![ref_cell_squad],
          ability_target,
          ability.range,
        );
      });
  }

  fn attack_closest_enemies(&mut self, plan: Plan) {
    let mut group_by_closest_enemies: HashMap<u32, (&Weak<RefCell<Squad>>, Vec<u32>)> =
      HashMap::new();

    // key is enemy_id, value is (Vec<our squad ids, target ability x, y)>)
    let mut group_by_ability: HashMap<u32, (Vec<u32>, (f32, f32))> = HashMap::new();

    plan.squads_ids.iter().for_each(|squad_id| {
      let ref_cell_squad = self
        .squads
        .iter()
        .find(|ref_cell_squad| ref_cell_squad.borrow().id == *squad_id)
        .unwrap();
      let squad = ref_cell_squad.borrow();
      let squad_position = squad.shared.center_point;

      let mut closest_weak_enemy = &plan.enemy_squads[0];
      let mut closest_distance = std::f32::MAX;
      let mut closest_enemy_id = 0;
      plan.enemy_squads.iter().for_each(|weak_enemy_squad| {
        let ref_cell_enemy_squad = weak_enemy_squad.upgrade().unwrap();
        let enemy_squad = ref_cell_enemy_squad.borrow();
        let enemy_squad_position = enemy_squad.shared.center_point;
        let distance = (squad_position.0 - enemy_squad_position.0)
          .hypot(squad_position.1 - enemy_squad_position.1);

        if distance < closest_distance {
          closest_weak_enemy = weak_enemy_squad;
          closest_distance = distance;
          closest_enemy_id = enemy_squad.id;
        }
      });

      match group_by_closest_enemies.get_mut(&closest_enemy_id) {
        Some(our_squads) => {
          our_squads.1.push(*squad_id);
        }
        None => {
          group_by_closest_enemies.insert(closest_enemy_id, (closest_weak_enemy, vec![*squad_id]));
        }
      };

      if squad.ability_cool_down == 0 && closest_distance < squad.squad_details.ability.range {
        match group_by_ability.get_mut(&closest_enemy_id) {
          Some(our_squads) => {
            our_squads.0.push(*squad_id);
          }
          None => {
            group_by_ability.insert(
              closest_enemy_id,
              (
                vec![*squad_id],
                closest_weak_enemy
                  .upgrade()
                  .unwrap()
                  .borrow()
                  .shared
                  .center_point,
              ),
            );
          }
        };
      }
    });

    for (_key, (weak_enemy, our_squads_ids)) in group_by_closest_enemies.iter() {
      self.task_attack_enemy(our_squads_ids, weak_enemy);
    }

    for (_key, (our_squads_ids, (x, y))) in group_by_ability.iter() {
      self.task_use_ability(our_squads_ids, *x, *y);
    }
  }

  pub fn do_ai(&mut self, all_factions_info: &Vec<FactionInfo>, squads_on_grid: &SquadsGrid) {
    let Self { ref squads, .. } = self;

    let squads_plans = self.ai.work(squads, all_factions_info, squads_on_grid);

    squads_plans
      .into_iter()
      .for_each(|plan| match plan.purpose_type {
        PurposeType::Attack => self.attack_closest_enemies(plan),
        PurposeType::RunToSafePlace => self.task_add_target(&plan.squads_ids, plan.x, plan.y),
        PurposeType::Capture => self.task_add_target(&plan.squads_ids, plan.x, plan.y),
      })
  }

  pub fn manage_hunters(&mut self, squads_grid: &SquadsGrid) {
    self.hunters_aims =
      SquadsManager::manage_hunters(&mut self.squads, &self.hunters_aims, squads_grid);
  }
}
