mod attach_bridge_vertex;
mod attach_platform_vertex; // we should not expose this mod further
mod components_to_buffer;
mod consts;

use attach_bridge_vertex::attachBridgeVertex;
use attach_platform_vertex::attach_platform_vertex;
use components_to_buffer::components_to_buffer;

pub struct EnvVertex {
    pub buffer: Vec<f32>,
}

struct VertexComponents {
    texture_layers: Vec<f32>,
    destination: Vec<f32>,
    source: Vec<f32>,
    indicies: Vec<usize>,
    color_matrix_idx: Vec<f32>,
    normals: Vec<f32>,
}

impl EnvVertex {
    pub fn new(platforms: Vec<Vec<(f32, f32)>>, bridges: Vec<Vec<(f32, f32)>>) -> EnvVertex {
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

        EnvVertex {
            buffer: components_to_buffer(components),
        }
    }
}
