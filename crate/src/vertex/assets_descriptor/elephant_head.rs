use std::collections::HashMap;

use crate::constants::State;

use super::AnimationDetails;

pub fn get() -> HashMap<State, AnimationDetails> {
    HashMap::from([
        (
            State::RUN,
            AnimationDetails {
                prefix: "elephant_head_run".to_owned(),
                animation_length: 16,
                angles: 12,
                time_per_frame: 50.0, // speed in seconds
                frames: vec![],
            },
        ),
        (
            State::SHOOT,
            AnimationDetails {
                prefix: "elephant_head_shoot".to_owned(),
                animation_length: 7,
                angles: 16,
                time_per_frame: 60.0,
                frames: vec![],
            },
        ),
        (
            State::IDLE,
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
