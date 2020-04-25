use crate::constants::MATH_PI;
use crate::id_generator::IdGenerator;
use std::collections::HashMap;

pub struct Point {
  pub id: u32,
  pub x: f32,
  pub y: f32,
}

pub struct Line<'a> {
  pub p1: &'a Point,
  pub p2: &'a Point,
}

struct QueueItem<'a> {
  point: &'a Point,
  path: Vec<&'a Point>,
  current_length: f32,
  heuristic: f32,
}

pub static OBSTACLES_LENGTH: [usize; 2] = [4, 5];

pub static RAW_POINTS: [(f32, f32); 9] = [
  (600.0, 100.0),
  (900.0, 100.0),
  (900.0, 300.0),
  (600.0, 300.0),
  // end here
  (700.0, 400.0),
  (900.0, 400.0),
  (900.0, 600.0),
  (700.0, 600.0),
  (600.0, 500.0),
  // end here
];

pub struct Utils {}

impl Utils {
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

  pub fn calculate_graph(track_boundaries: [Point; 2]) -> Vec<(f32, f32)> {
    lazy_static! {
      static ref OBSTACLES_POINTS: Vec<Point> = {
        RAW_POINTS
          .iter()
          .map(|(x, y)| Point {
            id: IdGenerator::generate_id() as u32,
            x: *x,
            y: *y,
          })
          .collect()
      };
      static ref OBSTACLES_LINES: Vec<Line<'static>> = {
        let mut obstacle_index = 0;
        let mut obstacle_start_point_index = 0;

        OBSTACLES_POINTS
          .iter()
          .enumerate()
          .map(|(index, point)| {
            let connected_point_index = if index == obstacle_start_point_index + OBSTACLES_LENGTH[obstacle_index] - 1 {
              let copy = obstacle_start_point_index.clone();
              obstacle_start_point_index += OBSTACLES_LENGTH[obstacle_index];
              obstacle_index += 1;
              copy
            } else {
              index + 1
            };
            Line {
              p1: point,
              p2: &OBSTACLES_POINTS[connected_point_index],
            }
          })
          .collect()

        // let last_index = OBSTACLES_POINTS.len() - 1;
        // OBSTACLES_POINTS
        //   .iter()
        //   .enumerate()
        //   .map(|(index, point)| {
        //     let connected_point_index = if index == last_index { 0 } else { index + 1 };
        //     Line {
        //       p1: point,
        //       p2: &OBSTACLES_POINTS[connected_point_index],
        //     }
        //   })
        //   .collect()
      };
      static ref GRAPH: HashMap<u32, Vec<&'static Point>> = {
        let mut graph: HashMap<u32, Vec<&Point>> = HashMap::new();
        OBSTACLES_LINES.iter().for_each(|line| {
          let point_a = graph.get_mut(&line.p1.id);
          match point_a {
            Some(connected_points_list) => {
              connected_points_list.push(&line.p2);
            }
            None => {
              graph.insert(line.p1.id, vec![&line.p2]);
            }
          };
          let point_b = graph.get_mut(&line.p2.id);
          match point_b {
            Some(connected_points_list) => {
              connected_points_list.push(&line.p1);
            }
            None => {
              graph.insert(line.p2.id, vec![&line.p1]);
            }
          };
        });



        let mut obstacle_index = 0;
        let mut obstacle_start_point_index = 0;
        let mut grouped_obstacles_points: Vec<Vec<&Point>> = vec![vec![]];

        OBSTACLES_POINTS
          .iter()
          .enumerate()
          .for_each(|(index, point)| {
            if index == obstacle_start_point_index + OBSTACLES_LENGTH[obstacle_index] - 1 {
              grouped_obstacles_points[obstacle_index].push(point);
              grouped_obstacles_points.push(vec![]);
              obstacle_start_point_index += OBSTACLES_LENGTH[obstacle_index];
              obstacle_index += 1;
            } else {
              grouped_obstacles_points[obstacle_index].push(point);
            };
          });

          grouped_obstacles_points.iter().enumerate().for_each(|(index_a, obstacle_a)| {
            for index_b in index_a + 1..grouped_obstacles_points.len() {

              let obstacle_b = &grouped_obstacles_points[index_b];
              obstacle_a.iter().for_each(|point_a| {
                obstacle_b.iter().for_each(|point_b| {

                  let new_line = Line {
                    p1: point_a,
                    p2: point_b,
                  };
                  let mut is_intersect = false;
                  OBSTACLES_LINES.iter().for_each(|obstacle_line| {
                    if obstacle_line.p1.id != point_a.id
                      && obstacle_line.p1.id != point_b.id
                      && obstacle_line.p2.id != point_a.id
                      && obstacle_line.p2.id != point_b.id
                      && Utils::check_intersection(&new_line, obstacle_line)
                    {
                      is_intersect = true;
                    };
                  });

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
    }

    let direct_connection_line = Line {
      p1: &track_boundaries[0],
      p2: &track_boundaries[1],
    };
    let mut is_possible_direct_connection = true;
    OBSTACLES_LINES.iter().for_each(|obstacle_line| {
      if Utils::check_intersection(&direct_connection_line, obstacle_line) {
        is_possible_direct_connection = false;
      };
    });

    let mut graph = GRAPH.clone();
    
    graph.insert(track_boundaries[0].id, vec![]);

    let result: Vec<&Point> = if is_possible_direct_connection {
      vec![&track_boundaries[0], &track_boundaries[1]]
    } else {
      track_boundaries.iter().for_each(|track_point| {
        OBSTACLES_POINTS.iter().for_each(|obstacle_point| {
          let new_line = Line {
            p1: track_point,
            p2: obstacle_point,
          };
          let mut is_intersect = false;
          OBSTACLES_LINES.iter().for_each(|obstacle_line| {
            if obstacle_line.p1.id != obstacle_point.id
              && obstacle_line.p2.id != obstacle_point.id
              && Utils::check_intersection(&new_line, obstacle_line)
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

      Utils::shortest_path(graph, &track_boundaries[0], &track_boundaries[1])
    };
    result.iter().map(|point| (point.x, point.y)).collect()
  }

  pub fn get_graph(
    source_x: f32,
    source_y: f32,
    destination_x: f32,
    destination_y: f32,
  ) -> Vec<(f32, f32)> {
    let track_boundaries: [Point; 2] = [
      Point {
        id: IdGenerator::generate_id() as u32,
        x: source_x,
        y: source_y,
      },
      Point {
        id: IdGenerator::generate_id() as u32,
        x: destination_x,
        y: destination_y,
      },
    ];

    Utils::calculate_graph(track_boundaries)
  }

  // https://www.tutorialspoint.com/Check-if-two-line-segments-intersect
  // fn on_line(line: &Line, point: &Point) -> bool {
  //   //check whether p is on the line or not
  //   point.x <= line.p1.x.max(line.p2.x)
  //     && point.x <= line.p1.x.min(line.p2.x)
  //     && (point.y <= line.p1.y.max(line.p2.y) && point.y <= line.p1.y.min(line.p2.y))
  // }

  fn direction(a: &Point, b: &Point, c: &Point) -> u8 {
    let val: f32 = (b.y - a.y) * (c.x - b.x) - (b.x - a.x) * (c.y - b.y);
    if val == 0.0 {
      0 //colinear
    } else if val < 0.0 {
      2 //anti-clockwise direction
    } else {
      1 //clockwise direction
    }
  }
  // deploy#2020-04-07T12:39:12.760Z
  // site#a859e1fe-7f91-4bef-a5b9-ff6072dacfdf
  fn check_intersection(l1: &Line, l2: &Line) -> bool {
    let dir1: u8 = Utils::direction(l1.p1, l1.p2, l2.p1);
    let dir2: u8 = Utils::direction(l1.p1, l1.p2, l2.p2);
    let dir3: u8 = Utils::direction(l2.p1, l2.p2, l1.p1);
    let dir4: u8 = Utils::direction(l2.p1, l2.p2, l1.p2);
    if dir1 != dir2 && dir3 != dir4 {
      true //they are intersecting
           // } else if dir1 == 0 && Utils::on_line(l1, l2.p2) {
           //   //when p2 of line2 are on the line1
           //   true
           // } else if dir2 == 0 && Utils::on_line(l1, l2.p1) {
           //   //when p1 of line2 are on the line1
           //   true
           // } else if dir3 == 0 && Utils::on_line(l2, l1.p2) {
           //   //when p2 of line1 are on the line2
           //   true
           // } else if dir4 == 0 && Utils::on_line(l2, l1.p1) {
           //   //when p1 of line1 are on the line2
           //   true
    } else {
      false
    }
  }

  fn get_sorted_index(list: &Vec<QueueItem>, value: f32) -> usize {
    let mut low: usize = 0;
    let mut high: usize = list.len();

    while low < high {
      let mid: usize = (low + high) >> 1; // should be >>>
      if list[mid].heuristic > value {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    low
  }

  fn shortest_path<'a>(
    graph: HashMap<u32, Vec<&'a Point>>,
    source_node: &'a Point,
    destination_node: &'a Point,
  ) -> Vec<&'a Point> {
    let mut queue: Vec<QueueItem> = vec![QueueItem {
      point: source_node,
      path: vec![source_node],
      current_length: 0.0,
      heuristic: 0.0,
    }];
    log!("shortest_path");
    let mut visited: Vec<&u32> = vec![];
    let mut full_path: Vec<&Point> = vec![];

    while queue.len() > 0 {
      let current_node = queue.pop().unwrap();

      let direct_path_to_destination: bool = graph
        .get(&current_node.point.id)
        .unwrap()
        .iter()
        .any(|point| point.id == destination_node.id);
      if direct_path_to_destination {
        full_path = current_node.path.clone();
        full_path.push(destination_node);
        break;
      }
      visited.push(&current_node.point.id);
      let neighbours = graph.get(&current_node.point.id).unwrap();
      neighbours
        .iter()
        .filter(|neighbour| !visited.contains(&&neighbour.id))
        .for_each(|neighbour| {
          let dist_to_neighbour =
            (neighbour.x - &current_node.point.x).hypot(neighbour.y - &current_node.point.y);
          let current_length = &current_node.current_length + dist_to_neighbour;
          let heuristic = current_length
            + (neighbour.x - destination_node.x).hypot(neighbour.y - destination_node.y);
          let index = Utils::get_sorted_index(&queue, heuristic);
          let mut path = current_node.path.clone();
          path.push(neighbour);
          let new_node = QueueItem {
            point: neighbour,
            path,
            current_length,
            heuristic,
          };
          queue.insert(index, new_node);
        });
    }
    full_path
  }
}
