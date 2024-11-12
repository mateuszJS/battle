import getDevice from "./getDevice"
import initPrograms from "./programs/initPrograms"

interface SetupWebGPUOutput {
  canvas: HTMLCanvasElement,
  context: GPUCanvasContext,
  device: GPUDevice,
  presentationFormat: GPUTextureFormat,
}

export default async function setupWebGPU(): Promise<SetupWebGPUOutput> {
  /* setup WebGPU stuff */
  const device = await getDevice()

  const canvas = document.querySelector<HTMLCanvasElement>("canvas")
  if (!canvas) throw Error("Canvas has to be always provided")

  const context = canvas.getContext("webgpu")
  if (!context) throw Error("WebGPU from canvas needs to be always provided")

  const presentationFormat = navigator.gpu.getPreferredCanvasFormat()
  context.configure({
    device,
    format: presentationFormat,
    // Specify we want both RENDER_ATTACHMENT and COPY_SRC since we
    // will copy out of the swapchain texture.
  });

  initPrograms(device, presentationFormat)

  return {
    device,
    canvas,
    context,
    presentationFormat,
  }
}