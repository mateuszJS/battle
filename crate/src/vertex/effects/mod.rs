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
            let height = width * 1.2;
            let half_side_texture_coords = [
                (0.15, 1.0), //
                (0.5, 0.6),  //
                (0.5, 0.3),  //
                (0.3, 0.15), //
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
                .map(|(offset_x, offset_y)| (offset_x, (offset_y - 0.15) / 0.85))
                .collect();

            let moved_verticies: Vec<[f32; 3]> = verticies
                .iter()
                .map(|(offset_x, offset_y)| {
                    [
                        // x + angle.cos() * offset_x,
                        // 10.0,
                        // y - angle.sin() * offset_y,
                        x + perpendicular_angle.cos() * offset_x,
                        *offset_y,
                        y - perpendicular_angle.sin() * offset_x,
                    ]
                })
                .collect();

            let incidies: Vec<usize> = vec![
                1, 0, 3, //
                0, 2, 4, //
                4, 6, 7, //
                7, 5, 3, //
                3, 0, 4, //
                4, 7, 3, //
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
