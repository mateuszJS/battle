use crate::constants::MATH_PI;
use crate::id_generator::IdGenerator;
use crate::squad::Squad;
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
  parent: &'a Point,
  current_length: f32,
  heuristic: f32,
}

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

  // fn is_point_inside_polygon(rect: &[4; Point], point: Point) -> bool {
  //   is_point_inside_triangle([react[0], react[1], react[2]], point]) ||
  //   is_point_inside_triangle([react[2], react[3], react[0]], point])
  // }

  pub fn calculate_graph(
    track_boundaries: [Point; 2],
    obstalces_points: &Vec<Point>,
    obtacles_lines: Vec<Line>,
    result: &mut Vec<Line>,
  ) -> Vec<f32> {
    let mut result: Vec<Line> = vec![];
    let direct_connection_line = Line {
      p1: &track_boundaries[0],
      p2: &track_boundaries[1],
    };
    let mut is_possible_direct_connection = true;
    obtacles_lines.iter().for_each(|obstacle_line| {
      if Utils::check_intersection(&direct_connection_line, obstacle_line) {
        is_possible_direct_connection = false;
      };
    });

    if is_possible_direct_connection {
      result.push(direct_connection_line);
    } else {
      track_boundaries.iter().for_each(|track_point| {
        obstalces_points.iter().for_each(|obstalce_point| {
          let new_line = Line {
            p1: track_point,
            p2: obstalce_point,
          };
          let mut is_intersect: bool = false;
          obtacles_lines.iter().for_each(|obstacle_line| {
            if obstacle_line.p1.id != obstalce_point.id
              && obstacle_line.p2.id != obstalce_point.id
              && Utils::check_intersection(&new_line, obstacle_line)
            {
              is_intersect = true;
            };
          });
          if !is_intersect {
            result.push(new_line);
          }
        });
      });
    }
    // log!("calculate_graph result before extends: {}", result.len());
    result.extend(obtacles_lines);
    // log!("calculate_graph result after extends: {}", result.len());

    // result
    // let graph: HashMap<u32, Vec<&Point>> = [()]
    // TODO: change current implementions of Vec<&Line> to HashMap, mayeb we could remove Line type at all!

    Utils::shortest_path(graph, &track_boundaries[0], &track_boundaries[1]);

    result
      .iter()
      .flat_map(|line| vec![line.p1.x, line.p1.y, line.p2.x, line.p2.y])
      .collect()
  }

  pub fn get_graph(
    source_x: f32,
    source_y: f32,
    destination_x: f32,
    destination_y: f32,
  ) -> Vec<f32> {
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

    // [PointId]: vec![Points | PointId]
    // let mut open_nodes = vec![startNode];
    // let mut closed_nodes = vec![];
    // loop over open_nodes  {
    //   current_node = node with lowest cost in open_nodes
    //   move current_node from open_nodes to closed_nodes
    //   if current_node is target, WIN!
    //   loop over neighbour of current_node {
    //     if neighbour_node is in closed {
    //       continue();
    //     }
    //     if new path to neighbour_node is shorter ot neighbour_node is not in open_nodes {
    //       set cost of neighbour_node
    //       set parent of neighbour_node to current_node
    //       if neighbour_node is not in open_nodes {
    //         open_nodes.push(neighbour_node)
    //       }
    //     }
    //   }
    // }

    // let mut book_reviews = HashMap::new();

    let obstalces_points: Vec<Point> = vec![
      Point {
        id: IdGenerator::generate_id() as u32,
        x: 800.0,
        y: 200.0,
      },
      Point {
        id: IdGenerator::generate_id() as u32,
        x: 1100.0,
        y: 200.0,
      },
      Point {
        id: IdGenerator::generate_id() as u32,
        x: 1100.0,
        y: 400.0,
      },
      Point {
        id: IdGenerator::generate_id() as u32,
        x: 800.0,
        y: 400.0,
      },
    ];

    let obtacles_lines: Vec<Line> = vec![
      Line {
        p1: &obstalces_points[0],
        p2: &obstalces_points[1],
      },
      Line {
        p1: &obstalces_points[1],
        p2: &obstalces_points[2],
      },
      Line {
        p1: &obstalces_points[2],
        p2: &obstalces_points[3],
      },
      Line {
        p1: &obstalces_points[3],
        p2: &obstalces_points[0],
      },
    ];

    let mut result: Vec<Line> = vec![];
    Utils::calculate_graph(
      track_boundaries,
      &obstalces_points,
      obtacles_lines,
      &mut result,
    ) // I don't knwo why Line doesn't require lifetime parameter,
      // and how to do that with lifetime parameter, to return vector from calculate_graph
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
      if list[mid].heuristic < value {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    low
  }

  fn shortest_path(
    graph: HashMap<u32, Vec<&Point>>,
    source_node: &Point,
    destination_node: &Point,
  ) {
    // graph: HashMap<PointId, Vector<&Point>>
    // queue:
    // every insert to queue has to be sorted
    let mut q: Vec<QueueItem> = vec![QueueItem {
      point: source_node,
      parent: source_node,
      current_length: 0.0,
      heuristic: 0.0,
    }];
    // q, is
    let mut visited: Vec<&u32> = vec![];
    while q.len() > 0 {
      // q.sort((a, b) => a.heuristic - b.heuristic) // this should be a queue
      let current_node = q.pop().unwrap();

      let direct_path_to_destination: bool = graph
        .get(&current_node.point.id)
        .unwrap()
        .iter()
        .any(|point| point.id == destination_node.id);
      if direct_path_to_destination {
        log!("path was found!");
        // return [...current_node.path, destination_node]
      }
      visited.push(&current_node.point.id);
      let neighbours = graph.get(&current_node.point.id).unwrap();
      // if neighbours.len() > 0 { // we assume that each point always has at least one neighbour
      //   continue;
      // }
      neighbours
        .iter()
        .filter(|neighbour| !visited.contains(&&neighbour.id))
        .for_each(|neighbour| {
          let dist_to_neighbour =
            (neighbour.x - current_node.point.x).hypot(neighbour.y - current_node.point.y);
          let current_length = current_node.current_length + dist_to_neighbour;
          let heuristic = current_length
            + (neighbour.x - destination_node.x).hypot(neighbour.y - destination_node.y);
          let index = Utils::get_sorted_index(&q, heuristic);
          let new_node = QueueItem {
            point: neighbour,
            parent: current_node.point,
            current_length,
            heuristic,
          };
          q.insert(index, new_node);
        });
    }
  }
}
