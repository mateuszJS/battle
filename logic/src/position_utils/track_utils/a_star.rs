use std::collections::HashMap;
use super::super::basic_utils::{Point,BasicUtils};

struct QueueItem<'a> {
  point: &'a Point,
  path: Vec<&'a Point>,
  current_length: f32,
  heuristic: f32,
}

pub struct AStar {}

impl AStar {
  fn get_sorted_index(list: &Vec<QueueItem>, value: f32) -> usize {
    let mut low: usize = 0;
    let mut high: usize = list.len();

    while low < high {
      let mid: usize = (low + high) >> 1;
      if list[mid].heuristic > value {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    low
  }

  pub fn shortest_path<'a>(
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
    let mut visited: Vec<u32> = vec![];
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
      visited.push(current_node.point.id);
      let neighbors = graph.get(&current_node.point.id).unwrap();
      neighbors
        .iter()
        .filter(|neighbor| !visited.contains(&neighbor.id))
        .for_each(|neighbor| {
          let dist_to_neighbor = BasicUtils::distance(neighbor, &current_node.point);
          let current_length = &current_node.current_length + dist_to_neighbor;
          let heuristic = current_length + BasicUtils::distance(neighbor, destination_node);
          let index = AStar::get_sorted_index(&queue, heuristic);
          let mut path = current_node.path.clone();
          path.push(neighbor);
          let new_node = QueueItem {
            point: neighbor,
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
