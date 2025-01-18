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
import getCanvasRenderDescriptor from "./getCanvasRenderDescriptor";
import initPick from "./pick";


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
  } = await setupWebGPU()

  canvasSizeObserver(canvas, device);

  const [texture2dArray, frames] = await loadAssetsIntoTextureArray(device)

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
    const setCameraTarget = initMouseController(serializedMap.width, serializedMap.height)

    function tick(now: DOMHighResTimeStamp) {
      const dt = now - lastFrameTime
      lastFrameTime = now

      setCameraTarget(dt)

      const encoder = device.createCommandEncoder()
      const descriptor = getCanvasRenderDescriptor(context, device)
      const pass = encoder.beginRenderPass(descriptor)
  
      const {worldMatrix, lightDirection} = getMatricies(canvas, dt)
      const fullLightAngle = [-lightDirection[0], -lightDirection[1], -lightDirection[2]]
      const [_, cameraAngleY] = getCameraAngle()
      const getVertexDataArgs: Parameters<Universe['get_vertex_data']> = [
        dt,
        -cameraAngleY,
        getPlaneMatrix(),
        new Float32Array(fullLightAngle),
      ]

      const vertexData = universe.get_vertex_data(...getVertexDataArgs);
      drawTexture(pass, worldMatrix, vertexData, texture2dArray, colorMatricies, lightDirection)

      const effectsVertexData = universe.get_effects_vertex_data(dt)
      drawPortal(pass, worldMatrix, effectsVertexData, perlinTexture, voronoidTexture, now)

      pass.end()
      const getPick = initPick(device, universe, encoder, canvas, texture2dArray, getVertexDataArgs)

      const commandBuffer = encoder.finish();
      device.queue.submit([commandBuffer]);
      getPick()
      requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }
}
