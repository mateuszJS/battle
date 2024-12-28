// import { UnitState } from "logic-contants"
// import AssetsDescriptor from "AssetsDescriptor"
// import mapAngleToIndex from "./mapAngleToIndex"
// import AssetId from "AssetsDescriptor/AssetId"
// import AnimatedSprite from "../WebGPU/AnimatedSprite/AnimatedSprite"
// import { getCameraAngle } from "worldMatrix"
// import mat4 from "utils/mat4"

mod consts;

use super::animated_sprite::AnimSpriteConfig;
use super::assets_descriptor::{AnimationDetails, AssetId, ASSETS_DESCRIPTOR};
use super::AnimatedSprite;
use super::{mat4, VertexComponents};
use crate::constants::MATH_PI;
pub use consts::UnitState;

static mut DEBUG: bool = true;

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
        let a_sprites = assets
            .iter()
            .map(|_assetId| AnimatedSprite::new())
            .collect();

        let mut unitVertex = UnitVertex {
            state,
            angle,
            position,
            assets,
            a_sprites,
        };
        unitVertex.update_sprites_config(angle_offset, true);
        unitVertex

        // unitVertex
    }
    // <0, 2 * Math.PI> -> <0, angles>

    /*
    WebGPU needs to receive:
      - fraction color matrix
      - index of frames for head
      - index of frames for arms & weapon & backpack
      - index of frames for body
      - position for head, maybe rotation flag
      - position for body, maybe rotation flag
      - position for arms & weapon & backpack, maybe rotation flag
    */
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
                unsafe {
                    let asset_id = &self_assets[index];
                    let temp = ASSETS_DESCRIPTOR.lock().unwrap();
                    let AnimationDetails {
                        time_per_frame,
                        animation_length,
                        angles,
                        ..
                    } = temp.get(asset_id).unwrap().get(&self_state).unwrap();
                    let first_frame = map_angle_to_index(self_angle, *angles) * animation_length;

                    sprite.update_config(
                        AnimSpriteConfig {
                            first_frame,
                            animation_length: *animation_length,
                            time_per_frame: *time_per_frame,
                        },
                        reset,
                    );
                }
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
        components: &mut VertexComponents,
        planeMatrix: [f32; 16],
        fullLightAngle: [f32; 3],
    ) {
        self.a_sprites
            .iter()
            .enumerate()
            .for_each(|(index, a_sprite)| {
                let lastUsedIndex = components.destination.len() / 4;

                let mut nextIndicies: [usize; 6] = [0, 1, 2, 0, 2, 3];
                nextIndicies.iter_mut().for_each(|i| *i += lastUsedIndex);

                components.indicies.append(&mut nextIndicies.to_vec());

                components.normals.extend(fullLightAngle);
                // components.normals.push(1.0);
                components.normals.extend(fullLightAngle);
                components.normals.extend(fullLightAngle);
                components.normals.extend(fullLightAngle);
                components.normals.extend(fullLightAngle);
                components.normals.extend(fullLightAngle);

                let assetId = &self.assets[index];
                unsafe {
                    let temp = ASSETS_DESCRIPTOR.lock().unwrap();
                    let AnimationDetails { frames, .. } =
                        temp.get(assetId).unwrap().get(&self.state).unwrap();
                    let frame = &frames[a_sprite.get_frame_index()];

                    components
                        .texture_layers
                        .append(&mut [frame.texture_index as f32; 4].to_vec());

                    components.source.extend(frame.source_rect);

                    let [x, y, width, height] = frame.destination_rect;

                    let SCALE = 0.5;
                    [
                        (x, y + height),
                        (x + width, y + height),
                        (x + width, y),
                        (x, y),
                    ]
                    .into_iter()
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
                        let outputVec = mat4::vector_times_matrix(vector, planeMatrix);

                        (
                            outputVec[0] / outputVec[3],
                            outputVec[1] / outputVec[3],
                            outputVec[2] / outputVec[3],
                        )
                    })
                    .map(|(x, y, z)| (x + self.position.0, y, z + self.position.1))
                    .for_each(|(x, y, z)| {
                        components.destination.append(&mut [x, y, z, 1.0].to_vec())
                    });

                    components.color_matrix_idx.append(&mut [0.0; 4].to_vec());
                }
            });
    }
}

const MAP_VERTICAL_MOD: f32 = 0.52;

fn map_angle_to_index(angle: f32, num_of_angles: usize) -> usize {
    let angle_slize = (1.0 / (num_of_angles as f32)) * MATH_PI * 2.0;

    let top_view_angle = angle.sin().atan2(angle.cos() / MAP_VERTICAL_MOD);

    let shifted_by_half = top_view_angle - angle_slize / 2.0;
    let positive_angle = shifted_by_half + MATH_PI * 2.0;
    let angleSlizeIndex = (positive_angle / angle_slize).ceil() as usize % num_of_angles;

    angleSlizeIndex
}
