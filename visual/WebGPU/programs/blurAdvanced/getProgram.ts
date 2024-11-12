import { drawBlur, drawFullTexture } from "../initPrograms";
import shaderCode from "./index.wgsl"

export default function getProgram(device: GPUDevice, presentationFormat: GPUTextureFormat) {
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

  const texelOffsetBuffer = device.createBuffer({
    size: (2) * 4,
    usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.UNIFORM,
  });

  return function renderBlurAdvanced(
    sourceTexture: GPUTexture,
    commandEncoder: GPUCommandEncoder,
    offset: Point,
  ): GPUTexture {
    const NTH_TEXEL = 2
    const tinyTexWidth = (sourceTexture.width / NTH_TEXEL) | 0
    const tinyTexHeight = (sourceTexture.height / NTH_TEXEL) | 0

    const tinyTex = device.createTexture({
      size: [tinyTexWidth, tinyTexHeight],
      format: presentationFormat,
      usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.RENDER_ATTACHMENT
    });

    const renderPassDescriptor = {
      label: 'blur advanced render descriptor',
      colorAttachments: [
        {
          view: tinyTex.createView(),
          loadOp: 'clear', 
          storeOp: 'store',
        },
      ],
    } as const;

    const renderPass = commandEncoder.beginRenderPass(renderPassDescriptor);

    const bindGroup = device.createBindGroup({
      layout: pipeline.getBindGroupLayout(0),
      entries: [
        { binding: 0, resource: sampler },
        { binding: 1, resource: sourceTexture.createView() },
        { binding: 2, resource: { buffer: texelOffsetBuffer }},
      ],
    });

    device.queue.writeBuffer(
      texelOffsetBuffer,
      0,
      new Float32Array([
        .5 / tinyTexWidth,//(offset.x % NTH_TEXEL) / tinyTexWidth,
        .5 / tinyTexHeight,//(offset.y % NTH_TEXEL) / tinyTexHeight,
        // (offset.NTH_TEXEL) / tinyTexHeight,
      ])
    );

    renderPass.setPipeline(pipeline);
    renderPass.setBindGroup(0, bindGroup);
    renderPass.draw(6);  // call our vertex shader 6 times

    renderPass.end();

    // return drawBlur(tinyTex, commandEncoder)
    return tinyTex
  }
}
