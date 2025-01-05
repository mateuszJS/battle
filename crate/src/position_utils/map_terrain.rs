use super::basic_utils::{BasicUtils, Line, Point};
use crate::id_generator::IdGenerator;
use std::collections::HashMap;
use std::sync::Mutex;

pub type ObstaclesList = Vec<Vec<Point>>;

// static mut TERRAIN_POINTS: LazyLock<Mutex<ObstaclesList>> = LazyLock::new(|| Mutex::new(vec![]));

pub fn init_terrain_points(
    maybe_shapes: Option<Vec<Vec<(f32, f32)>>>,
) -> &'static Mutex<ObstaclesList> {
    lazy_static! {
      static ref TEMP_TERRAIN_POINTS: Mutex<ObstaclesList> = Mutex::new(vec![]);
      // have to use Mutex, cannot capture dynamic environment (option) in static block
    };

    match maybe_shapes {
        Some(shapes) => {
            TEMP_TERRAIN_POINTS.lock().unwrap().append(
                &mut shapes
                    .into_iter()
                    .map(|shape| {
                        shape
                            .into_iter()
                            .map(|p| Point {
                                id: IdGenerator::generate_id(),
                                x: p.0,
                                y: p.1,
                            })
                            .collect::<Vec<Point>>()
                    })
                    .collect::<ObstaclesList>(),
            );
        }
        None => {}
    }

    &TEMP_TERRAIN_POINTS
}

lazy_static! {
  pub static ref TERRAIN_POINTS: ObstaclesList = init_terrain_points(None).lock().unwrap().to_vec();

  pub static ref TERRAIN_LINES: Vec<Line<'static>> = TERRAIN_POINTS
    .iter()
    .flat_map(|points| -> Vec<Line<'static>> {
        points
            .iter()
            .enumerate()
            .map(|(index, point)| Line {
                p1: point,
                p2: &points[(index + 1) % points.len()],
            })
            .collect()
    })
    .collect();

  pub static ref TERRAIN_PERMANENT_DIRECT_CONNECTIONS_GRAPH: HashMap<u32, Vec<&'static Point>> = {
      let mut graph: HashMap<u32, Vec<&Point>> = HashMap::new();

      TERRAIN_LINES.iter().for_each(|line| {
        graph_connect_point(&mut graph, &line.p1, &line.p2);
        graph_connect_point(&mut graph, &line.p2, &line.p1);
      });

      TERRAIN_POINTS.iter().enumerate().for_each(|(index_a, obstacle_a)| {
        for index_b in index_a + 1..TERRAIN_POINTS.len() {

          let obstacle_b = &TERRAIN_POINTS[index_b];
          obstacle_a.iter().for_each(|point_a| {
            obstacle_b.iter().for_each(|point_b| {

              // ------------START checking intersection-------------------
              let new_line = Line {
                p1: point_a,
                p2: point_b,
              };
              if point_a.x.is_nan() || point_a.y.is_nan() || point_b.x.is_nan() || point_b.y.is_nan() {
                log!(
                  "obstacles.iter().enumerate().f: {} - {} - {} - {}",
                  point_a.x,
                  point_a.y,
                  point_b.x,
                  point_b.y
                );
              }

              let points_can_be_directly_connected = !TERRAIN_LINES.iter().any(|obstacle_line| {
                obstacle_line.p1.id != point_a.id
                  && obstacle_line.p1.id != point_b.id
                  && obstacle_line.p2.id != point_a.id
                  && obstacle_line.p2.id != point_b.id
                  && BasicUtils::check_intersection(&new_line, obstacle_line)
              });

              if points_can_be_directly_connected {
                graph.get_mut(&point_a.id).unwrap().push(&point_b);
                graph.get_mut(&point_b.id).unwrap().push(&point_a);
              }
            })
          })

        }
      });

      graph
  };
}

fn graph_connect_point<'a>(
    ref_graph: &mut HashMap<u32, Vec<&'a Point>>,
    point_a: &'a Point,
    point_b: &'a Point,
) {
    ref_graph
        .entry(point_a.id)
        .and_modify(|connected_points| connected_points.push(point_b))
        .or_insert(vec![point_b]);
}
