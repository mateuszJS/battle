use std::sync::atomic::{AtomicUsize, Ordering};

static COUNTER: AtomicUsize = AtomicUsize::new(100);

pub struct IdGenerator {}

impl IdGenerator {
  pub fn generate_id() -> f32 {
    COUNTER.fetch_add(1, Ordering::Relaxed) as f32
  }
}
