import shaderCode from "./shader.wgsl"

export default function getProgram(
  device: GPUDevice,
  presentationFormat: GPUTextureFormat
) {
  const module = device.createShaderModule({
    label: 'draw line module',
    code: shaderCode,
  });

  const pipeline = device.createRenderPipeline({
    label: 'raw line pipeline',
    layout: 'auto',
    primitive: {
      topology: `triangle-strip`,
    },
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
      ],
    },
    fragment: {
      module,
      entryPoint: 'fs',
      targets: [{ format: presentationFormat }],
    },
  });

  const uniformBufferSize = (16/*projection matrix*/) * 4;
  const uniformBuffer = device.createBuffer({
    label: 'uniforms',
    size: uniformBufferSize,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });

  const uniformValues = new Float32Array(uniformBufferSize / 4);
  const kMatrixOffset = 0;
  const matrixValue = uniformValues.subarray(kMatrixOffset, kMatrixOffset + 16);

  return function drawLine(
    pass: GPURenderPassEncoder,
    matrix: Float32Array,
    points: Point[],
    width: number
  ) {
    if (points.length < 2) throw Error('Line needs to have at least two points')

    const vertexPositionData: number[] = []

    points.forEach((p, i) => {
      const siblingP = i === 0
        ? points[i + 1]
        : points[i - 1]

      let perpendicularAngle = Math.atan2(p.y - siblingP.y, p.x - siblingP.x) + Math.PI / 2
      if (i === 0) {
        // to be sure we geenrate in same direction all lines
        perpendicularAngle += Math.PI
      }
      const offsetX = Math.cos(perpendicularAngle) * width
      const offsetZ = Math.sin(perpendicularAngle) * width
      vertexPositionData.push(
        p.x + offsetX,
        0,
        p.y + offsetZ,
        1,
        p.x - offsetX,
        0,
        p.y - offsetZ,
        1,
      )
    })

    const vertexPosition = new Float32Array(vertexPositionData)
    const vertexPositionBuffer = device.createBuffer({
      label: 'vertex buffer vertices',
      size: vertexPosition.byteLength,
      usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    });
    device.queue.writeBuffer(vertexPositionBuffer, 0, vertexPosition);

    // bind group should be pre-created and reuse instead of constantly initialized
    const bindGroup = device.createBindGroup({
      layout: pipeline.getBindGroupLayout(0),
      entries: [
        { binding: 0, resource: { buffer: uniformBuffer }},
      ],
    });

    pass.setPipeline(pipeline);
    pass.setVertexBuffer(0, vertexPositionBuffer);
    // pass.setIndexBuffer(indexBuffer, 'uint32');

    matrixValue.set(matrix)
  
    device.queue.writeBuffer(uniformBuffer, 0, uniformValues);

    pass.setBindGroup(0, bindGroup);
    // console.log('++++++++FIRST+++++++++++++')
    // console.log(JSON.stringify(vertexPositionData.slice(0, 4))) // [124.296875,0,155,1]
    // console.log(matrixValue) // 6.512547016143799, 0, 0, 0, 0, 0.11019019037485123, -1.0000977516174316, -0.9998476505279541, 0, -6.3127899169921875, -0.017456775531172752, -0.017452411353588104, -3256.2734375, 3156.39501953125, 3016.590576171875, 3016.83642578125
    pass.draw(vertexPositionData.length / 4);
  }
}
