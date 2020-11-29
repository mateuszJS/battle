use super::signification_calculator::SignificationCalculator;
use crate::constants::{
  GRID_MAP_HEIGHT, GRID_MAP_WIDTH, THRESHOLD_MAX_UNIT_DISTANCE_FROM_SQUAD_CENTER,
};
use crate::position_utils::PositionUtils;
use crate::squad::Squad;
use crate::squads_grid_manager::{SquadsGrid, SquadsGridManager};
use crate::weapon_types::MAX_POSSIBLE_WEAPON_RANGE;
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

pub struct ReservedSquad {
  pub reserved_purpose_signification: f32,
  squad_id: u32,
  index_of_purpose: usize,
}

struct MetEnemyOnTrack {
  enemy_squads_ids: Vec<u32>,
  enemy_influence: f32,
  our_collected_squads_ids: Vec<u32>,
  our_collected_influence: f32,
}

pub struct OurSquadsGroupSafetyInfo {
  pub collected_enemies_influence_who_attacks_us: f32,
  pub collected_enemies_influence_around: f32,
  collected_enemies_squads_ids_who_attacks_us: Vec<u32>,
  collected_enemies_squads_ids_around: Vec<u32>,
  our_squads_ids: Vec<u32>,
}

pub struct ArtificialIntelligence {
  pub current_plans: Vec<Plan>,
  faction_id: u32,
  signi_calc: SignificationCalculator,
}

impl ArtificialIntelligence {
  pub fn new(faction_id: u32) -> ArtificialIntelligence {
    ArtificialIntelligence {
      current_plans: vec![],
      faction_id,
      signi_calc: SignificationCalculator::new(),
    }
  }

  fn get_purposes<'a>(
    &self,
    our_portal_place: &'a Place,
    all_factions_info: &'a Vec<FactionInfo>,
  ) -> Vec<EnhancedPurpose<'a>> {
    all_factions_info
      .iter()
      .flat_map(|faction_info| {
        if faction_info.id != self.faction_id {
          faction_info
            .places
            .iter()
            .map(|place| {
              let (purpose_type, signification) = match place.place_type {
                PlaceType::Portal => (
                  PurposeType::Attack,
                  self.signi_calc.signification_enemy_portal(),
                ),
                PlaceType::Squads => (
                  PurposeType::Attack,
                  self.signi_calc.signification_enemy_squads(place),
                ),
              };

              EnhancedPurpose {
                purpose_type,
                signification,
                place,
              }
            })
            .collect::<Vec<EnhancedPurpose>>()
        } else {
          vec![]
        }
      })
      .collect::<Vec<EnhancedPurpose>>()
  }

  fn get_index_of_corresponding_new_purpose(
    current_plan: &Plan,
    new_purposes: &Vec<EnhancedPurpose>,
  ) -> Option<usize> {
    new_purposes.iter().position(|new_purpose| {
      if new_purpose.purpose_type == current_plan.purpose_type {
        let is_same_position = (new_purpose.place.x - current_plan.x)
          .hypot(new_purpose.place.y - current_plan.y)
          < 2.0 * THRESHOLD_MAX_UNIT_DISTANCE_FROM_SQUAD_CENTER;

        match current_plan.purpose_type {
          PurposeType::Attack => {
            let new_purpose_enemy_squads_ids = new_purpose
              .place
              .squads
              .iter()
              .map(|squad| squad.borrow().id)
              .collect::<Vec<u32>>();
            current_plan.enemy_squads.iter().any(|weak_enemy| {
              if let Some(ref_cell_enemy) = weak_enemy.upgrade() {
                let enemy = ref_cell_enemy.borrow();
                new_purpose_enemy_squads_ids.contains(&enemy.id)
              } else {
                false
              }
            })
          }
          // PurposeType::RunToSafePlace => is_same_position,
          PurposeType::PrepareToDefend => false, // because rn we are not finishing this!!!
                                                 // TODO: check if is the destination and also if there are any enemy squads still around!
        }
      } else {
        false
      }
    })
  }

  fn get_squads_reservations(
    &self,
    squads_grid: &SquadsGrid,
    new_purposes: &Vec<EnhancedPurpose>,
    our_squads: &Vec<Ref<Squad>>,
  ) -> Vec<ReservedSquad> {
    self
      .current_plans
      .iter()
      .flat_map(|current_plan| {
        if let Some(new_purpose_index) =
          ArtificialIntelligence::get_index_of_corresponding_new_purpose(current_plan, new_purposes)
        {
          our_squads
            .iter()
            .filter_map(|squad| {
              if current_plan.squads_ids.contains(&squad.id) {
                // in this loop main aim is to check if squad exists (still is in our_squads vector),
                // if exists, create reservation
                Some(ReservedSquad {
                  index_of_purpose: new_purpose_index,
                  reserved_purpose_signification: new_purposes[new_purpose_index].signification,
                  squad_id: squad.id,
                })
              } else {
                None
              }
            })
            .collect::<Vec<ReservedSquad>>()
        } else {
          vec![] // this plan does not exists in our new purposes
        }
      })
      .collect::<Vec<ReservedSquad>>()
  }

  fn handle_already_involved_purposes(
    &self,
    our_squads: &mut Vec<Ref<Squad>>,
    squads_reserved_for_this_purpose: &Vec<&ReservedSquad>,
    purpose: &EnhancedPurpose,
    our_factory_place: &Place,
  ) -> Plan {
    let mut collected_our_influence = 0.0;

    let reserved_not_stolen_squads_ids = squads_reserved_for_this_purpose
      .iter()
      .filter_map(|reserved_squad| {
        // check if this squad is still free! not taken by more important purpose!
        let option_squad = our_squads
          .iter()
          .find(|free_squads| free_squads.id == reserved_squad.squad_id);

        if let Some(squad) = option_squad {
          collected_our_influence += self
            .signi_calc
            .influence_squad_already_involved_in_purpose(squad);
          Some(squad.id)
        } else {
          None
        }
      })
      .collect::<Vec<u32>>();

    our_squads.retain(|squad| !reserved_not_stolen_squads_ids.contains(&squad.id));

    if collected_our_influence > purpose.place.influence {
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
      Plan {
        purpose_type: PurposeType::PrepareToDefend,
        squads_ids: reserved_not_stolen_squads_ids,
        enemy_squads: vec![],
        x: our_factory_place.x,
        y: our_factory_place.y,
      }
    }
  }

  fn get_first_enemy_groups_on_track(
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
            collected_enemy_influence += self
              .signi_calc
              .influence_enemy_squad_on_the_track(&some_squad);
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
    squads_reserved_for_this_purpose: &Vec<&ReservedSquad>,
    squads_grid: &SquadsGrid,
  ) -> Option<Plan> {
    our_squads.sort_by(|a_squad, b_squad| {
      let a = self
        .signi_calc
        .how_much_squad_fits_to_take_purpose(&purpose, a_squad);
      let b = self
        .signi_calc
        .how_much_squad_fits_to_take_purpose(&purpose, b_squad);
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
      let option_reserved_squad = squads_reserved_for_this_purpose
        .iter()
        .find(|reserved_squad| reserved_squad.squad_id == our_squad.id);

      let squad_can_be_taken_by_purpose = if let Some(reserved_squad) = option_reserved_squad {
        self
          .signi_calc
          .is_reserved_purpose_much_less_important(reserved_squad, purpose)
      } else {
        true
      };

      if squad_can_be_taken_by_purpose {
        // TODO: each purposes should have their own modifier/factor of our influence
        // TODO: also influence should be multiplied by distance, longer distance then smaller influence!

        //******************** EXTRACT TO ANOTHER FUNCTION
        let option_enemy_on_track =
          self.get_first_enemy_groups_on_track(purpose, our_squad, squads_grid, &enemy_squads_ids);
        if let Some((enemy_squads_ids, enemy_influence)) = option_enemy_on_track {
          // here we are counting how many our sqyads will got enemy on the track
          // if this one particular group of enemy was met a couple of times, and we got
          // enough influence to bet them, then we can use our influence as there is no enemy of the track
          // otherwise, our squads are blocked, and cannot be used in currentry processed purpose ;(
          let option_met_enemy = already_met_enemies.iter_mut().find(|met_enemy| {
            enemy_squads_ids
              .iter()
              .all(|enemy_squad_id| met_enemy.enemy_squads_ids.contains(&enemy_squad_id))
          });

          let our_squad_influence = self.signi_calc.influence_our_squad_new_purpose(our_squad);
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
        //********************
        used_squads_ids.push(our_squad.id);
        collected_our_influence += self.signi_calc.influence_our_squad_new_purpose(our_squad);
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

  fn get_info_about_safety(
    &self,
    all_factions_info: &Vec<FactionInfo>,
    squads_grid: &SquadsGrid,
  ) -> Vec<OurSquadsGroupSafetyInfo> {
    // in params we should get our squads group
    let our_faction_info = all_factions_info
      .iter()
      .find(|faction_info| faction_info.id == self.faction_id)
      .unwrap();

    our_faction_info
      .places
      .iter()
      .flat_map(|place| {
        let threshold_enemies_around = match place.place_type {
          PlaceType::Portal => MAX_POSSIBLE_WEAPON_RANGE * 1.5,
          PlaceType::Squads => MAX_POSSIBLE_WEAPON_RANGE,
        };
        let squads_nearby = SquadsGridManager::get_squads_in_area(
          squads_grid,
          place.x,
          place.y,
          threshold_enemies_around,
        );
        // TODO: handle case when it's portal or our strategic point!
        // then for free strategic point we could just add one more fake faction, which will holds only strategic points!
        let our_squads_ids = place
          .squads
          .iter()
          .map(|ref_cell_squad| ref_cell_squad.borrow().id)
          .collect::<Vec<u32>>();
        let mut collected_enemies_squads_ids_who_attacks_us = vec![];
        let mut collected_enemies_squads_ids_around = vec![];
        let mut collected_enemies_influence_who_attacks_us = 0.0;
        let mut collected_enemies_influence_around = 0.0;
        /*==========CHECK IF THERE ARE ANY ENEMIES AROUND THE POINT============*/

        for some_weak_squad in squads_nearby.iter() {
          if let Some(some_ref_cell_squad) = some_weak_squad.upgrade() {
            let some_squad = some_ref_cell_squad.borrow();
            if some_squad.faction_id != self.faction_id {
              collected_enemies_squads_ids_around.push(some_squad.id);
              collected_enemies_influence_around +=
                self.signi_calc.influence_enemy_squad_around_us(&some_squad);
              if let Some(enemy_aim) = some_squad.shared.aim.upgrade() {
                if our_squads_ids.contains(&enemy_aim.borrow().id) {
                  collected_enemies_squads_ids_who_attacks_us.push(some_squad.id);
                  collected_enemies_influence_who_attacks_us += self
                    .signi_calc
                    .influence_enemy_squad_attacks_us(&some_squad);
                }
              }
            }
          }
        }
        if collected_enemies_squads_ids_around.len() > 0 {
          Some(OurSquadsGroupSafetyInfo {
            collected_enemies_influence_who_attacks_us,
            collected_enemies_influence_around,
            collected_enemies_squads_ids_who_attacks_us,
            collected_enemies_squads_ids_around,
            our_squads_ids,
          })
        } else {
          None
        }
      })
      .collect::<Vec<OurSquadsGroupSafetyInfo>>()
  }

  fn handle_squads_safety<'a>(
    &self,
    our_squads: &Vec<Ref<Squad>>,
    reserved_squads: &mut Vec<ReservedSquad>,
    all_factions_info: &Vec<FactionInfo>,
    squads_grid: &SquadsGrid,
    new_purposes: &mut Vec<EnhancedPurpose<'a>>,
    our_factory_place: &'a Place,
  ) {
    let our_squads_safety = self.get_info_about_safety(all_factions_info, squads_grid);

    our_squads_safety.into_iter().for_each(|safety_info| {
      let mut collected_our_influence = 0.0;
      let mut squads_ids_which_will_react = vec![];
      // log!(
      //   "safety_info.our_squads_ids: {:?}",
      //   safety_info.our_squads_ids
      // );
      // log!(
      //   "our_squads: {:?}",
      //   our_squads
      //     .iter()
      //     .map(|squad| squad.id)
      //     .collect::<Vec<u32>>()
      // );
      safety_info.our_squads_ids.iter().for_each(|squad_id| {
        let option_reserved_squad_index = reserved_squads
          .iter()
          .position(|reserved_squad| reserved_squad.squad_id == *squad_id);

        if option_reserved_squad_index.is_none()
          || self.signi_calc.is_purpose_less_important_than_danger(
            &reserved_squads[option_reserved_squad_index.unwrap()],
            &safety_info,
          )
        // otherwise squads continue doing purposes, don't care about enemy nearby
        {
          let option_our_squad = our_squads.iter().find(|squad| squad.id == *squad_id);
          // TODO: at this point we should remove that item from reservation!
          // and also removed squad id from transition current plans ot new purposes array!
          if let Some(our_squad) = option_our_squad {
            reserved_squads.remove(option_reserved_squad_index.unwrap());
            squads_ids_which_will_react.push(*squad_id);
            collected_our_influence += self
              .signi_calc
              .influence_our_squads_in_danger_situation(our_squad);
          } else {
            // IT"S NOT A SQUAD, IT"S PORTAL, STRATEGIC POINT etc.

            new_purposes.iter_mut().for_each(|new_purpose| {
              // because this is nto a squad, so cannot run away or attack
              // so have to add new purpose to defend that object!
              // this is the only one place when we are adding defend type of purpose
              if new_purpose.purpose_type == PurposeType::Attack {
                new_purpose.signification =
                  new_purpose
                    .place
                    .squads
                    .iter()
                    .fold(0.0, |acc, ref_cell_enemy_squad| {
                      let enemy_squad = ref_cell_enemy_squad.borrow();
                      if safety_info
                        .collected_enemies_squads_ids_who_attacks_us
                        .contains(&enemy_squad.id)
                      {
                        acc + enemy_squad.get_influence() * 0.1
                      } else if safety_info
                        .collected_enemies_squads_ids_around
                        .contains(&enemy_squad.id)
                      {
                        acc + enemy_squad.get_influence() * 0.05
                      } else {
                        acc
                      }
                    });
              }
            });
          }
        }
      });

      if squads_ids_which_will_react.len() > 0 {
        // Portal and strategic point won't get here!

        let purpose_index =
          if collected_our_influence > safety_info.collected_enemies_influence_around {
            new_purposes
              .iter()
              .position(|new_purpose| {
                // TODO: eventually we can sort by distance, to take the closest one
                new_purpose.purpose_type == PurposeType::Attack
                  && new_purpose.place.squads.iter().any(|ref_cell_squad| {
                    safety_info
                      .collected_enemies_squads_ids_around
                      .contains(&ref_cell_squad.borrow().id)
                    // TODO: we should also increase signification on that purpose!!!
                  })
              })
              .unwrap() // let's find first purpose which have even one enemy squad which attack us
                        // we are collecting ALL possible purposes, so ALL enemy squads are included in our purposes

          // TODO: prob we should also increase signification of that enemy, not only reserved our squads!
          } else {
            // TODO: RUN TO SAFE PLACE
            new_purposes.push(EnhancedPurpose {
              purpose_type: PurposeType::PrepareToDefend,
              signification: self.signi_calc.signification_running_to_safe_place(),
              place: our_factory_place,
            });
            new_purposes.len() - 1
          };

        // TODO: add reservation also! It's always should be like when there is transition also there should be reservation!!!
        squads_ids_which_will_react
          .into_iter()
          .for_each(|squad_id| {
            reserved_squads.push(ReservedSquad {
              index_of_purpose: purpose_index,
              reserved_purpose_signification: new_purposes[purpose_index].signification,
              squad_id,
            });
          });
      }
    });
  }

  fn sort_purposes(purposes: &mut Vec<EnhancedPurpose>) {
    purposes.sort_by(|a_purpose, b_purpose| {
      (b_purpose.signification)
        .partial_cmp(&a_purpose.signification)
        .unwrap()
    });
  }

  pub fn work(
    &mut self,
    our_factory_place: &Place,
    our_squads_ref_cells: &Vec<Rc<RefCell<Squad>>>,
    all_factions_info: &Vec<FactionInfo>,
    squads_grid: &SquadsGrid,
  ) -> Vec<Plan> {
    let mut final_purposes: Vec<Plan> = vec![];
    let mut our_squads = our_squads_ref_cells
      .iter()
      .map(|ref_cell_squad| ref_cell_squad.borrow())
      .collect::<Vec<Ref<Squad>>>();

    // Collect Vec<EnhancedPurpose> with enemy squads and optionally our portal defend purpose
    let mut new_purposes = self.get_purposes(&our_factory_place, all_factions_info);

    let mut reserved_squads = self.get_squads_reservations(squads_grid, &new_purposes, &our_squads);

    self.handle_squads_safety(
      &our_squads,
      &mut reserved_squads,
      all_factions_info,
      squads_grid,
      &mut new_purposes,
      our_factory_place,
    );

    ArtificialIntelligence::sort_purposes(&mut new_purposes);

    for (index, purpose) in new_purposes.iter().enumerate() {
      /*=============CHECKING IF CURRENT PLAN EXISTS IN NEW PURPOSES==================*/
      let squads_reserved_for_this_purpose = reserved_squads
        .iter()
        .filter(|reserved_squad| reserved_squad.index_of_purpose == index)
        .collect::<Vec<&ReservedSquad>>();

      if squads_reserved_for_this_purpose.len() > 0 {
        // have to check influence one more, just in case if some squads were stolen
        final_purposes.push(self.handle_already_involved_purposes(
          &mut our_squads,
          &squads_reserved_for_this_purpose,
          purpose,
          our_factory_place,
        ));
        continue;
      }

      if our_squads.len() > 0 {
        // TODO: do we still need this? It should be above? handle_already_involved_purposes
        // also shouldn't be handled if there is no our_squads
        // becuase we are not doign any "hard reservation" like remove from our_squads before loop over all purposes
        let option_new_plan = self.handle_new_purposes(
          &mut our_squads,
          purpose,
          &squads_reserved_for_this_purpose,
          squads_grid,
        );
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
