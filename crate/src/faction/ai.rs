use super::{Factory, Squad};
use crate::constants::{INFLUENCE_MAP_SCALE, INFLUENCE_MAP_WIDTH};
use std::cell::RefMut;

enum Plan {
  RunAway, // running away, don't care about enemies nearby until reach the safe place
  Stay, // stay and just wait, to make a bigger group (if you are in range of enemy influence, then go to attack)
  Attack, //
  GoTo, // just go to place, it can be strategic point, it can be attack on portal, attack on enemies, attack to support alliances
        // (if you are in range of enemy influence, then go to attack)
}

pub struct ArtificialIntelligence {
  squads_plans: [Vec<((f32, f32), Vec<u32>)>; 2],
}

impl ArtificialIntelligence {
  pub fn new() -> ArtificialIntelligence {
    ArtificialIntelligence {
      squads_plans: [
        vec![], // RUN_AWAY
        vec![], // STAY
      ],
    }
  }

  fn is_same_targets(p1: (f32, f32), p2: (f32, f32)) -> bool {
    (p1.0 - p2.0).hypot(p1.1 - p2.1) < 10.0
  }

  pub fn work(
    &mut self,
    factory: &Factory,
    squads: Vec<RefMut<Squad>>,
    texture: &Vec<u8>,
    enemy_factories: Vec<(f32, f32)>,
  ) {
    // ) -> [Vec<((f32, f32), Vec<u32>)>; 2] {
    // let armies = vec![
    // ((Plan, f32, f32, u32), (f32, f32) Vec<Squad>)
    // Plan, x, y, squad_id (for attackers) (x of army center, y of army center - to check distance, and army influence)
    // ];

    // let new_squads_plans = [vec![], vec![]];
    let (squads_in_danger, safe_squads): (_, Vec<_>) = squads
      .into_iter()
      // check also if squad is running_away!
      .partition(|squad| ArtificialIntelligence::is_safe_place(squad, texture));
    // units it's army should take care by self about is_safe_place, if have enemy to attack
    if squads_in_danger.len() > 0 {
      let safe_places = ArtificialIntelligence::get_safe_places(&squads_in_danger, factory);
      squads_in_danger.iter().for_each(|squad| {
        let safe_place =
          ArtificialIntelligence::get_nearest_place(squad.shared.center_point, &safe_places);

        // new_squads_plans[0]
        // is_same_targets
        // self.squads_plans.insert(squad.id, (Plan::Run, safe_place));
      });
      // mark squad that they are looking for the safe place (because rn if there will run outside
      // of enemy range, they will be safe enough in their minds, but nto really)
      // can be just status "RUN_TO_SAFE_PLACE", and in each iterator safe place can change
    }

    safe_squads.iter().for_each(|squad| {
      // self.squads_plans.insert(squad.id, (Plan::Stay, (0.0, 0.0)));
    });

    log!(
      "safe: {}, in danger: {}",
      safe_squads.len(),
      squads_in_danger.len()
    );
    // maybe bwe should have anything like running away, just when place is nto safe,
    // then it means that this battle is not to win, so it should be in our aim,
    // so another aim should be given to this squad

    // log!(
    //   "{}, {}, {}, {}",
    //   texture[texture_index],     // influence on plus
    //   texture[texture_index + 1], // influence on minus
    //   texture[texture_index + 2], // vulnerability
    //   texture[texture_index + 3],
    // );

    // to make units more brave, just decrease the factors e.g. Ad.2. influence * 0.7 -> influence * 0.6
    // maybe we should collect all potential important places:
    // 1. Places where we are safe -> our factory, squads, strategic point where is safe_place
    // 2. Places where we need a support -> our factory, squads, strategic point where influence * 0.7 < vulnerability but it 's still safe place
    // 3. Places where we should take a point -> previously known points, only check if is our
    //    and if texture[texture_index + 1] there is lower than our position texture[texture_index]
    // 4. Places where we should attack -> everywhere where our units have go somewhere (attack factory or take a strategic point,
    //    NOT when running away from dangerous place) and got any vulnerability, then attack that enemy
    // let is_safe = texture[texture_index] > 5;
    // self.squads_plans = new_squads_plans & self.squads_plans
  }

  fn get_nearest_place(position: (f32, f32), places: &Vec<(f32, f32)>) -> (f32, f32) {
    let mut min_distance = std::f32::MAX;
    let mut nearest_place: (f32, f32) = places[0];

    places.iter().for_each(|place| {
      let distance = (position.0 - place.0).hypot(position.1 - place.1);
      if distance < min_distance {
        nearest_place = place.clone();
        min_distance = distance;
      }
    });
    nearest_place
  }

  fn get_influence_values<'a>(input_x: f32, input_y: f32, texture: &'a Vec<u8>) -> &'a [u8] {
    let x = (input_x * INFLUENCE_MAP_SCALE).round() as usize;
    let y = (input_y * INFLUENCE_MAP_SCALE).round() as usize;
    let texture_index = INFLUENCE_MAP_WIDTH as usize * 4 * y + x * 4;

    &texture[texture_index..texture_index + 4]
  }

  fn is_safe_place(squad: &RefMut<Squad>, texture: &Vec<u8>) -> bool {
    let squad_position = squad.shared.center_point;
    let influence =
      ArtificialIntelligence::get_influence_values(squad_position.0, squad_position.1, texture);
    influence[0] < influence[2]
  }

  fn get_safe_places(squads: &Vec<RefMut<Squad>>, factory: &Factory) -> Vec<(f32, f32)> {
    let mut safe_places = squads
      .iter()
      .map(|squad| squad.shared.center_point)
      .collect::<Vec<(f32, f32)>>();
    safe_places.push((factory.x, factory.y));
    safe_places
  }

  fn get_important_aims(&self) {
    // check all influences in the places where we control the strategic points, if there is enemy influence

    // then calculate the value, and send or not troops to win!

    // all points which hare not controlled by us, all enemies portals
  }
}
