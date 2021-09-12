export class Point {
  x: f32
  y: f32
}

export class Line {
  p1: Point
  p2: Point
}

export class UniquePoint extends Point {
  id: u32
}

export class UniqueLine {
  p1: UniquePoint
  p2: UniquePoint
}