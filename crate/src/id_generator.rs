use std::sync::atomic::{AtomicUsize, Ordering};

static COUNTER: AtomicUsize = AtomicUsize::new(1);
static BASE_ID: f32 = 1_000_000.0;

pub struct IdGenerator {}

impl IdGenerator {
  pub fn generate_factory_id() -> f32 {
    COUNTER.fetch_add(1, Ordering::Relaxed) as f32 + 2.0 * BASE_ID
  }

  pub fn generate_squad_id() -> f32 {
    COUNTER.fetch_add(1, Ordering::Relaxed) as f32 + 3.0 * BASE_ID
  }

  pub fn generate_unit_id() -> f32 {
    COUNTER.fetch_add(1, Ordering::Relaxed) as f32 + 4.0 * BASE_ID
  }
}
