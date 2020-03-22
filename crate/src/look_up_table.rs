use std::sync::atomic::{AtomicUsize, Ordering};

const LUT_LENGTH: usize = 6;
static LUT: [f32; LUT_LENGTH] = [2.1, 2.3, 2.7, 2.9, 3.05, 3.3];
// static LUT: [f32; LUT_LENGTH] = [0.0, 1.0471975511965976, 2.0943951023931953, 3.141592653589793, 4.1887902047863905, 5.235987755982988];
static INDEX: AtomicUsize = AtomicUsize::new(0);

pub struct LookUpTable {}

impl LookUpTable {
  pub fn initialize() {}

  pub fn generate_id() -> f32 {
    // maybe better would be to use ::fetch_update (but it's experimental API)
    // https://doc.rust-lang.org/std/sync/atomic/struct.AtomicUsize.html#method.fetch_update
    let index = INDEX.load(Ordering::Relaxed);
    INDEX.store((index + 1) % LUT_LENGTH, Ordering::Relaxed);
    LUT[index]
  }
}
