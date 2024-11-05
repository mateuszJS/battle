use super::{DangerPlace, FactionInfo, Place, PlaceType, SignificationCalculator};
use crate::unit::{STATE_CHASING, STATE_SHOOT};
use crate::weapon_types::MAX_POSSIBLE_WEAPON_RANGE;

const SEARCHING_RANGE_ENEMIES_AROUND_SQUAD: f32 = MAX_POSSIBLE_WEAPON_RANGE * 1.5;
const SEARCHING_RANGE_ENEMIES_AROUND_PORTAL: f32 = MAX_POSSIBLE_WEAPON_RANGE * 2.0;
const SEARCHING_RANGE_ENEMIES_AROUND_STRATEGIC_POINT: f32 = MAX_POSSIBLE_WEAPON_RANGE * 1.5;

pub struct SafetyManager {}

impl SafetyManager {
  pub fn get_info_about_safety<'a>(
    our_faction_id: u32,
    all_factions_info: &'a Vec<FactionInfo>,
    signi_calc: &SignificationCalculator,
  ) -> (Vec<&'a Place>, Vec<DangerPlace<'a>>) {
    let our_faction_info = all_factions_info
      .iter()
      .find(|faction_info| faction_info.id == our_faction_id)
      .unwrap();

    let mut danger_places: Vec<DangerPlace> = vec![];
    let mut safe_places: Vec<&Place> = vec![];

    our_faction_info.places.iter().for_each(|our_place| {
      let threshold_enemies_around = match our_place.place_type {
        PlaceType::Portal => SEARCHING_RANGE_ENEMIES_AROUND_PORTAL,
        PlaceType::Squads => SEARCHING_RANGE_ENEMIES_AROUND_SQUAD,
        PlaceType::StrategicPoint => SEARCHING_RANGE_ENEMIES_AROUND_STRATEGIC_POINT,
      };

      let our_squads_ids = our_place
        .squads
        .iter()
        .map(|ref_cell_squad| ref_cell_squad.borrow().id)
        .collect::<Vec<u32>>();

      let mut no_enemy_squads_around_our_place = true;

      all_factions_info.iter().for_each(|faction_info| {
        if faction_info.id != our_faction_id {
          faction_info.places.iter().for_each(|enemy_place| {
            if enemy_place.place_type != PlaceType::Squads {
              return;
            }

            let distance_our_place_to_enemy_place =
              (our_place.x - enemy_place.x).hypot(our_place.y - enemy_place.y);
            if distance_our_place_to_enemy_place > threshold_enemies_around {
              return;
            }

            no_enemy_squads_around_our_place = false;

            let is_attacking_us = enemy_place.squads.iter().any(|ref_cell_enemy_squad| {
              let enemy_squad = ref_cell_enemy_squad.borrow();

              let option_enemy_aim = if enemy_squad.shared.aim.upgrade().is_some() {
                enemy_squad.shared.aim.upgrade()
              } else {
                enemy_squad.shared.secondary_aim.upgrade()
              };

              if let Some(enemy_aim) = option_enemy_aim {
                if our_squads_ids.contains(&enemy_aim.borrow().id) {
                  enemy_squad.members.iter().any(|ref_cell_unit| {
                    let state = ref_cell_unit.borrow().state;
                    state == STATE_SHOOT || state == STATE_CHASING
                  })
                } else {
                  false
                }
              } else {
                false
              }
            });

            let additional_signification = match our_place.place_type {
              PlaceType::Squads => signi_calc
                .additional_signification_enemy_place_around_our_squad(
                  distance_our_place_to_enemy_place,
                  threshold_enemies_around,
                  is_attacking_us,
                ),
              PlaceType::Portal => signi_calc
                .additional_signification_enemy_place_around_our_portal(
                  distance_our_place_to_enemy_place,
                  threshold_enemies_around,
                  is_attacking_us,
                ),
              PlaceType::StrategicPoint => signi_calc
                .additional_signification_enemy_place_around_our_strategic_point(
                  distance_our_place_to_enemy_place,
                  threshold_enemies_around,
                ),
            };

            let already_existing_danger_place = danger_places
              .iter_mut()
              .find(|danger_place| danger_place.enemy_place.id == enemy_place.id);

            if let Some(danger_place) = already_existing_danger_place {
              danger_place.our_places.push(our_place);
              if danger_place.additional_signification < additional_signification {
                danger_place.additional_signification = additional_signification
              }
              if !danger_place.is_attacking_us {
                danger_place.is_attacking_us = true;
              }
            } else {
              danger_places.push(DangerPlace {
                enemy_place,
                additional_signification,
                our_places: vec![our_place],
                is_attacking_us,
              })
            }
          })
        }
      });
      if (no_enemy_squads_around_our_place && our_place.place_type == PlaceType::StrategicPoint)
        || our_place.place_type == PlaceType::Portal
      // that's to that, there is always at least one safe place, our portal
      {
        // no danger places related with this place!
        safe_places.push(our_place);
      }
    });

    (safe_places, danger_places)
  }
}
