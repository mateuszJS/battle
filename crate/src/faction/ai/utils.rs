use super::{EnhancedPurpose, Plan, PurposeType, ReservedSquad};
use crate::Squad;
use std::cell::Ref;

pub struct AiUtils {}

impl AiUtils {
  pub fn sort_purposes(purposes: &mut Vec<EnhancedPurpose>) {
    purposes.sort_by(|a_purpose, b_purpose| {
      (b_purpose.signification)
        .partial_cmp(&a_purpose.signification)
        .unwrap()
    });
  }
  fn get_corresponding_new_purpose<'a>(
    current_plan: &Plan,
    new_purposes: &'a Vec<EnhancedPurpose>,
  ) -> Option<&'a EnhancedPurpose> {
    match current_plan.purpose_type {
      PurposeType::Attack => new_purposes.iter().find(|new_purpose| {
        if new_purpose.purpose_type == current_plan.purpose_type {
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
        } else {
          false
        }
      }),
      PurposeType::RunToSafePlace => new_purposes.iter().find(|new_purpose| {
        if new_purpose.purpose_type == PurposeType::RunToSafePlace {
          (current_plan.x - new_purpose.place.x).hypot(current_plan.y - new_purpose.place.y) < 1.0
        } else {
          false
        }
      }),
    }
  }

  pub fn get_squads_reservations(
    current_plans: &Vec<Plan>,
    new_purposes: &Vec<EnhancedPurpose>,
    our_squads: &Vec<Ref<Squad>>,
  ) -> Vec<ReservedSquad> {
    current_plans
      .iter()
      .flat_map(|current_plan| {
        let squads_involved_in_current_plan = our_squads
          .iter()
          .filter(|squad| current_plan.squads_ids.contains(&squad.id))
          .collect::<Vec<&Ref<Squad>>>();
        if let Some(corresponding_new_purpose) =
          AiUtils::get_corresponding_new_purpose(current_plan, new_purposes)
        {
          // log!(
          //   "make reservations, signification: {}",
          //   corresponding_new_purpose.signification
          // );
          squads_involved_in_current_plan
            .iter()
            .map(|squad| ReservedSquad {
              purpose_id: corresponding_new_purpose.id,
              purpose_signification: corresponding_new_purpose.signification,
              squad_id: squad.id,
            })
            .collect::<Vec<ReservedSquad>>()
        } else {
          vec![] // this current plan does not exists in our new purposes
        }
      })
      .collect::<Vec<ReservedSquad>>()
  }
}
