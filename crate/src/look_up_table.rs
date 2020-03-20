use std::sync::atomic::{AtomicUsize, Ordering};

const LUT_LENGTH: usize = 6;
static LUT: [f32; LUT_LENGTH] = [0.5, -0.8, 0.1, 0.6, -0.2, 0.25];
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
