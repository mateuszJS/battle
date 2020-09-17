import colorBurnFragmentShader from './color-burn.frag'
import vertexShader from './shared.vert'

const blendColorBurn = (
  sourceTexture: PIXI.Texture,
  blendTexture: PIXI.Texture,
  geometry: PIXI.Geometry,
  isTint: boolean,
) => {
  const shader = PIXI.Shader.from(vertexShader, colorBurnFragmentShader, {
    uTextureSampler2: sourceTexture,
    uMapSampler2: blendTexture,
    uMapSize: [window.innerWidth, window.innerHeight],
    uTint: isTint ? [2.5, 0.5, 0.5, 2] : [1, 1, 1, 1],
  })

  const destinationMesh = new PIXI.Mesh(geometry, shader as PIXI.MeshMaterial)

  return destinationMesh
}

export default blendColorBurn
