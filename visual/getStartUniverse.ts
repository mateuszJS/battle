import { Universe } from "Universe";
import canvasSizeObserver from "WebGPU/canvasSizeObserver";
import setupWebGPU from "WebGPU/setupWebGPU";
import { drawLine, drawTexture } from "WebGPU/programs/initPrograms";
import loadAssetsIntoTextureArray from "loadAssetsIntoTextureArray/loadAssetsIntoTextureArray";
import getMatricies, { getCameraAngle } from "worldMatrix";
import { SerializedMap } from "map-creator/serializeMap";
import DebugRepresentation from "debug/DebugRepresentation";
import getPlaneMatrix from "worldMatrix/planeMatrix"
import initMouseController from "mouseController";

let depthTexture: GPUTexture | undefined;

// this type cannot be imported from rust, because String and array are not compatilbe with wasm bindgen
interface FrameDetails {
  name: string, // useful noyl during assigning frames, not later
  source_rect: [[number, number], [number, number], [number, number], [number, number]],
  destination_rect: [number, number, number, number],
  texture_index: number,
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
    texture_index: frame.textureIndex
  })))

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

      const descriptor = {
        // describe which textures we want to raw to and how use them
        label: "our render to canvas renderPass",
        colorAttachments: [
          {
            view: canvasTexture.createView(),
            clearValue: [0, 0, 0, 1],
            loadOp: "clear", // before rendering clear the texture to value "clear". Other option is "load" to load existing content of the texture into GPU so we can draw over it
            storeOp: "store", // to store the result of what we draw, other option is "discard"
          } as const,
        ],
        depthStencilAttachment: {
          view: depthTexture.createView(), // placholder to calm down TS
          depthClearValue: 1.0,
          depthLoadOp: 'clear',
          depthStoreOp: 'discard', // change to 'store' if we ran more than one render,
        } as const,
      }
      const encoder = device.createCommandEncoder()

      const {worldMatrix, lightDirection} = getMatricies(canvas, dt)
      const pass = encoder.beginRenderPass(descriptor)
      const fullLightAngle = [-lightDirection[0], -lightDirection[1], -lightDirection[2]]

      // const vertexData = getVertexData(units, envRepresentation, debugRepresentation, fullLightAngle) // to wasm
      // console.log('cameraAngleY', cameraAngleY)
      universe.tick(dt, -cameraAngleY);
      const vertexData = universe.get_vertex_data(
        getPlaneMatrix(),
        new Float32Array(fullLightAngle),
      );

      const obstacles: Point[][] = []
      // serializedMap.obstacles.forEach(p => {
      //   if (p === null) {
      //     obstacles.push([])
      //   } else {
      //     obstacles[obstacles.length - 1].push(p)
      //   }
      // })

      obstacles.forEach(pList => {
        if (pList.length !== 0) {
          drawLine(pass, worldMatrix,  [...pList, pList[0]], 10)
        }
      })
      drawTexture(pass, worldMatrix, vertexData, texture2dArray, colorMatricies, lightDirection)
      pass.end()
      const commandBuffer = encoder.finish();
      device.queue.submit([commandBuffer]);
      requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }
}


