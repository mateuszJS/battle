import getTexture from '~/getTexture'
import fragmentShader from './fragment.frag'
import vertexShader from './vertex.vert'

let shader: PIXI.Shader
let geom: PIXI.Geometry

const testOnePixelShader = () => {
  //   var program = gl.createProgram();

  // // Attach pre-existing shaders
  // gl.attachShader(program, vertexShader);
  // gl.attachShader(program, fragmentShader);

  // gl.linkProgram(program);

  // if ( !gl.getProgramParameter( program, gl.LINK_STATUS) ) {
  //   var info = gl.getProgramInfoLog(program);
  //   throw 'Could not compile WebGL program. \n\n' + info;
  // }

  if (!shader) {
    shader = PIXI.Shader.from(vertexShader, fragmentShader)
    // shader.blendMode = PIXI.BLEND_MODES.ADD
  }

  if (!geom) {
    geom = new PIXI.Geometry()
      .addAttribute(
        'aVertexPosition',
        [
          /* eslint-disable prettier/prettier */
        0, 0,
        1, 0,
        1, 1,
        0, 1,
        /* eslint-enable prettier/prettier */
        ],
        2,
      )
      .addIndex([0, 1, 2, 0, 2, 3])
  }
  // const gl = window.app.renderer.gl

  // gl.blendFunc(gl.ONE, gl.ZERO)
  // gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, gl.NONE)
  // gl.blendFunc(gl.ONE, gl.ZERO) // [125, 255, 255, 51]
  // gl.premultipliedAlpha

  // gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA) // [124, 255, 255, 41]
  const meshMaterial = shader as PIXI.MeshMaterial
  // meshMaterial.blendMode = PIXI.BLEND_MODES.NORMAL
  const mesh = new PIXI.Mesh(geom, meshMaterial)
  // mesh.blendMode = PIXI.BLEND_MODES.ADD
  // console.log(mesh, mesh.texture)
  // mesh.texture.baseTexture.alphaMode = PIXI.ALPHA_MODES.NO_PREMULTIPLIED_ALPHA
  // const graphic = new PIXI.Graphics()
  // graphic.beginFill(0x000000, 1.0)
  // graphic.drawRect(0, 0, 1, 1)
  // graphic.endFill()

  // const container = new PIXI.Container()
  // container.addChild(graphic)
  // container.addChild(mesh)
  // gl.blendFunc(gl.ONE, gl.DST_ALPHA)
  // gl.blendFunc(gl.ONE, gl.ONE)

  // gl.blendFunc(gl.DST_ALPHA, gl.ONE)
  // const tex = getTexture(mesh, 1, 1)
  // const tex = getTexture(mesh, 1, 1)
  // const tex = getTexture(mesh, 1, 1)
  // return tex
  // texture: PIXI.Texture;
  //   baseTexture: PIXI.BaseTexture;
  //     alphaMode: PIXI.ALPHA_MODES;
  //       NO_PREMULTIPLIED_ALPHA,
  // material: PIXI.MeshMaterial;
  // texture: PIXI.Texture;
  return mesh.texture
}

export default testOnePixelShader
