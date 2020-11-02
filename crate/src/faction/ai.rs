use super::{Factory, Squad};
use crate::constants::{
  GRID_CELL_SIZE, GRID_MAP_HEIGHT, GRID_MAP_WIDTH, INFLUENCE_MAP_HEIGHT, INFLUENCE_MAP_SCALE_X,
  INFLUENCE_MAP_SCALE_Y, INFLUENCE_MAP_WIDTH,
};

use std::cell::{RefCell, RefMut};
use std::collections::HashMap;
use std::rc::Weak;

// #[derive(PartialEq)]
enum PurposeType {
  Nothing,
  RunAway, // running away, don't care about enemies nearby until reach the safe place
  Stay, // stay and just wait, to make a bigger group (if you are in range of enemy influence, then go to attack)
  Attack, //
  GoTo, // just go to place, it can be strategic point, it can be attack on portal, attack on enemies, attack to support alliancese
        // (if you are in range of enemy influence, then go to attack)
}

struct Purpose {
  purpose_type: PurposeType,
  x: i16,
  y: i16,
  squads_ids: Vec<u32>,
}

struct EnhancedPurpose<'a> {
  purpose_type: PurposeType,
  value_of_purpose: f32,
  enemy_force: f32,
  our_power: f32,
  squads: Vec<RefMut<'a, Squad>>,
  x: f32,
  y: f32,
}

pub struct ArtificialIntelligence {
  faction_id: u32,
  purposes: Vec<Purpose>,
}

type TexCellInfo = (usize, usize, usize, u8);

impl ArtificialIntelligence {
  pub fn new(faction_id: u32) -> ArtificialIntelligence {
    ArtificialIntelligence {
      faction_id,
      purposes: vec![],
    }
  }

  fn get_all_neightbours(
    item: TexCellInfo,
    not_checked_yet: &mut Vec<TexCellInfo>,
  ) -> Vec<TexCellInfo> {
    // item shouldn't be in not_checked_yet vector
    let mut neighbors = vec![];
    not_checked_yet.retain(|position_data| {
      if (item.1 as i16 - position_data.1 as i16).abs() < 3
        && (item.2 as i16 - position_data.2 as i16).abs() < 3
      {
        neighbors.push(position_data.clone());
        false
      } else {
        true
      }
    });

    let mut neighbors_of_neighbors = neighbors
      .iter()
      .flat_map(|neoighbour| {
        ArtificialIntelligence::get_all_neightbours(*neoighbour, not_checked_yet)
      })
      .collect::<Vec<TexCellInfo>>();

    neighbors.append(&mut neighbors_of_neighbors);

    neighbors
  }

  fn collect_new_purposes(texture: &Vec<u8>) -> Vec<(f32, f32, f32)> {
    /*=========GET GROUPED IMPORTANT PLACES==============*/
    let texture_len = texture.len() / 4;
    let mut interesting_positions = vec![];

    for i in 0..texture_len {
      let tex_value = texture[i * 4 + 1];
      if tex_value > 0 {
        // 1 or 0, depends if there is enemy
        let y = i / INFLUENCE_MAP_WIDTH;
        let x = i % INFLUENCE_MAP_WIDTH;
        interesting_positions.push((i * 4, x, y, tex_value));
      }
    }

    let mut grouped_interesting_positions = vec![];
    let mut points_to_check = vec![];

    while interesting_positions.len() > 0 {
      if points_to_check.len() == 0 {
        points_to_check.push(interesting_positions.pop().unwrap());
      }

      let new_item = points_to_check.pop().unwrap();

      let mut neighbours =
        ArtificialIntelligence::get_all_neightbours(new_item, &mut interesting_positions);
      neighbours.push(new_item);
      grouped_interesting_positions.push(neighbours);
    }

    grouped_interesting_positions
      .into_iter()
      .flat_map(|list_of_close_places| {
        let sum_influence = list_of_close_places
          .iter()
          .fold(0.0, |acc, (_index, _x, _y, influence)| {
            acc + *influence as f32
          });
        list_of_close_places
          .into_iter()
          .map(|(_index, x, y, ..)| (x as f32, y as f32, sum_influence))
          .collect::<Vec<(f32, f32, f32)>>()
      })
      .collect::<Vec<(f32, f32, f32)>>()
  }



  pub fn work(
    &mut self,
    factory: &Factory,
    squads: Vec<RefMut<Squad>>,
    texture: &Vec<u8>,
    squads_on_grid: &HashMap<usize, Vec<Weak<RefCell<Squad>>>>,
  ) {
    let mut new_purposes = ArtificialIntelligence::collect_new_purposes(texture);
    let factory_x = factory.x * INFLUENCE_MAP_SCALE_X;
    let factory_y = factory.y * INFLUENCE_MAP_SCALE_Y;
    // RN we are calculating strength of the enemy forces, we should handle also how is it important for us,
    // e.g. how important is destroy enemy portal, and how to capture enemy strategic point
    new_purposes.sort_by(|(a_x, a_y, a_influence), (b_x, b_y, b_influence)| {
      let distance_a = (factory_x - a_x).hypot(factory_y - a_y);
      let distance_b = (factory_x - b_x).hypot(factory_y - b_y);
      let a_value = a_influence - distance_a / 15.0; // 15.0 almost form the sky, 15.43 is width of the influence map
      let b_value = b_influence - distance_b / 15.0;
      (a_value).partial_cmp(&b_value).unwrap()
    });

    let mut all_squads_ids = squads.iter().map(|squad| squad.id).collect::<Vec<u32>>();
    /*====update the current state fo the purpose, if point is captured, is enemy was defeated====*/
    let mut curr_state_of_our_army = self
      .purposes
      .iter()
      .map(|purpose| {
        // We assume that rn everything is attack only!
        all_squads_ids.retain(|id| !purpose.squads_ids.contains(id));

        let mut our_power = 0.0;
        let mut sum_x = 0.0;
        let mut sum_y = 0.0;
        let squads = purpose
          .squads_ids
          .iter()
          .filter_map(|squad_id| {
            if let Some(squad) = squads.iter().find(|squad| squad.id == *squad_id) {
              our_power += squad.get_influence();
              sum_x += squad.shared.center_point.0;
              sum_y += squad.shared.center_point.1;
              Some(*squad)
            } else {
              None
            }
          })
          .collect::<Vec<RefMut<Squad>>>();

        let avg_x = sum_x * INFLUENCE_MAP_SCALE_X / squads.len() as f32;
        let avg_y = sum_y * INFLUENCE_MAP_SCALE_Y / squads.len() as f32;

        let (curr_purpose_type, value_of_purpose, enemy_force) = match purpose.purpose_type {
          PurposeType::Attack => {
            let is_still_there_any_enemy = new_purposes
              .iter()
              .find(|(x, y, ..)| (purpose.x as f32 - x).hypot(purpose.y as f32 - y) < 2.0);

            if let Some(enemy_influence) = is_still_there_any_enemy {
              (PurposeType::Attack, 1.0, is_still_there_any_enemy.unwrap().2)
            } else {
              (PurposeType::Nothing, 0.0, 0.0)
            }
          }
          _ => (PurposeType::Nothing, 0.0, 0.0),
        };
        EnhancedPurpose {
          purpose_type: curr_purpose_type,
          value_of_purpose,
          enemy_force,
          our_power,
          squads,
          x: avg_x,
          y: avg_y,
        }
        // (value, enemy_force, power, squads, avg_x, avg_y)
      })
      .collect::<Vec<EnhancedPurpose>>();

    all_squads_ids.into_iter().for_each(|squad_id| {
      let squad = squads.iter().find(|squad| squad.id == squad_id).unwrap();
      let squad_x = (squad.shared.center_point.0 * INFLUENCE_MAP_SCALE_X).floor();
      let squad_y = (squad.shared.center_point.1 * INFLUENCE_MAP_SCALE_Y).floor();
      curr_state_of_our_army.push(EnhancedPurpose {
        purpose_type: PurposeType::Nothing,
        value_of_purpose: 0.0,
        enemy_force: 0.0,
        our_power: squad.get_influence(),
        squads: vec![*squad],
        x: squad_x,
        y: squad_y,
      });
    });

    curr_state_of_our_army
    new_purposes(x, y, influence) sorted by the nearest one to the portal

    // we don't have to match the current state with new purposes, there is no real reason

    new_purposes.iter().for_each(|(x, y, influence)| {
      let distance = (x - ).hypot(y - );
      // we have to think how to calculate situation, when sqyad can stay in current position, but also can go to the morei mprotant purpose, but alone is not enough power, but comebined with other squads got enough power
      // prob we should just go over all squads then, and calculate minimum required fire power
      // let required_purpose = purpose.value - current_purpose.value;
      // go over all the squads, and check if some of the squad has curr_purpose.value < required_purpose AND distance and power is okay also!
      // we don't know even if it's strategic point, attack or something
    });

    // 1. update power of your all armies, and check if they didn't complete the purpose! Maybe add new squads/squads which finished purpose here!
    // 2. to collect purposes go over texture green channel, collect all,
    //  - if green channel is 1, then collect also red channel, it's value of the enemies there
    // 3. Check if all current armies are able to achieve the purpose, if not:
    //  - you can send some support (support power - distance - not doing current purpose, if there is any)
    //  - run away to safe place (or if you crazy, to less "powered" purpose)
    //  - get some vector of results from this point
    // 4. Compare vector from point 3, and all purposes (or result from point 3 should edit all purposes)
    // and select new purposes!!!!

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

  fn is_any_enemy_in_area(texture: &Vec<u8>, x: i16, y: i16, radius: i16) -> bool {
    let min_y = (y - radius).max(0) as usize;
    let max_y = (y + radius).min(INFLUENCE_MAP_HEIGHT as i16 - 1) as usize;
    let min_x = (x - radius).max(0) as usize;
    let max_x = (x - radius).min(INFLUENCE_MAP_WIDTH as i16 - 1) as usize;
    let mut result = vec![];

    for y in min_y..=max_y {
      for x in min_x..=max_x {
        // When we will introduce strategic point, then we have to distingisch, enemy squads from enemy strategic point
        if texture[(INFLUENCE_MAP_WIDTH * GRID_MAP_WIDTH + x) * 4 + 1] > 0 {
          return true;
        }
      }
    }

    false
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

}
