import { Point } from "./geom-types";

class Circle extends Point {
  r: f32
}

class CollisionPoint {
  angle: f32
  distance: f32
  circle1: Circle
  circle2: Circle
}

function getCircleIntersectionPoint(
  circle1: Circle,
  circle2: Circle,
  newCircleRadius: f32,
  center: Point,
): Point {

  /* dx and dy are the vertical and horizontal distances between
   * the circle centers.
   */
  const dx = circle2.x - circle1.x;
  const dy = circle2.y - circle1.y;

  /* Determine the straight-line distance between the centers. */
  const d = Math.sqrt((dy*dy) + (dx*dx));

  /* Check for solvability. */
  // if (d > (circle1.r + circle2.r)) {
  //     /* no solution. circles do not intersect. */
  //     return false;
  // }
  // if (d < Math.abs(circle1.r - circle2.r)) {
  //     /* no solution. one circle is contained in the other */
  //     return false;
  // }

  /* 'point 2' is the point where the line through the circle
   * intersection points crosses the line between the circle
   * centers.  
   */

  /* Determine the distance from point 0 to point 2. */
  const a = (Math.pow(circle1.r + newCircleRadius, 2) - Math.pow(circle2.r + newCircleRadius, 2) + (d*d)) / (2.0 * d) ;

  /* Determine the coordinates of point 2. */
  const x2 = circle1.x + (dx * a/d);
  const y2 = circle1.y + (dy * a/d);

  /* Determine the distance from point 2 to either of the
   * intersection points.
   */
  const h = Math.sqrt(Math.pow(circle1.r + newCircleRadius, 2) - (a*a));

  /* Now determine the offsets of the intersection points from
   * point 2.
   */
  const rx = -dy * (h/d);
  const ry = dx * (h/d);

  /* Determine the absolute intersection points. */
  const point1 = { x: x2 + rx, y: y2 + ry }
  const point2 = { x: x2 - rx, y: y2 - ry }
  if (Math.hypot(point1.x - center.x, point1.y - center.y) > Math.hypot(center.x - point2.x, center.y - point2.y)) {
    return point1
  }
  return point2
}


function getCollisionPoint(circle1: Circle, circle2: Circle, source: Point): CollisionPoint {
  const angle1 = Math.atan2(circle1.x - circle2.x, circle2.y - circle1.y)
  const distance1 = circle1.r + circle2.r
  const x = Math.sin(angle1) as f32 * distance1 + circle2.x
  const y = -Math.cos(angle1) as f32 * distance1 + circle2.y
  return {
    angle: Math.atan2(x - source.x, source.y - y),
    distance: Math.hypot(x - source.x, y - source.y),
    circle1: circle2,
    circle2: circle1,
  }
}

export function getPositions(input: u8[]): Circle[] {
  if (input.length == 1) {
    return [{
      x: 0,
      y: 0,
      r: input[0] as f32,
    }]
  }
  let circles: Circle[] = [
    { x: 0, y: 0, r: unchecked(input[0]) as f32 },
    { x: 0, y: -unchecked(input[0]), r: unchecked(input[1]) as f32 },
  ]
  let envelope: CollisionPoint[] = [{
    angle: 0,
    distance: input[0] as f32,
    circle1: unchecked(circles[0]),
    circle2: unchecked(circles[1]),
  }]

  while (input.length > circles.length) {
    /* find the closest envelope point */
    let closestCollisionPoint = unchecked(envelope[0])
    let closestCollisionPointIndex = 0
    for (let i = 1; i < envelope.length; i++) {
      if (closestCollisionPoint.distance > envelope[i].distance) {
        closestCollisionPoint = envelope[i]
        closestCollisionPointIndex = i
      }
    }

    /* add a new circle (position) */
    const newCirclePosition = getCircleIntersectionPoint(
      closestCollisionPoint.circle1, 
      closestCollisionPoint.circle2,
      unchecked(input[circles.length - 1]) as f32,
      circles[0],
    )

    const newCircle: Circle = {
      x: newCirclePosition.x,
      y: newCirclePosition.y,
      r: unchecked(input[circles.length - 1]) as f32,
    }
    circles.push(newCircle)

    /* update envelope */
    const collisionPoint1: CollisionPoint = getCollisionPoint(closestCollisionPoint.circle1, newCircle, unchecked(circles[0]))
    const collisionPoint2: CollisionPoint = getCollisionPoint(closestCollisionPoint.circle2, newCircle, unchecked(circles[0]))
    closestCollisionPoint
  }

  return circles
}