import getMapPoints from "gameUtils/getMapPoints";
import { SerializedMapInfo } from "map-creator/get-serialized-map-info";
import { FactionVisualDetails } from "map-creator/menu";
import { PREDEFINED_FACTION_VISUAL_DETAILS, PREDEFINED_MAP } from "predefined-maps/test-bridges";
import { Universe } from "Universe";
import canvasSizeObserver from "WebGPU/canvasSizeObserver";
import setupWebGPU from "WebGPU/setupWebGPU";
import { drawFullTexture } from "WebGPU/programs/initPrograms";
import imageSrc from '../assets/Fire.png'
import { createTextureFromImage } from "WebGPU/getTexture";
// import runCreator from "Creator/run";

export default async function getinitUniverse(): Promise<
  (
    wasmModule: Universe,
    mapWidth: number,
    mapHeight: number,
  ) => void
> {
  // const state = new State()
  const {
    device,
    canvas,
    context,
    presentationFormat,
  } = await setupWebGPU()

  canvasSizeObserver(canvas, device, () => {
    console.log('resive happened')
  });

  // runCreator(state, canvas, context, device, presentationFormat)

  // initUI(state)

  const texture: GPUTexture = await createTextureFromImage(device, imageSrc, {})

  return function initUniverse (wasmModule, mapWidth, mapHeight) {
    const serializedMapInfo: SerializedMapInfo = PREDEFINED_MAP
    const factionVisualDetails: FactionVisualDetails[] = PREDEFINED_FACTION_VISUAL_DETAILS

    // const mapPoints = getMapPoints(mapWidth, mapHeight)


    function tick(now: DOMHighResTimeStamp) {
      console.log('tick')
      // here we need to render that texture into canvas
      const canvasTexture = context.getCurrentTexture();
      const descriptor = {
        // describe which textures we want to raw to and how use them
        label: "our render to canvas renderPass",
        colorAttachments: [
          {
            view: canvasTexture.createView(),
            clearValue: [0.3, 0, 0, 1],
            loadOp: "clear", // before rendering clear the texture to value "clear". Other option is "load" to load existing content of the texture into GPU so we can draw over it
            storeOp: "store", // to store the result of what we draw, other option is "discard"
          } as const,
        ],
      }
      const encoder = device.createCommandEncoder()
      const pass = encoder.beginRenderPass(descriptor)

      drawFullTexture(pass, texture)

      pass.end()
      const commandBuffer = encoder.finish();
      device.queue.submit([commandBuffer]);
      requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }
}


