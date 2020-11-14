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

struct KeepPlanHelper<'a> {
  index_of_purpose: usize,
  our_squads: Vec<&'a Ref<'a, Squad>>,
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

  // fn is_it_current_aim(squad: &Ref<Squad>, purpose: &EnhancedPurpose) -> bool {
  //   if purpose.purpose_type == PurposeType::Attack {
  //     if let Some(current_enemy) = squad.shared.aim.upgrade() {
  //       let current_enemy_position = current_enemy.borrow().shared.center_point;
  //       purpose
  //         .place
  //         .squads
  //         .iter()
  //         .find(|ref_cell_squad| {
  //           let new_enemy_position = ref_cell_squad.borrow().shared.center_point;
  //           (new_enemy_position.0 - current_enemy_position.0)
  //             .hypot(new_enemy_position.1 - current_enemy_position.1)
  //             < THRESHOLD_MAX_UNIT_DISTANCE_FROM_SQUAD_CENTER
  //         })
  //         .is_some()
  //     } else {
  //       false
  //     }
  //   } else {
  //     false
  //   }
  // }

  fn analyze_current_plans<'a>(
    &self,
    new_purposes: &'a Vec<EnhancedPurpose>,
    our_squads: &'a Vec<Ref<Squad>>,
  ) -> (Vec<KeepPlanHelper<'a>>, Vec<(f32, u32)>) {
    let mut transition_from_current_plan_to_new_plans = vec![];
    let mut reserved_squads_ids = vec![];

    self.current_plans.iter().for_each(|current_plan| {
      let option_new_purpose_index = new_purposes.iter().position(|new_purpose| {
        if new_purpose.purpose_type == current_plan.purpose_type {
          let is_same_position = (new_purpose.place.x - current_plan.x)
            .hypot(new_purpose.place.y - current_plan.y)
            < 2.0 * THRESHOLD_MAX_UNIT_DISTANCE_FROM_SQUAD_CENTER;

          match current_plan.purpose_type {
            PurposeType::Attack => new_purpose
              .place
              .squads
              .iter()
              .any(|squad| current_plan.squads_ids.contains(&squad.borrow().id)),
            PurposeType::PrepareToDefend => is_same_position,
          }
        } else {
          false
        }
      });

      if let Some(new_purpose_index) = option_new_purpose_index {
        let mut already_participating_our_squads_reservation = vec![];
        let already_participating_our_squads = our_squads
          .iter()
          .filter(|squad| {
            if current_plan.squads_ids.contains(&squad.id) {
              already_participating_our_squads_reservation
                .push((new_purposes[new_purpose_index].place.influence, squad.id));
              true
            } else {
              false
            }
          })
          .collect::<Vec<&Ref<Squad>>>();

        reserved_squads_ids.append(&mut already_participating_our_squads_reservation);

        transition_from_current_plan_to_new_plans.push(KeepPlanHelper {
          index_of_purpose: new_purpose_index,
          our_squads: already_participating_our_squads,
        });
      }
    });

    (
      transition_from_current_plan_to_new_plans,
      reserved_squads_ids,
    )
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

    /*=============CHECKING IF CURRENT PLAN EXISTS IN NEW PURPOSES==================*/
    for (index, purpose) in new_purposes.iter().enumerate() {
      let option_existing_plan = transition_from_current_plan_to_new_plans
        .iter()
        .find(|transition_plan| transition_plan.index_of_purpose == index);

      if let Some(existing_plan) = option_existing_plan {
        let mut our_influence = 0.0;
        let our_squads_ids = existing_plan
          .our_squads
          .iter()
          .map(|our_squad| {
            our_influence += our_squad.get_influence();
            our_squad.id
          })
          .collect::<Vec<u32>>();

        if our_influence * 1.2 > purpose.place.influence {
          our_squads.retain(|squad| our_squads_ids.contains(&squad.id));

          // TODO: maybe reserved_squads_ids should look like (signification, squad_id),
          // and the we won't need to find a purpose related with reserved squad

          // TODO: calculate again the influence and needed influence, because some squads could be stolen!!!!!!
          let enemy_squads = purpose
            .place
            .squads
            .iter()
            .map(|ref_cell_squad| Rc::downgrade(ref_cell_squad))
            .collect::<Vec<Weak<RefCell<Squad>>>>();
          final_purposes.push(Plan {
            purpose_type: purpose.purpose_type.clone(),
            squads_ids: our_squads_ids,
            enemy_squads,
            x: purpose.place.x,
            y: purpose.place.y,
          });
        } else {
          // TODO: run to safe place
        }
        continue;
      }

      if our_squads.len() == 0 {
        break;
      }
      our_squads.sort_by(|a_squad, b_squad| {
        let a = ArtificialIntelligence::get_how_much_is_it_worth(&purpose, a_squad);
        let b = ArtificialIntelligence::get_how_much_is_it_worth(&purpose, b_squad);
        (a).partial_cmp(&b).unwrap()
      });

      let mut our_squads_last_index = our_squads.len();
      let mut used_squads_ids = vec![];
      let mut collected_power = 0.0;

      /*
      Here if we will realize, that we need squad which is already taken by other purpose,
      check how that purpose have smaller value than current one, and decide to take that squad or not.
      After taken squad make sure that less important purpose can still be done or not.
      If not (there is not enough our squads), then let's push squads into free squads vector
      */
      while collected_power < purpose.place.influence && our_squads_last_index > 0 {
        // maybe we should do this in totally other way
        // go over lest purposes, ale check if squads should run away, or should stay or need support
        //
        our_squads_last_index -= 1;
        let our_squad = &our_squads[our_squads_last_index];
        let cannot_be_stolen = reserved_squads_ids.iter().any(
          |(reservation_purpose_signification, reservation_squad_id)| {
            *reservation_squad_id == our_squad.id
              && reservation_purpose_signification * 1.15 > purpose.signification
          },
        );

        if !cannot_be_stolen {
          // 1. find purpose where squad were used
          // 2. check if signification of purposes is smaller then current_purpose.signification * 0.9, if yes, then you can steal squad
          // 3. if you can steal squad, go and do it :)

          // it's 1.2 but only when no squad (which previously attacked that purpose) will have different aim!
          // let keep_purpose_factor = if ArtificialIntelligence::is_it_current_aim(our_squad, &purpose)
          // {
          //   1.2 // used only to don't run from enemies when is only little bit stronger
          // } else {
          //   0.8 // used to make sure we are stronger than enemy to attack
          //       // prob decision if army should run or still fight should be different, and take care also that army is not fighting only with one enemy!
          // };
          // TODO: but at this moment when unit will lose some influence, then will run to other purpose :/
          // TODO: each purposes should have their own moficiator/factor of our influence
          // TODO: also influence should be multiplayed by distance, logner distance then smaller influence!
          used_squads_ids.push(our_squad.id);
          collected_power += self.our_power_factor * our_squad.get_influence();
        }
        // TODO: IMPORTANT!!!! but at this moment drain from end to the our_squads_last_index won't work! because we have ommited squad, that is reserved and should stay reserved!!!
        // we should create vector of ids of squads that should be drain/retain!
      }

      if collected_power >= purpose.place.influence {
        our_squads.retain(|squad| used_squads_ids.contains(&squad.id));

        let enemy_squads = purpose
          .place
          .squads
          .iter()
          .map(|ref_cell_squad| Rc::downgrade(ref_cell_squad))
          .collect::<Vec<Weak<RefCell<Squad>>>>();

        final_purposes.push(Plan {
          purpose_type: purpose.purpose_type,
          squads_ids: used_squads_ids,
          enemy_squads,
          x: purpose.place.x,
          y: purpose.place.y,
        });
      }
    }

    if our_squads.len() > 0 {
      let squads_ids = our_squads
        .drain(..)
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
