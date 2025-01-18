import { pointer } from "mouseController";
import { Universe } from "Universe";
import mat4 from "utils/mat4";
import { pickDrawTexture } from "WebGPU/programs/initPrograms";
import getMatricies, { setExtraMatrix } from "worldMatrix";

let pickTexture: GPUTexture | undefined;
let pickDepthTexture: GPUTexture | undefined;

/**
 * @returns the callbakc which performs pick. It has to be called AFTER the commands are subbmited to queue
 */
export default function initPick(
  device: GPUDevice,
  universe: Universe,
  encoder: GPUCommandEncoder,
  canvas: HTMLElement,
  texture2dArray: GPUTexture,
  getVertexDataArgs: Parameters<Universe['get_pick_vertex_data']>,
) {
  if (!pickTexture) {
    pickTexture = device.createTexture({
      size: [1, 1],
      format: 'r32uint',
      usage: GPUTextureUsage.COPY_SRC | GPUTextureUsage.RENDER_ATTACHMENT,
    });
  }

  if (!pickDepthTexture) {
    pickDepthTexture = device.createTexture({
      size: [1, 1],
      format: 'depth24plus',
      usage: GPUTextureUsage.RENDER_ATTACHMENT,
    });
  }

  const descriptor: GPURenderPassDescriptor = {
    // describe which textures we want to raw to and how use them
    label: "our render to canvas renderPass",
    colorAttachments: [
      {
        view: pickTexture.createView(),
        loadOp: "clear",
        clearValue: [0, 0, 0, 1],
        storeOp: "store",
      } as const,
    ],
    depthStencilAttachment: {
      view: pickDepthTexture.createView(), // placholder to calm down TS
      depthLoadOp: 'clear',
      depthClearValue: 1.0,
      depthStoreOp: 'discard',
    } as const,
  }
  const tx = -(2 * (pointer.x / canvas.clientWidth) - 1)
  const ty = 2 * (pointer.y / canvas.clientHeight) - 1

  const extraMatrix = [
    mat4.translation([tx * canvas.clientWidth, ty * canvas.clientHeight, 0]),
    mat4.scaling([canvas.clientWidth, canvas.clientHeight, 1]),
  ].reduce(
    (matrix, rotationMatrix) => mat4.multiply(matrix, rotationMatrix),
    mat4.identity() // put camera at exact same palce as objwct to follow
  )
  
  setExtraMatrix(extraMatrix)
  const {worldMatrix} = getMatricies(canvas, 0)
  setExtraMatrix(null)

  const pass = encoder.beginRenderPass(descriptor)
  const width = 1
  const height = 1
  pass.setViewport(0, 0, width, height, 0, 1);
  // Set the scissor rectangle to clip rendering to the 1x1 area
  pass.setScissorRect(0, 0, width, height);

  const vertexData = universe.get_pick_vertex_data(...getVertexDataArgs);

  pickDrawTexture(pass, worldMatrix, vertexData, texture2dArray)

  pass.end();

  const numPixels = 1;
  const pickBuffer = device.createBuffer({
    size: numPixels * 4,
    usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST,
  });

  encoder.copyTextureToBuffer({
    texture: pickTexture,
    origin: { x: 0, y: 0 }
  }, {
    buffer: pickBuffer,
    bytesPerRow: ((numPixels * 4 + 255) | 0) * 256,
    rowsPerImage: 1,
  }, {
    width: numPixels,
  });

  return async () => {
    await pickBuffer.mapAsync(GPUMapMode.READ, 0, 4 * numPixels);
    const ids = new Uint32Array(pickBuffer.getMappedRange(0, 4 * numPixels));

    const id = ids[0];
    pickBuffer.unmap();
    console.log('id', id);
  }
}