use crate::constants::{
  ATTACKERS_DISTANCE, MAX_NUMBER_ITEMS_IN_PRODUCTION_LINE, THRESHOLD_SQUAD_ON_POSITION,
};
use crate::position_utils::PositionUtils;
use crate::squad::Squad;
use crate::squad_types::SquadType;
use crate::Factory;
use crate::World;
use std::cell::RefCell;
use std::collections::HashMap;
use std::rc::Rc;
use std::rc::Weak;

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
}

impl Faction {
  pub fn new(
    id: u32,
    factory_x: f32,
    factory_y: f32,
    factory_angle: f32,
    is_user: bool,
  ) -> Faction {
    let factory = Factory::new(factory_x, factory_y, factory_angle, is_user);
    Faction {
      id,
      factory,
      resources: 0,
      squads: vec![],
      squads_during_creation: vec![],
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
          creating_squad
            .squad
            .add_member(position_x, position_y, factory_angle);

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
      world.all_squads.push(Rc::downgrade(&squad));
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
      .for_each(|squad| squad.borrow_mut().update());
    self
      .squads_during_creation
      .iter_mut()
      .for_each(|squad_during_creation| squad_during_creation.squad.update());

    self.update_squads_during_creation(world);
  }

  pub fn get_representation(&self) -> Vec<f32> {
    let start_representation = [
      &[0.0, self.id as f32],
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
        let squad_target = position[index];
        squad
          .borrow_mut()
          .add_target(squad_target.0, squad_target.1, true);
        index += 1;
      }
    });
  }

  pub fn attack_enemy(&mut self, squads_ids: Vec<u32>, enemy: &Weak<RefCell<Squad>>) {
    self.squads.iter_mut().for_each(|squad| {
      if squads_ids.contains(&squad.borrow().id) {
        squad.borrow_mut().attack_enemy(enemy);
      }
    });
  }

  pub fn update_squads_centers(&mut self) {
    self
      .squads
      .iter_mut()
      .for_each(|squad| squad.borrow_mut().update_center());
  }

  pub fn manage_hunters(&mut self) {
    let mut hunters: HashMap<u32, Vec<&Rc<RefCell<Squad>>>> = HashMap::new();

    self.squads.iter().for_each(|cell_squad| {
      let mut squad = cell_squad.borrow_mut();
      let upgraded_aim = &squad.shared.aim.upgrade();

      if let Some(ref_cell_aim) = upgraded_aim {
        let aim = ref_cell_aim.borrow();
        let aim_point = aim.shared.center_point;
        let aim_last_point = squad.shared.last_aim_position;
        let distance_to_enemy = (aim_point.0 - squad.shared.center_point.0)
          .hypot(aim_point.1 - squad.shared.center_point.1);

        if distance_to_enemy > ATTACKERS_DISTANCE {
          // is out of attacker range
          let diff_distance = (aim_point.0 - aim_last_point.0).hypot(aim_point.1 - aim_last_point.1);

          if diff_distance > THRESHOLD_SQUAD_ON_POSITION {
            // and enemy was move
            if hunters.contains_key(&aim.id) {
              hunters.get_mut(&aim.id).unwrap().push(cell_squad);
            } else {
              hunters.insert(aim.id, vec![cell_squad]);
            }
          }
        } else if (aim_last_point.0 - squad.shared.center_point.0)
        .hypot(aim_last_point.1 - squad.shared.center_point.1) > distance_to_enemy {
          // else if squad is not already staying
          squad.stop_running();
        }
      }
    });

    hunters.values_mut().for_each(|squads_list| {
      let (sum_x, sum_y) =
        squads_list
          .iter()
          .fold((0.0, 0.0), |(sum_x, sum_y), squad: &&Rc<RefCell<Squad>>| {
            let squad = squad.borrow();
            (
              sum_x + squad.shared.center_point.0,
              sum_y + squad.shared.center_point.1,
            )
          });

      let aim_position = squads_list[0]
        .borrow()
        .shared
        .aim
        .upgrade()
        .unwrap()
        .borrow()
        .shared
        .center_point;

      let positions = PositionUtils::get_attackers_position(
        squads_list.len(),
        (
          sum_x / squads_list.len() as f32,
          sum_y / squads_list.len() as f32,
        ),
        600.0,
        aim_position,
      );

      squads_list.sort_by(|a, b| {
        // sort by id, to avoid changing position on each attack
        // the best would be to calc the nearest destination position to each squad
        let squad_a_pos = a.borrow().id;
        let squad_b_pos = b.borrow().id;
        (squad_a_pos).partial_cmp(&squad_b_pos).unwrap()
      });

      squads_list.iter().enumerate().for_each(|(index, squad)| {
        let position = positions[index];
        let enemy_center_point = squad
          .borrow()
          .shared
          .aim
          .upgrade()
          .unwrap()
          .borrow()
          .shared
          .center_point;
        let mut mut_squad = squad.borrow_mut();
        mut_squad.add_target(position.0, position.1, false);
        mut_squad.shared.last_aim_position = enemy_center_point;
      });
    });
  }
}
