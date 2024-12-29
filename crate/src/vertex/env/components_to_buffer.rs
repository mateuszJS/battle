use crate::vertex::consts::STRIDE;

use super::VertexComponents;

pub fn components_to_buffer(components: VertexComponents) -> Vec<f32> {
    let mut output = vec![0.0f32; components.indicies.len() * STRIDE];

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
            let texSliceIndex =
                &components.texture_layers[texSliceIndexNdx..texSliceIndexNdx + texSliceIndexSize];
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
