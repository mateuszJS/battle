use crate::utils::comparef32;

pub struct AnimSpriteConfig {
    pub first_frame: usize,
    pub animation_length: usize,
    pub time_per_frame: f32,
}

pub struct AnimatedSprite {
    config: AnimSpriteConfig,
    frame_local_index: usize,
    prev_dt_sum: f32,
}

impl AnimatedSprite {
    pub fn new() -> AnimatedSprite {
        AnimatedSprite {
            config: AnimSpriteConfig {
                first_frame: 0,
                animation_length: 0,
                time_per_frame: 0.0,
            },
            frame_local_index: 0,
            prev_dt_sum: 0.0,
        }
    }

    pub fn update_config(&mut self, config: AnimSpriteConfig, reset: bool) {
        self.config = config;
        if reset {
            self.frame_local_index = 0;
        }
        self.prev_dt_sum = 0.0;
    }

    pub fn get_frame_index(&self) -> usize {
        self.config.first_frame + self.frame_local_index
    }

    pub fn progress(&mut self, progress: f32 /* ∈ <0, 1>*/) {
        // if (typeof this.config.timePerFrame === 'number') {
        //   throw Error('This animation should only be updated by tick(), NOT progress()!')
        // }

        self.frame_local_index = if comparef32(progress, 0.0) {
            0
        } else {
            (progress * self.config.animation_length as f32).ceil() as usize - 1
        };
    }

    pub fn tick(&mut self, dt: f32) {
        // const { timePerFrame, animationLength } = this.config

        // if (typeof timePerFrame !== 'number') {
        //   throw Error('This animation should only be updated by progress(), NOT tick()!')
        // }

        let dt_sum = self.prev_dt_sum + dt;
        self.prev_dt_sum = dt_sum % self.config.time_per_frame;

        if dt_sum >= self.config.time_per_frame {
            let advance_by = (dt_sum / self.config.time_per_frame) as usize;
            self.frame_local_index =
                (self.frame_local_index + advance_by) % self.config.animation_length;
        }
    }
}
