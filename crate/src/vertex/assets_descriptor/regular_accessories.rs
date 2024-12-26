use std::{collections::HashMap, sync::LazyLock};

use crate::vertex::unit::UnitState;

use super::AnimationDetails;

pub fn get() -> HashMap<UnitState, AnimationDetails> {
    HashMap::from([
        (
            UnitState::RUN,
            AnimationDetails {
                prefix: "regular_rifle_run".to_owned(),
                animation_length: 16,
                angles: 12,
                time_per_frame: 50.0, // speed in seconds
                frames: vec![],
            },
        ),
        (
            UnitState::SHOOT,
            AnimationDetails {
                prefix: "regular_rifle_shoot".to_owned(),
                animation_length: 7,
                angles: 16,
                time_per_frame: 60.0,
                frames: vec![],
            },
        ),
        (
            UnitState::IDLE,
            AnimationDetails {
                prefix: "regular_rifle_idle".to_owned(),
                animation_length: 1,
                angles: 12,
                time_per_frame: 60.0,
                frames: vec![],
            },
        ),
    ])
}
