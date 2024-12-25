pub fn comparef32(a: f32, b: f32) -> bool {
    (a - b).abs() < std::f32::EPSILON
}
