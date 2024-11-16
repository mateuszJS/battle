import Rect from "Rect";
import shaderCode from "./shader.wgsl"

export default function getProgram(
  device: GPUDevice,
  presentationFormat: GPUTextureFormat
) {
  const module = device.createShaderModule({
    label: 'texture module',
    code: shaderCode,
  });

  const sampler = device.createSampler({
    minFilter: 'linear',
    magFilter: 'linear',
  });

  const pipeline = device.createRenderPipeline({
    label: 'texture pipeline',
    layout: 'auto',
    vertex: {
      module,
      entryPoint: 'vs',
      buffers: [
        {
          arrayStride: (2) * 4, // (2) floats, 4 bytes each
          attributes: [
            {shaderLocation: 0, offset: 0, format: 'float32x2'},  // position
          ] as const,
        },
        {
          arrayStride: (2) * 4, // (2) floats, 4 bytes each
          attributes: [
            {shaderLocation: 1, offset: 0, format: 'float32x2'},  // position
          ] as const,
        },
      ],
    },
    fragment: {
      module,
      entryPoint: 'fs',
      targets: [{
        format: presentationFormat,
        blend: {
          color: {
            srcFactor: 'one',
            dstFactor: 'one-minus-src-alpha'
          },
          alpha: {
            srcFactor: 'one',
            dstFactor: 'one-minus-src-alpha'
          },
        },
      }],
    },
  });

  return function drawTexture(
    pass: GPURenderPassEncoder,
    texture: GPUTexture,
    matrix: Float32Array,
    textUVs: Float32Array,
    textureOffset: Point,
  ) {

  // color, matrix
  const uniformBufferSize = (12/*matrix*/) * 4;
  const uniformBuffer = device.createBuffer({
    label: 'uniforms',
    size: uniformBufferSize,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });

  const uniformValues = new Float32Array(uniformBufferSize / 4);
  // offsets to the various uniform values in float32 indices
  const kMatrixOffset = 0;
  const matrixValue = uniformValues.subarray(kMatrixOffset, kMatrixOffset + 12);

  const width = 48
  const height = 28
  const x = 100 + textureOffset.x * width
  const y = 100 + textureOffset.y * height

  const vertexPositionData = new Float32Array([
    x,          y,
    x + width,  y,
    x + width,  y + height,
    x,          y + height
  ])
  const vertexPositionBuffer = device.createBuffer({
    label: 'vertex buffer vertices',
    size: vertexPositionData.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  });
  device.queue.writeBuffer(vertexPositionBuffer, 0, vertexPositionData);

  const vertexTexCoordBuffer = device.createBuffer({
    label: 'vertex buffer vertices',
    size: textUVs.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  });
  device.queue.writeBuffer(vertexTexCoordBuffer, 0, textUVs);



  const indexData = new Uint32Array([
    0, 1, 2,
    0, 2, 3
  ])
  const numVertices = 6
  const indexBuffer = device.createBuffer({
    label: 'index buffer',
    size: indexData.byteLength,
    usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST,
  });
  device.queue.writeBuffer(indexBuffer, 0, indexData);



    // bind group should be pre-created and reuse instead of constantly initialized
    const bindGroup = device.createBindGroup({
      layout: pipeline.getBindGroupLayout(0),
      entries: [
        { binding: 0, resource: { buffer: uniformBuffer }},
        { binding: 1, resource: sampler },
        { binding: 2, resource: texture.createView() },
      ],
    });



    pass.setPipeline(pipeline);
    pass.setVertexBuffer(0, vertexPositionBuffer);
    pass.setVertexBuffer(1, vertexTexCoordBuffer);
    pass.setIndexBuffer(indexBuffer, 'uint32');
    // mat3.translate(matrixValue, [x, 0], matrixValue);
    matrixValue.set(matrix)
    device.queue.writeBuffer(uniformBuffer, 0, uniformValues);

    pass.setBindGroup(0, bindGroup);
    // pass.draw(4);  // call our vertex shader 6 times
    pass.drawIndexed(numVertices);
  }
}
