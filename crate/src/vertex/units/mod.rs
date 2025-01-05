use std::cell::Ref;

use super::animated_sprite::AnimSpriteConfig;
use super::assets_descriptor::{get_asset_descriptor, AnimationDetails, AssetId};
use super::mat4;
use super::AnimatedSprite;
use crate::constants::MATH_PI;
use crate::unit::Unit;
static mut DEBUG: bool = true;

const SCALE: f32 = 0.5;

pub fn add_vertex(
    units: Vec<Ref<Unit>>,
    buffer: &mut Vec<f32>,
    plane_matrix: [f32; 16],
    full_light_angle: [f32; 3],
) {
    units.iter().for_each(|unit| {
        unit.sprites
            .iter()
            .enumerate()
            .for_each(|(index, a_sprite)| {
                let AnimationDetails { frames, .. } =
                    get_asset_descriptor(&a_sprite.asset_id, &unit.state);
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
                .map(|(x, y, z)| (x + unit.x, y, z + unit.y))
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
    });
}
