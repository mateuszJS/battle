mod consts;
mod elephant_head;
mod regular_accessories;
mod regular_body;

use crate::SetupFrameDetails;
use std::{
    collections::HashMap,
    sync::{LazyLock, Mutex},
};

use super::unit::UnitState;
pub use consts::AssetId;

pub struct FrameDetails {
    pub source_rect: [f32; 8],
    pub destination_rect: [f32; 4], // maybe we should change it to [(f32, f32); 4]?
    pub texture_index: usize,
}

pub struct AnimationDetails {
    prefix: String,
    pub animation_length: usize,
    pub angles: usize,
    pub time_per_frame: f32,
    pub frames: Vec<FrameDetails>,
}

fn get_frame_name_prefix(full_name: &String) -> String {
    let len = full_name.len();
    full_name[..len - 9].to_string()
}

pub static mut FRAMES_BY_PREFIX: LazyLock<Mutex<HashMap<String, Vec<SetupFrameDetails>>>> =
    LazyLock::new(|| Mutex::new(HashMap::new()));

pub fn initialize_assets_descriptor(frames: Vec<SetupFrameDetails>) {
    frames.into_iter().for_each(|frame| {
        let name_prefix = get_frame_name_prefix(&frame.name);
        unsafe {
            FRAMES_BY_PREFIX
                .lock()
                .unwrap()
                .entry(name_prefix)
                .or_insert_with(|| vec![])
                .push(frame);
        }

        // frames_by_prefix
        //     .entry(name_prefix)
        //     .and_modify(|prefix_frames| prefix_frames.push(frame))
        //     .or_insert(vec![frame]);
    });
}

fn static_assets_descriptor() -> &'static HashMap<AssetId, HashMap<UnitState, AnimationDetails>> {
    lazy_static! {
        static ref ASSETS_DESCRIPTOR: HashMap<AssetId, HashMap<UnitState, AnimationDetails>> = {
            let mut output = HashMap::from([
                (AssetId::ElephantHead, elephant_head::get()),
                (AssetId::RegularAccesories, regular_accessories::get()),
                (AssetId::RegularBody, regular_body::get()),
            ]);

            for state_to_animation in output.values_mut() {
                for animation_details in state_to_animation.values_mut() {
                    unsafe {
                        match FRAMES_BY_PREFIX
                            .lock()
                            .unwrap()
                            .remove(&animation_details.prefix)
                        {
                            Some(mut prefix_frames) => {
                                prefix_frames.sort_by(|a, b| a.name.cmp(&b.name));
                                animation_details.frames = prefix_frames
                                    .into_iter()
                                    .map(|setup_frame_details| FrameDetails {
                                        destination_rect: setup_frame_details.destination_rect,
                                        source_rect: setup_frame_details.source_rect,
                                        texture_index: setup_frame_details.texture_index,
                                    })
                                    .collect::<Vec<FrameDetails>>();
                            }
                            None => {}
                        }
                    }
                }
            }

            output
        };
    }

    &ASSETS_DESCRIPTOR
}

pub fn get_asset_descriptor(asset_id: &AssetId, state: &UnitState) -> &'static AnimationDetails {
    let asset = static_assets_descriptor().get(asset_id).unwrap();
    match asset.get(&UnitState::DEFAULT) {
        Some(animation_descriptor) => animation_descriptor,
        None => asset.get(state).unwrap(),
    }
}
