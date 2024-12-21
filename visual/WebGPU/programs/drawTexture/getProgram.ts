import vec3 from "utils/vec3";
import shaderCode from "./shader.wgsl"
import { VertexData } from "WebGPU/getVertexData";
 
const NUM_OF_MATRICIES = 2

export default function getProgram(
  device: GPUDevice,
  presentationFormat: GPUTextureFormat
) {
  const module = device.createShaderModule({
    label: 'texture module',
    code: shaderCode
      .replace('NUM_OF_MATRICIES', NUM_OF_MATRICIES.toString()),
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
          arrayStride: (4 + 2 + 1 + 1 + 3) * 4,
          attributes: [
            {shaderLocation: 0, offset: 0, format: 'float32x4'},  // destination position
            {shaderLocation: 1, offset: 16, format: 'float32x2'},  // source position
            {shaderLocation: 2, offset: 16 + 8, format: 'uint32'},  // source texture layer
            {shaderLocation: 3, offset: 16 + 8 + 4, format: 'uint32'},  // index of color matrix
            {shaderLocation: 4, offset: 16 + 8 + 4 + 4, format: 'float32x3'},  // index of color matrix
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
    primitive: {
      cullMode: 'back',
    },
    depthStencil: {
      depthWriteEnabled: true,
      depthCompare: 'less',
      format: 'depth24plus',
    },
  });


  /*
          normalMatrix: mat3x3f,
        worldViewProjection: mat4x4f,
        color: vec4f,
        lightDirection: vec3f,
        */

        // const uniformBufferSize = (12 + 16 + 4 + 4) * 4;

  const uniformBufferSize = (
    16/*projection matrix*/ +
    NUM_OF_MATRICIES * 12/*color matrix*/ +
    12/*normal matrix*/ +
    4/*light direction*/
  ) * 4;
  const uniformBuffer = device.createBuffer({
    label: 'uniforms',
    size: uniformBufferSize,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });

  const uniformValues = new Float32Array(uniformBufferSize / 4);
  const kMatrixOffset = 0;
  const matrixValue = uniformValues.subarray(kMatrixOffset, kMatrixOffset + 16);


  const kColorMatrixOffset = 16;
  const colorMatrixValue = uniformValues.subarray(kColorMatrixOffset, kColorMatrixOffset + NUM_OF_MATRICIES * 12);


  const kNormalMatrixOffset = kColorMatrixOffset + NUM_OF_MATRICIES * 12;
  const normalMatrixValue = uniformValues.subarray(kNormalMatrixOffset, kNormalMatrixOffset + 12);


  const kLightDirectionOffset =  kNormalMatrixOffset + 12;
  const lightDirectionValue = uniformValues.subarray(kLightDirectionOffset, kLightDirectionOffset + 4);


  return function drawTexture(
    pass: GPURenderPassEncoder,
    worldProjectionMatrix: Float32Array,
    vertexData: VertexData,
    texture: GPUTexture,
    colorMatricies: Float32Array,
    normalMatrix: Float32Array,
  ) {

  const { verticiesData, numVertices } = vertexData.getBakedData()

  const vertexBuffer = device.createBuffer({
    label: 'vertex buffer vertices',
    size: verticiesData.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  });
  device.queue.writeBuffer(vertexBuffer, 0, verticiesData);


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
    pass.setVertexBuffer(0, vertexBuffer);

    matrixValue.set(worldProjectionMatrix)
    colorMatrixValue.set(colorMatricies)
    normalMatrixValue.set(normalMatrix)
    lightDirectionValue.set(vec3.normalize([-0.5, -0.5, -0.5, 0])) // 0 at the end is just padding
  

    device.queue.writeBuffer(uniformBuffer, 0, uniformValues);

    pass.setBindGroup(0, bindGroup);
    pass.draw(numVertices);
  }
}
