const RAILING_WIDTH: f32 = 20.0;
const RAILING_HEIGHT: f32 = 30.0;

// x -> offset in x/z axis, multiplied by particular angle
// y - offset in y axis
pub const RAILING_POINT_OFFSETS: [(f32, f32); 4] = [
    (RAILING_WIDTH, -500.0),
    (RAILING_WIDTH, RAILING_HEIGHT),
    (0.0, RAILING_HEIGHT),
    (0.0, 0.0),
];
