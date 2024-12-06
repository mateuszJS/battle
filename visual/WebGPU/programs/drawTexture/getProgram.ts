import shaderCode from "./shader.wgsl"
import { VertexData } from "WebGPU/getVertexData";
 

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
          arrayStride: (4) * 4, // (2) floats, 4 bytes each
          attributes: [
            {shaderLocation: 0, offset: 0, format: 'float32x4'},  // destination position
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
        {
          arrayStride: (1) * 4,
          attributes: [
            {shaderLocation: 3, offset: 0, format: 'uint32'},  // index of color matrix
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

  const uniformBufferSize = (16/*projection matrix*/ + 2 * 12/*color matrix*/) * 4;
  const uniformBuffer = device.createBuffer({
    label: 'uniforms',
    size: uniformBufferSize,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });

  const uniformValues = new Float32Array(uniformBufferSize / 4);
  const kMatrixOffset = 0;
  const matrixValue = uniformValues.subarray(kMatrixOffset, kMatrixOffset + 16);


  const kColorMatrixOffset = 16;
  const colorMatrixValue = uniformValues.subarray(kColorMatrixOffset, kColorMatrixOffset + 2 * 12);

  return function drawTexture(
    pass: GPURenderPassEncoder,
    matrix: Float32Array,
    vertexData: VertexData,
    texture: GPUTexture,
    colorMatricies: Float32Array
  ) {

  const { destinationRect, sourceRect, index, layer, colorMatrixIdx } = vertexData.getBakedData()

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

  const vertexColorMatrixIndiciesBuffer = device.createBuffer({
    label: 'vertex buffer color matrix index',
    size: colorMatrixIdx.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  });
  device.queue.writeBuffer(vertexColorMatrixIndiciesBuffer, 0, colorMatrixIdx);

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
    pass.setVertexBuffer(3, vertexColorMatrixIndiciesBuffer);
    pass.setIndexBuffer(indexBuffer, 'uint32');

    matrixValue.set(matrix)
    colorMatrixValue.set(colorMatricies)
  

    device.queue.writeBuffer(uniformBuffer, 0, uniformValues);

    pass.setBindGroup(0, bindGroup);
    pass.drawIndexed(vertexData.instancesNum);
  }
}
