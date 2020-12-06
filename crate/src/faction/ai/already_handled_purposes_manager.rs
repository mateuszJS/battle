use super::SignificationCalculator;
use super::{EnhancedPurpose, Plan, PurposeType, ReservedSquad};
use crate::Squad;
use std::cell::{Ref, RefCell};
use std::rc::{Rc, Weak};

pub struct AlreadyHandledPurposesManager {}

impl AlreadyHandledPurposesManager {
  pub fn handle_already_involved_purposes(
    signi_calc: &SignificationCalculator,
    our_squads: &mut Vec<Ref<Squad>>,
    squads_reserved_for_this_purpose: &Vec<&ReservedSquad>,
    purpose: &EnhancedPurpose,
  ) -> Option<Plan> {
    let mut collected_our_influence = 0.0;

    let reserved_not_stolen_squads_ids = squads_reserved_for_this_purpose
      .iter()
      .filter_map(|reserved_squad| {
        // check if this squad is still free! not taken by other, more important purpose!
        let option_squad = our_squads
          .iter()
          .find(|free_squads| free_squads.id == reserved_squad.squad_id);

        if let Some(squad) = option_squad {
          collected_our_influence += signi_calc.influence_squad_already_involved_in_purpose(squad);
          Some(squad.id)
        } else {
          None
        }
      })
      .collect::<Vec<u32>>();

    our_squads.retain(|squad| !reserved_not_stolen_squads_ids.contains(&squad.id));

    if purpose.purpose_type == PurposeType::RunToSafePlace
      || collected_our_influence >= purpose.place.influence
    {
      // log!("keep already handled purpose");
      // log!(
      //   "is running to safe place: {}",
      //   purpose.purpose_type == PurposeType::RunToSafePlace
      // );
      // log!("{} >= {}", collected_our_influence, purpose.place.influence);
      let enemy_squads = purpose
        .place
        .squads
        .iter()
        .map(|ref_cell_squad| Rc::downgrade(ref_cell_squad))
        .collect::<Vec<Weak<RefCell<Squad>>>>();
      // log!(
      //   "already handled, create plan, our_squads: {:?}, x: {}, y: {}, enemies: {}",
      //   reserved_not_stolen_squads_ids,
      //   purpose.place.x,
      //   purpose.place.y,
      //   enemy_squads.len(),
      // );
      Some(Plan {
        purpose_type: purpose.purpose_type.clone(),
        squads_ids: reserved_not_stolen_squads_ids,
        enemy_squads,
        x: purpose.place.x,
        y: purpose.place.y,
      })
    } else {
      // log!("drop already handled purpose");
      None
    }
  }
}
