use super::{consts::RAILING_POINT_OFFSETS, VertexComponents};
use crate::{
    constants::MATH_PI,
    utils::{comparef32, hypot},
};

const BRIDGE_INDICIES: [usize; 42] = [
    // that expanded bridge upper
    1, 2, 14, //
    14, 13, 1, //
    //
    6, 5, 9, //
    9, 10, 6, //
    //
    // top middle main part
    3, 7, 11, //
    11, 15, 3, //
    //
    //inner side
    7, 6, 10, //
    10, 11, 7, //
    //
    2, 3, 15, //
    15, 14, 2, //
    //
    // outer side
    0, 1, 13, //
    13, 12, 0, //
    //
    5, 4, 8, //
    8, 9, 5, //
];

const BRIDGE_NORMALS_TOP: [f32; 18] = [
    // that expanded bridge upper
    0.0, 1.0, 0.0, //
    0.0, 1.0, 0.0, //
    //
    0.0, 1.0, 0.0, //
    0.0, 1.0, 0.0, //
    //
    // top middle main part
    0.0, 1.0, 0.0, //
    0.0, 1.0, 0.0, //
];

const TEXTURE_POINTS: [(f32, f32); 4] = [(0.0, 0.0), (1.0, 0.0), (1.0, 1.0), (0.0, 1.0)];

const MAP_POINT_INDEX_TO_SIBLING_INDEX: [usize; 4] = [1, 0, 3, 2];

const MAP_POINT_INDEX_TO_OPPOSITE_INDEX: [usize; 4] = [3, 2, 1, 0];

pub fn getDestinationPoints(
    p: &(f32, f32),
    index: usize,
    points: &Vec<(f32, f32)>,
    offset: &(f32, f32),
) -> [f32; 4] {
    let siblingPoint = points[MAP_POINT_INDEX_TO_SIBLING_INDEX[index]];
    let siblingAngle = (p.1 - siblingPoint.1).atan2(siblingPoint.0 - p.0);

    let mut correctionOffset = (0.0, 0.0);
    // for second and third point we need to move it a bit closer to the center of avoid bridge_offsets.png
    if comparef32(offset.0, 0.0) {
        let oppositePoint = points[MAP_POINT_INDEX_TO_OPPOSITE_INDEX[index]];
        let oppositeAngle = (p.1 - oppositePoint.1).atan2(oppositePoint.0 - p.0);

        correctionOffset.0 = -oppositeAngle.cos() * 10.0; // 10 is purely by visual testing
        correctionOffset.1 = oppositeAngle.sin() * 10.0;
    }

    [
        p.0 - siblingAngle.cos() * offset.0 + correctionOffset.0,
        offset.1,
        p.1 + siblingAngle.sin() * offset.0 + correctionOffset.1,
        1.0,
    ]
}

pub fn attachBridgeVertex(components: &mut VertexComponents, points: &Vec<(f32, f32)>) {
    let verticies_num = components.destination.len() / 4;
    components
        .indicies
        .append(&mut BRIDGE_INDICIES.iter().map(|i| verticies_num + i).collect());

    let bridgeDirection = (points[3].1 - points[0].1).atan2(points[0].0 - points[3].0);
    let perpendicular = bridgeDirection + MATH_PI / 2.0;

    components.normals.extend(
        [
            &BRIDGE_NORMALS_TOP[..],
            // railing inner side
            &mut vec![
                -perpendicular.cos(),
                0.0,
                perpendicular.sin(),
                -perpendicular.cos(),
                0.0,
                perpendicular.sin(),
                -(perpendicular + MATH_PI).cos(),
                0.0,
                (perpendicular + MATH_PI).sin(),
                -(perpendicular + MATH_PI).cos(),
                0.0,
                (perpendicular + MATH_PI).sin(),
                // railing outer side
                -perpendicular.cos(),
                0.0,
                perpendicular.sin(),
                -perpendicular.cos(),
                0.0,
                perpendicular.sin(),
                //
                -(perpendicular + MATH_PI).cos(),
                0.0,
                (perpendicular + MATH_PI).sin(),
                -(perpendicular + MATH_PI).cos(),
                0.0,
                (perpendicular + MATH_PI).sin(),
            ][..],
        ]
        .concat(),
    );

    points.iter().enumerate().for_each(|(index, p)| {
        RAILING_POINT_OFFSETS
            .iter()
            .enumerate()
            .for_each(|(offsetIndex, offset)| {
                components
                    .destination
                    .append(&mut getDestinationPoints(p, index, points, offset).to_vec());
                components.texture_layers.push(10.0);
                components.source.push(TEXTURE_POINTS[offsetIndex].0);
                components.source.push(TEXTURE_POINTS[offsetIndex].1);
                components.color_matrix_idx.push(0.0);
            })
    });
}

// match args.nth(1).as_deref() {
//   Some("help") => {}
//   Some(s) => {}
//   None => {}
// }

pub fn get_bridge_point(
    point: &(f32, f32),
    bridges: &Vec<Vec<(f32, f32)>>,
    railingPointOffset: &(f32, f32),
) -> Option<[f32; 4]> {
    let mut destinationPoint = None;

    for bridgePoints in bridges.iter() {
        for (index, bp) in bridgePoints.iter().enumerate() {
            if hypot(bp.0 - point.0, bp.1 - point.1) < 1.0 {
                return Some(getDestinationPoints(
                    bp,
                    index,
                    bridgePoints,
                    railingPointOffset,
                ));
            }
        }
    }

    destinationPoint
}

pub fn is_bridge(
    point: &(f32, f32),
    bridges: &Vec<Vec<(f32, f32)>>,
    railing_point_offset: &(f32, f32),
) -> bool {
    match get_bridge_point(point, bridges, railing_point_offset) {
        Some(_point) => true,
        None => false,
    }
}
