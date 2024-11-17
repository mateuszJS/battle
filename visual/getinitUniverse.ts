import getMapPoints from "gameUtils/getMapPoints";
import { SerializedMapInfo } from "map-creator/get-serialized-map-info";
import { FactionVisualDetails } from "map-creator/menu";
import { PREDEFINED_FACTION_VISUAL_DETAILS, PREDEFINED_MAP } from "predefined-maps/test-bridges";
import { Universe } from "Universe";
import canvasSizeObserver from "WebGPU/canvasSizeObserver";
import setupWebGPU from "WebGPU/setupWebGPU";
import imageSrc from '../assets/Fire.png'
import { createTextureFromImage } from "WebGPU/getTexture";
import loadAssets from "WebGPU/loadAssets";
import getSpriteSheetTexture from "WebGPU/getSpriteSheetTexture";
import AnimatedSprite from "WebGPU/AnimatedSprite";
import { UnitState } from "logic-contants";
import mat3 from "WebGPU/m3";
import { drawTexture } from "WebGPU/programs/initPrograms";
import Rect from "Rect";
// import runCreator from "Creator/run";

function getCanvasMatrix(canvas: HTMLCanvasElement) {
  return mat3.projection(canvas.clientWidth, canvas.clientHeight)
  // const projection = mat4.ortho(
  //   0,                   // left
  //   canvas.clientWidth,  // right
  //   canvas.clientHeight, // bottom
  //   0,                   // top
  //   400,                 // near
  //   -400,                // far
  // );  

  // return projection
}

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
  const texture2dArray = await getSpriteSheetTexture(
    device
  )
  // const assets = await loadAssets(
  //   device,
  //   (progress) => console.log(`assets loading progress: ${progress}`)
  // )

  // const texture: GPUTexture = await createTextureFromImage(device, imageSrc, {})

  const animatedSprite = new AnimatedSprite(texture2dArray)

  window.angle = 0

  return function initUniverse (wasmModule, mapWidth, mapHeight) {
    const serializedMapInfo: SerializedMapInfo = PREDEFINED_MAP
    const factionVisualDetails: FactionVisualDetails[] = PREDEFINED_FACTION_VISUAL_DETAILS
    const matrix = getCanvasMatrix(canvas)

    // const mapPoints = getMapPoints(mapWidth, mapHeight)


    function tick(now: DOMHighResTimeStamp) {
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
      const position = new Rect(100, 100, 100, 100) // How do we get the default size?
      const vertexData = animatedSprite.getVertexData(UnitState.RUN, window.angle, now, position)

      drawTexture(pass, matrix, vertexData, texture2dArray)

      pass.end()
      const commandBuffer = encoder.finish();
      device.queue.submit([commandBuffer]);
      requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }
}


