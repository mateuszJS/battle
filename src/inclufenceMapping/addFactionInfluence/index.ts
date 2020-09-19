import getTexture from '~/getTexture'
import fragmentShader from './fragment.frag'
import vertexShader from './vertex.vert'
import { SCALE } from '../consts'

const getFactionDataAndRest = (input: Float32Array) => {
  const factionEndIndex = input.indexOf(-1)

  if (factionEndIndex === -1) {
    return {
      id: input[0],
      data: input.slice(1),
      rest: new Float32Array(),
    }
  }
  return {
    id: input[0],
    data: input.slice(1, factionEndIndex),
    rest: input.slice(factionEndIndex + 1),
  }
}

const shaders: { [key: number]: PIXI.Shader } = {}

const addFactionInfluence = (input: Float32Array) => {
  const mapWidth = window.mapWidth * SCALE
  const mapHeight = window.mapHeight * SCALE
  const uScale = Math.min(window.mapWidth, window.mapHeight)
  const uMapSize = [window.mapWidth, window.mapHeight]
  const geometry = new PIXI.Geometry()
    .addAttribute(
      'aVertexPosition',
      [
        /* eslint-disable prettier/prettier */
        0, 0,
        mapWidth, 0,
        mapWidth, mapHeight,
        0, mapHeight,
        /* eslint-enable prettier/prettier */
      ],
      2,
    )
    .addIndex([0, 1, 2, 0, 2, 3])

  const allFactionsData: { [key: number]: PIXI.Texture } = {}

  let restData = input.slice(1) // without first -1
  let uAccTexture
  while (restData.length) {
    const { id, data, rest } = getFactionDataAndRest(restData)
    restData = rest

    if (!data.length) continue

    if (!shaders[data.length]) {
      shaders[data.length] = PIXI.Shader.from(
        vertexShader,
        fragmentShader.replace(/XX/g, input.length.toString()),
        { uScale, uMapSize },
      )
    }

    shaders[data.length].uniforms.uInfluence = data
    shaders[data.length].uniforms.uAccTexture = uAccTexture
    const mesh = new PIXI.Mesh(geometry, shaders[data.length] as PIXI.MeshMaterial)
    uAccTexture = getTexture(mesh, mapWidth, mapHeight)
    allFactionsData[id] = uAccTexture
  }

  // texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST
  return allFactionsData
}

export default addFactionInfluence
