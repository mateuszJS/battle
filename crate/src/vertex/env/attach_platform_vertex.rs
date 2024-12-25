use super::attach_bridge_vertex::{getBridgePoint, is_bridge};
use super::consts::RAILING_POINT_OFFSETS;
use super::VertexComponents;
use crate::constants::MATH_PI;

/** top, right, bottom, left booleans indicates which one
 * should remain closed(connect with next platform vertex)
 */
fn get_indicies(top: bool, right: bool, bottom: bool, left: bool) -> Vec<usize> {
    let mut indicies: Vec<usize> = vec![
        // top middle center
        7, 3, 11, //
        15, 11, 19, //
        23, 19, 27, //
        31, 27, 3, //
        11, 3, 19, //
        27, 19, 3, //
    ];

    //t's { vec_a.append(&mut vec_b); vec_a } :slight_smile:
    // top of railings
    if top {
        indicies.append(&mut vec![
            1, 2, 6, //
            6, 5, 1, //
        ]);
    }

    indicies.append(&mut vec![
        5, 6, 10, //
        10, 9, 5, //
    ]);

    if right {
        indicies.append(&mut vec![
            9, 10, 14, //
            14, 13, 9, //
        ]);
    }

    indicies.append(&mut vec![
        13, 14, 18, //
        18, 17, 13, //
    ]);

    if bottom {
        indicies.append(&mut vec![
            18, 22, 21, //
            21, 17, 18, //
        ]);
    }

    indicies.append(&mut vec![
        21, 22, 26, //
        26, 25, 21, //
    ]);

    if left {
        indicies.append(&mut vec![
            25, 26, 30, //
            30, 29, 25, //
        ]);
    }

    indicies.append(&mut vec![
        29, 30, 2, //
        2, 1, 29, //
    ]);

    // outter side of railing
    if top {
        indicies.append(&mut vec![
            1, 5, 4, //
            4, 0, 1, //
        ]);
    }

    indicies.append(&mut vec![
        5, 9, 8, //
        8, 4, 5, //
    ]);

    if right {
        indicies.append(&mut vec![
            9, 13, 12, //
            12, 8, 9, //
        ]);
    }

    indicies.append(&mut vec![
        12, 13, 17, //
        17, 16, 12, //
    ]);

    if bottom {
        indicies.append(&mut vec![
            16, 17, 21, //
            21, 20, 16, //
        ]);
    }

    indicies.append(&mut vec![
        20, 21, 25, //
        25, 24, 20, //
    ]);

    if left {
        indicies.append(&mut vec![
            24, 25, 29, //
            29, 28, 24, //
        ]);
    }

    indicies.append(&mut vec![
        28, 29, 1, //
        1, 0, 28, //
    ]);

    // inner side of rialing
    if top {
        indicies.append(&mut vec![
            7, 6, 2, //
            2, 3, 7, //
        ]);
    }

    indicies.append(&mut vec![
        11, 10, 6, //
        6, 7, 11, //
    ]);

    if right {
        indicies.append(&mut vec![
            15, 14, 10, //
            10, 11, 15, //
        ]);
    }

    indicies.append(&mut vec![
        19, 18, 14, //
        14, 15, 19, //
    ]);

    if bottom {
        indicies.append(&mut vec![
            23, 22, 18, //
            18, 19, 23, //
        ]);
    }

    indicies.append(&mut vec![
        27, 26, 22, //
        22, 23, 27, //
    ]);

    if left {
        indicies.append(&mut vec![
            31, 30, 26, //
            26, 27, 31, //
        ]);
    }

    indicies.append(&mut vec![
        3, 2, 30, //
        30, 31, 3, //
    ]);
    return indicies;
}

fn get_normals(top: bool, right: bool, bottom: bool, left: bool) -> Vec<f32> {
    let mut normals: Vec<f32> = vec![
        // top middle center
        0.0, 0.1, 0.0, //
        0.0, 0.1, 0.0, //
        //
        0.0, 0.1, 0.0, //
        0.0, 0.1, 0.0, //
        //
        0.0, 0.1, 0.0, //
        0.0, 0.1, 0.0, //
    ];

    // top of railings
    if top {
        normals.append(&mut vec![
            0.0, 0.1, 0.0, //
            0.0, 0.1, 0.0, //
        ]);
    }

    normals.append(&mut vec![
        0.0, 0.1, 0.0, //
        0.0, 0.1, 0.0, //
    ]);

    if right {
        normals.append(&mut vec![
            0.0, 0.1, 0.0, //
            0.0, 0.1, 0.0, //
        ]);
    }

    normals.append(&mut vec![
        0.0, 0.1, 0.0, //
        0.0, 0.1, 0.0, //
    ]);

    if bottom {
        normals.append(&mut vec![
            0.0, 0.1, 0.0, //
            0.0, 0.1, 0.0, //
        ]);
    }

    normals.append(&mut vec![
        0.0, 0.1, 0.0, //
        0.0, 0.1, 0.0, //
    ]);

    if left {
        normals.append(&mut vec![
            0.0, 0.1, 0.0, //
            0.0, 0.1, 0.0, //
        ]);
    }

    normals.append(&mut vec![
        0.0, 0.1, 0.0, //
        0.0, 0.1, 0.0, //
    ]);

    // outter side of railing
    if top {
        normals.append(&mut vec![
            0.0, 0.0, -0.1, //
            0.0, 0.0, -0.1, //
        ]);
    }

    normals.append(&mut vec![
        (MATH_PI * 0.25).cos(),
        0.0,
        -(MATH_PI * 0.25).sin(), //
        (MATH_PI * 0.25).cos(),
        0.0,
        -(MATH_PI * 0.25).sin(), //
    ]);

    if right {
        normals.append(&mut vec![
            0.1, 0.0, 0.0, //
            0.1, 0.0, 0.0, //
        ]);
    }

    normals.append(&mut vec![
        (MATH_PI * -0.25).cos(),
        0.0,
        -(MATH_PI * -0.25).sin(), //
        (MATH_PI * -0.25).cos(),
        0.0,
        -(MATH_PI * -0.25).sin(), //
    ]);

    if bottom {
        normals.append(&mut vec![
            0.0, 0.0, 0.1, //
            0.0, 0.0, 0.1, //
        ]);
    }

    normals.append(&mut vec![
        (MATH_PI * -0.75).cos(),
        0.0,
        -(MATH_PI * -0.75).sin(), //
        (MATH_PI * -0.75).cos(),
        0.0,
        -(MATH_PI * -0.75).sin(), //
    ]);

    if left {
        normals.append(&mut vec![
            -0.1, 0.0, 0.0, //
            -0.1, 0.0, 0.0, //
        ]);
    }

    normals.append(&mut vec![
        (MATH_PI * 0.75).cos(),
        0.0,
        -(MATH_PI * 0.75).sin(), //
        (MATH_PI * 0.75).cos(),
        0.0,
        -(MATH_PI * 0.75).sin(), //
    ]);

    // inner side of rialing
    if top {
        normals.append(&mut vec![
            0.0, 0.0, 0.1, //
            0.0, 0.0, 0.1, //
        ]);
    }

    normals.append(&mut vec![
        (MATH_PI * -0.75).cos(),
        0.0,
        -(MATH_PI * -0.75).sin(), //
        (MATH_PI * -0.75).cos(),
        0.0,
        -(MATH_PI * -0.75).sin(), //
    ]);

    if right {
        normals.append(&mut vec![
            -0.1, 0.0, 0.0, //
            -0.1, 0.0, 0.0, //
        ]);
    }

    normals.append(&mut vec![
        (MATH_PI * 0.75).cos(),
        0.0,
        -(MATH_PI * 0.75).sin(), //
        (MATH_PI * 0.75).cos(),
        0.0,
        -(MATH_PI * 0.75).sin(), //
    ]);

    if bottom {
        normals.append(&mut vec![
            0.0, 0.0, -0.1, //
            0.0, 0.0, -0.1, //
        ]);
    }

    normals.append(&mut vec![
        (MATH_PI * 0.25).cos(),
        0.0,
        -(MATH_PI * 0.25).sin(), //
        (MATH_PI * 0.25).cos(),
        0.0,
        -(MATH_PI * 0.25).sin(), //
    ]);

    if left {
        normals.append(&mut vec![
            0.1, 0.0, 0.0, //
            0.1, 0.0, 0.0, //
        ]);
    }

    normals.append(&mut vec![
        (MATH_PI * -0.25).cos(),
        0.0,
        -(MATH_PI * -0.25).sin(), //
        (MATH_PI * -0.25).cos(),
        0.0,
        -(MATH_PI * -0.25).sin(), //
    ]);
    return normals;
}

const TEXTURE_POINTS: [(f32, f32); 4] = [(0.0, 0.0), (0.5, 0.0), (0.5, 1.0), (0.0, 1.0)];
const POINT_ZERO: (f32, f32) = (0.0, 0.0);
pub fn attach_platform_vertex(
    components: &mut VertexComponents,
    points: &Vec<(f32, f32)>,
    bridges: &Vec<Vec<(f32, f32)>>,
) {
    let closed_gates = vec![
        !is_bridge(&points[0], bridges, &POINT_ZERO),
        !is_bridge(&points[2], bridges, &POINT_ZERO),
        !is_bridge(&points[4], bridges, &POINT_ZERO),
        !is_bridge(&points[6], bridges, &POINT_ZERO),
    ];
    let last_destination = components.destination.len() / 4;
    let mut next_indicies = get_indicies(
        closed_gates[0],
        closed_gates[1],
        closed_gates[2],
        closed_gates[3],
    )
    .iter()
    .map(|i| last_destination + i)
    .collect::<Vec<usize>>();

    components.indicies.append(&mut next_indicies);

    components.normals.append(&mut get_normals(
        closed_gates[0],
        closed_gates[1],
        closed_gates[2],
        closed_gates[3],
    ));
    // (...getNormals(...closedGates))

    let points_len = points.len() as f32;
    let center = points.iter().fold((0.0, 0.0), |(avg_x, avg_y), (x, y)| {
        (avg_x + x / points_len, avg_y + y / points_len)
    });

    points.iter().for_each(|(x, y)| {
        let angle = (y - center.1).atan2(center.0 - x);

        RAILING_POINT_OFFSETS
            .iter()
            .enumerate()
            .for_each(|(offset_index, offset)| {
                // let bridge_destination_point = get_bridge_point(p, bridges, offset);
                // if bridge_destination_point {
                //    destinationData.push(...bridgeDestinationPoint)
                // } else {
                components.destination.append(&mut vec![
                    x - angle.cos() * offset.0,
                    offset.1,
                    y + angle.sin() * offset.0,
                    1.0,
                ]);
                // }
                components.texture_layers.push(10.0); // we might want to add like 0.1, just to make sure there isno correction while covnertin to integers
                components.source.push(TEXTURE_POINTS[offset_index].0);
                components.source.push(TEXTURE_POINTS[offset_index].1);
                components.color_matrix_idx.push(0.0);
            })
    })
}
