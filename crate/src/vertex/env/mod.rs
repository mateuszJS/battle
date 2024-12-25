mod attach_platform_vertex; // we should not expose this mod further
mod consts;

use super::VertexComponents;

pub struct EnvVertex {
    components: VertexComponents,
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
        log!("platforms len: {}", platforms.len());

        platforms.iter().for_each(|platform| {
            log!("platform.len: {}", platform.len());
            attach_platform_vertex::attach_platform_vertex(
                // this function si too big to be a part of envUI
                &mut components,
                platform, //&bridges[..],
            )
        });
        log!(
            "components.destination len: {}",
            components.destination.len()
        );

        // bridges.for_each(|bridge: &Vec<f32>| attach_bridge_vertex(components, indicies, bridge));

        EnvVertex { components }
    }

    pub fn add_vertex(&self, components: &mut VertexComponents) {
        let env = &self.components;
        // maybe instead of concat we can do push with multiple items?
        components.texture_layers.extend(&env.texture_layers[..]);
        components.destination.extend(&env.destination[..]);
        components.source = [&components.source[..], &env.source[..]].concat();
        components.indicies = [&components.indicies[..], &env.indicies[..]].concat();
        components.color_matrix_idx =
            [&components.color_matrix_idx[..], &env.color_matrix_idx[..]].concat();
        components.normals = [&components.normals[..], &env.normals[..]].concat();
    }
}
