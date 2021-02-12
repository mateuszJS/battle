use super::basic_utils::{BasicUtils, Line, Point};
use super::obstacles_lazy_statics::ObstaclesLazyStatics;
use crate::constants::{
  MAP_HEIGHT, MAP_WIDTH, MATH_PI, NORMAL_SQUAD_RADIUS, OBSTACLES_CELL_SIZE, OBSTACLES_MAP_HEIGHT,
  OBSTACLES_MAP_SCALE_X, OBSTACLES_MAP_SCALE_Y, OBSTACLES_MAP_WIDTH,
};
use crate::weapon_types::MAX_POSSIBLE_WEAPON_RANGE;

const NUMBER_OF_PRECALCULATED_OFFSETS: usize = 4;
const TRIANGLE_BASE_WIDTH: i16 = 140;
const TRIANGLE_HEIGHT: i16 = 113;
const UNIT_COHERENCY: f32 = 50.0;
const DISTANCE_BETWEEN_ATTACKERS: f32 = 2.0 * NORMAL_SQUAD_RADIUS;
const UNIT_INSIDE_OBSTACLE: u8 = 0;
const SQUAD_INSIDE_OBSTACLE: u8 = 1;
const IS_NOT_IN_OBSTACLE: u8 = 2;
const NUMBER_OF_RANGE_BREAKPOINTS: usize =
  (MAX_POSSIBLE_WEAPON_RANGE / DISTANCE_BETWEEN_ATTACKERS) as usize;

type PositionPoint = (i16, i16);

pub struct CalcPositions {}

impl CalcPositions {
  fn collision_checking(x: i16, y: i16) -> bool {
    let p1 = Point {
      id: 0,
      x: x as f32, // previously was -1.0, but gives random number when lines go though points
      y: -1.0,
    };
    let p2 = Point {
      id: 0,
      x: x as f32,
      y: y as f32,
    };
    let line_with_point = Line { p1: &p1, p2: &p2 };
    let obstacles_lines = ObstaclesLazyStatics::get_obstacles_lines();
    let mut number_of_intersections: usize = 0;

    if p1.x.is_nan() || p1.y.is_nan() || p2.x.is_nan() || p2.y.is_nan() {
      log!(
        "collision_checking: {} - {} - {} - {}",
        p1.x,
        p1.y,
        p2.x,
        p2.y
      );
    }

    obstacles_lines.iter().for_each(|line| {
      if BasicUtils::check_intersection(&line_with_point, line) {
        number_of_intersections += 1;
      }
    });

    number_of_intersections % 2 == 1
  }

  pub fn test((x, y): (i16, i16)) -> u8 {
    let precalculdated_obstacles_map = CalcPositions::get_precalculated_obstacles_map();
    let index = (y as f32 * OBSTACLES_MAP_SCALE_Y) as usize * OBSTACLES_MAP_WIDTH
      + (x as f32 * OBSTACLES_MAP_SCALE_X as f32) as usize;
    let precalculated_value = precalculdated_obstacles_map[index];

    precalculated_value
  }

  fn get_precalculated_obstacles_map() -> &'static Vec<u8> {
    lazy_static! {
      static ref PRECALCULATED_OBSTACLES_MAP: Vec<u8> = {
        let check_cell_corners = [
          (0.0, 0.0),
          (0.0, OBSTACLES_CELL_SIZE),
          (OBSTACLES_CELL_SIZE, OBSTACLES_CELL_SIZE),
          (OBSTACLES_CELL_SIZE, 0.0),
          (OBSTACLES_CELL_SIZE / 2.0, OBSTACLES_CELL_SIZE / 2.0),
        ];

        let check_squad_distance_from_obstacles = (0..16)
          .collect::<Vec<u8>>()
          .into_iter()
          .map(|i| {
            let angle = (i as f32 / 16.0) * (2.0 * MATH_PI);
            (
              (angle.sin() * NORMAL_SQUAD_RADIUS),
              (-angle.cos() * NORMAL_SQUAD_RADIUS),
            )
          })
          .collect::<Vec<(f32, f32)>>();

        (0..OBSTACLES_MAP_WIDTH * OBSTACLES_MAP_HEIGHT)
          .collect::<Vec<usize>>()
          .iter()
          .map(|index| {
            let y = (index / OBSTACLES_MAP_WIDTH) as f32 / OBSTACLES_MAP_SCALE_Y;
            let x = (index % OBSTACLES_MAP_WIDTH) as f32 / OBSTACLES_MAP_SCALE_X;

            let unit_will_collide_with_any_obstacle =
              check_cell_corners.iter().any(|(mod_x, mod_y)| {
                CalcPositions::collision_checking(
                  (x + mod_x).round() as i16,
                  (y + mod_y).round() as i16,
                )
              });

            if unit_will_collide_with_any_obstacle {
              return UNIT_INSIDE_OBSTACLE;
            }

            let squad_will_collide_with_any_obstacle = check_squad_distance_from_obstacles
              .iter()
              .any(|(mod_x, mod_y)| {
                CalcPositions::collision_checking(
                  (x + mod_x).round() as i16,
                  (y + mod_y).round() as i16,
                )
              });

            if squad_will_collide_with_any_obstacle {
              return SQUAD_INSIDE_OBSTACLE;
            }

            return IS_NOT_IN_OBSTACLE;
          })
          .collect::<Vec<u8>>()
      };
    };
    &PRECALCULATED_OBSTACLES_MAP
  }

  pub fn get_is_point_inside_any_obstacle((x, y): (i16, i16), is_squad: bool) -> bool {
    /*=====CHECK IF SQUAD/UNIT IS NOT OUT OF THE MAP======*/
    let boundaries_offset = if is_squad {
      NORMAL_SQUAD_RADIUS as i16
    } else {
      0
    };
    if x < boundaries_offset
      || y < boundaries_offset
      || x >= MAP_WIDTH as i16 - boundaries_offset
      || y >= MAP_HEIGHT as i16 - boundaries_offset
    {
      return true;
    }
    /*=====CHECK IF SQUAD/UNIT IS NOT ON THE OBSTACLES======*/
    let precalculdated_obstacles_map = CalcPositions::get_precalculated_obstacles_map();
    let index = (y as f32 * OBSTACLES_MAP_SCALE_Y) as usize * OBSTACLES_MAP_WIDTH
      + (x as f32 * OBSTACLES_MAP_SCALE_X as f32) as usize;
    let precalculated_value = precalculdated_obstacles_map[index];

    if precalculated_value == IS_NOT_IN_OBSTACLE {
      false
    } else if is_squad {
      // precalculated_value it's not free
      true
    } else if precalculated_value == UNIT_INSIDE_OBSTACLE {
      // it's unit, and precalculated_value not available for unit
      true
    } else {
      // place is not available for squad, but we are checking unit
      false
    }
  }

  // // https://stackoverflow.com/questions/849211/shortest-distance-between-a-point-and-a-line-segment
  // fn shortest_distance_from_point_to_line(
  //   p: (f32, f32),
  //   l1: (f32, f32),
  //   l2: (f32, f32),
  // ) -> (f32, (f32, f32)) {
  //   let A = p.0 - l1.0;
  //   let B = p.1 - l1.1;
  //   let C = l2.0 - l1.0;
  //   let D = l2.1 - l1.1;
  //   let dot = A * C + B * D;
  //   let len_sq = C * C + D * D;
  //   let param = dot / len_sq; // doesn't handle cae when len_sq (line length) is 0
  //   let mut xx = 0.0;
  //   let mut yy = 0.0;
  //   if param < 0.0 {
  //     xx = l1.0;
  //     yy = l1.1;
  //   } else if param > 1.0 {
  //     xx = l2.0;
  //     yy = l2.1;
  //   } else {
  //     xx = l1.0 + param * C;
  //     yy = l1.1 + param * D;
  //   }
  //   let dx = p.0 - xx;
  //   let dy = p.1 - yy;

  //   ((dx * dx + dy * dy).sqrt(), (xx, yy))
  // }

  // pub fn get_nearest_line((x, y): (f32, f32)) -> (f32, (f32, f32)) {
  //   let mut min_distance: f32 = std::f32::MAX;
  //   let obstacles_lines = ObstaclesLazyStatics::get_obstacles_lines();
  //   let mut closest_point = (0.0, 0.0);

  //   obstacles_lines.iter().for_each(|line| {
  //     let (distance, point) = CalcPositions::shortest_distance_from_point_to_line(
  //       (x, y),
  //       (line.p1.x, line.p1.y),
  //       (line.p2.x, line.p2.y),
  //     );
  //     if distance < min_distance {
  //       min_distance = distance;
  //       closest_point = point;
  //     }
  //   });

  //   (min_distance, closest_point)
  // }

  /*
          ¸          ┐
        ¸/░\¸        │
      ¸/░░░░░\¸      ├─ H
    ¸/░░░░░░░░░\¸    │
  ¸/░░░░░░░░░░░░░\¸  │
  ─────────────────  ┘

  └────────┬────────┘
           B

  initial_x is toggling, once it's 0, next time B/2, and again 0, and so on and on

                                           B              B/2
                                   ┌───────┴─────────┬─────┴─────┐
                                   │                 │           │
                                   ╳_________________╳           │ ─────┐
                                                      \¸         │      │
                                  x:0                   \¸       │      │
                                   ┊                      \¸     │      ├─ H
                                   ┊                        \¸   │      │
                                   ┊                          \¸ │      │
      prev_y_top ──────── ╳________┊________╳                   ╳ ──────┘
                        ¸/░\¸      ┊       ¸\¸                   \¸
                      ¸/░░░░░\     ┊     ¸/   \¸                   \¸
                    ¸/░░░░░░░░\¸   ┊   ¸/       \¸                   \¸
                  ¸/░░░░░░░░░░░░\¸ ┊ ¸/           \¸                   \¸
                ¸/░░░░░░░░░░░░░░░░\┊/               \¸                   \¸
      y:0 ───── ╳┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ╳ ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈╳ ───────── y:0      ╳
                │¯\¸             ¸/┊\¸             ¸/¯│                 ¸/│
                │   \¸         ¸/  ┊  \¸         ¸/   │               ¸/  │
                │     \¸     ¸/    ┊    \¸     ¸/     │             ¸/    │
                │       \¸ ¸/      ┊      \¸ ¸/       │           ¸/      │
                │         ╳________┊________╳         │         ¸╳        └── curr_x_edge
                │                  ┊                  │       ¸/
                │                  ┊                  │     ¸/
   prev_x_edge ─┘                  ┊                  └── prev_x_edge
                                  x:0                   ¸/¯
                                                      ¸/
  ╳
  */

  pub fn calculate_hex_circle_position(
    number_of_needed_position: usize,
    center_x: i16,
    center_y: i16,
    multiple_range_factor: i16,
    all_results: &Vec<PositionPoint>,
    check_with_terrain: bool,
  ) -> Vec<PositionPoint> {
    let curr_x_edge: i16 = multiple_range_factor * TRIANGLE_BASE_WIDTH;
    let prev_x_edge: i16 = curr_x_edge / 2;
    let initial_offset_x: i16 = if multiple_range_factor % 2 == 1 {
      -TRIANGLE_BASE_WIDTH / 2
    } else {
      -TRIANGLE_BASE_WIDTH
    };
    let mut state: u8 = 0;
    let mut offset_y: i16 = -multiple_range_factor * TRIANGLE_HEIGHT;
    let mut mod_offset_x: i16 = TRIANGLE_BASE_WIDTH;
    let mut offset_x: i16 = initial_offset_x;
    let mut mod_offset_y: i16 = 0;
    let mut points: Vec<PositionPoint> = vec![];

    while points.len() < number_of_needed_position {
      offset_x += mod_offset_x;
      offset_y += mod_offset_y;

      let point: PositionPoint = (center_x + offset_x, center_y + offset_y);
      if !all_results.contains(&point) {
        if check_with_terrain {
          if !CalcPositions::get_is_point_inside_any_obstacle(point, true) {
            points.push(point);
          }
        } else {
          points.push(point);
        }
      }

      if state == 0 && offset_x == prev_x_edge {
        mod_offset_x = TRIANGLE_BASE_WIDTH / 2;
        mod_offset_y = TRIANGLE_HEIGHT;
        state = 1;
        continue;
      }

      if state == 1 && offset_x == curr_x_edge {
        mod_offset_x = -TRIANGLE_BASE_WIDTH / 2;
        state = 2;
        continue;
      }

      if state == 2 && offset_x == prev_x_edge {
        mod_offset_x = -TRIANGLE_BASE_WIDTH;
        mod_offset_y = 0;
        state = 3;
        continue;
      }

      if state == 3 && offset_x == -prev_x_edge {
        mod_offset_x = -TRIANGLE_BASE_WIDTH / 2;
        mod_offset_y = -TRIANGLE_HEIGHT;
        state = 4;
        continue;
      }

      if state == 4 && offset_x == -curr_x_edge {
        mod_offset_x = TRIANGLE_BASE_WIDTH / 2;
        state = 5;
        continue;
      }

      if state == 5 && offset_x == -prev_x_edge {
        mod_offset_x = TRIANGLE_BASE_WIDTH;
        mod_offset_y = 0;
        state = 6;
        // only when multiple_range_factor <= 2 (because then there is no point between
        // last point and start point,so there is no iterator to go from state 6 -> 7)
        if offset_x >= initial_offset_x {
          break;
        }
        continue;
      }

      if state == 6 && offset_x == initial_offset_x {
        break;
      }
    }

    points
  }

  pub fn get_hex_circle_position(
    number_of_needed_position: usize,
    center_x: i16,
    center_y: i16,
    multiple_range_factor: i16, // 1, 2, 3...
    all_results: &Vec<PositionPoint>,
  ) -> Vec<PositionPoint> {
    lazy_static! {
      static ref PRECALCULATED_OFFSETS: Vec<Vec<PositionPoint>> = {
        let empty_vector = vec![];
        (1..=NUMBER_OF_PRECALCULATED_OFFSETS)
          .map(|i| {
            CalcPositions::calculate_hex_circle_position(
              usize::max_value(),
              0,
              0,
              i as i16,
              &empty_vector,
              false,
            )
          })
          .collect()
      };
    };

    if multiple_range_factor as usize <= NUMBER_OF_PRECALCULATED_OFFSETS {
      let calculated_offsets = &PRECALCULATED_OFFSETS[(multiple_range_factor - 1) as usize];
      let mut points = vec![];
      let mut index = 0;

      while points.len() < number_of_needed_position && index < calculated_offsets.len() {
        let point: PositionPoint = (
          center_x + calculated_offsets[index].0,
          center_y + calculated_offsets[index].1,
        );

        if !CalcPositions::get_is_point_inside_any_obstacle(point, true)
          && !all_results.contains(&point)
        {
          points.push(point);
        }
        index += 1;
      }

      points
    } else {
      CalcPositions::calculate_hex_circle_position(
        number_of_needed_position,
        center_x,
        center_y,
        multiple_range_factor,
        &all_results,
        true,
      )
    }
  }

  pub fn calc_squads_positions(
    number_of_needed_position: usize,
    x: f32,
    y: f32,
  ) -> Vec<PositionPoint> {
    let mut multiple_radius: i16 = 1;
    let mut last_visited_result_point_index: isize = -1;
    let mut results: Vec<PositionPoint> = vec![];

    let initial_point = (x as i16, y as i16);
    if !CalcPositions::get_is_point_inside_any_obstacle(initial_point, true) {
      results.push(initial_point);
      last_visited_result_point_index += 1;
    }

    while results.len() < number_of_needed_position {
      let (center_x, center_y) = if results.len() == 0 {
        initial_point
      } else {
        results[last_visited_result_point_index as usize]
      };

      let positions: Vec<PositionPoint> = CalcPositions::get_hex_circle_position(
        number_of_needed_position - results.len(),
        center_x,
        center_y,
        multiple_radius,
        &results,
      );
      results = [results, positions].concat();

      if last_visited_result_point_index == (results.len() as isize) - 1 {
        if last_visited_result_point_index != -1 {
          last_visited_result_point_index = 0;
        }
        multiple_radius += 1;
      } else {
        last_visited_result_point_index += 1;
      }
    }

    results
  }

  pub fn calc_units_in_squad_position(number_of_needed_position: usize) -> Vec<(f32, f32)> {
    let mut result: Vec<(f32, f32)> = vec![(0.0, 0.0)];
    let mut radius: f32 = UNIT_COHERENCY;
    let mut angle: f32 = 0.0;
    let mut angle_diff: f32 = ((UNIT_COHERENCY / 2.0) / radius).asin() * 2.0;

    let (sum_x_positions, sum_y_positions) =
      (0..number_of_needed_position - 1).fold((0.0, 0.0), |(sum_x, sum_y), _| {
        let x = angle.sin() * radius;
        let y = -angle.cos() * radius;
        angle += angle_diff;
        if angle > (2.0 * MATH_PI) - angle_diff {
          angle = 0.0;
          radius += UNIT_COHERENCY;
          angle_diff = ((UNIT_COHERENCY / 2.0) / radius).asin() * 2.0;
        }
        result.push((x, y));
        (sum_x + x, sum_y + y)
      });

    let center_x: f32 = sum_x_positions / (number_of_needed_position as f32);
    let center_y: f32 = sum_y_positions / (number_of_needed_position as f32);
    result
      .into_iter()
      .map(|(x, y)| (x - center_x, y - center_y))
      .collect()
  }

  pub fn calc_attackers_positions(
    target: (f32, f32),
    source: (f32, f32),
    needed_positions: usize,
    range: f32,
  ) -> Vec<(f32, f32)> {
    lazy_static! {
      static ref PRECALCULATED_ATTACKERS_POSITIONS: Vec<Vec<(f32, f32)>> = {
        (1..=NUMBER_OF_RANGE_BREAKPOINTS).collect::<Vec<usize>>().into_iter().map(|distance_factor| {
          let max_distance = distance_factor as f32 * DISTANCE_BETWEEN_ATTACKERS;
          let mut distance = max_distance;
          let mut positions = vec![];

          while distance > DISTANCE_BETWEEN_ATTACKERS {
            let diff_angle =
              (1.0 - (DISTANCE_BETWEEN_ATTACKERS.powi(2) / (2.0 * distance.powi(2)))).acos();
            let mut multiple_by = 0.0;

            while (multiple_by * diff_angle).abs() < MATH_PI - diff_angle / 2.0 {
              let angle = multiple_by * diff_angle;
              positions.push((angle, distance));

              if multiple_by > 0.0 {
                multiple_by = -multiple_by;
              } else {
                multiple_by = 1.0 - multiple_by;
              }
            }
            distance -= DISTANCE_BETWEEN_ATTACKERS;
          }

          positions.sort_by(|a, b| {
            let a_x = a.0.sin() * a.1;
            let a_y = -a.0.cos() * a.1;
            let b_x = b.0.sin() * b.1;
            let b_y = -b.0.cos() * b.1;
            let a_dis = (a_x).hypot(a_y + max_distance); // a_y - (-ATTACKERS_DISTANCE)
            let b_dis = (b_x).hypot(b_y + max_distance);
            (a_dis).partial_cmp(&b_dis).unwrap()
          });

          positions
        }).collect()
      };
    };
    let breakpoint = (range / DISTANCE_BETWEEN_ATTACKERS) as usize - 1;
    let precalculated_positions = &PRECALCULATED_ATTACKERS_POSITIONS[breakpoint];
    let precalculated_positions_number = precalculated_positions.len();
    let mut result = vec![];
    let mut position_index = 0;
    let angle_from_target = (source.0 - target.0).atan2(target.1 - source.1);

    while result.len() < needed_positions {
      let (angle, distance) = precalculated_positions[position_index];
      let real_position = (
        (angle_from_target + angle).sin() * distance + target.0,
        -(angle_from_target + angle).cos() * distance + target.1,
      );
      if !CalcPositions::get_is_point_inside_any_obstacle(
        (real_position.0 as i16, real_position.1 as i16),
        true,
      ) {
        result.push(real_position);
      }
      position_index = (position_index + 1) % precalculated_positions_number;
    }
    result
  }
}
