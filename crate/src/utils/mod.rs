mod hypot;
mod is_equal_f32;

pub use hypot::hypot;
pub use is_equal_f32::is_equal_f32;

/*
tests:
  - does split -1 correctly?
  - actually one example should cover everything
*/

pub fn get_grouped_points(input: Vec<f32>) -> Vec<Vec<(f32, f32)>> {
    let mut i = 0;
    let mut output = vec![];

    while i < input.len() {
        if is_equal_f32(input[i], -1.0) {
            output.push(vec![]);
            i += 1;
        } else {
            let last_index = output.len() - 1;
            output[last_index].push((input[i], input[i + 1]));
            i += 2;
        }
    }

    output
}
