use super::{Factory, Squad};
use crate::constants::{
  GRID_CELL_SIZE, GRID_MAP_HEIGHT, GRID_MAP_WIDTH, INFLUENCE_MAP_SCALE_X, INFLUENCE_MAP_SCALE_Y,
  INFLUENCE_MAP_WIDTH,
};
use crate::SquadsGridManager;
use std::cell::{RefCell, RefMut};
use std::collections::HashMap;
use std::rc::Weak;

enum PurposeType {
  RunAway, // running away, don't care about enemies nearby until reach the safe place
  Stay, // stay and just wait, to make a bigger group (if you are in range of enemy influence, then go to attack)
  Attack, //
  GoTo, // just go to place, it can be strategic point, it can be attack on portal, attack on enemies, attack to support alliancese
        // (if you are in range of enemy influence, then go to attack)
}

struct Purpose {
  kind: PurposeType,
  enemy_faction_id: u32,
  enemy_squads_ids: Vec<u32>,
  enemy_squads: Vec<Weak<RefCell<Squad>>>,
}

pub struct ArtificialIntelligence {
  faction_id: u32,
  squads_plans: [Vec<((f32, f32), Vec<u32>)>; 2],
}

impl ArtificialIntelligence {
  pub fn new(faction_id: u32) -> ArtificialIntelligence {
    ArtificialIntelligence {
      faction_id,
      squads_plans: [
        vec![], // RUN_AWAY
        vec![], // STAY
      ],
    }
  }

  fn is_same_targets(p1: (f32, f32), p2: (f32, f32)) -> bool {
    (p1.0 - p2.0).hypot(p1.1 - p2.1) < 10.0
  }

  fn get_list_of_indexes_around(center_x: i16, center_y: i16, range: i16) -> Vec<usize> {
    let min_y = (center_y - range).max(0) as usize;
    let max_y = (center_y + range).min(GRID_MAP_HEIGHT as i16 - 1) as usize;
    let min_x = (center_x - range).max(0) as usize;
    let max_x = (center_x - range).min(GRID_MAP_WIDTH as i16 - 1) as usize;
    let mut result = vec![];

    (min_y..=max_y)
      .collect::<Vec<usize>>()
      .into_iter()
      .for_each(|y| {
        let mod_x: usize = if y == min_y || y == max_y {
          1
        } else {
          range as usize * 2
        };

        let mut x = min_x;
        while x <= max_x {
          result.push(y * GRID_MAP_WIDTH + x);
          x += mod_x;
        }
      });
    result
  }

  // fn get_army(
  //   weak_squad: Weak<RefCell<Squad>>,
  //   squads_on_grid: &HashMap<usize, Vec<Weak<RefCell<Squad>>>>,
  // ) -> (
  // ) {
  //   let position = weak_squad.upgrade().unwrap().borrow().shared.center_point;
  //   let x = (position.0 / GRID_CELL_SIZE) as i16;
  //   let y = (position.1 / GRID_CELL_SIZE) as i16;

  //   let mut power: f32 = 0.0;
  //   let mut squads_ids = vec![];
  //   let mut squads = vec![];
  //   let current_cell_squads = ArtificialIntelligence::get_list_of_indexes_around(x, y, range);

  //   current_cell_squads.iter().for_each(|some_weak_squad| {
  //     let Some(some_ref_cell_squad) = some_weak_squad.upgrade() {
  //       let some_squad = some_ref_cell_squad.borrow();
  //       power +=
  //     }
  //   })

  //   (squads_ids, squads, power)
  //   current_cell_squads
  // }

  pub fn work(
    &mut self,
    factory: &Factory,
    squads: Vec<RefMut<Squad>>,
    texture: &Vec<u8>,
    squads_on_grid: &HashMap<usize, Vec<Weak<RefCell<Squad>>>>,
  ) {
    // to collect purposes go over texture green channel, collect all,
    // - if green channel is 1, then collect also red channel, it's value of the enemies there
    //
    return;
    if squads.len() == 0 {
      return;
    }

    let max_number_of_purposes = 3;
    let purposes: Vec<Purpose> = vec![];
    let mut range: i16 = 1;
    let index_of_last_cell = GRID_MAP_WIDTH * GRID_MAP_HEIGHT - 1;
    let mut mod_x = 0;
    let mut mod_y = 0;
    let factory_x = (factory.x / GRID_CELL_SIZE) as i16;
    let factory_y = (factory.y / GRID_CELL_SIZE) as i16;

    let x_to_edge_distance = GRID_MAP_WIDTH as i16 - (factory_x - GRID_MAP_WIDTH as i16).abs();
    let y_to_edge_distance = GRID_MAP_HEIGHT as i16 - (factory_y - GRID_MAP_HEIGHT as i16).abs();
    let max_range = (x_to_edge_distance).max(y_to_edge_distance);

    while purposes.len() < max_number_of_purposes && range <= max_range {
      ArtificialIntelligence::get_list_of_indexes_around(factory_x, factory_y, range)
        .into_iter()
        .for_each(|index| {
          match squads_on_grid.get(&index) {
            Some(squads_list) => {
              let enemies_squads = squads_list
                .iter()
                .filter(|weak_squad| {
                  if let Some(ref_cell_squad) = weak_squad.upgrade() {
                    let squad = ref_cell_squad.borrow();
                    return squad.faction_id == self.faction_id;
                  } else {
                    false
                  }
                })
                .collect::<Vec<&Weak<RefCell<Squad>>>>();

              enemies_squads.iter().for_each(|weak_enemy_squad| {
                let ref_cell_enemy_squad = weak_enemy_squad.upgrade().unwrap();
                let enemy_squad = ref_cell_enemy_squad.borrow();
                let already_included_in_purposes = purposes
                  .iter()
                  .find(|purpose| {
                    enemy_squad.faction_id == purpose.enemy_faction_id
                      && purpose.enemy_squads_ids.contains(&enemy_squad.id)
                  })
                  .is_some();

                // if !already_included_in_purposes {
                //   let (squads_ids, squads, power) = ArtificialIntelligence::get_army(weak_enemy_squad, &squads_on_grid);
                //   purposes.push({
                //     kind: PurposeType::Attack,
                //     enemy_faction_id: enemy_squad.faction_id,

                //   })
                // }
              });
            }
            None => {}
          };
        });
    }

    let squad_position = squads[0].shared.center_point;
    let influence =
      ArtificialIntelligence::get_influence_values(squad_position.0, squad_position.1, texture);
    log!("{:?}", influence);
    return;
    /*
      1. group squads into armies and calculate their power
        - do we have to do it? We know where have we sent the squad, do we know if they are together, if they get the same purpose, then it's one army
      2. get all nearest aims, which can be achieved with out army, assumed that whole army will do it (so if army has influence 50,
        then won't attack army with influence 70), and least if it's not really necessary (level of desperation)
      3. Loop over all the armies, check if current purpose if can win, or if there is any more important
        3.1. or loop over all purposes, check how many troop power do we have there, if it's enough, if there is some more important purposes
    */
    // ) -> [Vec<((f32, f32), Vec<u32>)>; 2] {
    // let armies = vec![
    // ((Plan, f32, f32, u32), (f32, f32) Vec<Squad>)
    // Plan, x, y, squad_id (for attackers) (x of army center, y of army center - to check distance, and army influence)
    // ];

    // let new_squads_plans = [vec![], vec![]];
    let (squads_in_danger, safe_squads): (_, Vec<_>) = squads
      .into_iter()
      // check also if squad is running_away!
      .partition(|squad| ArtificialIntelligence::is_safe_place(squad, texture));
    // units it's army should take care by self about is_safe_place, if have enemy to attack
    if squads_in_danger.len() > 0 {
      let safe_places = ArtificialIntelligence::get_safe_places(&squads_in_danger, factory);
      squads_in_danger.iter().for_each(|squad| {
        let safe_place =
          ArtificialIntelligence::get_nearest_place(squad.shared.center_point, &safe_places);

        // new_squads_plans[0]
        // is_same_targets
        // self.squads_plans.insert(squad.id, (Plan::Run, safe_place));
      });
      // mark squad that they are looking for the safe place (because rn if there will run outside
      // of enemy range, they will be safe enough in their minds, but nto really)
      // can be just status "RUN_TO_SAFE_PLACE", and in each iterator safe place can change
    }

    safe_squads.iter().for_each(|squad| {
      // self.squads_plans.insert(squad.id, (Plan::Stay, (0.0, 0.0)));
    });

    log!(
      "safe: {}, in danger: {}",
      safe_squads.len(),
      squads_in_danger.len()
    );
    // maybe bwe should have anything like running away, just when place is nto safe,
    // then it means that this battle is not to win, so it should be in our aim,
    // so another aim should be given to this squad

    // log!(
    //   "{}, {}, {}, {}",
    //   texture[texture_index],     // influence on plus
    //   texture[texture_index + 1], // influence on minus
    //   texture[texture_index + 2], // vulnerability
    //   texture[texture_index + 3],
    // );

    // to make units more brave, just decrease the factors e.g. Ad.2. influence * 0.7 -> influence * 0.6
    // maybe we should collect all potential important places:
    // 1. Places where we are safe -> our factory, squads, strategic point where is safe_place
    // 2. Places where we need a support -> our factory, squads, strategic point where influence * 0.7 < vulnerability but it 's still safe place
    // 3. Places where we should take a point -> previously known points, only check if is our
    //    and if texture[texture_index + 1] there is lower than our position texture[texture_index]
    // 4. Places where we should attack -> everywhere where our units have go somewhere (attack factory or take a strategic point,
    //    NOT when running away from dangerous place) and got any vulnerability, then attack that enemy
    // let is_safe = texture[texture_index] > 5;
    // self.squads_plans = new_squads_plans & self.squads_plans
  }

  fn get_nearest_place(position: (f32, f32), places: &Vec<(f32, f32)>) -> (f32, f32) {
    let mut min_distance = std::f32::MAX;
    let mut nearest_place: (f32, f32) = places[0];

    places.iter().for_each(|place| {
      let distance = (position.0 - place.0).hypot(position.1 - place.1);
      if distance < min_distance {
        nearest_place = place.clone();
        min_distance = distance;
      }
    });
    nearest_place
  }

  fn get_influence_values<'a>(input_x: f32, input_y: f32, texture: &'a Vec<u8>) -> &'a [u8] {
    let x = (input_x * INFLUENCE_MAP_SCALE_X).round() as usize;
    let y = (input_y * INFLUENCE_MAP_SCALE_Y).round() as usize;
    let texture_index = INFLUENCE_MAP_WIDTH as usize * 4 * y + x * 4;

    &texture[texture_index..texture_index + 4]
  }

  fn is_safe_place(squad: &RefMut<Squad>, texture: &Vec<u8>) -> bool {
    let squad_position = squad.shared.center_point;
    let influence =
      ArtificialIntelligence::get_influence_values(squad_position.0, squad_position.1, texture);
    influence[0] < influence[2]
  }

  fn get_safe_places(squads: &Vec<RefMut<Squad>>, factory: &Factory) -> Vec<(f32, f32)> {
    let mut safe_places = squads
      .iter()
      .map(|squad| squad.shared.center_point)
      .collect::<Vec<(f32, f32)>>();
    safe_places.push((factory.x, factory.y));
    safe_places
  }

  fn get_important_aims(&self) {
    // check all influences in the places where we control the strategic points, if there is enemy influence

    // then calculate the value, and send or not troops to win!

    // all points which hare not controlled by us, all enemies portals
  }
}
