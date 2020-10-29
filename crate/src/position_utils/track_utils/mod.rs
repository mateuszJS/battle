mod a_star;

use super::basic_utils::{BasicUtils, Line, Point};
use super::obstacles_lazy_statics::ObstaclesLazyStatics;
use super::CalcPositions;
use crate::constants::{MATH_PI, NORMAL_SQUAD_RADIUS};
use a_star::AStar;
use std::collections::HashMap;

pub struct TrackUtils {}

impl TrackUtils {
  fn calc_complicated_track<'a>(
    start_point: &'a Point,
    end_point: &'a Point,
    obstacles_points: &'static Vec<&'static Point>,
    obstacles_lines: &'static Vec<Line<'static>>,
    permanent_connection_graph: &'static HashMap<u32, Vec<&'static Point>>,
  ) -> Vec<&'a Point> {
    let mut graph = permanent_connection_graph.clone();
    graph.insert(start_point.id, vec![]);

    [&start_point, &end_point].iter().for_each(|track_point| {
      obstacles_points.iter().for_each(|obstacle_point| {
        // ------------START checking intersection-------------------
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
        // ------------end checking intersection-------------------
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

    AStar::shortest_path(graph, &start_point, &end_point)
  }

  pub fn calculate_track<'a>(start_point: &'a Point, end_point: &'a Point) -> Vec<&'a Point> {
    let obstacles_lines = ObstaclesLazyStatics::get_obstacles_lines();
    // ------------START checking intersection-------------------
    let direct_connection_line = Line {
      p1: start_point,
      p2: end_point,
    };
    let mut is_possible_direct_connection = true;
    obstacles_lines.iter().for_each(|obstacle_line| {
      if BasicUtils::check_intersection(&direct_connection_line, obstacle_line) {
        is_possible_direct_connection = false;
      };
    });
    // ------------END checking intersection-------------------
    if is_possible_direct_connection {
      vec![start_point, end_point]
    } else {
      TrackUtils::calc_complicated_track(
        start_point,
        end_point,
        ObstaclesLazyStatics::get_obstacles_points(),
        obstacles_lines,
        ObstaclesLazyStatics::get_permanent_connection_graph(),
      )
    }
  }

  pub fn shift_track_from_obstacles<'a>(track: Vec<&'a Point>) -> Vec<(f32, f32)> {
    let last_index = track.len() - 1;

    track
      .iter()
      .enumerate()
      .map(|(index, point)| {
        if index == 0 || index == last_index {
          /*
          1. find the nearest line
          2. check if distance to the nearest line is less than NORMAL_SQUAD_RADIUS
          3. if is less, then move point away by (NORMAL_SQUAD_RADIUS - distance)
          */
          (point.x, point.y)
        } else {
          let previous_point = track[index - 1];
          let next_point = track[index + 1];

          let from_previous_point_angle =
            (point.x - previous_point.x).atan2(previous_point.y - point.y);
          let from_next_point_angle = (point.x - next_point.x).atan2(next_point.y - point.y);

          if (from_previous_point_angle - from_next_point_angle).abs() % MATH_PI
            <= std::f32::EPSILON
          {
            // straight line
            // in this case it's impossible to figure out, on
            // which site are obstacles (if are even on one site)
            // so we have to check manually
            let angle = from_previous_point_angle + MATH_PI / 2.0;
            let maybe_correct_point = (
              (angle.sin() * NORMAL_SQUAD_RADIUS + point.x) as i16,
              (-angle.cos() * NORMAL_SQUAD_RADIUS + point.y) as i16,
            );

            if CalcPositions::get_is_point_inside_any_obstacle(
              (maybe_correct_point.0, maybe_correct_point.1),
              false,
            ) {
              let correct_angle = angle + MATH_PI;
              (
                correct_angle.sin() * NORMAL_SQUAD_RADIUS + point.x,
                -correct_angle.cos() * NORMAL_SQUAD_RADIUS + point.y,
              )
            } else {
              (
                angle.sin() * NORMAL_SQUAD_RADIUS + point.x,
                -angle.cos() * NORMAL_SQUAD_RADIUS + point.y,
              )
            }
          } else {
            // https://rosettacode.org/wiki/Averages/Mean_angle#Rust
            let sin_mean = (from_previous_point_angle.sin() + from_next_point_angle.sin()) / 2.0;
            let cos_mean = (from_previous_point_angle.cos() + from_next_point_angle.cos()) / 2.0;
            let mean_angle = sin_mean.atan2(cos_mean);
            (
              mean_angle.sin() * NORMAL_SQUAD_RADIUS + point.x,
              -mean_angle.cos() * NORMAL_SQUAD_RADIUS + point.y,
            )
          }
        }
      })
      .collect()
  }
}
