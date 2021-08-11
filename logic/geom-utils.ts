import { Line, Point } from "./geom-types";

function direction(a: Point, b: Point, c: Point): u8 {
  const by = b.y
  const ay = a.y
  const cx = c.x
  const bx = b.x
  const ax = a.x
  const cy = c.y
  const val = (by - ay) * (cx - bx) - (bx - ax) * (cy - by);
  // let val: i16 = (b.y - a.y) * (c.x - b.x) - (b.x - a.x) * (c.y - b.y);
  if (val < 0) {
    return 2 //anti-clockwise direction
  } else if (val > 0) {
    return 1 //clockwise direction
  } else {
    return 0
  }
}

export function checkIntersection(l1: Line, l2: Line): bool {
  const dir1 = direction(l1.p1, l1.p2, l2.p1)
  const dir2 = direction(l1.p1, l1.p2, l2.p2)
  const dir3 = direction(l2.p1, l2.p2, l1.p1)
  const dir4 = direction(l2.p1, l2.p2, l1.p2)
  if (dir1 != dir2 && dir3 != dir4) {
    return true //they are intersecting
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
    return false
  }
}

const p1: Point = {
  x: -1.0, // point.x // previously was -1.0, but gives random number when lines go though points
  y: -1.0,
}

export function isPointInPolygon(p2: Point, lines: Line[]): bool {
  const line_with_point: Line = { p1: p1, p2: p2 }

  let number_of_intersections: usize = 0

  for (let i = 0; i < lines.length; i++) {
    if (checkIntersection(line_with_point, lines[i])) {
      number_of_intersections ++
    }
  }

  return number_of_intersections % 2 == 1
}