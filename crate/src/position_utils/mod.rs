pub mod get_lazy_statics;
mod basic_utils;
mod algorithm_utils;

use crate::constants::MATH_PI;
use crate::id_generator::IdGenerator;
use std::collections::HashMap;
use get_lazy_statics::GetLazyStatics;
use basic_utils::{Point,Line,BasicUtils};
use algorithm_utils::AlgorithmUtils;


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

  fn calculate_track<'a>(
    start_point: &'a Point,
    end_point: &'a Point,
    obstacles_points: &'a Vec<Point>,
    obstacles_lines: &'a Vec<Line<'static>>,
    permanent_connection_graph: &'a HashMap<u32, Vec<&'static Point>>
  ) -> Vec<&'a Point> {
    let mut graph = permanent_connection_graph.clone();
    
    graph.insert(start_point.id, vec![]);

    [&start_point, &end_point].iter().for_each(|track_point| {
      obstacles_points.iter().for_each(|obstacle_point| {
        let new_line = Line {
          p1: track_point,
          p2: obstacle_point,
        };
        let mut is_intersect = false;
        obstacles_lines.iter().for_each(|obstacle_line| {
          if obstacle_line.p1.id != obstacle_point.id
            && obstacle_line.p2.id != obstacle_point.id
            && BasicUtils::check_intersection(&new_line, obstacle_line)
          {
            is_intersect = true;
          };
        });
        if !is_intersect {
          if graph.contains_key(&track_point.id) {
            let graph_item = graph.get_mut(&track_point.id).unwrap();
            graph_item.push(&obstacle_point);
          } else {
            let graph_item = graph.get_mut(&obstacle_point.id).unwrap();
            graph_item.push(&track_point);
          }
        }
      });
    });

    AlgorithmUtils::shortest_path(graph, &start_point, &end_point)
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

    lazy_static! {
      static ref OBSTACLES_POINTS: Vec<Point> = {
        GetLazyStatics::get_obstacles_points()
      };
      static ref OBSTACLES_LINES: Vec<Line<'static>> = {
        GetLazyStatics::get_obstacles_lines(&OBSTACLES_POINTS)
      };
      static ref PERMANENT_CONNECTIONS_GRAPH: HashMap<u32, Vec<&'static Point>> = {
        GetLazyStatics::get_permanent_connection_graph(&OBSTACLES_POINTS, &OBSTACLES_LINES)
      };
    }

    let direct_connection_line = Line {
      p1: &start_point,
      p2: &end_point,
    };
    let mut is_possible_direct_connection = true;
    OBSTACLES_LINES.iter().for_each(|obstacle_line| {
      if BasicUtils::check_intersection(&direct_connection_line, obstacle_line) {
        is_possible_direct_connection = false;
      };
    });

    let result: Vec<&Point> = if is_possible_direct_connection {
      vec![&start_point, &end_point]
    } else {
      PositionUtils::calculate_track(
        &start_point,
        &end_point,
        &OBSTACLES_POINTS,
        &OBSTACLES_LINES,
        &PERMANENT_CONNECTIONS_GRAPH,
      )
    };
    result.iter().map(|point| (point.x, point.y)).collect()
  }
}
