mod consts;
mod elephant_head;
mod regular_accessories;
mod regular_body;

use crate::FrameDetails;
use std::{collections::HashMap, sync::LazyLock, sync::Mutex};

use super::unit::UnitState;
pub use consts::AssetId;

struct AnimationDetails {
    prefix: String,
    animation_length: usize,
    angles: usize,
    time_per_frame: f32,
    frames: Vec<FrameDetails>,
}

const SCALE_USE_IN_TEXTURE_PACKER: f32 = 0.5;
const CENTER_PIVOT: (f32, f32) = (
    995.7482 * SCALE_USE_IN_TEXTURE_PACKER,
    1155.8067 * SCALE_USE_IN_TEXTURE_PACKER,
); // for now we made all assets with one and same pivot point
   // would be greta to stic this wy

static mut ASSETS_DESCRIPTOR: LazyLock<
    Mutex<HashMap<AssetId, HashMap<UnitState, AnimationDetails>>>,
> = LazyLock::new(|| {
    Mutex::new(HashMap::from([
        (AssetId::ElephantHead, elephant_head::get()),
        (AssetId::RegularAccesories, regular_accessories::get()),
        (AssetId::RegularBody, regular_body::get()),
    ]))
});

fn get_frame_name_prefix(full_name: &String) -> String {
    let len = full_name.len();
    full_name[..len - 9].to_string()
}

/*
.fold((0.0, 0.0), |(sum_x, sum_y), ref_cell_unit| {
  let unit = ref_cell_unit.borrow();
  (sum_x + unit.x, sum_y + unit.y)
});
*/

pub fn initialize_assets_descriptor(frames: Vec<FrameDetails>) {
    let mut frames_by_prefix: HashMap<String, Vec<FrameDetails>> = HashMap::new();

    frames.into_iter().for_each(|frame| {
        let name_prefix = get_frame_name_prefix(&frame.name);

        frames_by_prefix
            .entry(name_prefix)
            .or_insert_with(|| vec![])
            .push(frame);

        // frames_by_prefix
        //     .entry(name_prefix)
        //     .and_modify(|prefix_frames| prefix_frames.push(frame))
        //     .or_insert(vec![frame]);
    });

    /*
    hahs map in ASSETS_DESCRIPTOR seems unencessary, vector should be fine, we do not use assetId, same with state_to_aniamtion
     */

    unsafe {
        for (asset_id, state_to_animation) in ASSETS_DESCRIPTOR.lock().unwrap().iter_mut() {
            for (unit_state, animation_details) in state_to_animation.iter_mut() {
                match frames_by_prefix.remove(&animation_details.prefix) {
                    Some(prefix_frames) => {
                        animation_details.frames = prefix_frames;
                        animation_details.frames.sort_by(|a, b| a.name.cmp(&b.name));
                    }
                    None => {}
                }
            }
        }
    }
}
