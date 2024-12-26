use std::collections::HashMap;

use crate::vertex::unit::UnitState;

use super::AnimationDetails;

pub fn get() -> HashMap<UnitState, AnimationDetails> {
    HashMap::from([
        (
            UnitState::RUN,
            AnimationDetails {
                prefix: "elephant_head_run".to_owned(),
                animation_length: 16,
                angles: 12,
                time_per_frame: 50.0, // speed in seconds
                frames: vec![],
            },
        ),
        (
            UnitState::SHOOT,
            AnimationDetails {
                prefix: "elephant_head_shoot".to_owned(),
                animation_length: 7,
                angles: 16,
                time_per_frame: 60.0,
                frames: vec![],
            },
        ),
        (
            UnitState::IDLE,
            AnimationDetails {
                prefix: "elephant_head_idle".to_owned(),
                animation_length: 1,
                angles: 12,
                time_per_frame: 60.0,
                frames: vec![],
            },
        ),
    ])
}
