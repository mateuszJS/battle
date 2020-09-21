import getTexture from '~/getTexture'
import fragmentShader from './fragment.frag'
import vertexShader from './vertex.vert'
import { MAP_WIDTH, MAP_HEIGHT } from 'Consts'

const errorInput = new Float32Array([
  -1,
  1,
  205.2810821533203,
  252.26524353027344,
  0.05999999865889549,
  600,
  676.2890625,
  94.77820587158203,
  0.05999999865889549,
  600,
  -1,
  2,
  1019.48291015625,
  1063.8466796875,
  0.07000000029802322,
  600,
])

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

const getMyInfluenceAndTension = (
  input: Float32Array,
  geometry: PIXI.Geometry,
  mapWidth: number,
  mapHeight: number,
  scale: number,
) => {
  const uScale = Math.min(mapWidth, mapHeight)
  const uMapSize = [mapWidth, mapHeight]

  const allFactionsData: Array<{
    id: number
    texture: PIXI.Texture
    data: Float32Array
  }> = []

  let restData = input.slice(1) // without first -1
  let uAccTexture
  while (restData.length) {
    const { id, data, rest } = getFactionDataAndRest(restData)
    restData = rest

    if (!data.length) continue

    if (!shaders[data.length]) {
      shaders[data.length] = PIXI.Shader.from(
        vertexShader,
        fragmentShader.replace(/XX/g, data.length.toString()),
        { uScale, uMapSize, scale },
      )
    }

    shaders[data.length].uniforms.uInfluence = data
    shaders[data.length].uniforms.uAccTexture = uAccTexture
    const mesh = new PIXI.Mesh(geometry, shaders[data.length] as PIXI.MeshMaterial)
    uAccTexture = getTexture(mesh, mapWidth, mapHeight)
    allFactionsData.push({
      id,
      texture: uAccTexture,
      data,
    })
  }

  // texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST
  return allFactionsData
}

export default getMyInfluenceAndTension
