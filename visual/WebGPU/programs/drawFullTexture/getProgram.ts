import shaderCode from "./shader.wgsl"

export default function getProgram(
  device: GPUDevice,
  presentationFormat: GPUTextureFormat
) {
  const module = device.createShaderModule({
    label: 'full texture module',
    code: shaderCode,
  });

  const sampler = device.createSampler({
    minFilter: 'linear',
    magFilter: 'linear',
  });

  const pipeline = device.createRenderPipeline({
    label: 'full texture pipeline',
    layout: 'auto',
    vertex: {
      module,
      entryPoint: 'vs',
    },
    fragment: {
      module,
      entryPoint: 'fs',
      targets: [{ format: presentationFormat }],
    },
  });

  return function renderFullTexture(
    pass: GPURenderPassEncoder,
    texture: GPUTexture,
  ) {
    const bindGroup = device.createBindGroup({
      layout: pipeline.getBindGroupLayout(0),
      entries: [
        { binding: 0, resource: sampler },
        { binding: 1, resource: texture.createView() },
      ],
    });

    pass.setPipeline(pipeline);
    pass.setBindGroup(0, bindGroup);
    pass.draw(6);  // call our vertex shader 6 times
  }
}
