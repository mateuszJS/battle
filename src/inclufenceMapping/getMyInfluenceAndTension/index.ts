import getTexture from '~/getTexture'
import fragmentShader from './fragment.frag'
import vertexShader from './vertex.vert'

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
) => {
  const uScale = Math.min(window.mapWidth, window.mapHeight)
  const uMapSize = [window.mapWidth, window.mapHeight]

  const allFactionsData: { [key: number]: PIXI.Texture } = {}
  console.log(input)
  let restData = input.slice(1) // without first -1
  let uAccTexture
  while (restData.length) {
    const { id, data, rest } = getFactionDataAndRest(restData)
    console.log(id, data)
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

export default getMyInfluenceAndTension
