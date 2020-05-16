use super::basic_utils::{BasicUtils, Line, Point};
use crate::id_generator::IdGenerator;
use std::collections::HashMap;
use std::sync::Mutex;

pub static OBSTACLES_LENGTH: [usize; 2] = [4, 5];

// pub static RAW_POINTS: [(f32, f32); 9] = [
//   (600.0, 100.0),
//   (900.0, 100.0),
//   (900.0, 300.0),
//   (600.0, 300.0),
//   // end here
//   (700.0, 400.0),
//   (900.0, 400.0),
//   (900.0, 600.0),
//   (700.0, 600.0),
//   (600.0, 500.0),
//   // end here
// ];

pub struct ObstaclesLazyStatics {}

impl ObstaclesLazyStatics {
  fn insert_lines_to_graph<'a>(
    ref_graph: &mut HashMap<u32, Vec<&'a Point>>,
    point_a: &'a Point,
    point_b: &'a Point,
  ) {
    match ref_graph.get_mut(&point_a.id) {
      Some(connected_points_list) => {
        connected_points_list.push(point_b);
      }
      None => {
        ref_graph.insert(point_a.id, vec![point_b]);
      }
    };
  }

  pub fn all_obstacles_points_handler(option: Option<Vec<(f32, f32)>>) -> &'static Mutex<Vec<(f32, f32)>> {
    lazy_static! {
      static ref ALL_OBSTACLES_POINTS: Mutex<Vec<(f32, f32)>> = {
        Mutex::new(vec![])
      };
    };

    match option {
      Some(data) => {
        *ALL_OBSTACLES_POINTS.lock().unwrap() = data;
      }
      None => {}
    }
    
    // let list = vec![
    //   (600.0, 100.0),
    //   (900.0, 100.0),
    //   (900.0, 300.0),
    //   (600.0, 300.0),
    //   // end here
    //   (700.0, 400.0),
    //   (900.0, 400.0),
    //   (900.0, 600.0),
    //   (700.0, 600.0),
    //   (600.0, 500.0),
    //   // end here
    // ];
    &ALL_OBSTACLES_POINTS
  }

  pub fn unwrap_all_points() -> &'static Vec<(f32, f32)>{
    lazy_static! {
      static ref UNWRAPPED_POINTS: Vec<(f32, f32)> = {
        ObstaclesLazyStatics::all_obstacles_points_handler(None).lock().unwrap().to_vec()
      };
    };
    &UNWRAPPED_POINTS
  }

  pub fn get_obstacles_points() -> &'static Vec<Point> {
    lazy_static! {
      static ref OBSTACLES_POINTS: Vec<Point> = {
        ObstaclesLazyStatics::unwrap_all_points()
          .iter()
          .map(|(x, y)| Point {
            id: IdGenerator::generate_id() as u32,
            x: *x,
            y: *y,
          })
          .collect()
      };
    };
    &OBSTACLES_POINTS
  }

  pub fn get_obstacles_lines() -> &'static Vec<Line<'static>> {
    lazy_static! {
      static ref OBSTACLES_LINES: Vec<Line<'static>> = {
        let obstacles_points = ObstaclesLazyStatics::get_obstacles_points();

        let mut obstacle_index = 0;
        let mut obstacle_start_point_index = 0;

        obstacles_points
          .iter()
          .enumerate()
          .map(|(index, point)| {
            let obstacle_last_point_index =
              obstacle_start_point_index + OBSTACLES_LENGTH[obstacle_index] - 1;
            let connected_point_index = if index == obstacle_last_point_index {
              let prev_obstacle_start_point_index = obstacle_start_point_index;
              obstacle_start_point_index += OBSTACLES_LENGTH[obstacle_index];
              obstacle_index += 1;
              prev_obstacle_start_point_index
            } else {
              index + 1
            };

            Line {
              p1: point,
              p2: &obstacles_points[connected_point_index],
            }
          })
          .collect()
      };
    };
    &OBSTACLES_LINES
  }

  pub fn get_permanent_connection_graph() -> &'static HashMap<u32, Vec<&'static Point>> {
    lazy_static! {
      static ref PERMANENT_CONNECTIONS_GRAPH: HashMap<u32, Vec<&'static Point>> = {
        let obstacles_points = ObstaclesLazyStatics::get_obstacles_points();
        let obstacles_lines = ObstaclesLazyStatics::get_obstacles_lines();

        let mut graph: HashMap<u32, Vec<&Point>> = HashMap::new();

        obstacles_lines.iter().for_each(|line| {
          ObstaclesLazyStatics::insert_lines_to_graph(&mut graph, &line.p1, &line.p2);
          ObstaclesLazyStatics::insert_lines_to_graph(&mut graph, &line.p2, &line.p1);
        });

        let mut obstacle_index = 0;
        let mut obstacle_start_point_index = 0;
        let mut grouped_obstacles_points: Vec<Vec<&Point>> = vec![vec![]];

        obstacles_points
          .iter()
          .enumerate()
          .for_each(|(index, point)| {
            grouped_obstacles_points[obstacle_index].push(point);
            if index == obstacle_start_point_index + OBSTACLES_LENGTH[obstacle_index] - 1 {
              grouped_obstacles_points.push(vec![]);
              obstacle_start_point_index += OBSTACLES_LENGTH[obstacle_index];
              obstacle_index += 1;
            }
          });

          grouped_obstacles_points.iter().enumerate().for_each(|(index_a, obstacle_a)| {
            for index_b in index_a + 1..grouped_obstacles_points.len() {

              let obstacle_b = &grouped_obstacles_points[index_b];
              obstacle_a.iter().for_each(|point_a| {
                obstacle_b.iter().for_each(|point_b| {

                  // ------------START checking intersection-------------------
                  let new_line = Line {
                    p1: point_a,
                    p2: point_b,
                  };
                  let mut is_intersect = false;
                  // this one can be slow, it's called once, jsut for lazy statics
                  obstacles_lines.iter().for_each(|obstacle_line| {
                    if obstacle_line.p1.id != point_a.id
                      && obstacle_line.p1.id != point_b.id
                      && obstacle_line.p2.id != point_a.id
                      && obstacle_line.p2.id != point_b.id
                      && BasicUtils::check_intersection(&new_line, obstacle_line)
                    {
                      is_intersect = true;
                    };
                  });
                  // ------------END checking intersection-------------------

                  if !is_intersect {
                    graph.get_mut(&point_a.id).unwrap().push(&point_b);
                    graph.get_mut(&point_b.id).unwrap().push(&point_a);
                  }
                })
              });

            }
          });

        graph
      };
    };
    &PERMANENT_CONNECTIONS_GRAPH
  }
}
