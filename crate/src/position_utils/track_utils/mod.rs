mod a_star;

use super::basic_utils::{BasicUtils, Line, Point};
use super::obstacles_lazy_statics::ObstaclesLazyStatics;
use a_star::AStar;
use std::collections::HashMap;

pub struct TrackUtils {}

impl TrackUtils {
  fn calc_complicated_track<'a>(
    start_point: &'a Point,
    end_point: &'a Point,
    obstacles_points: &'static Vec<Point>,
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
    let obstacles_points = ObstaclesLazyStatics::get_obstacles_points();
    let obstacles_lines = ObstaclesLazyStatics::get_obstacles_lines();
    let permanent_connection_graph = ObstaclesLazyStatics::get_permanent_connection_graph();
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
        obstacles_points,
        obstacles_lines,
        permanent_connection_graph,
      )
    }
  }
}
