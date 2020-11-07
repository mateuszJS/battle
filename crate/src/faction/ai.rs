use super::Factory;
use crate::constants::{
  GRID_MAP_HEIGHT, GRID_MAP_WIDTH, INFLUENCE_MAP_HEIGHT, INFLUENCE_MAP_SCALE_X,
  INFLUENCE_MAP_SCALE_Y, INFLUENCE_MAP_WIDTH,
};

#[derive(PartialEq, Clone)]
pub enum PurposeType {
  Nothing,
  RunAway, // running away, don't care about enemies nearby until reach the safe place
  Stay, // stay and just wait, to make a bigger group (if you are in range of enemy influence, then go to attack)
  Attack,
  TakeStrategicPoint,
  PrepareToDefend,
}

pub struct SquadBasicInfo {
  pub id: u32,
  pub x: f32,
  pub y: f32,
  pub movement_speed: f32,
  pub influence: f32,
  pub weapon_range: f32,
}

#[derive(Clone)]
pub struct Purpose {
  pub purpose_type: PurposeType,
  pub x: f32,
  pub y: f32,
  pub squads_ids: Vec<u32>,
}

struct NewPurpose {
  id: isize,
  x: f32,
  y: f32,
  enemy_influence: f32,
  value: f32,
}

struct EnhancedPurpose<'a> {
  purpose_type: PurposeType,
  value_of_purpose: f32,
  enemy_force: f32,
  our_power: f32, // TODO: is this field still needed?
  squad: &'a SquadBasicInfo,
  old_purpose_x: f32,
  old_purpose_y: f32,
  original_purpose_id: isize,
}

type TexCellInfo = (usize, usize, usize, u8);

pub struct ArtificialIntelligence {
  purposes: Vec<Purpose>,
}

impl ArtificialIntelligence {
  pub fn new() -> ArtificialIntelligence {
    ArtificialIntelligence { purposes: vec![] }
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
      .flat_map(|neighbor| ArtificialIntelligence::get_all_neightbours(*neighbor, not_checked_yet))
      .collect::<Vec<TexCellInfo>>();

    neighbors.append(&mut neighbors_of_neighbors);

    neighbors
  }

  fn collect_new_purposes(factory: &Factory, texture: &Vec<u8>) -> Vec<NewPurpose> {
    // let x = ArtificialIntelligence::get_how_much_is_it_worth(
    //   &NewPurpose {
    //     id: 256,
    //     x: 0.0,
    //     y: 4.0,
    //     enemy_influence: 18.0,
    //     value: 1.0,
    //   },
    //   &EnhancedPurpose {
    //     purpose_type: PurposeType::Attack,
    //     our_power: 18.0,
    //     value_of_purpose: 1.0,
    //     original_purpose_id: 68,
    //     old_purpose_x: 1.0,
    //     old_purpose_y: 1.0,
    //     enemy_force: 34.0,
    //     squad: &SquadBasicInfo {
    //       id: 68,
    //       x: 5.0,
    //       y: 5.0,
    //       movement_speed: 2.5,
    //       weapon_range: 4.0,
    //       influence: 18.0,
    //     },
    //   },
    // );
    // log!("result: {}", x);
    /*=========GET GROUPED IMPORTANT PLACES==============*/
    let texture_len = texture.len() / 4;
    let mut interesting_places_list = vec![];

    for i in 0..texture_len {
      let tex_value = texture[i * 4 + 1];
      if tex_value > 0 {
        let y = i / INFLUENCE_MAP_WIDTH;
        let x = i % INFLUENCE_MAP_WIDTH;
        interesting_places_list.push((i * 4, x, y, tex_value));
      }
    }

    // interesting_places_list
    //   .iter()
    //   .for_each(|(index, x, y, value)| {
    //     log!("place {} {} {}", x, y, value);
    //   });

    let mut grouped_interesting_positions = vec![];
    let mut points_to_check = vec![];

    while interesting_places_list.len() > 0 {
      // TODO: points_to_check can be removed probably
      if points_to_check.len() == 0 {
        points_to_check.push(interesting_places_list.pop().unwrap());
      }

      let new_item = points_to_check.pop().unwrap();
      let mut neighbours =
        ArtificialIntelligence::get_all_neightbours(new_item, &mut interesting_places_list);
      neighbours.push(new_item);
      grouped_interesting_positions.push(neighbours);
    }

    // grouped_interesting_positions.iter().for_each(|vector| {
    //   log!("++++++++++++++++++++++");
    //   vector.iter().for_each(|(index, x, y, value)| {
    //     log!("place {} {} {}", x, y, value);
    //   });
    // });

    let mut new_purposes = grouped_interesting_positions
      .into_iter()
      .flat_map(|list_of_close_places| {
        let sum_influence = list_of_close_places
          .iter()
          .fold(0.0, |acc, (_index, _x, _y, influence)| {
            acc + *influence as f32
          });
        list_of_close_places
          .into_iter()
          .map(|(index, x, y, ..)| NewPurpose {
            id: index as isize,
            x: x as f32,
            y: y as f32,
            enemy_influence: sum_influence,
            value: 1.0,
          })
          .collect::<Vec<NewPurpose>>()
      })
      .collect::<Vec<NewPurpose>>();
    /*=======SORT PURPOSES BY INFLUENCE, VALUE, AND DISTANCE FROM THE FACTORY============*/
    // from th best value, smaller number of enemy and closer to factory to smaller value, bigger enemies and far away from factory
    let factory_x = factory.x * INFLUENCE_MAP_SCALE_X;
    let factory_y = factory.y * INFLUENCE_MAP_SCALE_Y;

    new_purposes.sort_by(|a_purpose, b_purpose| {
      let distance_a = (factory_x - a_purpose.x).hypot(factory_y - a_purpose.y);
      let distance_b = (factory_x - b_purpose.x).hypot(factory_y - b_purpose.y);
      let max_distance = distance_a.max(distance_b).max(1.0); // to avoid dividing by zero
      let a_how_much_is_it_worth =
        a_purpose.value * 2.0 - a_purpose.enemy_influence * 0.1 - distance_a / max_distance;
      let b_how_much_is_it_worth =
        b_purpose.value * 2.0 - b_purpose.enemy_influence * 0.1 - distance_b / max_distance;
      (b_how_much_is_it_worth)
        .partial_cmp(&a_how_much_is_it_worth)
        .unwrap()
    });

    new_purposes
  }

  fn get_purpose_value(purpose_type: &PurposeType) -> f32 {
    match *purpose_type {
      PurposeType::Attack => 1.0,
      PurposeType::Nothing => 0.0,
      _ => 0.0,
    }
  }

  fn get_how_much_is_it_worth(new_purpose: &NewPurpose, army: &EnhancedPurpose) -> f32 {
    /*========CALC VALUE========*/
    let max_value = new_purpose.value.max(army.value_of_purpose).max(1.0);
    let value_diff = (new_purpose.value - army.value_of_purpose) / max_value;

    /*======CALC ENEMIES FORCES========*/
    let max_force = army.enemy_force.max(new_purpose.enemy_influence).max(1.0);
    let purposes_enemies_forces_diff = (army.enemy_force - new_purpose.enemy_influence) / max_force;

    /*========CALC DISTANCE========*/
    let distance_factor = if army.purpose_type == PurposeType::Nothing {
      -1.0 // the smallest value that distance_factor can have
    } else {
      let distance_to_new_purpose = ((new_purpose.x - army.squad.x)
        .hypot(new_purpose.y - army.squad.y)
        - army.squad.weapon_range)
        .max(0.0);
      // let distance_to_curr_purpose = ((army.old_purpose_x - army.squad.x)
      //   .hypot(army.old_purpose_y - army.squad.y)
      //   - army.squad.weapon_range) // to don't care if both squads are in distance of weapon range
      //   .max(0.0);
      let max_distance = (INFLUENCE_MAP_HEIGHT as f32).hypot(INFLUENCE_MAP_WIDTH as f32);

      // how ot handle PurposeType::Nothing1 / 2.5
      // * (army.squad.movement_speed / 2.0));
      1.0 - distance_to_new_purpose / max_distance
    };

    let change_purpose_factor = if new_purpose.id == army.original_purpose_id {
      0.1
    } else {
      -0.1
    }; // of coruse should be smaller!
       /*========FINAL RESULT========*/
    distance_factor * (1.0 / army.squad.movement_speed) + change_purpose_factor
    // distance_to_curr_purpose - distance_to_new_purpose
    // value_diff + purposes_enemies_forces_diff + distance_diff
  }

  // pub fn get_our_influence_from_coords(texture: &Vec<u8>, x: f32, y: f32) -> f32 {
  //   let index = (y as usize * INFLUENCE_MAP_WIDTH + x as usize) * 4;
  //   texture[index] as f32
  // }

  fn get_ids_from_squads(squads: Vec<&SquadBasicInfo>) -> Vec<u32> {
    squads
      .into_iter()
      .map(|squad| squad.id)
      .collect::<Vec<u32>>()
  }

  fn run_to_safe_place<'a>(texture: &Vec<u8>, armies_list: Vec<EnhancedPurpose<'a>>) -> Purpose {
    // texture find the closest safe place
    let squads = armies_list
      .into_iter()
      .map(|army| army.squad)
      .collect::<Vec<&SquadBasicInfo>>();
    let (sum_x, sum_y) = squads.iter().fold((0.0, 0.0), |(sum_x, sum_y), squad| {
      (sum_x + squad.x, sum_y + squad.y)
    });
    let len = squads.len() as f32;

    Purpose {
      purpose_type: PurposeType::Nothing,
      squads_ids: ArtificialIntelligence::get_ids_from_squads(squads),
      x: sum_x / len,
      y: sum_y / len,
    }
  }

  pub fn work<'a>(
    &mut self,
    factory: &Factory,
    squads: &'a Vec<SquadBasicInfo>,
    texture: &Vec<u8>,
  ) -> Vec<Purpose> {
    let new_purposes = ArtificialIntelligence::collect_new_purposes(factory, texture);

    // TODO: cut new_purposes to keep like 5 or 10, or depends on your army, to avoid looping over everything!
    // OR by value! like if value is 1.1, 0.9, 0.85, 0.2. 0.1, 0.05, then select only 1.1, 0.9, 0.85
    let mut all_squads_ids = squads.iter().map(|squad| squad.id).collect::<Vec<u32>>();
    /*====update the current state fo the purpose, if point is captured, is enemy was defeated====*/

    let mut curr_state_of_our_army: Vec<EnhancedPurpose<'a>> = self
      .purposes
      .iter()
      .flat_map(|curr_purpose| {
        // We assume that rn everything is attack only!
        all_squads_ids.retain(|id| !curr_purpose.squads_ids.contains(id));

        let (curr_purpose_type, enemy_force, original_purpose_id) = match curr_purpose.purpose_type
        {
          PurposeType::Attack => {
            // TODO: looks like it's tracted as different purposes, when is running, and isntead of one, there is two purposes
            let is_still_there_any_enemy = new_purposes.iter().find(|new_purpose| {
              (curr_purpose.x - new_purpose.x).hypot(curr_purpose.y - new_purpose.y) < 2.0
            });

            if is_still_there_any_enemy.is_some() {
              let old_purpose = is_still_there_any_enemy.unwrap();
              (
                PurposeType::Attack,
                old_purpose.enemy_influence,
                old_purpose.id,
              )
            } else {
              (PurposeType::Nothing, 0.0, -1)
            }
          }
          _ => (PurposeType::Nothing, 0.0, -1),
        };

        curr_purpose
          .squads_ids
          .iter()
          .filter_map(|squad_id| {
            if let Some(squad) = squads.iter().find(|squad| squad.id == *squad_id) {
              Some(EnhancedPurpose {
                purpose_type: curr_purpose_type.clone(), // not sure if needed
                value_of_purpose: ArtificialIntelligence::get_purpose_value(&curr_purpose_type),
                enemy_force,
                our_power: squad.influence,
                squad,
                old_purpose_x: curr_purpose.x,
                old_purpose_y: curr_purpose.y,
                original_purpose_id,
              })
            } else {
              None
            }
          })
          .collect::<Vec<EnhancedPurpose<'a>>>()
      })
      .collect::<Vec<EnhancedPurpose<'a>>>();

    all_squads_ids.into_iter().for_each(|squad_id| {
      let squad = squads.iter().find(|squad| squad.id == squad_id).unwrap();
      curr_state_of_our_army.push(EnhancedPurpose {
        purpose_type: PurposeType::Nothing,
        value_of_purpose: ArtificialIntelligence::get_purpose_value(&PurposeType::Nothing),
        enemy_force: 0.0,
        our_power: squad.influence,
        squad,
        old_purpose_x: 0.0,
        old_purpose_y: 0.0,
        original_purpose_id: -1,
      });
    });
    log!("**********************************");
    let mut final_purposes = new_purposes
      .iter()
      .enumerate()
      .filter_map(|(index, new_purpose)| {
        if curr_state_of_our_army.len() == 0 {
          return None;
        }

        // sort from the worst to the best!!!! that's to use pop()
        curr_state_of_our_army.sort_by(|a_army, b_army| {
          let a_how_much_is_it_worth =
            ArtificialIntelligence::get_how_much_is_it_worth(new_purpose, a_army);
          let b_how_much_is_it_worth =
            ArtificialIntelligence::get_how_much_is_it_worth(new_purpose, b_army);
          (a_how_much_is_it_worth)
            .partial_cmp(&b_how_much_is_it_worth)
            .unwrap()
        });
        log!("=============================");
        log!(
          "id: {},new_purpose x:{} y: {}, enemy_influence: {}, value: {}",
          new_purpose.id,
          new_purpose.x,
          new_purpose.y,
          new_purpose.enemy_influence,
          new_purpose.value
        );
        log!("-----------------------------");
        curr_state_of_our_army.iter().for_each(|army| {
          log!(
            "id: {}, army x:{} y: {}, value_of_purpose: {}, enemy_force: {}, old x: {}, old y: {}, range: {}",
            army.original_purpose_id,
            army.squad.x,
            army.squad.y,
            army.value_of_purpose,
            army.enemy_force,
            army.old_purpose_x,
            army.old_purpose_y,
            army.squad.weapon_range,
          );
        });

        let mut collected_power = 0.0;
        let mut curr_state_of_our_army_last_index = curr_state_of_our_army.len() as isize - 1;
        // at this moment two squads are created, third one is waiting and when forth appears, then attack! shouldn't!
        while curr_state_of_our_army_last_index >= 0
          && collected_power < new_purpose.enemy_influence
        {
          let army = &curr_state_of_our_army[curr_state_of_our_army_last_index as usize];
          let if_its_still_the_same_purpose = army.purpose_type != PurposeType::Nothing;
          // with those, third squad will go to one enemy squad
          // let keep_purpose_factor = if if_its_still_the_same_purpose {
          //   1.0
          // } else {
          //   1.0
          // };
          let keep_purpose_factor = if if_its_still_the_same_purpose {
            1.1
          } else {
            0.9
          };
          collected_power += new_purpose.value * keep_purpose_factor * army.our_power;
          curr_state_of_our_army_last_index -= 1
        }

        if collected_power > new_purpose.enemy_influence {
          let collected_army = curr_state_of_our_army
            .drain(curr_state_of_our_army_last_index.max(0) as usize..)
            .map(|enhanced_purpose| enhanced_purpose.squad)
            .collect::<Vec<&SquadBasicInfo>>();

          Some(Purpose {
            purpose_type: PurposeType::Attack,
            squads_ids: ArtificialIntelligence::get_ids_from_squads(collected_army),
            x: new_purpose.x,
            y: new_purpose.y,
          })
        // } else if index != new_purposes.len() - 1 {
        //   let next_purpose = &new_purposes[index + 1];
        //   if next_purpose.value > new_purpose.value * 0.9 {
        //     // let's make the loop for purpose
        //     None
        //   } else {
        //     Some(ArtificialIntelligence::run_to_safe_place(
        //       texture,
        //       curr_state_of_our_army
        //         .drain(..)
        //         .collect::<Vec<EnhancedPurpose>>(),
        //     ))
        //   }
        } else {
          None
        }
      })
      .collect::<Vec<Purpose>>();

    final_purposes.push(ArtificialIntelligence::run_to_safe_place(
      texture,
      curr_state_of_our_army
        .drain(..)
        .collect::<Vec<EnhancedPurpose>>(),
    ));

    self.purposes = final_purposes.clone();

    final_purposes
  }
}
