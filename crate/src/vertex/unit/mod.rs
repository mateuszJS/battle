mod consts;

use super::animated_sprite::AnimSpriteConfig;
use super::assets_descriptor::{get_asset_descriptor, AnimationDetails, AssetId};
use super::mat4;
use super::AnimatedSprite;
use crate::constants::MATH_PI;
pub use consts::UnitState;

static mut DEBUG: bool = true;

const SCALE: f32 = 0.5;

pub struct UnitVertex {
    a_sprites: Vec<AnimatedSprite>,
    state: UnitState,
    angle: f32,
    position: (f32, f32),
    assets: Vec<AssetId>,
}

impl UnitVertex {
    pub fn new(
        state: UnitState,
        angle: f32,
        position: (f32, f32),
        assets: Vec<AssetId>,
        angle_offset: f32,
    ) -> UnitVertex {
        let a_sprites = vec![AnimatedSprite::new(); assets.len()];
        let mut unitVertex = UnitVertex {
            state,
            angle,
            position,
            assets,
            a_sprites,
        };
        unitVertex.update_sprites_config(angle_offset, true);

        unitVertex
    }

    fn update_sprites_config(&mut self, angle_offset: f32, reset: bool) {
        let self_state = self.state.clone();
        let self_angle = self.angle + angle_offset;
        let self_assets = self.assets.clone();

        self.a_sprites
            .iter_mut()
            .enumerate()
            .for_each(|(index, sprite)| {
                /*
                  if current unit state is RUN, then do normal animation
                  if it's FLY, GETUP, then make animation depend on progress!
                  UnitState.SHOOT should be also determien by progres <0, 1>!!!
                */
                let asset_id = &self_assets[index];

                let AnimationDetails {
                    time_per_frame,
                    animation_length,
                    angles,
                    ..
                } = get_asset_descriptor(asset_id, &self_state);
                let first_frame = map_angle_to_index(self_angle, *angles) * animation_length;

                sprite.update_config(
                    AnimSpriteConfig {
                        first_frame,
                        animation_length: *animation_length,
                        time_per_frame: *time_per_frame,
                    },
                    reset,
                );
            })
    }

    pub fn update(
        &mut self,
        angle: f32,
        state: UnitState,
        dt: f32,
        angle_offset: f32,
        forced: bool,
    ) {
        let is_new_state = self.state != state;

        if forced || self.angle != angle || is_new_state {
            self.angle = angle;
            self.state = state;
            self.update_sprites_config(angle_offset, is_new_state);
        }

        self.a_sprites.iter_mut().for_each(|a_sprite| {
            a_sprite.tick(dt);
        })
    }

    pub fn add_vertex(
        &self,
        buffer: &mut Vec<f32>,
        plane_matrix: [f32; 16],
        full_light_angle: [f32; 3],
    ) {
        self.a_sprites
            .iter()
            .enumerate()
            .for_each(|(index, a_sprite)| {
                let asset_id = &self.assets[index];
                let AnimationDetails { frames, .. } = get_asset_descriptor(asset_id, &self.state);
                let frame = &frames[a_sprite.get_frame_index()];

                let [x, y, width, height] = frame.destination_rect;
                let sources = [
                    frame.source_rect[0],
                    frame.source_rect[1],
                    frame.source_rect[2],
                    //
                    frame.source_rect[0],
                    frame.source_rect[2],
                    frame.source_rect[3],
                ];

                [
                    (x, y + height),
                    (x + width, y + height),
                    (x + width, y),
                    //
                    (x, y + height),
                    (x + width, y),
                    (x, y),
                ]
                .iter()
                .map(|p| (p.0 * SCALE, p.1 * SCALE))
                .map(|p| {
                    let vector = [
                        p.0,
                        index as f32 * 2.0, // this is only to mitigate z fighting
                        // remember it's further divided by W component, so thats why is so big here
                        // value is selected purely base on visual testing
                        p.1,
                        1.0,
                    ];
                    let output_vec = mat4::vector_times_matrix(vector, plane_matrix);

                    (
                        output_vec[0] / output_vec[3],
                        output_vec[1] / output_vec[3],
                        output_vec[2] / output_vec[3],
                    )
                })
                .map(|(x, y, z)| (x + self.position.0, y, z + self.position.1))
                .enumerate()
                .for_each(|(index, (x, y, z))| {
                    // components.normals.extend(full_light_angle);
                    buffer.extend([
                        x,
                        y,
                        z,
                        1.0, // destination
                        sources[index].0,
                        sources[index].1,           // source
                        frame.texture_index as f32, // texture slice index
                        0.0,                        // color matrix indec
                        full_light_angle[0],
                        full_light_angle[1],
                        full_light_angle[2],
                        0.0, // padding for normal(its vec3)
                    ]);
                });
            });
    }
}

const MAP_VERTICAL_MOD: f32 = 0.52;

fn map_angle_to_index(angle: f32, num_of_angles: usize) -> usize {
    let angle_slize = (1.0 / (num_of_angles as f32)) * MATH_PI * 2.0;
    let top_view_angle = angle.sin().atan2(angle.cos() / MAP_VERTICAL_MOD);
    let shifted_by_half = top_view_angle - angle_slize / 2.0;
    let positive_angle = shifted_by_half + MATH_PI * 2.0;

    (positive_angle / angle_slize).ceil() as usize % num_of_angles
}
