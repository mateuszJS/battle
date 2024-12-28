mod animated_sprite;
mod assets_descriptor;
mod env;
mod mat4;
mod unit;

use animated_sprite::AnimatedSprite;
pub use assets_descriptor::initialize_assets_descriptor;
use assets_descriptor::AssetId;
use env::EnvVertex;
use unit::UnitVertex;

use crate::utils::comparef32;

static mut DEBUG: bool = true;

pub struct VertexComponents {
    texture_layers: Vec<f32>,
    destination: Vec<f32>,
    source: Vec<f32>,
    indicies: Vec<usize>,
    color_matrix_idx: Vec<f32>,
    normals: Vec<f32>,
}

pub struct Vertex {
    env: EnvVertex,
    unit: UnitVertex,
    last_sprites_angle_offset: f32,
}

impl Vertex {
    pub fn new(
        platforms: Vec<Vec<(f32, f32)>>,
        bridges: Vec<Vec<(f32, f32)>>,
        sprites_angle_offset: f32,
    ) -> Vertex {
        Vertex {
            env: EnvVertex::new(platforms, bridges),
            unit: UnitVertex::new(
                unit::UnitState::RUN,
                0.0,
                (100.0, 100.0),
                vec![
                    AssetId::RegularBody,
                    AssetId::RegularAccesories,
                    AssetId::ElephantHead,
                ],
                0.0,
            ),
            last_sprites_angle_offset: sprites_angle_offset,
        }
    }

    pub fn update(&mut self, dt: f32, sprites_angle_offset: f32) {
        self.unit.update(
            0.0,
            unit::UnitState::RUN,
            dt,
            sprites_angle_offset,
            !comparef32(sprites_angle_offset, self.last_sprites_angle_offset),
        );
        self.last_sprites_angle_offset = sprites_angle_offset;
    }

    pub fn get_vertex(&self, planeMatrix: [f32; 16], fullLightAngle: [f32; 3]) -> Vec<f32> {
        let mut components = VertexComponents {
            texture_layers: vec![],
            destination: vec![],
            source: vec![],
            indicies: vec![],
            color_matrix_idx: vec![],
            normals: vec![],
        };

        self.env.add_vertex(&mut components);

        self.unit
            .add_vertex(&mut components, planeMatrix, fullLightAngle);

        let stride: usize =
          4/*destination position*/ +
          2/*source rect*/ +
          1/*texture array layer*/ +
          1/*color matrix index*/ +
          4/*normals - vec3 + padding = 4*/;
        let mut output = vec![0.0f32; components.indicies.len() * stride];

        components
            .indicies
            .iter()
            .enumerate()
            .for_each(|(i, index)| {
                // let mut offset: usize = 0;

                let targetSize = 4; /* number of digits in a single vertex */
                let targetNdx = index * targetSize;
                let target = &components.destination[targetNdx..targetNdx + targetSize];
                output.extend_from_slice(target);
                // float32View.set(target, i * stride);
                // offset += targetSize

                let sourceSize = 2;
                let sourceNdx = index * sourceSize;
                let source = &components.source[sourceNdx..sourceNdx + sourceSize];
                output.extend_from_slice(source);
                // float32View.set(source, i * stride + offset);
                // offset += sourceSize

                let texSliceIndexSize = 1;
                let texSliceIndexNdx = index * texSliceIndexSize;
                let texSliceIndex = &components.texture_layers
                    [texSliceIndexNdx..texSliceIndexNdx + texSliceIndexSize];
                output.extend_from_slice(texSliceIndex);
                // uint32View.set(texSliceIndex, i * stride + offset)
                // offset += texSliceIndexSize

                let colorMatrixIndexSize = 1;
                let colorMatrixIndexNdx = index * colorMatrixIndexSize;
                let colorMatrixIndex = &components.color_matrix_idx
                    [colorMatrixIndexNdx..colorMatrixIndexNdx + colorMatrixIndexSize];
                output.extend_from_slice(colorMatrixIndex);
                // uint32View.set(colorMatrixIndex, i * stride + offset)
                // offset += colorMatrixIndexSize

                let normalsSize = 3;
                let normalsNdx = (i / 3) * normalsSize;
                let normals = &components.normals[normalsNdx..normalsNdx + normalsSize];
                output.extend_from_slice(normals);
                output.push(0.0); //padding
                                  // float32View.set(normals, i * stride + offset)
                                  // offset += normalsSize
            });

        output
    }
}
