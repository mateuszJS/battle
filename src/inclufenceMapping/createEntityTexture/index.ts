import getTexture from '~/getTexture'
import fragmentShader from './fragment.frag'
import vertexShader from './vertex.vert'

const createEntityTexture = () => {
  const shader = PIXI.Shader.from(vertexShader, fragmentShader)

  const geometry = new PIXI.Geometry()
    .addAttribute(
      'aVertexPosition',
      [
        /* eslint-disable prettier/prettier */
        0, 0,
        10, 0,
        10, 10,
        0, 10,
        /* eslint-enable prettier/prettier */
      ],
      2,
    )
    .addIndex([0, 1, 2, 0, 2, 3])

  const texture = getTexture(new PIXI.Mesh(geometry, shader as PIXI.MeshMaterial), 10, 10)
  texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST
  return texture
}

export default createEntityTexture
