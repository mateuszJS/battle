use std::{collections::HashMap, hash::Hash, sync::Mutex};

use serde::{Deserialize, Serialize};

use crate::{constants::MATH_PI, utils::hypot};

pub enum EffectType {
    StandardPortal,
}

pub fn add_effect(
    buffer: &mut Vec<f32>,
    effect: &EffectType,
    x: f32,
    y: f32,
    angle: f32,
    time: f32,
) {
    let modifier = (2.0f32).powf((time % 15000.0) * 0.001);
    let perpendicular_angle = angle + MATH_PI * 0.5;

    match effect {
        EffectType::StandardPortal => {
            let width = 150.0;
            let height = width * 1.5;
            let half_side_texture_coords = [
                (0.15, 1.0),  //
                (0.15, 0.8),  //
                (0.55, 0.45), //
                (0.55, 0.25), //
                (0.27, 0.13), //
                (0.27, 0.0),  //
            ];
            let verticies: Vec<(f32, f32)> = half_side_texture_coords
                .iter()
                .flat_map(|(offset_x, offset_y)| {
                    vec![
                        (-*offset_x * width, *offset_y * height),
                        (*offset_x * width, *offset_y * height),
                    ]
                })
                .collect();

            let texture_coords: Vec<(f32, f32)> = half_side_texture_coords
                .iter()
                .flat_map(|(offset_x, offset_y)| {
                    vec![
                        (1.0 - (*offset_x + 0.5), *offset_y),
                        (*offset_x + 0.5, *offset_y),
                    ]
                })
                .map(|(offset_x, offset_y)| (offset_x, offset_y))
                .collect();

            let moved_verticies: Vec<[f32; 3]> = verticies
                .iter()
                .map(|(offset_x, offset_y)| {
                    [
                        x + perpendicular_angle.cos() * offset_x,
                        *offset_y,
                        y - perpendicular_angle.sin() * offset_x,
                    ]
                })
                .collect();

            let incidies: Vec<usize> = vec![
                1, 0, 2, //
                1, 2, 3, //
                3, 2, 4, //
                4, 6, 8, //
                9, 7, 5, //
                5, 3, 4, //
                4, 8, 5, //
                5, 8, 9, //
                9, 8, 10, //
                10, 11, 9, //
            ];
            incidies.iter().for_each(|i| {
                buffer.push(moved_verticies[*i][0]);
                buffer.push(moved_verticies[*i][1]);
                buffer.push(moved_verticies[*i][2]);
                buffer.push(1.0);

                buffer.push(texture_coords[*i].0);
                buffer.push(texture_coords[*i].1);
            });
        }
    }
}
