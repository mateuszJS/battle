import shaderCode from "./shader.wgsl"

// https://webgpufundamentals.org/webgpu/lessons/webgpu-compute-shaders.html

export default function getProgram(
  device: GPUDevice,
) {

  const dispatchCount: [number, number, number] = [4, 3, 2];
  const workgroupSize = [2, 3, 4];
  
  // multiply all elements of an array
  const arrayProd = (arr: number[]) => arr.reduce((a, b) => a * b);
  
  const numThreadsPerWorkgroup = arrayProd(workgroupSize);


  const module = device.createShaderModule({
    label: 'draw line module',
    code: shaderCode
      .replace('HARDCODED_WORKING_GROUP_SIZE', workgroupSize.join())
      .replace('NUM_THREAREADS_PER_WORKING_GROUP', `${numThreadsPerWorkgroup}`),
  });


  const pipeline = device.createComputePipeline({
    label: 'compute pipeline',
    layout: 'auto',
    compute: {
      module,
    },
  });

  const numWorkgroups = arrayProd(dispatchCount);
  const numResults = numWorkgroups * numThreadsPerWorkgroup;
  const size = numResults * 4 * 4;  // vec3f * u32 (padded by 4 bytes)
 
  let usage = GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC;
  const workgroupBuffer = device.createBuffer({size, usage});
  const localBuffer = device.createBuffer({size, usage});
  const globalBuffer = device.createBuffer({size, usage});
  

  /*
  we can not map storage buffers into JavaScript so we need some buffers to we can map.
  We’ll copy the results from the storage buffers to these
  mappable result buffers and then read the results
  */
  usage = GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST;
  const workgroupReadBuffer = device.createBuffer({size, usage});
  const localReadBuffer = device.createBuffer({size, usage});
  const globalReadBuffer = device.createBuffer({size, usage});




  const bindGroup = device.createBindGroup({
    layout: pipeline.getBindGroupLayout(0),
    entries: [
      { binding: 0, resource: { buffer: workgroupBuffer }},
      { binding: 1, resource: { buffer: localBuffer }},
      { binding: 2, resource: { buffer: globalBuffer }},
    ],
  });

  async function readResults() {
    // Read the results
    await Promise.all([
      workgroupReadBuffer.mapAsync(GPUMapMode.READ),
      localReadBuffer.mapAsync(GPUMapMode.READ),
      globalReadBuffer.mapAsync(GPUMapMode.READ),
    ]);
  
    const workgroup = new Uint32Array(workgroupReadBuffer.getMappedRange());
    const local = new Uint32Array(localReadBuffer.getMappedRange());
    const global = new Uint32Array(globalReadBuffer.getMappedRange());
    // You can *NOT just wait on the last buffer. You must wait on all 3 buffers.
    console.log('oooooooooooooooooooooooooooooo')
    console.log('workgroup', workgroup)
    console.log('local', local)
    console.log('global', global)
  }


  return function compute(
    encoder: GPUCommandEncoder,
    // matrix: Float32Array,
    // points: Point[],
    // width: number
  ): VoidFunction {
    const pass = encoder.beginComputePass({ label: 'compute builtin pass' });
 
    pass.setPipeline(pipeline);
    pass.setBindGroup(0, bindGroup);
    pass.dispatchWorkgroups(...dispatchCount);
    pass.end()

    encoder.copyBufferToBuffer(workgroupBuffer, 0, workgroupReadBuffer, 0, size);
    encoder.copyBufferToBuffer(localBuffer, 0, localReadBuffer, 0, size);
    encoder.copyBufferToBuffer(globalBuffer, 0, globalReadBuffer, 0, size);

    return readResults
  }
}
