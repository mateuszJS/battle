use crate::constants::{
  GRID_MAP_HEIGHT, GRID_MAP_WIDTH, THRESHOLD_MAX_UNIT_DISTANCE_FROM_SQUAD_CENTER,
};
use crate::position_utils::PositionUtils;
use crate::squad::Squad;
use crate::squads_grid_manager::{SquadsGrid, SquadsGridManager};
use std::cell::{Ref, RefCell};
use std::rc::{Rc, Weak};

#[derive(PartialEq, Clone)]
pub enum PurposeType {
  Attack,
  // TakeStrategicPoint,
  PrepareToDefend,
  // RunToSafePlace,
  // HelpInDanger,
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

#[derive(Clone)]
pub struct Plan {
  pub purpose_type: PurposeType,
  pub squads_ids: Vec<u32>,
  pub enemy_squads: Vec<Weak<RefCell<Squad>>>,
  pub x: f32,
  pub y: f32,
}

struct KeepPlanHelper {
  index_of_purpose: usize,
  reserved_our_squads_ids: Vec<u32>,
}

struct ReservedSquad {
  reserved_purpose_signification: f32,
  squad_id: u32,
}

struct MetEnemyOnTrack {
  enemy_squads_ids: Vec<u32>,
  enemy_influence: f32,
  our_collected_squads_ids: Vec<u32>,
  our_collected_influence: f32,
}

const RADIUS_OF_DANGER_ZONE_AROUND_THE_PORTAL: f32 = 1000.0; // best would be longest range of the weapon * 2.0

pub struct ArtificialIntelligence {
  pub current_plans: Vec<Plan>,
  faction_id: u32,
  our_power_factor: f32,
}

impl ArtificialIntelligence {
  pub fn new(faction_id: u32) -> ArtificialIntelligence {
    ArtificialIntelligence {
      current_plans: vec![],
      faction_id,
      our_power_factor: 0.8, // lower -> less desperation
    }
  }

  fn get_how_much_is_it_worth(purpose: &EnhancedPurpose, squad: &Ref<Squad>) -> f32 {
    // just to make it bigger, if both squads got the same distance
    let distance_to_purpose = ((purpose.place.x - squad.shared.center_point.0)
      .hypot(purpose.place.y - squad.shared.center_point.1)
      - squad.squad_details.weapon.range)
      .max(0.0);

    -distance_to_purpose / squad.squad_details.movement_speed
  }

  fn get_sorted_purposes<'a>(
    &self,
    our_portal_place: &'a Place,
    all_factions_info: &'a Vec<FactionInfo>,
  ) -> Vec<EnhancedPurpose<'a>> {
    let mut enemies_influence_around_our_portal = 0.0;
    let mut our_influence_around_our_portal = 0.0;
    let mut purposes = vec![];

    all_factions_info.iter().for_each(|faction_info| {
      if faction_info.id == self.faction_id {
        faction_info.places.iter().for_each(|place| {
          match place.place_type {
            PlaceType::Portal => {} // portal defending is done in enemies squads
            PlaceType::Squads => {
              let distance = (place.x - our_portal_place.x).hypot(place.y - our_portal_place.y);
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
              let distance = (place.x - our_portal_place.x).hypot(place.y - our_portal_place.y);
              if distance < RADIUS_OF_DANGER_ZONE_AROUND_THE_PORTAL {
                enemies_influence_around_our_portal += place.influence;
              }
              // call distance to our portal
              // shorter is more important,
              // if enemies are within RADIUS_OF_DANGER_ZONE_AROUND_THE_PORTAL then add it to "enemies_influence_around_our_portal"

              // if is attacking, then higher value and purpose is attack
              (PurposeType::Attack, place.influence * 0.5 - distance * 0.01)
            }
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
      let health_factor = 1.0 - our_portal_place.influence;
      let enemies_around_factor =
        (enemies_influence_around_our_portal - our_influence_around_our_portal) * 0.5;

      purposes.push(EnhancedPurpose {
        purpose_type: PurposeType::PrepareToDefend,
        signification: 1.0 + health_factor + enemies_around_factor,
        place: our_portal_place,
      });
    }

    // purposes go over all purposes, if value is less than <some very high value, prob will be used only when portal is almost destroyed>
    // then check if there are any enemies on the path to the target, or if they are around the target!

    // but then enemies which is included in purpose will overlap with enemies around the target...

    purposes
  }

  fn analyze_current_plans(
    &self,
    new_purposes: &Vec<EnhancedPurpose>,
    our_squads: &Vec<Ref<Squad>>,
  ) -> (Vec<KeepPlanHelper>, Vec<ReservedSquad>) {
    let mut transition_from_current_plan_to_new_plans = vec![];
    let mut reserved_squads_ids = vec![];

    self.current_plans.iter().for_each(|current_plan| {
      let option_new_purpose_index = new_purposes.iter().position(|new_purpose| {
        if new_purpose.purpose_type == current_plan.purpose_type {
          let is_same_position = (new_purpose.place.x - current_plan.x)
            .hypot(new_purpose.place.y - current_plan.y)
            < 2.0 * THRESHOLD_MAX_UNIT_DISTANCE_FROM_SQUAD_CENTER;

          match current_plan.purpose_type {
            PurposeType::Attack => current_plan.enemy_squads.iter().any(|weak_enemy| {
              if let Some(ref_cell_enemy) = weak_enemy.upgrade() {
                let enemy = ref_cell_enemy.borrow();
                new_purpose
                  .place
                  .squads
                  .iter()
                  .any(|squad| squad.borrow().id == enemy.id)
              } else {
                false
              }
            }),
            // PurposeType::RunToSafePlace => is_same_position,
            PurposeType::PrepareToDefend => false, // because rn we are not finishing this!!!
                                                   // TODO: check if is the destination and also if there are any enemy squads still around!
          }
        } else {
          false
        }
      });

      if let Some(new_purpose_index) = option_new_purpose_index {
        let mut already_participating_our_squads_reservation = vec![];
        let already_participating_our_squads = our_squads
          .iter()
          .filter_map(|squad| {
            if current_plan.squads_ids.contains(&squad.id) {
              already_participating_our_squads_reservation.push(ReservedSquad {
                reserved_purpose_signification: new_purposes[new_purpose_index].signification,
                squad_id: squad.id,
              });
              Some(squad.id)
            } else {
              None
            }
          })
          .collect::<Vec<u32>>();

        reserved_squads_ids.append(&mut already_participating_our_squads_reservation);

        transition_from_current_plan_to_new_plans.push(KeepPlanHelper {
          index_of_purpose: new_purpose_index,
          reserved_our_squads_ids: already_participating_our_squads,
        });
      }
    });

    (
      transition_from_current_plan_to_new_plans,
      reserved_squads_ids,
    )
  }

  fn handle_already_involved_purposes(
    our_squads: &mut Vec<Ref<Squad>>,
    existing_plan: &KeepPlanHelper,
    purpose: &EnhancedPurpose,
    our_factory_place: &Place,
  ) -> Plan {
    let mut collected_our_influence = 0.0;

    let reserved_not_stolen_squads_ids = existing_plan
      .reserved_our_squads_ids
      .iter()
      .filter_map(|reserved_our_squad_id| {
        // check if this squad is still free! not taken by more important purpose!
        let option_squad = our_squads
          .iter()
          .find(|free_squads| free_squads.id == *reserved_our_squad_id);

        if let Some(squad) = option_squad {
          collected_our_influence += squad.get_influence();
          Some(squad.id)
        } else {
          None
        }
      })
      .collect::<Vec<u32>>();

    our_squads.retain(|squad| !reserved_not_stolen_squads_ids.contains(&squad.id));

    if collected_our_influence * 1.2 > purpose.place.influence {
      let enemy_squads = purpose
        .place
        .squads
        .iter()
        .map(|ref_cell_squad| Rc::downgrade(ref_cell_squad))
        .collect::<Vec<Weak<RefCell<Squad>>>>();

      Plan {
        purpose_type: purpose.purpose_type.clone(),
        squads_ids: reserved_not_stolen_squads_ids,
        enemy_squads,
        x: purpose.place.x,
        y: purpose.place.y,
      }
    } else {
      // we can check, if enemy is not much bigger, then we can just send some support!
      // TODO: run to safe place
      // or check if some can support!

      Plan {
        purpose_type: PurposeType::PrepareToDefend,
        squads_ids: reserved_not_stolen_squads_ids,
        enemy_squads: vec![],
        x: our_factory_place.x,
        y: our_factory_place.y,
      }
    }
  }

  fn get_enemy_on_track(
    &self,
    purpose: &EnhancedPurpose,
    our_squad: &Ref<Squad>,
    squads_grid: &SquadsGrid,
    our_aim_enemy_squads_ids: &Vec<u32>,
  ) -> Option<(Vec<u32>, f32)> /* (our_influence, enemy_influence) */ {
    let track = PositionUtils::get_track(
      our_squad.shared.center_point.0,
      our_squad.shared.center_point.1,
      purpose.place.x,
      purpose.place.y,
    );

    for (index, point) in track.iter().enumerate() {
      if index == track.len() - 1 {
        break;
      }
      let next_point = &track[index + 1];
      let squads_nearby = SquadsGridManager::get_squads_in_line(
        squads_grid,
        point.0,
        point.1,
        next_point.0,
        next_point.1,
      );

      /*==========CHECK IF THERE ARE ANY ENEMIES AROUND THE POINT============*/
      let mut collected_enemy_influence = 0.0;
      let mut collected_enemy_squads_ids = vec![];
      for some_weak_squad in squads_nearby.iter() {
        if let Some(some_ref_cell_squad) = some_weak_squad.upgrade() {
          let some_squad = some_ref_cell_squad.borrow();
          if some_squad.faction_id != self.faction_id
            && !our_aim_enemy_squads_ids.contains(&some_squad.id)
          {
            collected_enemy_squads_ids.push(some_squad.id);
            collected_enemy_influence += some_squad.get_influence();
          }
        }
      }

      if collected_enemy_squads_ids.len() > 0 {
        return Some((collected_enemy_squads_ids, collected_enemy_influence));
      }
    }
    return None;
  }

  fn handle_new_purposes(
    &self,
    our_squads: &mut Vec<Ref<Squad>>,
    purpose: &EnhancedPurpose,
    reserved_squads_ids: &Vec<ReservedSquad>,
    squads_grid: &SquadsGrid,
  ) -> Option<Plan> {
    our_squads.sort_by(|a_squad, b_squad| {
      let a = ArtificialIntelligence::get_how_much_is_it_worth(&purpose, a_squad);
      let b = ArtificialIntelligence::get_how_much_is_it_worth(&purpose, b_squad);
      (a).partial_cmp(&b).unwrap()
    });

    let mut our_squads_last_index = our_squads.len();
    let mut used_squads_ids = vec![];
    let mut collected_our_influence = 0.0;

    /*
    HANDLE DETECTING IF OUR SQUADS ARE IN DANGER
    1. Go over all enemy squads around our group of squads
    2. Check if they are attacking us! Maybe there are 3 factions in the battle, if we are not attacking by any of rest 2, then why should we run
    */

    let enemy_squads_ids = purpose
      .place
      .squads
      .iter()
      .map(|ref_cell_squad| ref_cell_squad.borrow().id)
      .collect::<Vec<u32>>();

    let mut already_met_enemies: Vec<MetEnemyOnTrack> = vec![];
    // (enemy_squads_ids, our_collected_squads_ids, our_collected_influence)

    while collected_our_influence < purpose.place.influence && our_squads_last_index > 0 {
      our_squads_last_index -= 1;
      let our_squad = &our_squads[our_squads_last_index];
      let cannot_be_stolen = reserved_squads_ids.iter().any(|reserved_squad| {
        reserved_squad.squad_id == our_squad.id
          && reserved_squad.reserved_purpose_signification * 1.15 > purpose.signification
        // check if it's much less important or just little bit less important
      });

      if !cannot_be_stolen {
        // TODO: each purposes should have their own modifier/factor of our influence
        // TODO: also influence should be multiplied by distance, longer distance then smaller influence!

        let option_enemy_on_track =
          self.get_enemy_on_track(purpose, our_squad, squads_grid, &enemy_squads_ids);

        if let Some((enemy_squads_ids, enemy_influence)) = option_enemy_on_track {
          let option_met_enemy = already_met_enemies.iter_mut().find(|met_enemy| {
            enemy_squads_ids
              .iter()
              .any(|enemy_squad_id| met_enemy.enemy_squads_ids.contains(&enemy_squad_id))
          });
          let our_squad_influence = self.our_power_factor * our_squad.get_influence();
          let (mut our_blocked_squads_ids, our_blocked_influence, blocking_enemy_influence) =
            if let Some(met_enemy) = option_met_enemy {
              met_enemy.our_collected_squads_ids.push(our_squad.id);
              met_enemy.our_collected_influence += our_squad_influence;
              (
                &mut met_enemy.our_collected_squads_ids,
                met_enemy.our_collected_influence,
                met_enemy.enemy_influence,
              )
            } else {
              let new_entry = MetEnemyOnTrack {
                enemy_squads_ids,
                enemy_influence,
                our_collected_squads_ids: vec![our_squad.id],
                our_collected_influence: our_squad_influence,
              };
              already_met_enemies.push(new_entry);
              (
                &mut already_met_enemies[0].our_collected_squads_ids,
                our_squad_influence,
                enemy_influence,
              )
            };
          if blocking_enemy_influence <= our_blocked_influence {
            collected_our_influence += our_blocked_influence;
            used_squads_ids.append(&mut our_blocked_squads_ids);
          }
          continue;
        }

        used_squads_ids.push(our_squad.id);
        collected_our_influence += self.our_power_factor * our_squad.get_influence();
      }
    }

    if collected_our_influence >= purpose.place.influence {
      our_squads.retain(|squad| !used_squads_ids.contains(&squad.id));

      let enemy_squads = purpose
        .place
        .squads
        .iter()
        .map(|ref_cell_squad| Rc::downgrade(ref_cell_squad))
        .collect::<Vec<Weak<RefCell<Squad>>>>();

      Some(Plan {
        purpose_type: purpose.purpose_type.clone(),
        squads_ids: used_squads_ids,
        enemy_squads,
        x: purpose.place.x,
        y: purpose.place.y,
      })
    } else {
      None
    }
  }

  fn keep_our_squads_safety(&self, all_factions_info: &Vec<FactionInfo>, squads_grid: &SquadsGrid) {
    let our_faction_info = all_factions_info
      .iter()
      .find(|faction_info| faction_info.id == self.faction_id)
      .unwrap();

    let mut attacking_ours_squads_enemy_influence = 0.0;

    our_faction_info.places.iter().for_each(|place| {
      let squads_nearby = SquadsGridManager::get_squads_in_area(
        squads_grid,
        place.x,
        place.y,
        max_all_weapons_range, // maybe we should make a const or something with it
      );
      let our_squads_ids = place.squads.iter().map(|ref_cell_squad| ref_cell_squad.borrow().id).collect::<Vec<u32>>();
      /*==========CHECK IF THERE ARE ANY ENEMIES AROUND THE POINT============*/
      let mut collected_enemy_influence = 0.0;
      let mut collected_enemy_squads_ids = vec![];
      for some_weak_squad in squads_nearby.iter() {
        if let Some(some_ref_cell_squad) = some_weak_squad.upgrade() {
          let some_squad = some_ref_cell_squad.borrow();
          if some_squad.faction_id != self.faction_id
            && !our_aim_enemy_squads_ids.contains(&some_squad.id) // if squad is in our purpose
            // need purpose here of the enemy
          {
            if let Some(enemy_aim) = some_squad.shared.aim.upgrade() {
              if our_squads_ids.contains(&enemy_aim.borrow().id) {
                attacking_ours_squads_enemy_influence += some_squad.get_influence();
                // not sure if we should calculate it, or just when is it any attack, then make attack against the enemy or run away
              }
            }
          }
        }
      }


      let squads_around = faction_info.places.x
    });


    // pub struct FactionInfo {
    //   pub id: u32,
    //   pub places: Vec<Place>,
    //   pub influence_total: f32,
    // }
    

    // #[derive(Clone)]
    // pub struct Plan {
    //   pub purpose_type: PurposeType,
    //   pub squads_ids: Vec<u32>,
    //   pub enemy_squads: Vec<Weak<RefCell<Squad>>>,
    //   pub x: f32,
    //   pub y: f32,
    // }

    
//   our_faction_info
// let mut our_squads_groups = our_faction_info
//   .places
//   .iter()
//   .map(|place| OurSquadsGroup {
//     squads_ids: place
//       .squads
//       .iter()
//       .map(|ref_cell_squad| ref_cell_squad.borrow().id)
//       .collect::<Vec<u32>>(),
//     x: place.x,
//     y: place.y,
//     destinations: vec![],
//   })
//   .collect::<Vec<OurSquadsGroup>>();
  }

  pub fn work(
    &mut self,
    our_factory_place: &Place,
    our_squads_ref_cells: &Vec<Rc<RefCell<Squad>>>,
    all_factions_info: &Vec<FactionInfo>,
    squads_grid: &SquadsGrid,
  ) -> Vec<Plan> {
    self.keep_our_squads_safety(all_factions_info, squads_grid);

    
    let mut final_purposes: Vec<Plan> = vec![];
    let mut our_squads = our_squads_ref_cells
      .iter()
      .map(|ref_cell_squad| ref_cell_squad.borrow())
      .collect::<Vec<Ref<Squad>>>();
    let new_purposes = self.get_sorted_purposes(&our_factory_place, all_factions_info);
    // TODO: new_purposes we should handle case when there is to safe track from our purpose to our portal

    let (transition_from_current_plan_to_new_plans, reserved_squads_ids) =
      self.analyze_current_plans(&new_purposes, &our_squads);

    for (index, purpose) in new_purposes.iter().enumerate() {
      /*=============CHECKING IF CURRENT PLAN EXISTS IN NEW PURPOSES==================*/
      let option_existing_plan = transition_from_current_plan_to_new_plans
        .iter()
        .find(|transition_plan| transition_plan.index_of_purpose == index);

      if let Some(existing_plan) = option_existing_plan {
        // have to check influence one more, just in case if some squads were stolen
        final_purposes.push(ArtificialIntelligence::handle_already_involved_purposes(
          &mut our_squads,
          &existing_plan,
          purpose,
          our_factory_place,
        ));
        continue;
      }

      if our_squads.len() > 0 {
        let option_new_plan =
          self.handle_new_purposes(&mut our_squads, purpose, &reserved_squads_ids, squads_grid);
        if let Some(new_plan) = option_new_plan {
          final_purposes.push(new_plan)
        }
      }
    }

    if our_squads.len() > 0 {
      // TODO: each squad should go to support, not run away!
      // Can also support nearest strategic point or portal!
      let squads_ids = our_squads
        .iter()
        .map(|squad| squad.id)
        .collect::<Vec<u32>>();

      final_purposes.push(Plan {
        purpose_type: PurposeType::PrepareToDefend,
        squads_ids,
        enemy_squads: vec![],
        x: our_factory_place.x,
        y: our_factory_place.y,
      });
    }

    self.current_plans = final_purposes;

    self.current_plans.clone()
  }
}
