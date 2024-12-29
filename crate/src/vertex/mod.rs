mod animated_sprite;
mod assets_descriptor;
mod consts;
mod env;
mod mat4;
mod unit;

use animated_sprite::AnimatedSprite;
pub use assets_descriptor::initialize_assets_descriptor;
use assets_descriptor::AssetId;
use env::EnvVertex;
use unit::UnitVertex;

use crate::utils::comparef32;

static mut DEBUG: bool = true;

pub struct Vertex {
    env: EnvVertex,
    unit: UnitVertex,
    last_sprites_angle_offset: f32,
}

impl Vertex {
    pub fn new(
        platforms: Vec<Vec<(f32, f32)>>,
        bridges: Vec<Vec<(f32, f32)>>,
        sprites_angle_offset: f32,
    ) -> Vertex {
        Vertex {
            env: EnvVertex::new(platforms, bridges),
            unit: UnitVertex::new(
                unit::UnitState::RUN,
                0.0,
                (100.0, 100.0),
                vec![
                    AssetId::RegularBody,
                    AssetId::RegularAccesories,
                    AssetId::ElephantHead,
                ],
                0.0,
            ),
            last_sprites_angle_offset: sprites_angle_offset,
        }
    }

    pub fn update(&mut self, dt: f32, sprites_angle_offset: f32) {
        self.unit.update(
            0.0,
            unit::UnitState::RUN,
            dt,
            sprites_angle_offset,
            !comparef32(sprites_angle_offset, self.last_sprites_angle_offset),
        );
        self.last_sprites_angle_offset = sprites_angle_offset;
    }

    pub fn get_vertex(&self, planeMatrix: [f32; 16], fullLightAngle: [f32; 3]) -> Vec<f32> {
        // self.env.add_vertex(&mut components);
        let mut buffer = self.env.buffer.clone();

        self.unit
            .add_vertex(&mut buffer, planeMatrix, fullLightAngle);

        buffer
    }
}
