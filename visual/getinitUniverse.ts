import { Universe } from "Universe";
import canvasSizeObserver from "WebGPU/canvasSizeObserver";
import setupWebGPU from "WebGPU/setupWebGPU";
import { UnitState } from "logic-contants";
import { drawLine, drawTexture } from "WebGPU/programs/initPrograms";
import { getVertexData } from "WebGPU/getVertexData";
import loadAssetsIntoTextureArray from "loadAssetsIntoTextureArray/loadAssetsIntoTextureArray";
import AssetId from "AssetsDescriptor/AssetId";
import UnitRepresentation from "UnitRepresentation/UnitRepresentation";
import getMatricies, { getCameraAngle } from "worldMatrix";
import { SerializedMap } from "map-creator/serializeMap";
import EnvironmentRepresentation from "EnvRepresentation";
import vec3 from "utils/vec3";
import DebugRepresentation from "debug/DebugRepresentation";

let depthTexture: GPUTexture | undefined;

export default async function getinitUniverse(): Promise<
  (
    wasmModule: Universe,
    serializedMap: SerializedMap,
    colorMatricies: Float32Array
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
  const texture2dArray = await loadAssetsIntoTextureArray(
    device
  )
  // const assets = await loadAssets(
  //   device,
  //   (progress) => console.log(`assets loading progress: ${progress}`)
  // )

  // const texture: GPUTexture = await createTextureFromImage(device, imageSrc, {})




  return function initUniverse (wasmModule, serializedMap, colorMatricies) {
    // const matrix = getCanvasMatrix(canvas)

    // const mapPoints = getMapPoints(mapWidth, mapHeight)

    const firstPoint = serializedMap.obstacles.find(Boolean) as Point

    const units = [
      new UnitRepresentation(
        UnitState.IDLE,
        0,
        firstPoint,
        // [AssetId.RegularBody],
        // [AssetId.RegularBody],
        [AssetId.RegularBody, AssetId.RegularAccesories, AssetId.ElephantHead],
        0
      )
    ]
    window.angle = 0

    const envRepresentation = new EnvironmentRepresentation(serializedMap.envVisuals)
    const debugRepresentation = new DebugRepresentation()
    // window.angle = Math.PI * 0
    // Error, make sure to write test for it, and then fix it!

    let lastFrameTime = document.timeline.currentTime as number
    /* not sure if type in TS is correct and and if nay browser supposrt currrentTime as CSSNumericValue */ 

    function tick(now: DOMHighResTimeStamp) {
      const dt = now - lastFrameTime
      lastFrameTime = now

      const [_, cameraAngleY] = getCameraAngle()

      units.forEach(unit => {
        unit.update(window.angle - cameraAngleY, UnitState.SHOOT, dt)
      })

      // here we need to render that texture into canvas
      const canvasTexture = context.getCurrentTexture();

      if (!depthTexture ||
        depthTexture.width !== canvasTexture.width ||
        depthTexture.height !== canvasTexture.height
      ) {
        if (depthTexture) {
          depthTexture.destroy();
        }
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

      const {worldMatrix, lightDirection} = getMatricies(canvas, serializedMap.cameraTarget, dt)
      const pass = encoder.beginRenderPass(descriptor)
      const fullLightAngle = [-lightDirection[0], -lightDirection[1], -lightDirection[2]]
      const vertexData = getVertexData(units, envRepresentation, debugRepresentation, fullLightAngle)

      const obstacles: Point[][] = []
      serializedMap.obstacles.forEach(p => {
        if (p === null) {
          obstacles.push([])
        } else {
          obstacles[obstacles.length - 1].push(p)
        }
      })

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


