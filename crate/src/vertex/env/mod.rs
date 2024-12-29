mod attach_bridge_vertex;
mod attach_platform_vertex; // we should not expose this mod further
mod components_to_buffer;
mod consts;

use attach_bridge_vertex::attachBridgeVertex;
use attach_platform_vertex::attach_platform_vertex;
use components_to_buffer::components_to_buffer;

struct VertexComponents {
    texture_layers: Vec<f32>,
    destination: Vec<f32>,
    source: Vec<f32>,
    indicies: Vec<usize>,
    color_matrix_idx: Vec<f32>,
    normals: Vec<f32>,
}

pub fn attach_env_vertex(
    buffer: &mut Vec<f32>,
    platforms: Vec<Vec<(f32, f32)>>,
    bridges: Vec<Vec<(f32, f32)>>,
) {
    let mut components = VertexComponents {
        texture_layers: vec![],
        destination: vec![],
        source: vec![],
        indicies: vec![],
        color_matrix_idx: vec![],
        normals: vec![],
    };

    platforms.iter().for_each(|platform| {
        attach_platform_vertex(
            // this function si too big to be a part of envUI
            &mut components,
            platform,
            &bridges,
        );
    });

    bridges.iter().for_each(|bridge| {
        attachBridgeVertex(&mut components, bridge);
    });

    buffer.append(&mut components_to_buffer(components));
}
