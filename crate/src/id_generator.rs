use std::sync::atomic::{AtomicUsize, Ordering};

static COUNTER: AtomicUsize = AtomicUsize::new(100);
// 100 -> now we can be sure that there is no ID under 100
// useful when structs are pretending real id
pub struct IdGenerator {}

impl IdGenerator {
  pub fn generate_id() -> f32 {
    COUNTER.fetch_add(1, Ordering::Relaxed) as f32
  }
}
