import m3 from "webgl/m3";
import { MAP_SKEW_ANGLE, MAP_VERTICAL_MOD } from "../logic/constants"

export let convertLogicToVisual: (x: number, y: number) => [number, number]
export let convertVisualToLogic: (x: number, y: number) => [number, number]

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export function initUtils(mapHeight: number) {
  // https://webglfundamentals.org/webgl/lessons/webgl-2d-matrices.html
  const matrixTranslation = m3.translation(0, -mapHeight)
  const matrixRotation = m3.rotation(-MAP_SKEW_ANGLE)
  const matrixScale = m3.scaling(1, MAP_VERTICAL_MOD)
  const matrix = m3.multiply(
    m3.multiply(
      m3.multiply(m3.identity(), matrixScale),
      matrixRotation,
    ),
    matrixTranslation
  );

  convertLogicToVisual = (x, y) => [
    x * matrix[0] + y * matrix[3] + matrix[6],
    x * matrix[1] + y * matrix[4] +  matrix[7]
  ]

  const inverseMatrix = m3.inverse(matrix)

  convertVisualToLogic = (x, y) => [
    x * inverseMatrix[0] + y * inverseMatrix[3] + inverseMatrix[6],
    x * inverseMatrix[1] + y * inverseMatrix[4] +  inverseMatrix[7]
  ]
}