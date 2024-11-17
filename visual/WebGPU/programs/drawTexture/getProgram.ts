import Rect from "Rect";
import shaderCode from "./shader.wgsl"
import { VertexData } from "WebGPU/AnimatedSprite";

export default function getProgram(
  device: GPUDevice,
  presentationFormat: GPUTextureFormat
) {
  const module = device.createShaderModule({
    label: 'texture module',
    code: shaderCode,
  });

  const sampler = device.createSampler({
    minFilter: 'nearest',
    magFilter: 'nearest',
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
            {shaderLocation: 0, offset: 0, format: 'float32x2'},  // destination position
          ] as const,
        },
        {
          arrayStride: (2) * 4, // (2) floats, 4 bytes each
          attributes: [
            {shaderLocation: 1, offset: 0, format: 'float32x2'},  // source position
          ] as const,
        },
        {
          arrayStride: (1) * 4,
          attributes: [
            {shaderLocation: 2, offset: 0, format: 'uint32'},  // source texture layer
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
    matrix: Float32Array,
    vertexData: VertexData,
    texture: GPUTexture,
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


  const { destinationRect, sourceRect, index, layer } = vertexData.getBakedData()

  const vertexPositionBuffer = device.createBuffer({
    label: 'vertex buffer vertices',
    size: destinationRect.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  });
  device.queue.writeBuffer(vertexPositionBuffer, 0, destinationRect);

  const vertexTexCoordBuffer = device.createBuffer({
    label: 'vertex buffer vertices',
    size: sourceRect.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  });
  device.queue.writeBuffer(vertexTexCoordBuffer, 0, sourceRect);

  const vertexLayerBuffer = device.createBuffer({
    label: 'vertex buffer layer',
    size: layer.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  });
  device.queue.writeBuffer(vertexLayerBuffer, 0, layer);

  const numVertices = 6
  const indexBuffer = device.createBuffer({
    label: 'index buffer',
    size: index.byteLength,
    usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST,
  });
  device.queue.writeBuffer(indexBuffer, 0, index);



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
    pass.setVertexBuffer(2, vertexLayerBuffer);
    pass.setIndexBuffer(indexBuffer, 'uint32');
    // mat3.translate(matrixValue, [x, 0], matrixValue);
    matrixValue.set(matrix)
    device.queue.writeBuffer(uniformBuffer, 0, uniformValues);

    pass.setBindGroup(0, bindGroup);
    // pass.draw(4);  // call our vertex shader 6 times
    pass.drawIndexed(numVertices);
  }
}
