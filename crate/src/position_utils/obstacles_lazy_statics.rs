use super::basic_utils::{BasicUtils, Line, Point};
use crate::id_generator::IdGenerator;
use std::collections::HashMap;
use std::sync::Mutex;

pub struct ObstaclesLazyStatics {}
pub type ObstaclesList = Vec<Vec<Point>>;

const OBSTACLES_DIVIDER: f32 = -1.0;

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

  pub fn init_and_get_obstacles_handler(option: Option<Vec<f32>>) -> &'static Mutex<ObstaclesList> {
    lazy_static! {
      static ref ALL_OBSTACLES_POINTS: Mutex<ObstaclesList> = { Mutex::new(vec![]) };
    };

    match option {
      Some(obstacles_data) => {
        /* ----------------Start - change Vec<f32> -> Vec<Vec<Point>>------------------ */
        let mut all_obstacles_input: ObstaclesList = vec![vec![]];
        let mut last_obstacle_index = 0;
        let mut i = 0;

        while i < obstacles_data.len() {
          let cell_data = obstacles_data[i];
          if cell_data == OBSTACLES_DIVIDER {
            last_obstacle_index += 1;
            all_obstacles_input.push(vec![]);
            i += 1
          } else {
            all_obstacles_input[last_obstacle_index].push(Point {
              id: IdGenerator::generate_id(),
              x: cell_data,
              y: obstacles_data[i + 1],
            });
            i += 2;
          }
        }

        *ALL_OBSTACLES_POINTS.lock().unwrap() = all_obstacles_input;
        /* ----------------End - change Vec<f32> -> Vec<Vec<Point>>------------------ */
      }
      None => {}
    }

    &ALL_OBSTACLES_POINTS
  }

  pub fn get_obstacles() -> &'static ObstaclesList {
    lazy_static! {
      static ref OBSTACLES_POINTS: ObstaclesList = {
        ObstaclesLazyStatics::init_and_get_obstacles_handler(None)
          .lock()
          .unwrap()
          .to_vec()
      };
    };
    &OBSTACLES_POINTS
  }

  pub fn get_obstacles_points() -> &'static Vec<&'static Point> {
    lazy_static! {
      static ref OBSTACLES_POINTS: Vec<&'static Point> = {
        ObstaclesLazyStatics::get_obstacles()
          .iter()
          .flatten()
          .collect()
      };
    };
    &OBSTACLES_POINTS
  }

  pub fn get_obstacles_lines() -> &'static Vec<Line<'static>> {
    lazy_static! {
      static ref OBSTACLES_LINES: Vec<Line<'static>> = {
        let obstacles = ObstaclesLazyStatics::get_obstacles();

        obstacles
          .iter()
          .flat_map(|points_list: &Vec<Point>| -> Vec<Line<'static>> {
            points_list
              .iter()
              .enumerate()
              .map(|(index, point)| {
                let next_point = &points_list[(index + 1) % points_list.len()];
                Line {
                  p1: point,
                  p2: &next_point,
                }
              })
              .collect()
          })
          .collect()
      };
    };
    &OBSTACLES_LINES
  }

  pub fn get_permanent_connection_graph() -> &'static HashMap<u32, Vec<&'static Point>> {
    lazy_static! {
      static ref PERMANENT_CONNECTIONS_GRAPH: HashMap<u32, Vec<&'static Point>> = {
        let obstacles = ObstaclesLazyStatics::get_obstacles();
        let obstacles_lines = ObstaclesLazyStatics::get_obstacles_lines();

        let mut graph: HashMap<u32, Vec<&Point>> = HashMap::new();

        obstacles_lines.iter().for_each(|line| {
          ObstaclesLazyStatics::insert_lines_to_graph(&mut graph, &line.p1, &line.p2);
          ObstaclesLazyStatics::insert_lines_to_graph(&mut graph, &line.p2, &line.p1);
        });

        obstacles.iter().enumerate().for_each(|(index_a, obstacle_a)| {
          for index_b in index_a + 1..obstacles.len() {

            let obstacle_b = &obstacles[index_b];
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
