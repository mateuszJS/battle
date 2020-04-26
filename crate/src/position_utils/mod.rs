pub mod obstacles_lazy_statics;
mod basic_utils;
mod track_utils;

use crate::constants::MATH_PI;
use crate::id_generator::IdGenerator;
use basic_utils::{Point,Line,BasicUtils};
use track_utils::TrackUtils;
use obstacles_lazy_statics::ObstaclesLazyStatics;

pub struct PositionUtils {}

impl PositionUtils {
  fn get_is_point_inside_polygon(point: (u8, u8)) -> bool {
    let p1 = Point { id: 0, x: -1.0, y: -1.0 };
    let p2 = Point { id: 0, x: point.0 as f32, y: point.1 as f32 };
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

                                          B            B/2
                                  ┌───────┴───────┬─────┴─────┐
                                  │               │           │
  y_top = prev_y_top - H ──────── ╳_______________╳           │ ─────┐
                                                   \¸         │      │
                              initial_x              \¸       │      │
                                  ┊                    \¸     │      ├─ H
                                  ┊                      \¸   │      │
                                  ┊                        \¸ │      │
    prev_y_top ───────── ╳________┊________╳                 ╳ ──────┘
                       ¸/░\¸      ┊       ¸\¸                 \¸
                     ¸/░░░░░\     ┊     ¸/   \¸                 \¸
                   ¸/░░░░░░░░\¸   ┊   ¸/       \¸                 \¸
                 ¸/░░░░░░░░░░░░\¸ ┊ ¸/           \¸                 \¸
                /░░░░░░░░░░░░░░░░\┊/               \¸                 \¸
     y:0 ───── ╳┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ╳ ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈╳ ───────── y:0    ╳
               │¯\¸             ¸/┊\¸             ¸/¯│               ¸/
               │   \¸         ¸/  ┊  \¸         ¸/   │             ¸/
               │     \¸     ¸/    ┊    \¸     ¸/     │           ¸/
               │       \¸ ¸/      ┊      \¸ ¸/       │         ¸/
prev_y_bottom ────────── ╳________┊________╳         │       ¸╳
               │                  ┊                  │     ¸/
               │                  ┊                  │   ¸/
  prev_x_left ─┘                  ┊                  └── prev_x_right
                                  x:0                ¸/¯
                                                   ¸/
y_bottom = prev_y_bottom + H ──── ╳_______________╳
*/
  pub fn get_positions_around(
    needed_length: usize,
    center_x: f32,
    center_y: f32,
    multiple_range_factor: i8, // 1, 2, 3...
    triangle_base_width: i8, // B
    triangle_height: i8,
    check_terrain: bool,
  ) -> Vec<(f32, f32)> {
    let prev_x_edge: i8 = (multiple_range_factor - 1) * triangle_base_width;
    let curr_x_edge: i8 = multiple_range_factor * triangle_base_width;

    let mut state: u8 = 0;
    let mut offset_y: i8 = -multiple_range_factor * triangle_height;
    let mut offset_x: i8 = if multiple_range_factor % 2 == 0 { triangle_base_width / 2 } else { 0 };
    let mut mod_offset_x: i8 = triangle_base_width;
    let mut mod_offset_y: i8 = 0;

    let initial_point = (mod_offset_x, offset_y);
    let mut points = vec![];
    if check_terrain {
      if PositionUtils::get_is_point_inside_polygon(initial_point) {
        points.push(initial_point);
      }
    } else {
      points.push(initial_point);
    }

    while points.len() < needed_length && state != 7 {
      offset_x += mod_offset_x;
      offset_y += mod_offset_y;
      
      let point: (i8, f32, f32) = (center_x + offset_x, center_y + offset_y);
      // (id to compare, x, y)
      if check_terrain {
        if PositionUtils::get_is_point_inside_polygon(point) {
          // TODO: check is not exists already in WHOLE positions array
          points.push(point);
        }
      } else {
        // TODO: check is not exists already in WHOLE positions array
        points.push(point);
      }

      if state === 0 && offset_x == prev_x_edge {
        mod_offset_x = triangle_base_width / 2;
        mod_offset_y = triangle_height;
        state = 1;
      }

      if state === 1 && offset_x == curr_x_edge {
        mod_offset_x = -triangle_base_width / 2;
        state = 2;
      }

      if state == 2 && offset_x == prev_x_edge {
        mod_offset_x = -triangle_base_width;
        mod_offset_y = 0;
        state = 3;
      }

      if state == 3 && offset_x == -prev_x_edge {
        mod_offset_x = -triangle_base_width / 2;
        mod_offset_y = -triangle_height;
        state = 4
      }

      if state == 4 && offset_x == -curr_x_edge {
        mod_offset_x = triangle_base_width / 2;
        state = 5;
      }


      if state == 5 && offset_x == -prev_x_edge {
        mod_offset_x = -triangle_base_width;
        mod_offset_y = 0;
        state = 6
      }

      if state == 6 && offset_x == 0 {
        state = 7;
      }
    }
    points.into_iter().map(|(x, y)| { (x as f32, y as f32) }).collect()

    // let mut result: Vec<(f32, f32)> = vec![];
    // let mut radius: f32 = initial_radius;
    // let mut angle: f32 = 0.0;
    // let mut angle_diff =
    //   if radius == 0.0 {
    //     1.5 * MATH_PI
    //   } else {
    //     ((item_size / 2.0) / radius).asin() * 2.0
    //   };

    // while result.len() < needed_length && angle < (2.0 * MATH_PI) - angle_diff {
    //   let x = angle.sin() * radius + x;
    //   let y = -angle.cos() * radius + y;
    //   angle += angle_diff;
    //   if !PositionUtils::get_is_point_inside_polygon(x, y) {
    //     result.push((x, y));
    //   }
    // };
    // result
  }
  pub fn get_positions(needed_length: usize, x: f32, y: f32, item_size: f32, with_checking_terrain: bool) -> Vec<(f32, f32)> {
    let mut multiple_radius: i8 = 1;
    let mut last_visited_result_point_index: usize = 0;
    let mut results: Vec<(f32, f32)> = vec![];
    // TODO: finish algorithm and test with UI, not by adding points to units (hard to detect error)
    while results.len() < needed_length {
      let (center_x, center_y) =
        if results.len() == 0 {
          (x, y)
        } else {
          results[last_visited_result_point_index]
        };
      // NOTE: initial_radius is 0, so cannot divide by zero!
      let positions = PositionUtils::get_positions_around(
        needed_length - results.len(),
        center_x,
        center_y,
        multiple_radius,
        10,
        8,
        true,
      );
      results = [results, positions].concat();
      if last_visited_result_point_index == results.len() - 1 {
        last_visited_result_point_index = 0;
        multiple_radius += 1;
      } else {
        last_visited_result_point_index += 1;
      }
    };
    results
  }
  // pub fn get_positions(length: usize, x: f32, y: f32, item_size: f32, with_checking_terrain: bool) -> Vec<(f32, f32)> {
  //   let mut result: Vec<(f32, f32)> = vec![];
  //   let mut radius: f32 = 0.0;
  //   let mut angle: f32 = 2.0 * MATH_PI + 1.0; // +1 just to make it bigger than 2 * PI
  //   let mut angle_diff = 0.0;
  //   let mut next_time_use_half_angle_diff: bool = false;

  //   let mut i: usize = 0;
  //   while i < length {
  //     let x = angle.sin() * radius + x;
  //     let y = -angle.cos() * radius + y;
  //     if (next_time_use_half_angle_diff) {
  //       angle += angle_diff / 2.0;
  //     } else {
  //       angle += angle_diff;
  //     }
  //     if angle > (2.0 * MATH_PI) - angle_diff {
  //       angle = 0.0;
  //       radius += item_size;
  //       angle_diff = ((item_size / 2.0) / radius).asin() * 2.0;
  //       next_time_use_half_angle_diff = false;
  //     }
  //     if !PositionUtils::get_is_point_inside_polygon(x, y) {
  //       result.push((x, y));
  //       i += 1;
  //       next_time_use_half_angle_diff = false;
  //     } else {
  //       next_time_use_half_angle_diff = true;
  //     }
  //   };
  //   log!("length: {}, result.len(): {}", length, result.len());
  //   result
  // }

  pub fn get_circular_position(length: usize, x: f32, y: f32, item_size: f32) -> Vec<(f32, f32)> {
    let mut result: Vec<(f32, f32)> = vec![(x, y)];
    let mut radius: f32 = item_size;
    let mut angle: f32 = 0.0;
    let mut angle_diff = ((item_size / 2.0) / radius).asin() * 2.0;

    (0..length - 1).for_each(|_| {
      let x = angle.sin() * radius + x;
      let y = -angle.cos() * radius + y;
      angle += angle_diff;
      if angle > (2.0 * MATH_PI) - angle_diff {
        angle = 0.0;
        radius += item_size;
        angle_diff = ((item_size / 2.0) / radius).asin() * 2.0;
      }
      result.push((x, y));
    });

    result
  }

  pub fn get_track(
    source_x: f32,
    source_y: f32,
    destination_x: f32,
    destination_y: f32,
  ) -> Vec<(f32, f32)> {
    let start_point = Point {
      id: IdGenerator::generate_id() as u32,
      x: source_x,
      y: source_y,
    };
    let end_point = Point {
      id: IdGenerator::generate_id() as u32,
      x: destination_x,
      y: destination_y,
    };
    let result = TrackUtils::calculate_track(&start_point, &end_point);
    result.iter().map(|point| (point.x, point.y)).collect()
  }
}
