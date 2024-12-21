const RAILING_WIDTH = 20
const RAILING_HEIGHT = 30

// x -> offset in x/z axis, multiplied by particular angle
// y - offset in y axis
export const RAILING_POINT_OFFSETS = [
  { x: RAILING_WIDTH, y: -500 },
  { x: RAILING_WIDTH, y: RAILING_HEIGHT },
  { x: 0, y: RAILING_HEIGHT },
  { x: 0, y: 0 },
]
