use crate::constants::MATH_PI;
use crate::id_generator::IdGenerator;
use crate::squad::Squad;

pub struct Point {
  pub id: u32,
  pub x: f32,
  pub y: f32,
}

pub struct Line<'a> {
  pub p1: &'a Point,
  pub p2: &'a Point,
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

  // fn get_sign(p1: Point, p2: Point, p3: Point) -> f32 {
  //   (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y)
  // }

  // fn is_point_inside_triangle(triangle: &[3; Point], point: Point) -> bool {
  //   let mut d1: f32 = get_sign(point, triangle[0], triangle[1]);
  //   let mut d2: f32 = get_sign(point, triangle[1], triangle[2]);
  //   let mut d3: f32 = get_sign(point, triangle[2], triangle[0]);

  //   let has_neg: bool = (d1 < 0) || (d2 < 0) || (d3 < 0);
  //   let has_pos: bool = (d1 > 0) || (d2 > 0) || (d3 > 0);

  //   !(has_neg && has_pos)
  // }

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
    track_boundaries.iter().for_each(|track_point| {
      obstalces_points.iter().for_each(|obstalce_point| {
        let new_line = Line {
          p1: track_point,
          p2: obstalce_point,
        };
        let mut is_intersect: bool = false;
        obtacles_lines.iter().for_each(|obstacle_line| {
          if Utils::check_intersection(&new_line, obstacle_line) {
            is_intersect = true;
          };
        });
        if !is_intersect {
          result.push(new_line);
          log!("is NOT intersect");
        } else {
          log!("is intersect");
        }
      });
    });
    // log!("calculate_graph result before extends: {}", result.len());
    result.extend(obtacles_lines);
    // log!("calculate_graph result after extends: {}", result.len());

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
    log!(
      "x1: {}, y1: {}, x2: {}, y2: {}",
      track_boundaries[0].x,
      track_boundaries[0].y,
      track_boundaries[1].x,
      track_boundaries[1].y
    );
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

    // key -> point id
    // value -> Vec<(&Point, distance)>
    // ? maybe each point should have id?
  }

  // https://www.tutorialspoint.com/Check-if-two-line-segments-intersect
  fn on_line(line: &Line, point: &Point) -> bool {
    //check whether p is on the line or not
    point.x <= line.p1.x.max(line.p2.x)
      && point.x <= line.p1.x.min(line.p2.x)
      && (point.y <= line.p1.y.max(line.p2.y) && point.y <= line.p1.y.min(line.p2.y))
  }

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

  fn check_intersection(l1: &Line, l2: &Line) -> bool {
    //four direction for two lines and points of other line
    log!(
      "check_intersection {} {} {} {}",
      l1.p1.x,
      l1.p1.y,
      l1.p2.x,
      l1.p2.y,
    );
    let dir1: u8 = Utils::direction(l1.p1, l1.p2, l2.p1);
    let dir2: u8 = Utils::direction(l1.p1, l1.p2, l2.p2);
    let dir3: u8 = Utils::direction(l2.p1, l2.p2, l1.p1);
    let dir4: u8 = Utils::direction(l2.p1, l2.p2, l1.p2);
    if dir1 != dir2 && dir3 != dir4 {
      true //they are intersecting
    } else if dir1 == 0 && Utils::on_line(l1, l2.p2) {
      //when p2 of line2 are on the line1
      true
    } else if dir2 == 0 && Utils::on_line(l1, l2.p1) {
      //when p1 of line2 are on the line1
      true
    } else if dir3 == 0 && Utils::on_line(l2, l1.p2) {
      //when p2 of line1 are on the line2
      true
    } else if dir4 == 0 && Utils::on_line(l2, l1.p1) {
      //when p1 of line1 are on the line2
      true
    } else {
      false
    }
  }
}
