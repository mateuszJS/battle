use crate::constants::MATH_PI;
use crate::id_generator::IdGenerator;
use super::basic_utils::{Point,Line,BasicUtils};
use super::obstacles_lazy_statics::ObstaclesLazyStatics;

const NUMBER_OF_PRECALCULATED_OFFSETS: usize = 4;
const TRIANGLE_BASE_WIDTH: i16 = 140;
const TRIANGLE_HEIGHT: i16 = 113;
const UNIT_COHERENCY: f32 = 50.0;

type PositionPoint = (i16, i16);

pub struct CalcPositions {}

impl CalcPositions {
  pub fn get_is_point_inside_polygon((x, y): (i16, i16)) -> bool {
    let p1 = Point { id: 0, x: -1.0, y: -1.0 };
    let p2 = Point { id: 0, x: x as f32, y: y as f32 };
    let line_with_point = Line { p1: &p1, p2: &p2 };
    let obstacles_lines = ObstaclesLazyStatics::get_obstacles_lines();
    let mut number_of_intersections: usize = 0;

    obstacles_lines.iter().for_each(|line| {
      if BasicUtils::check_intersection(&line_with_point, line) {
        number_of_intersections += 1;
      }
    });

    number_of_intersections % 2 == 1
  }

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
      prev_y_top ───────── ╳________┊________╳                   ╳ ──────┘
                        ¸/░\¸      ┊       ¸\¸                   \¸
                      ¸/░░░░░\     ┊     ¸/   \¸                   \¸
                    ¸/░░░░░░░░\¸   ┊   ¸/       \¸                   \¸
                  ¸/░░░░░░░░░░░░\¸ ┊ ¸/           \¸                   \¸
                  /░░░░░░░░░░░░░░░░\┊/               \¸                   \¸
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
    let initial_offset_x: i16 =
      if multiple_range_factor % 2 == 1 {
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
          if !CalcPositions::get_is_point_inside_polygon(point)  {
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
    all_results: &Vec<PositionPoint>
  ) -> Vec<PositionPoint> {

    lazy_static! {
      static ref PRECALCULATED_OFFSETS: [Vec<PositionPoint>; NUMBER_OF_PRECALCULATED_OFFSETS] = {
        let empty_vector = vec![];
        [
          CalcPositions::calculate_hex_circle_position(usize::max_value(), 0, 0, 1, &empty_vector, false),
          CalcPositions::calculate_hex_circle_position(usize::max_value(), 0, 0, 2, &empty_vector, false),
          CalcPositions::calculate_hex_circle_position(usize::max_value(), 0, 0, 3, &empty_vector, false),
          CalcPositions::calculate_hex_circle_position(usize::max_value(), 0, 0, 4, &empty_vector, false),
        ]
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

        if !CalcPositions::get_is_point_inside_polygon(point) && !all_results.contains(&point) {
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

  pub fn calc_units_in_squad_position(number_of_needed_position: usize) -> Vec<(f32, f32)> {
    let mut result: Vec<(f32, f32)> = vec![(0.0, 0.0)];
    let mut radius: f32 = UNIT_COHERENCY;
    let mut angle: f32 = 0.0;
    let mut angle_diff: f32 = ((UNIT_COHERENCY / 2.0) / radius).asin() * 2.0;
    let mut sum_x_positions: f32 = 0.0;
    let mut sum_y_positions: f32 = 0.0;

    (0..number_of_needed_position - 1).for_each(|_| {
      let x = angle.sin() * radius;
      let y = -angle.cos() * radius;
      angle += angle_diff;
      if angle > (2.0 * MATH_PI) - angle_diff {
        angle = 0.0;
        radius += UNIT_COHERENCY;
        angle_diff = ((UNIT_COHERENCY / 2.0) / radius).asin() * 2.0;
      }
      sum_x_positions += x;
      sum_y_positions += y;
      result.push((x, y));
    });

    let center_x: f32 = sum_x_positions / (number_of_needed_position as f32);
    let center_y: f32 = sum_y_positions / (number_of_needed_position as f32);
    result.into_iter().map(|(x, y)| (x - center_x, y - center_y)).collect()
  }
}
