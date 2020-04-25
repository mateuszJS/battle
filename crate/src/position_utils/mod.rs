pub mod get_obstacle_details;
mod basic_utils;
mod track_utils;

use crate::constants::MATH_PI;
use crate::id_generator::IdGenerator;
use basic_utils::{Point};
use track_utils::TrackUtils;

pub struct PositionUtils {}

impl PositionUtils {
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
