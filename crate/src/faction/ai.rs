use crate::constants::{
  GRID_MAP_HEIGHT, GRID_MAP_WIDTH, THRESHOLD_MAX_UNIT_DISTANCE_FROM_SQUAD_CENTER,
};
use crate::squad::Squad;
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

  fn handle_new_purposes(
    &self,
    our_squads: &mut Vec<Ref<Squad>>,
    purpose: &EnhancedPurpose,
    reserved_squads_ids: &Vec<ReservedSquad>,

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
        
        /*
          HANDLE IF TRACK TO THE PURPOSE IS SAFE
          1. divide all squads into groups (maybe we can use here somehow already calculated groups in all_factions_info?)
            create vector of points, if any points in that vector is not close enough to squad center, then calculate track do squad center, and also add it to the array!
            Maybe we should also add when we met enemy

            // a) create track for each individual squad (best result!) track
                  | COST: find track for each squad
                  --- but it gives the most precise results!!!
            // b) search neighbors in our_squads, for first selected group add it to vector of groups
                  | COST: find track only one, then always search if squad is close to already figured out track source
                  --- little bit less precise
            // c) search squad in input from ai, with all info about factions
                  | COST: find track once, assign it to the group from factions info, later just check if squad is already, if not, then add
                  --- the lowest precision, but fast, but seems like this is the best option

            // But how are we going to collect all squads in group and compare to enemies on the path???
            // we could do it like, if there is any enemy between our squads group and purpose, then just don't care
            // go ahead, and prob we will find better purpose OR purpose will be to fight with that enemy on that path

            // BUT what in the case if our army is like 10 squads, and between us and purpose is one enemy squad
            // but I think to fix it, we should just spread squads among rest purposes, if there are any squads that left,
            // then add them to support of purpose! In thinking, where squad should support, we should mainly check distance

          2. For each group test if they will meet enemy on the way
            // 2.1 Do it in for loop, take point on the track
            // 2.2 check RADIUS around the point, if there is any enemy
            // 2.3 if not, then check if there is any enemy squad in distance of RADIUS from line
            // 2.4 if there was enemy on the line, then break the loop, return the value
            // 2.5 if there is no enemy, then go to another point, and so on the
            // 2.6 after make whole loop check last destination point in the same way as rest points

          3. If they will, then check if have enough power to handle it, if not, then squad is still free, to take other purpose,
            and like it works rn, if there in way to do the purpose, then support other squad or run to safe place
          4. If there is enemy, and we got enough power, then attack! as a new purpose! (so rn tester purpose need to find another squads)

          but with those 4 points above, we will handle also cases like, when we want to capture strategic point/destroy enemy portal, and there are some enemy squads around
        */
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

  pub fn work(
    &mut self,
    our_factory_place: &Place,
    our_squads_ref_cells: &Vec<Rc<RefCell<Squad>>>,
    all_factions_info: &Vec<FactionInfo>,
  ) -> Vec<Plan> {
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
          self.handle_new_purposes(&mut our_squads, purpose, &reserved_squads_ids);
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
