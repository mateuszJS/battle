use super::Factory;
use crate::constants::{
  GRID_MAP_HEIGHT, GRID_MAP_WIDTH, INFLUENCE_MAP_HEIGHT, INFLUENCE_MAP_SCALE_X,
  INFLUENCE_MAP_SCALE_Y, INFLUENCE_MAP_WIDTH,
};

#[derive(Clone)]
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
}

#[derive(Clone)]
pub struct Purpose {
  pub purpose_type: PurposeType,
  pub x: f32,
  pub y: f32,
  pub squads_ids: Vec<u32>,
}

struct NewPurpose {
  x: f32,
  y: f32,
  enemy_influence: f32,
  value: f32,
}

struct EnhancedPurpose<'a> {
  purpose_type: PurposeType,
  value_of_purpose: f32,
  enemy_force: f32,
  our_power: f32,
  squad: &'a SquadBasicInfo,
  old_purpose_x: f32,
  old_purpose_y: f32,
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
      .flat_map(|neoighbour| {
        ArtificialIntelligence::get_all_neightbours(*neoighbour, not_checked_yet)
      })
      .collect::<Vec<TexCellInfo>>();

    neighbors.append(&mut neighbors_of_neighbors);

    neighbors
  }

  fn collect_new_purposes(factory: &Factory, texture: &Vec<u8>) -> Vec<NewPurpose> {
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

    let mut grouped_interesting_positions = vec![];
    let mut points_to_check = vec![];

    while interesting_places_list.len() > 0 {
      if points_to_check.len() == 0 {
        points_to_check.push(interesting_places_list.pop().unwrap());
      }

      let new_item = points_to_check.pop().unwrap();
      let mut neighbours =
        ArtificialIntelligence::get_all_neightbours(new_item, &mut interesting_places_list);
      neighbours.push(new_item);
      grouped_interesting_positions.push(neighbours);
    }

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
          .map(|(_index, x, y, ..)| NewPurpose {
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
      let a_how_much_is_it_worth = a_purpose.value * 2.0
        - a_purpose.enemy_influence * 0.1
        - distance_a / INFLUENCE_MAP_WIDTH as f32;
      let b_how_much_is_it_worth = b_purpose.value * 2.0
        - b_purpose.enemy_influence * 0.1
        - distance_b / INFLUENCE_MAP_WIDTH as f32;
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
    let value_diff = new_purpose.value - army.value_of_purpose;
    let purposes_enemies_forces_diff = army.enemy_force - new_purpose.enemy_influence;
    let distance_to_new_purpose =
      (new_purpose.x - army.squad.x).hypot(new_purpose.y - army.squad.y);
    let distance_to_curr_purpose =
      (army.old_purpose_x - army.squad.x).hypot(army.old_purpose_y - army.squad.y);
    let distance_diff =
      (distance_to_curr_purpose - distance_to_new_purpose) / army.squad.movement_speed;

    value_diff + purposes_enemies_forces_diff + distance_diff
  }

  pub fn get_our_influence_from_coords(texture: &Vec<u8>, x: f32, y: f32) -> f32 {
    let index = (y as usize * INFLUENCE_MAP_WIDTH + x as usize) * 4;
    texture[index] as f32
  }

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

        let (curr_purpose_type, enemy_force) = match curr_purpose.purpose_type {
          PurposeType::Attack => {
            let is_still_there_any_enemy = new_purposes.iter().find(|new_purpose| {
              (curr_purpose.x - new_purpose.x).hypot(curr_purpose.y - new_purpose.y) < 2.0
            });

            if let Some(enemy_influence) = is_still_there_any_enemy {
              (
                PurposeType::Attack,
                is_still_there_any_enemy.unwrap().enemy_influence,
              )
            } else {
              (PurposeType::Nothing, 0.0)
            }
          }
          _ => (PurposeType::Nothing, 0.0),
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
                our_power: ArtificialIntelligence::get_our_influence_from_coords(
                  texture, squad.x, squad.y,
                ),
                squad,
                old_purpose_x: curr_purpose.x,
                old_purpose_y: curr_purpose.y,
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
        our_power: ArtificialIntelligence::get_our_influence_from_coords(texture, squad.x, squad.y),
        squad,
        old_purpose_x: 0.0,
        old_purpose_y: 0.0,
      });
    });

    let final_purposes = new_purposes
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

        let mut collected_power = 0.0;
        let mut curr_state_of_our_army_last_index = curr_state_of_our_army.len() as isize - 1;

        while curr_state_of_our_army_last_index >= 0
          && collected_power < new_purpose.enemy_influence
        {
          collected_power += new_purpose.value
            * curr_state_of_our_army[curr_state_of_our_army_last_index as usize].our_power;
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
        } else if index == new_purposes.len() - 1 {
          // check if another one aim is easier, if not, then do nothing

          // cannot fill that
          // TODO: do nothing for now, later we will join those squads with aims OR do nothing when there is no other purposes
          // calc best place to wait!
          Some(ArtificialIntelligence::run_to_safe_place(
            texture,
            curr_state_of_our_army
              .drain(..)
              .collect::<Vec<EnhancedPurpose>>(),
          ))
        } else {
          let next_purpose = &new_purposes[index + 1];
          if next_purpose.value > new_purpose.value * 0.9 {
            // let's make the loop for purpose
            None
          } else {
            Some(ArtificialIntelligence::run_to_safe_place(
              texture,
              curr_state_of_our_army
                .drain(..)
                .collect::<Vec<EnhancedPurpose>>(),
            ))
          }
        }
      })
      .collect::<Vec<Purpose>>();

    self.purposes = final_purposes.clone();

    final_purposes
  }
}
