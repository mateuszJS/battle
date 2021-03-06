use crate::js_sys;
use std::sync::atomic::{AtomicUsize, Ordering};

const LUT_LENGTH: usize = 256;

static INDEX: AtomicUsize = AtomicUsize::new(0);

pub struct LookUpTable {}

impl LookUpTable {
  pub fn get_random() -> f32 {
    lazy_static! {
      // https://stackoverflow.com/questions/27791532/how-do-i-create-a-global-mutable-singleton
      static ref LUT: Vec<f32> = {
        (0..LUT_LENGTH)
          .map(|_| js_sys::Math::random() as f32)
          .collect()
      };
    }

    // maybe better would be to use ::fetch_update (but it's experimental API)
    // https://doc.rust-lang.org/std/sync/atomic/struct.AtomicUsize.html#method.fetch_update
    let index = INDEX.load(Ordering::Relaxed);
    INDEX.store((index + 1) % LUT_LENGTH, Ordering::Relaxed);
    LUT[index]
  }
}
