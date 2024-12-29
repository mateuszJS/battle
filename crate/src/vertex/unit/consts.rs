#[derive(PartialEq, Eq, Hash, Clone)]
pub enum UnitState {
    DEFAULT, // used for stateless animations
    // CHASING,
    // ABILITY,
    // FLY,
    RUN,
    SHOOT,
    IDLE,
    // GETUP,
    // DIE,
}
