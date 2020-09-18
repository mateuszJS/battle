import getTexture from '~/getTexture'
import fragmentShader from './fragment.frag'
import vertexShader from './vertex.vert'
import { SCALE } from '../consts'

const add = (input: Float32Array) => {
  // const add = (input: Float32Array) => {
  console.log(fragmentShader.replace(/X/g, input.length.toString()))
  const mapWidth = window.mapWidth * SCALE
  const mapHeight = window.mapHeight * SCALE
  const shader = PIXI.Shader.from(
    vertexShader,
    fragmentShader.replace(/X/g, input.length.toString()),
    { influence: input, uMapSize: [window.mapWidth, window.mapHeight] },
  )
  console.log(mapWidth, mapHeight, SCALE, window.mapWidth, window.mapHeight)
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

  const mesh = new PIXI.Mesh(geometry, shader as PIXI.MeshMaterial)
  const texture = getTexture(mesh, mapWidth, mapHeight)
  // texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST
  return texture
}

export default add
