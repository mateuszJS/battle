pub struct Point {
  pub id: u32,
  pub x: f32,
  pub y: f32,
}

pub struct Line<'a> {
  pub p1: &'a Point,
  pub p2: &'a Point,
}

pub struct BasicUtils {}

impl BasicUtils {
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

  pub fn check_intersection(l1: &Line, l2: &Line) -> bool {
    let dir1: u8 = BasicUtils::direction(l1.p1, l1.p2, l2.p1);
    let dir2: u8 = BasicUtils::direction(l1.p1, l1.p2, l2.p2);
    let dir3: u8 = BasicUtils::direction(l2.p1, l2.p2, l1.p1);
    let dir4: u8 = BasicUtils::direction(l2.p1, l2.p2, l1.p2);
    if dir1 != dir2 && dir3 != dir4 {
      true //they are intersecting
           // } else if dir1 == 0 && PositionUtils::on_line(l1, l2.p2) {
           //   //when p2 of line2 are on the line1
           //   true
           // } else if dir2 == 0 && PositionUtils::on_line(l1, l2.p1) {
           //   //when p1 of line2 are on the line1
           //   true
           // } else if dir3 == 0 && PositionUtils::on_line(l2, l1.p2) {
           //   //when p2 of line1 are on the line2
           //   true
           // } else if dir4 == 0 && PositionUtils::on_line(l2, l1.p1) {
           //   //when p1 of line1 are on the line2
           //   true
    } else {
      false
    }
  }

  pub fn distance(p1: &Point, p2: &Point) -> f32 {
    (p1.x - p2.x).hypot(p1.y - p2.y)
  }
}
