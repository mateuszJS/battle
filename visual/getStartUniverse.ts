import { Universe } from "Universe";
import canvasSizeObserver from "WebGPU/canvasSizeObserver";
import setupWebGPU from "WebGPU/setupWebGPU";
import { drawLine, drawPortal, drawTexture, pickDrawTexture } from "WebGPU/programs/initPrograms";
import loadAssetsIntoTextureArray from "loadAssetsIntoTextureArray/loadAssetsIntoTextureArray";
import getMatricies, { getCameraAngle, setExtraMatrix } from "worldMatrix";
import { SerializedMap } from "map-creator/serializeMap";
import DebugRepresentation from "debug/DebugRepresentation";
import getPlaneMatrix from "worldMatrix/planeMatrix"
import initMouseController, { pointer } from "mouseController";
import { createTextureFromImage } from "WebGPU/getTexture";
import mat4 from "utils/mat4";

let depthTexture: GPUTexture | undefined;

// this type cannot be imported from rust, because String and array are not compatilbe with wasm bindgen
interface FrameDetails {
  name: string, // useful noyl during assigning frames, not later
  source_rect: [[number, number], [number, number], [number, number], [number, number]],
  destination_rect: [number, number, number, number],
  texture_index: number,
}


let pickTexture: GPUTexture | undefined;

function handlePicking(
  canvasTextureView: GPUTextureView,
  device: GPUDevice,
  universe: Universe,
  encoder: GPUCommandEncoder,
  passedDepthTexture: GPUTexture,
  canvas: HTMLElement,
  dt: number,
  texture2dArray: GPUTexture,
) {
  if (!pickTexture ||
    pickTexture.width !== passedDepthTexture.width ||
    pickTexture.height !== passedDepthTexture.height
  ) {
    pickTexture?.destroy();
    pickTexture = device.createTexture({
      size: [passedDepthTexture.width, passedDepthTexture.height],
      format: 'r32uint',
      usage: GPUTextureUsage.COPY_SRC | GPUTextureUsage.RENDER_ATTACHMENT,
    });
  }

  const descriptor: GPURenderPassDescriptor = {
    // describe which textures we want to raw to and how use them
    label: "our render to canvas renderPass",
    colorAttachments: [
      {
        view: canvasTextureView,
        loadOp: "load",
        storeOp: "store",
      } as const,
    ],
    depthStencilAttachment: {
      view: passedDepthTexture.createView(), // placholder to calm down TS
      depthLoadOp: 'load',
      depthStoreOp: 'store', // change to 'store' if we ran more than one render,
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
  const {worldMatrix, lightDirection} = getMatricies(canvas, dt)
  setExtraMatrix(null)

  const pass = encoder.beginRenderPass(descriptor)
  const width = 100
  const height = 100
  pass.setViewport(0, 0, width, height, 0, 1);
  // Set the scissor rectangle to clip rendering to the 1x1 area
  pass.setScissorRect(0, 0, width, height);

  const fullLightAngle = [-lightDirection[0], -lightDirection[1], -lightDirection[2]]
  const [_, cameraAngleY] = getCameraAngle()

  const vertexData = universe.get_pick_vertex_data(
    dt,
    -cameraAngleY,
    getPlaneMatrix(),
    new Float32Array(fullLightAngle),
  );

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

export default async function getInitUniverse(): Promise<
  (
    universe: Universe,
    serializedMap: SerializedMap,
    colorMatricies: Float32Array
  ) => void
> {
  const {
    device,
    canvas,
    context,
    presentationFormat,
  } = await setupWebGPU()

  canvasSizeObserver(canvas, device, () => {
    console.log('resive happened')
  });

  const [texture2dArray, frames] = await loadAssetsIntoTextureArray(
    device
  )
  
  // Universe.init_frame_descriptor({ x: 4, name: 'aaa', angles: 7, arr: [0, 0, 0, 0] })
  Universe.init_frame_descriptor(frames.map<FrameDetails>(frame => ({
    destination_rect: [frame.destinationRect.x, frame.destinationRect.y, frame.destinationRect.width, frame.destinationRect.height],
    source_rect: [
      [frame.sourceRect[0], frame.sourceRect[1]],
      [frame.sourceRect[2], frame.sourceRect[3]],
      [frame.sourceRect[4], frame.sourceRect[5]],
      [frame.sourceRect[6], frame.sourceRect[7]],
    ],
    name: frame.name,
    texture_index: frame.textureIndex,
  })))

  // const perlinTexture = await createTextureFromImage(device, new URL('assets/texture.png', import.meta.url).href, {})
  const perlinTexture = await createTextureFromImage(device, new URL('assets/perlin.png', import.meta.url).href, {})
  const voronoidTexture = await createTextureFromImage(device, new URL('assets/voronoid.png', import.meta.url).href, {})

  return function initUniverse (universe, serializedMap, colorMatricies) {

    const debugRepresentation = new DebugRepresentation()  // to wasm
    // window.angle = Math.PI * 0
    // Error, make sure to write test for it, and then fix it!

    let lastFrameTime = document.timeline.currentTime as number
    /* not sure if type in TS is correct and and if nay browser supposrt currrentTime as CSSNumericValue */ 
    const updateTarget = initMouseController(serializedMap.width, serializedMap.height)

    function tick(now: DOMHighResTimeStamp) {
      const dt = now - lastFrameTime
      lastFrameTime = now

      updateTarget(dt)

      const [_, cameraAngleY] = getCameraAngle()

      // here we need to render that texture into canvas
      const canvasTexture = context.getCurrentTexture();

      if (!depthTexture ||
        depthTexture.width !== canvasTexture.width ||
        depthTexture.height !== canvasTexture.height
      ) {
        depthTexture?.destroy();
        depthTexture = device.createTexture({
          size: [canvasTexture.width, canvasTexture.height],
          format: 'depth24plus',
          usage: GPUTextureUsage.RENDER_ATTACHMENT,
        });
      }

      const canvasTextureView = canvasTexture.createView()
      const descriptor = {
        // describe which textures we want to raw to and how use them
        label: "our render to canvas renderPass",
        colorAttachments: [
          {
            view: canvasTextureView,
            clearValue: [0, 0, 0, 1],
            loadOp: "clear", // before rendering clear the texture to value "clear". Other option is "load" to load existing content of the texture into GPU so we can draw over it
            storeOp: "store", // to store the result of what we draw, other option is "discard"
          } as const,
        ],
        depthStencilAttachment: {
          view: depthTexture.createView(), // placholder to calm down TS
          depthClearValue: 1.0,
          depthLoadOp: 'clear',
          depthStoreOp: 'store',
        } as const,
      }
      const encoder = device.createCommandEncoder()
      // setExtraMatrix(mat4.scaling([2, 2, 1]))
      const {worldMatrix, lightDirection} = getMatricies(canvas, dt)
      setExtraMatrix(null)
      const pass = encoder.beginRenderPass(descriptor)
      const fullLightAngle = [-lightDirection[0], -lightDirection[1], -lightDirection[2]]

      // pass.setViewport(0, 0, canvas.clientWidth / 2, canvas.clientHeight / 2, 0, 1);
      // Set the scissor rectangle to clip rendering to the 1x1 area
      // pass.setScissorRect(0, 0, canvas.clientWidth / 2, canvas.clientHeight / 2);

      const vertexData = universe.get_vertex_data(
        dt,
        -cameraAngleY,
        getPlaneMatrix(),
        new Float32Array(fullLightAngle),
      );

      drawTexture(pass, worldMatrix, vertexData, texture2dArray, colorMatricies, lightDirection)


      const effectsVertexData = universe.get_effects_vertex_data(dt)
      drawPortal(pass, worldMatrix, effectsVertexData, perlinTexture, voronoidTexture, now)


      pass.end()
      const getPick = handlePicking(canvasTextureView, device, universe, encoder, depthTexture, canvas, dt, texture2dArray)

      const commandBuffer = encoder.finish();
      device.queue.submit([commandBuffer]);
      getPick()
      requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }
}
