use crate::constants::MATH_PI;
use crate::squad::Squad;
use crate::point::Point;

struct Line {
  pub p1: Point
  pub p2: Point
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

  pub fn get_graph(source: Point, desctination: Point) {
    let obstalce: [4; Point] = [
      Point { x: 800, y: 200 },
      Point { x: 1100, y: 200 },
      Point { x: 1100, y: 400 },
      Point { x: 800, y: 400 },
    ];

    let mut graph: Vec<(Point, Point)> = vec![
      (obstalce[0], obstalce[1]),
      (obstalce[1], obstalce[2]),
      (obstalce[2], obstalce[3]),
      (obstalce[3], obstalce[0]),
    ];

    // key -> point id
    // value -> Vec<(&Point, distance)>
    // ? maybe each point should have id?


  }

  // https://www.tutorialspoint.com/Check-if-two-line-segments-intersect
  fn on_line(line: &Line, point: &Point) -> bool {   //check whether p is on the line or not
    point.x <= max(line.p1.x, line.p2.x) && point.x <= min(line.p1.x, line.p2.x) &&
    (point.y <= max(line.p1.y, line.p2.y) && point.y <= min(line.p1.y, line.p2.y))
 }
 
  fn direction(a: Point, b: Point, c: Point) -> u8 {
    let val: f32 = (b.y-a.y)*(c.x-b.x)-(b.x-a.x)*(c.y-b.y);
    if (val == 0)
      0;    //colinear
    else if val < 0 {
      2    //anti-clockwise direction
    } else {
      1    //clockwise direction
    }
 }
 
 fn is_intersect(l1: &Line, l2: &Line) -> bool {
    //four direction for two lines and points of other line
    let dir1: u8 = Utils::direction(l1.p1, l1.p2, l2.p1);
    let dir2: u8 = Utils::direction(l1.p1, l1.p2, l2.p2);
    let dir3: u8 = Utils::direction(l2.p1, l2.p2, l1.p1);
    let dir4: u8 = Utils::direction(l2.p1, l2.p2, l1.p2);
    
    if dir1 != dir2 && dir3 != dir4 {
      true //they are intersecting
    } else if dir1==0 && Utils::on_line(l1, l2.p1) { //when p2 of line2 are on the line1
      true
    } else if dir2==0 && Utils::on_line(l1, l2.p2) { //when p1 of line2 are on the line1
      true
    } else if dir3==0 && Utils::on_line(l2, l1.p1) { //when p2 of line1 are on the line2
      true
    } else if dir4==0 && Utils::on_line(l2, l1.p2) { //when p1 of line1 are on the line2
      true
    } else {
      false
    }
 }
}