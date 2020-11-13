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

pub struct Plan {
  pub purpose_type: PurposeType,
  pub squads_ids: Vec<u32>,
  pub enemy_squads: Vec<Weak<RefCell<Squad>>>,
  pub x: f32,
  pub y: f32,
}

const RADIUS_OF_DANGER_ZONE_AROUND_THE_PORTAL: f32 = 1000.0; // best would be longest range of the weapon * 2.0

pub struct ArtificialIntelligence {
  // purposes: Vec<Purpose>,
  faction_id: u32,
  desperation_factor: f32,
}

impl ArtificialIntelligence {
  pub fn new(faction_id: u32) -> ArtificialIntelligence {
    ArtificialIntelligence {
      // purposes: vec![],
      faction_id,
      desperation_factor: 0.8, // lower -> less desperation
    }
  }

  fn get_how_much_is_it_worth(
    purpose: &EnhancedPurpose,
    squad: &Ref<Squad>,
    is_it_same_purpose: bool,
  ) -> f32 {
    // just to make it bigger, if both squads got the same distance
    let keep_same_aim_factor = if is_it_same_purpose { 1.0 } else { 0.0 };
    let distance_to_purpose = ((purpose.place.x - squad.shared.center_point.0)
      .hypot(purpose.place.y - squad.shared.center_point.1)
      - squad.squad_details.weapon.range)
      .max(0.0);

    keep_same_aim_factor - distance_to_purpose / squad.squad_details.movement_speed
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

  fn is_it_current_aim(squad: &Ref<Squad>, purpose: &EnhancedPurpose) -> bool {
    if purpose.purpose_type == PurposeType::Attack {
      if let Some(current_enemy) = squad.shared.aim.upgrade() {
        let current_enemy_position = current_enemy.borrow().shared.center_point;
        purpose
          .place
          .squads
          .iter()
          .find(|ref_cell_squad| {
            let new_enemy_position = ref_cell_squad.borrow().shared.center_point;
            (new_enemy_position.0 - current_enemy_position.0)
              .hypot(new_enemy_position.1 - current_enemy_position.1)
              < THRESHOLD_MAX_UNIT_DISTANCE_FROM_SQUAD_CENTER
          })
          .is_some()
      } else {
        false
      }
    } else {
      false
    }
  }

  pub fn work(
    &mut self,
    our_factory_place: &Place,
    our_squads_ref_cells: &Vec<Rc<RefCell<Squad>>>,
    all_factions_info: &Vec<FactionInfo>,
  ) -> Vec<Plan> {
    let mut final_purposes: Vec<Plan> = vec![];
    let new_purposes = self.get_sorted_purposes(&our_factory_place, all_factions_info);
    let mut our_squads = our_squads_ref_cells
      .iter()
      .map(|ref_cell_squad| ref_cell_squad.borrow())
      .collect::<Vec<Ref<Squad>>>();

    for purpose in new_purposes.into_iter() {
      if our_squads.len() == 0 {
        break;
      }
      our_squads.sort_by(|a_squad, b_squad| {
        let a = ArtificialIntelligence::get_how_much_is_it_worth(
          &purpose,
          a_squad,
          ArtificialIntelligence::is_it_current_aim(a_squad, &purpose),
        );
        let b = ArtificialIntelligence::get_how_much_is_it_worth(
          &purpose,
          b_squad,
          ArtificialIntelligence::is_it_current_aim(b_squad, &purpose),
        );
        (a).partial_cmp(&b).unwrap()
      });

      let mut our_squads_last_index = our_squads.len();
      let mut collected_power = 0.0;

      while collected_power < purpose.place.influence && our_squads_last_index > 0 {
        our_squads_last_index -= 1;
        let our_squad = &our_squads[our_squads_last_index];

        let keep_purpose_factor = if ArtificialIntelligence::is_it_current_aim(our_squad, &purpose)
        {
          1.2 // used only to don't run from enemies when is only little bit stronger
        } else {
          0.8 // used to make sure we are stronger than enemy to attack
              // prob decision if army shoudl run or still fight should be different, and take care also that army is not fighting only with one enemy!
        };

        collected_power += self.desperation_factor * our_squad.get_influence();
      }

      if collected_power >= purpose.place.influence {
        let squads_ids = our_squads
          .drain(our_squads_last_index..)
          .map(|squad| squad.id)
          .collect::<Vec<u32>>();

        let enemy_squads = purpose
          .place
          .squads
          .iter()
          .map(|ref_cell_squad| Rc::downgrade(ref_cell_squad))
          .collect::<Vec<Weak<RefCell<Squad>>>>();

        final_purposes.push(Plan {
          purpose_type: purpose.purpose_type,
          squads_ids,
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

    final_purposes
  }
}
