import getTexture from '~/getTexture'
import fragmentShader from './fragment.frag'
import vertexShader from './vertex.vert'

let shader: PIXI.Shader

const getBestPlace = (
  map: PIXI.RenderTexture,
  x: number,
  y: number,
  distanceFactor: number,
  geometry: PIXI.Geometry,
  mapWidth: number,
  mapHeight: number,
  scale: number,
) => {
  if (!shader) {
    shader = PIXI.Shader.from(vertexShader, fragmentShader, {
      uMapSize: [mapWidth, mapHeight],
      uDistanceFactor: distanceFactor,
      uScale: scale,
    })
  }

  shader.uniforms.uMapSample2 = map
  shader.uniforms.uCoord = [x * scale, y * scale]
  const mesh = new PIXI.Mesh(geometry, shader as PIXI.MeshMaterial)
  return getTexture(mesh, mapWidth, mapHeight)
}

export default getBestPlace
