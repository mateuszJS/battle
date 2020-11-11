use super::Factory;
use crate::constants::{
  GRID_MAP_HEIGHT, GRID_MAP_WIDTH, INFLUENCE_MAP_HEIGHT, INFLUENCE_MAP_SCALE_X,
  INFLUENCE_MAP_SCALE_Y, INFLUENCE_MAP_WIDTH,
};
use crate::squad::Squad;
use std::cell::{Ref, RefCell};
use std::rc::{Rc, Weak};

#[derive(PartialEq, Clone)]
pub enum PurposeType {
  Attack,
  TakeStrategicPoint,
  PrepareToDefend,
  HelpInDanger,
}

pub enum PlaceType {
  Squads,
  Portal,
  // StrategicPoint,
}

pub struct Place {
  pub place_type: PlaceType,
  pub squads: Vec<Rc<RefCell<Squad>>>,
  pub influence: f32,
  pub x: f32,
  pub y: f32,
}

pub struct FactionInfo {
  pub id: u32,
  pub places: Vec<Place>,
  pub influence_total: f32,
}

// #[derive(Clone)]
pub struct EnhancedPurpose<'a> {
  pub purpose_type: PurposeType,
  pub signification: f32,
  pub place: &'a Place,
}
pub struct Purpose {
  // pub purpose_type: PurposeType,
// pub signification: f32,
// pub enemy: &'a Vec<EnemyGroupInfo>,
// pub enemy_influence: f32,
// pub x: f32,
// pub y: f32,
}

const RADIUS_OF_DANGER_ZONE_AROUND_THE_PORTAL: f32 = 1000.0; // best would be longest range of the weapon * 2.0

// struct NewPurpose {
//   id: isize,
//   x: f32,
//   y: f32,
//   enemy_influence: f32,
//   value: f32,
// }

// struct EnhancedPurpose {
//   purpose_type: PurposeType,
//   value: f32,
//   enemy_influence: f32,
//   enemy_squads: Vec<Weak<RefCell<Squad>>>,
//   our_influence: f32,
//   our_squads: Vec<Weak<RefCell<Squad>>>,
//   purpose_x: f32,
//   purpose_y: f32, // do we need to store it?
//   original_purpose_id: isize,
// }

type TexCellInfo = (usize, usize, usize, u8);

pub struct ArtificialIntelligence {
  purposes: Vec<Purpose>,
  faction_id: u32,
}

impl ArtificialIntelligence {
  pub fn new(faction_id: u32) -> ArtificialIntelligence {
    ArtificialIntelligence {
      purposes: vec![],
      faction_id,
    }
  }

  // sort purposes
  // new_purposes.sort_by(|a_purpose, b_purpose| {
  //   let distance_a = (factory_x - a_purpose.x).hypot(factory_y - a_purpose.y);
  //   let distance_b = (factory_x - b_purpose.x).hypot(factory_y - b_purpose.y);
  //   let max_distance = distance_a.max(distance_b).max(1.0); // to avoid dividing by zero
  //   let a_how_much_is_it_worth =
  //     a_purpose.value * 2.0 - a_purpose.enemy_influence * 0.1 - distance_a / max_distance;
  //   let b_how_much_is_it_worth =
  //     b_purpose.value * 2.0 - b_purpose.enemy_influence * 0.1 - distance_b / max_distance;
  //   (b_how_much_is_it_worth)
  //     .partial_cmp(&a_how_much_is_it_worth)
  //     .unwrap()
  // });

  // fn get_how_much_is_it_worth(new_purpose: &NewPurpose, army: &EnhancedPurpose) -> f32 {
  //   /*========CALC VALUE========*/
  //   let max_value = new_purpose.value.max(army.value_of_purpose).max(1.0);
  //   let value_diff = (new_purpose.value - army.value_of_purpose) / max_value;
  //   let max_distance = (INFLUENCE_MAP_HEIGHT as f32).hypot(INFLUENCE_MAP_WIDTH as f32);
  //   /*======CALC ENEMIES FORCES========*/
  //   let max_force = army.enemy_force.max(new_purpose.enemy_influence).max(1.0);
  //   let purposes_enemies_forces_diff = (army.enemy_force - new_purpose.enemy_influence) / max_force;

  //   /*========CALC DISTANCE========*/
  //   // let distance_factor = if army.purpose_type == PurposeType::Nothing {
  //   // -1.0 // the smallest value that distance_factor can have
  //   // it's VERY small distance!!!!!!!!!
  //   // } else {
  //   let distance_to_new_purpose = ((new_purpose.x - army.squad.x)
  //     .hypot(new_purpose.y - army.squad.y)
  //     - army.squad.weapon_range)
  //     .max(0.0);
  //   // let distance_to_curr_purpose = ((army.old_purpose_x - army.squad.x)
  //   //   .hypot(army.old_purpose_y - army.squad.y)
  //   //   - army.squad.weapon_range) // to don't care if both squads are in distance of weapon range
  //   //   .max(0.0);

  //   // how ot handle PurposeType::Nothing1 / 2.5
  //   // * (army.squad.movement_speed / 2.0));
  //   let distance_factor = 1.0 - distance_to_new_purpose / max_distance;
  //   // 1.0 - distance_to_new_purpose / max_distance
  //   // };

  //   let change_purpose_factor = if new_purpose.id == army.original_purpose_id {
  //     1.0 / max_distance // just very small number
  //   } else {
  //     -1.0 / max_distance
  //   }; // of coruse should be smaller!
  //      /*========FINAL RESULT========*/
  //   (distance_factor + change_purpose_factor) * (1.0 / army.squad.movement_speed)
  //   // distance_to_curr_purpose - distance_to_new_purpose
  //   // value_diff + purposes_enemies_forces_diff + distance_diff
  // }

  // // pub fn get_our_influence_from_coords(texture: &Vec<u8>, x: f32, y: f32) -> f32 {
  // //   let index = (y as usize * INFLUENCE_MAP_WIDTH + x as usize) * 4;
  // //   texture[index] as f32
  // // }

  fn get_sorted_purposes<'a>(
    &self,
    our_portal: Ref<Squad>,
    all_factions_info: &'a Vec<FactionInfo>,
  ) -> Vec<EnhancedPurpose<'a>> {
    let our_portal_x = our_portal.shared.center_point.0;
    let our_portal_y = our_portal.shared.center_point.1;
    let mut enemies_influence_around_our_portal = 0.0;
    let mut our_influence_around_our_portal = 0.0;
    let mut purposes = vec![];

    all_factions_info.iter().for_each(|faction_info| {
      if faction_info.id == self.faction_id {
        faction_info.places.iter().for_each(|place| {
          match place.place_type {
            PlaceType::Portal => {} // portal defending is done in enemies squads
            PlaceType::Squads => {
              let distance = (place.x - our_portal_x).hypot(place.y - our_portal_y);
              if distance < RADIUS_OF_DANGER_ZONE_AROUND_THE_PORTAL {
                our_influence_around_our_portal += place.influence;
              }
              
              // TODO: check if squads are in danger, like, we can check if enemy is stronger, but what if there is third faction? Which is not our aim.
              // squad can run or ask for a support! So just set PurposeType::HelpInDanger
            }
          }
        });
      } else {
        faction_info.places.iter().for_each(|place| {
          let (purpose_type, signification) = match place.place_type {
            PlaceType::Portal => (PurposeType::Attack, 1.0),
            PlaceType::Squads => {
              let distance = (place.x - our_portal_x).hypot(place.y - our_portal_y);
              if distance < RADIUS_OF_DANGER_ZONE_AROUND_THE_PORTAL {
                enemies_influence_around_our_portal += place.influence;
              }
              // call distance to our portal
              // shorter is more important,
              // if enemies are within RADIUS_OF_DANGER_ZONE_AROUND_THE_PORTAL then add it to "enemies_influence_around_our_portal"


              // if is attacking, then higher value and purpose is attack
              (PurposeType::Attack, place.influence * 0.05 - distance * 0.01)
            },
          };
          purposes.push(EnhancedPurpose {
            purpose_type,
            signification,
            place,
          });
        });
      }
    });

    if enemies_influence_around_our_portal > our_influence_around_our_portal {
      let health_factor = 1.0 - our_portal.members[0].borrow().hp / our_portal.squad_details.hp;
      let enemies_around_factor = (enemies_influence_around_our_portal - our_influence_around_our_portal) * 0.05;
      let place = Place {
        place_type: PlaceType::Portal, // but it doesn't really matter, we are using it only above
        influence: enemies_influence_around_our_portal,
        squads: vec![], // ???
        x: our_portal_x,
        y: our_portal_y,
      };

      purposes.push(EnhancedPurpose {
        purpose_type: PurposeType::PrepareToDefend,
        signification: 1.0 + health_factor + enemies_around_factor,
        place: &place,
      });
    }

    purposes go over all purposes, if value is less than <some very high value, prob will be used only when portal is almost destroyed>
    then check if there are any enemies on the path to the target, or if they are around the target!

    but then enemies which is included in purpose will overlap with enemies around the target...

    purposes
  }

  pub fn work<'a>(
    // make sure that lifetimes are needed
    &mut self,
    factory: Ref<Squad>,
    our_squads: &'a Vec<Rc<RefCell<Squad>>>,
    all_factions_info: &Vec<FactionInfo>,
  ) {
    let new_purposes = self.get_sorted_purposes(factory, all_factions_info);
  }
  //   // let new_purposes = ArtificialIntelligence::collect_new_purposes(factory, texture);

  //   /*====update the current state fo the purpose, if point is captured, is enemy was defeated====*/
  //   let mut curr_state_of_our_army: Vec<EnhancedPurpose<'a>> = self
  //     .purposes
  //     .iter()
  //     .flat_map(|purpose| {
  //       // We assume that rn everything is attack only!
  //       all_squads_ids.retain(|id| !curr_purpose.squads_ids.contains(id));

  //       let (curr_purpose_type, enemy_force, original_purpose_id) = match curr_purpose.purpose_type
  //       {
  //         PurposeType::Attack => {
  //           // TODO: looks like it's tracted as different purposes, when is running, and isntead of one, there is two purposes
  //           let is_still_there_any_enemy = new_purposes.iter().find(|new_purpose| {
  //             (curr_purpose.x - new_purpose.x).hypot(curr_purpose.y - new_purpose.y) < 2.0
  //           });

  //           if is_still_there_any_enemy.is_some() {
  //             let old_purpose = is_still_there_any_enemy.unwrap();
  //             (
  //               PurposeType::Attack,
  //               old_purpose.enemy_influence,
  //               old_purpose.id,
  //             )
  //           } else {
  //             (PurposeType::Nothing, 0.0, -1)
  //           }
  //         }
  //         _ => (PurposeType::Nothing, 0.0, -1),
  //       };

  //       curr_purpose
  //         .squads_ids
  //         .iter()
  //         .filter_map(|squad_id| {
  //           if let Some(squad) = squads.iter().find(|squad| squad.id == *squad_id) {
  //             Some(EnhancedPurpose {
  //               purpose_type: curr_purpose_type.clone(), // not sure if needed
  //               value_of_purpose: ArtificialIntelligence::get_purpose_value(&curr_purpose_type),
  //               enemy_force,
  //               our_power: squad.influence,
  //               squad,
  //               old_purpose_x: curr_purpose.x,
  //               old_purpose_y: curr_purpose.y,
  //               original_purpose_id,
  //             })
  //           } else {
  //             None
  //           }
  //         })
  //         .collect::<Vec<EnhancedPurpose<'a>>>()
  //     })
  //     .collect::<Vec<EnhancedPurpose<'a>>>();

  //   all_squads_ids.into_iter().for_each(|squad_id| {
  //     let squad = squads.iter().find(|squad| squad.id == squad_id).unwrap();
  //     curr_state_of_our_army.push(EnhancedPurpose {
  //       purpose_type: PurposeType::Nothing,
  //       value_of_purpose: ArtificialIntelligence::get_purpose_value(&PurposeType::Nothing),
  //       enemy_force: 0.0,
  //       our_power: squad.influence,
  //       squad,
  //       old_purpose_x: 0.0,
  //       old_purpose_y: 0.0,
  //       original_purpose_id: -1,
  //     });
  //   });
  //   log!("**********************************");
  //   let mut final_purposes = new_purposes
  //     .iter()
  //     .enumerate()
  //     .filter_map(|(index, new_purpose)| {
  //       if curr_state_of_our_army.len() == 0 {
  //         return None;
  //       }

  //       // sort from the worst to the best!!!! that's to use pop()
  //       curr_state_of_our_army.sort_by(|a_army, b_army| {
  //         let a_how_much_is_it_worth =
  //           ArtificialIntelligence::get_how_much_is_it_worth(new_purpose, a_army);
  //         let b_how_much_is_it_worth =
  //           ArtificialIntelligence::get_how_much_is_it_worth(new_purpose, b_army);
  //         (a_how_much_is_it_worth)
  //           .partial_cmp(&b_how_much_is_it_worth)
  //           .unwrap()
  //       });

  //       let mut curr_state_of_our_army_last_index = curr_state_of_our_army.len();
  //       let mut collected_power = 0.0;

  //       while collected_power < new_purpose.enemy_influence {
  //         if curr_state_of_our_army_last_index > 0 {
  //           curr_state_of_our_army_last_index -= 1;
  //           let army = &curr_state_of_our_army[curr_state_of_our_army_last_index];
  //           let is_it_attack = true; // new_purpose == PurposeType::Attack;
  //           // let is_it_attack = army.purpose_type == PurposeType::Attack;
  //           // with those, third squad will go to one enemy squad
  //           // let keep_purpose_factor = if if_its_still_the_same_purpose {
  //           //   1.0
  //           // } else {
  //           //   1.0
  //           // };
  //           let keep_purpose_factor = if is_it_attack {
  //             0.8
  //           } else {
  //             1.2
  //           };
  //           collected_power += new_purpose.value * keep_purpose_factor * army.our_power;
  //           log!("collected_power: {}", collected_power);
  //         } else {
  //           break;
  //         }
  //       }
  //       log!("collected_power in while loop: {}, purpose enemy_influence: {}", collected_power, new_purpose.enemy_influence);
  //       if collected_power > new_purpose.enemy_influence {
  //         let collected_army = curr_state_of_our_army
  //           .drain(curr_state_of_our_army_last_index.max(0) as usize..)
  //           .map(|enhanced_purpose| enhanced_purpose.squad)
  //           .collect::<Vec<&SquadBasicInfo>>();
  //         log!("collected_army.len: {}", collected_army.len());
  //         Some(Purpose {
  //           purpose_type: PurposeType::Attack,
  //           squads_ids: ArtificialIntelligence::get_ids_from_squads(collected_army),
  //           x: new_purpose.x,
  //           y: new_purpose.y,
  //         })
  //       // } else if index != new_purposes.len() - 1 {
  //       //   let next_purpose = &new_purposes[index + 1];
  //       //   if next_purpose.value > new_purpose.value * 0.9 {
  //       //     // let's make the loop for purpose
  //       //     None
  //       //   } else {
  //       //     Some(ArtificialIntelligence::run_to_safe_place(
  //       //       texture,
  //       //       curr_state_of_our_army
  //       //         .drain(..)
  //       //         .collect::<Vec<EnhancedPurpose>>(),
  //       //     ))
  //       //   }
  //       } else {
  //         None
  //       }
  //     })
  //     .collect::<Vec<Purpose>>();
  //   log!(
  //     "rest squads without purpose: {}",
  //     curr_state_of_our_army.len()
  //   );
  //   if curr_state_of_our_army.len() > 0 {
  //     final_purposes.push(ArtificialIntelligence::run_to_safe_place(
  //       texture,
  //       curr_state_of_our_army
  //         .drain(..)
  //         .collect::<Vec<EnhancedPurpose>>(),
  //     ));
  //   }

  //   self.purposes = final_purposes.clone();

  //   final_purposes
  // }
}
