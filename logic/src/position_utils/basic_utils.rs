#[derive(Clone)]
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
  //   // let lineP1X = line.p1.x as i16;
  //   // let lineP1Y = line.p1.y as i16;
  //   // point.x as i16 <= lineP1X.max(line.p2.x as i16)
  //   //   && point.x as i16 <= lineP1X.min(line.p2.x as i16)
  //   //   && (point.y as i16 <= lineP1Y.max(line.p2.y as i16) && point.y as i16 <= lineP1Y.min(line.p2.y as i16))
  //   point.x <= line.p1.x.max(line.p2.x)
  //     && point.x <= line.p1.x.min(line.p2.x)
  //     && (point.y <= line.p1.y.max(line.p2.y) && point.y <= line.p1.y.min(line.p2.y))
  // }

  fn direction(a: &Point, b: &Point, c: &Point) -> u8 {
    let by = b.y as i32;
    let ay = a.y as i32;
    let cx = c.x as i32;
    let bx = b.x as i32;
    let ax = a.x as i32;
    let cy = c.y as i32;
    let val: i32 = (by - ay) * (cx - bx) - (bx - ax) * (cy - by);
    // let val: i16 = (b.y - a.y) * (c.x - b.x) - (b.x - a.x) * (c.y - b.y);
    if val < 0 {
      2 //anti-clockwise direction
    } else if val > 0 {
      1 //clockwise direction
    } else {
      0
    }
  }

  pub fn check_intersection(l1: &Line, l2: &Line) -> bool {
    let dir1: u8 = BasicUtils::direction(l1.p1, l1.p2, l2.p1);
    let dir2: u8 = BasicUtils::direction(l1.p1, l1.p2, l2.p2);
    let dir3: u8 = BasicUtils::direction(l2.p1, l2.p2, l1.p1);
    let dir4: u8 = BasicUtils::direction(l2.p1, l2.p2, l1.p2);
    if dir1 != dir2 && dir3 != dir4 {
      true //they are intersecting
           // } else if dir1 == 0 && BasicUtils::on_line(l1, l2.p2) {
           //   //when p2 of line2 are on the line1
           //   true
           // } else if dir2 == 0 && BasicUtils::on_line(l1, l2.p1) {
           //   //when p1 of line2 are on the line1
           //   true
           // } else if dir3 == 0 && BasicUtils::on_line(l2, l1.p2) {
           //   //when p2 of line1 are on the line2
           //   true
           // } else if dir4 == 0 && BasicUtils::on_line(l2, l1.p1) {
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
