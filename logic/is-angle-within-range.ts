import { MATH_PI, MATH_PI_2 } from "./constants";

function normalize(angle: f32) : f32 {
  while (angle < -MATH_PI) angle += MATH_PI_2
  while (angle >  MATH_PI) angle -= MATH_PI_2
  return angle
}

function isAngleWithinRange(testAngle: f32, a: f32, b: f32): bool {
    const safeTestAngle = testAngle; //  < 0 ? testAngle + MATH_PI_2 : (testAngle % MATH_PI_2)
    a -= safeTestAngle;
    b -= safeTestAngle;
    a = normalize(a);
    b = normalize(b);
    if (a * b >= 0) return false
    return Math.abs(a - b) < 180;
}

export default isAngleWithinRange