import shaderCode from "./shader.wgsl"

// https://webgpufundamentals.org/webgpu/lessons/webgpu-compute-shaders.html

export default function getProgram(
  device: GPUDevice,
) {

  const dispatchCount: [number, number, number] = [1, 1, 1];
  const workgroupSize = [1, 1, 1];


  const module = device.createShaderModule({
    label: 'draw line module',
    code: shaderCode
      .replace('HARDCODED_WORKING_GROUP_SIZE', workgroupSize.join()),
  });


  const pipeline = device.createComputePipeline({
    label: 'compute pipeline',
    layout: 'auto',
    compute: {
      module,
    },
  });





  const uniformBufferSize = (4/*position*/ + 16/*projection matrix*/) * 4;
  const uniformBuffer = device.createBuffer({
    label: 'uniforms',
    size: uniformBufferSize,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });

  const uniformValues = new Float32Array(uniformBufferSize / 4);

  const kPositionOffset = 0;
  const positionValue = uniformValues.subarray(kPositionOffset, kPositionOffset + 4);

  const kMatrixOffset = 4;
  const matrixValue = uniformValues.subarray(kMatrixOffset, kMatrixOffset + 16);





  const numWorkgroups = 1;
  const numResults = numWorkgroups * 1;
  const size = numResults * 4 * 4;  // vec4f * f32
 
  let usage = GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC;
  const resultBuffer = device.createBuffer({size, usage});
  

  /*
  we can not map storage buffers into JavaScript so we need some buffers to we can map.
  We’ll copy the results from the storage buffers to these
  mappable result buffers and then read the results
  */
  usage = GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST;
  const resultReadBuffer = device.createBuffer({size, usage});




  const bindGroup = device.createBindGroup({
    layout: pipeline.getBindGroupLayout(0),
    entries: [
      { binding: 0, resource: { buffer: resultBuffer }},
      { binding: 1, resource: { buffer: uniformBuffer }},
    ],
  });

  async function readResults() {
    // Read the results
    await Promise.all([
      resultReadBuffer.mapAsync(GPUMapMode.READ),
    ]);
  
    const result = new Float32Array(resultReadBuffer.getMappedRange());
    // You can *NOT just wait on the last buffer. You must wait on all 3 buffers.
    console.log('oooooooooooooooooooooooooooooo')
    console.log(result)
  }


  return function compute(
    encoder: GPUCommandEncoder,
    matrix: Float32Array,
    position: Float32Array,
    // points: Point[],
    // width: number
  ): VoidFunction {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>')
    console.log(position)
    console.log(matrix)
    const pass = encoder.beginComputePass({ label: 'compute matrix' });
 
    positionValue.set(position)
    matrixValue.set(matrix)

    pass.setPipeline(pipeline);
    console.log('uniformValues', uniformValues)
    device.queue.writeBuffer(uniformBuffer, 0, uniformValues);
    pass.setBindGroup(0, bindGroup);
    pass.dispatchWorkgroups(...dispatchCount);
    pass.end()

    encoder.copyBufferToBuffer(resultBuffer, 0, resultReadBuffer, 0, size);

    return readResults
  }
}
