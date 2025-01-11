mod consts;

use std::{collections::HashMap, hash::Hash, sync::Mutex};

pub use consts::ObjType;
use serde::{Deserialize, Serialize};

use crate::{constants::MATH_PI, utils::hypot};

#[derive(Serialize, Deserialize)]
pub struct SetupObjs {
    standard_portal: Vec<f32>,
}
lazy_static! {
  static ref SETUP_OBJS: Mutex<Option<SetupObjs>> = Mutex::new(None);
  // have to use Mutex, cannot capture dynamic environment (option) in static block
}

pub fn init_objs(option_setup_objs: Option<SetupObjs>) {
    *SETUP_OBJS.lock().unwrap() = option_setup_objs;
}

lazy_static! {
    pub static ref OBJS: HashMap<ObjType, Vec<f32>> = {
        let mutex_objs = SETUP_OBJS.lock().unwrap();
        let objs = mutex_objs.as_ref().unwrap();
        HashMap::from([(ObjType::StandardPortal, objs.standard_portal.to_vec())])
        // there should be a better way than doing copy by 'to_vec()'
    };
}

fn add_obj(buffer: &mut Vec<f32>, obj_type: &ObjType, angle: f32, x: f32, y: f32, time: f32) {
    /*
    SELF TIME
    1.33ms - 1.44ms
    // append is my 0.3ms better than extend
    .push is just above 1ms, it's the fastets one so far
    core::slice::raw::from_raw_parts::precondition_check::h8335663e1dc65bd1

         */
    let modifier = (2.0f32).powf((time % 15000.0) * 0.001);
    match &OBJS.get(obj_type) {
        Some(verticies) => {
            let mut i = 0;
            while i < verticies.len() {
                let position_angle = verticies[i + 0] + angle; // + modifier * verticies[i + 2] / 100.0;
                let norm_angle = verticies[i + 7] + angle; // + modifier * verticies[i + 2] / 100.0;

                buffer.push(position_angle.cos() * verticies[i + 1] + x);
                buffer.push(verticies[i + 2]);
                buffer.push(-position_angle.sin() * verticies[i + 1] + y);
                buffer.push(1.0);
                buffer.push(verticies[i + 3]);
                buffer.push(verticies[i + 4]);
                buffer.push(verticies[i + 5]);
                buffer.push(verticies[i + 6]);
                buffer.push(norm_angle.cos() * verticies[i + 8]);
                buffer.push(verticies[i + 9]);
                buffer.push(-norm_angle.sin() * verticies[i + 8]);
                buffer.push(0.0);

                i += 10;
            }
        }
        None => {
            err!("obj_type was not found in static OBJS");
        }
    }
}

pub fn add_complex_model(
    buffer: &mut Vec<f32>,
    obj_type: &ObjType,
    angle: f32,
    x: f32,
    y: f32,
    time: f32,
) {
    match obj_type {
        ObjType::StandardPortal => {
            let angle_perpendicular = angle + MATH_PI * 0.5;
            let portal_gates_span = 40.0;
            add_obj(
                buffer,
                obj_type,
                angle + MATH_PI,
                x + angle_perpendicular.cos() * portal_gates_span,
                y - angle_perpendicular.sin() * portal_gates_span,
                time,
            );

            add_obj(
                buffer,
                obj_type,
                angle,
                x + angle_perpendicular.cos() * -portal_gates_span,
                y - angle_perpendicular.sin() * -portal_gates_span,
                time,
            );
        }
    }
}
