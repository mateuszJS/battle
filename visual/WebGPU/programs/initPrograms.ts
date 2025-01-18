import getDrawTriangle from "./drawTriangle/getProgram"
import getDrawBezier from "./drawBezier/getProgram"
import getDraw3dModelTexture from "./draw3dModelTexture/getProgram"
import getDraw3dModel from "./draw3dModel/getProgram"
import getDraw3dModelLight from "./draw3dModelLight/getProgram"
import getBlur from "./blur/getProgram"
import getBlurAdvanced from "./blurAdvanced/getProgram"
import getDrawFullTexture from "./drawFullTexture/getProgram"
import getDrawTexture from "./drawTexture/getProgram"
import getDrawLine from "./drawLine/getProgram"
import getComputeMatrix from "./computeMatrix/getProgram"
import getComputeBuiltinVars from "./computeBuiltinVars/getProgram"
import getDrawPortal from "./drawPortal/getProgram"
import getPickDrawTexture from "./pickDrawTexture/getProgram"

export let drawTriangle: ReturnType<typeof getDrawTriangle>
export let drawBezier: ReturnType<typeof getDrawBezier>
export let draw3dModel: ReturnType<typeof getDraw3dModel>
export let draw3dModelTexture: ReturnType<typeof getDraw3dModelTexture>
export let draw3dModelLight: ReturnType<typeof getDraw3dModelLight>
export let drawBlur: ReturnType<typeof getBlur>
export let drawBlurAdvanced: ReturnType<typeof getBlurAdvanced>
export let drawFullTexture: ReturnType<typeof getDrawFullTexture>
export let drawTexture: ReturnType<typeof getDrawTexture>
export let drawLine: ReturnType<typeof getDrawLine>
export let computeMatrix: ReturnType<typeof getComputeMatrix>
export let computeBuiltinVars: ReturnType<typeof getComputeBuiltinVars>
export let drawPortal: ReturnType<typeof getDrawPortal>
export let pickDrawTexture: ReturnType<typeof getPickDrawTexture>

export default function initPrograms(
  device: GPUDevice,
  presentationFormat: GPUTextureFormat
) {
  drawTriangle = getDrawTriangle(device, presentationFormat)
  drawBezier = getDrawBezier(device, presentationFormat)
  draw3dModelTexture = getDraw3dModelTexture(device, presentationFormat)
  draw3dModel = getDraw3dModel(device, presentationFormat)
  draw3dModelLight = getDraw3dModelLight(device, presentationFormat)
  drawBlur = getBlur(device)
  drawFullTexture = getDrawFullTexture(device, presentationFormat)
  drawBlurAdvanced = getBlurAdvanced(device, presentationFormat)
  drawTexture = getDrawTexture(device, presentationFormat)
  drawLine = getDrawLine(device, presentationFormat)
  computeMatrix = getComputeMatrix(device)
  computeBuiltinVars = getComputeBuiltinVars(device)
  drawPortal = getDrawPortal(device, presentationFormat)
  pickDrawTexture = getPickDrawTexture(device, presentationFormat)
}