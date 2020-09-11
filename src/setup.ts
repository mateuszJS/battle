import { DropShadowFilter } from '@pixi/filter-drop-shadow'
import getTexture from '~/getTexture'
import createBackgroundTexture from './createBackgroundTexture'
const setup = () => {
  const backgroundTexture = PIXI.Texture.from('assets/pure_background_with_traced_images.jpg')
  const startBtnBaseTexture = PIXI.Texture.from('assets/start_btn.png')
  const background = new PIXI.Sprite(backgroundTexture)
  background.width = window.innerWidth
  background.height = window.innerHeight

  const btnWidth = 367
  const btnHeight = 189

  /* eslint-disable prettier/prettier */
  const geometry = new PIXI.Geometry()
    .addAttribute('aVertexPosition',
        [
          0, 0,
          btnWidth, 0,
          btnWidth, btnHeight,
          0, btnHeight,
        ], 2)
    .addAttribute('aUvs',
        [
          0, 0,
          1, 0,
          1, 1,
          0, 1,
        ], 2)
    .addIndex([0, 1, 2, 0, 2, 3])
    // .interleave();
  /* eslint-enable prettier/prettier */

  const vertexShader = `

  precision mediump float;

  attribute vec2 aVertexPosition;
  attribute vec2 aUvs;

  uniform mat3 translationMatrix;
  uniform mat3 projectionMatrix;
  uniform vec2 uMapSize;

  varying vec2 vTextureCoord;
  varying vec2 vMapCoord;

  void main() {
      vTextureCoord = aUvs;
      vec2 pos = (projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy;
      vMapCoord = (vec2(pos.x, -pos.y) + vec2(1.0)) / vec2(2.0);
      gl_Position = vec4(pos, 0.0, 1.0);

  }`

  const fragmentShader = `precision mediump float;

  varying vec2 vTextureCoord;
  varying vec2 vMapCoord;

  uniform sampler2D uTextureSampler2;
  uniform sampler2D uMapSampler2;
  uniform bool uColorBurn;

  vec3 colorBurn (vec3 target, vec3 blend){
    return 1.0 - (1.0 - target) / blend;
  }

  // vec3 multiply (vec3 target, vec3 blend){
  //   return target*blend;
  // }

  vec3 overlay (vec3 target, vec3 blend){
    vec3 temp;
    temp.x = (target.x > 0.5) ? (1.0-(1.0-2.0*(target.x-0.5))*(1.0-blend.x)) : (2.0*target.x)*blend.x;
    temp.y = (target.y > 0.5) ? (1.0-(1.0-2.0*(target.y-0.5))*(1.0-blend.y)) : (2.0*target.y)*blend.y;
    temp.z = (target.z > 0.5) ? (1.0-(1.0-2.0*(target.z-0.5))*(1.0-blend.z)) : (2.0*target.z)*blend.z;
    return temp;
  }


  void main() {
    vec4 textureSample = texture2D(uTextureSampler2, vTextureCoord);
    vec4 mapSample = texture2D(uMapSampler2, vMapCoord);
    // gl_FragColor = textureSample;
    if (uColorBurn) {
      gl_FragColor = vec4(colorBurn(mapSample.rgb, textureSample.rgb), textureSample.a);
    } else {
      // gl_FragColor = textureSample;
      gl_FragColor = vec4(overlay(textureSample.rgb, mapSample.rgb), textureSample.a);
      // gl_FragColor = vec4(vec3(0.0, 1.0, 0.0), textureSample.a);
    }
  }

`
  const btnShadowBase = new PIXI.Sprite(PIXI.Texture.from('assets/start_btn.png'))
  btnShadowBase.width = btnWidth
  btnShadowBase.height = btnHeight

  btnShadowBase.filters = [
    new DropShadowFilter({
      distance: 0,
      blur: 3,
      alpha: 1,
      quality: 5,
      color: 0x663e03,
      shadowOnly: true,
    }),
  ]

  const btnShadowTexture = getTexture(btnShadowBase, btnWidth, btnHeight, {
    texture: false,
    baseTexture: false,
  })

  const btnShadowShader = PIXI.Shader.from(vertexShader, fragmentShader, {
    uTextureSampler2: btnShadowTexture,
    uMapSampler2: PIXI.Texture.from('assets/pure_background_with_traced_images.jpg'),
    mapSize: [
      background.width / backgroundTexture.width,
      background.height / backgroundTexture.height,
    ],
    uColorBurn: false,
  })

  const btnShadowMesh = new PIXI.Mesh(geometry, btnShadowShader as PIXI.MeshMaterial)

  // window.app.stage.addChild(btnShadowMesh)
  // return

  const btnFaceShader = PIXI.Shader.from(vertexShader, fragmentShader, {
    uTextureSampler2: PIXI.Texture.from('assets/start_btn.png'),
    uMapSampler2: PIXI.Texture.from('assets/pure_background_with_traced_images.jpg'),
    mapSize: [
      background.width / backgroundTexture.width,
      background.height / backgroundTexture.height,
    ],
    uColorBurn: true,
  })

  const btnFaceMesh = new PIXI.Mesh(geometry, btnFaceShader as PIXI.MeshMaterial)

  window.app.stage.addChild(background)

  const btnContainer = new PIXI.Container()
  btnContainer.addChild(btnShadowMesh)
  btnContainer.addChild(btnFaceMesh)

  const startBtnTexture = getTexture(btnContainer, btnWidth, btnHeight, {
    texture: false,
    baseTexture: false,
  })

  const containerSprite = new PIXI.projection.Sprite2d(startBtnTexture)
  containerSprite.x = 0.12281855 * window.innerWidth
  containerSprite.y = 0.230086694 * window.innerHeight

  containerSprite.proj.mapQuad(
    new PIXI.Rectangle(containerSprite.x, containerSprite.y, btnWidth, btnHeight),
    [
      { x: containerSprite.x, y: containerSprite.y },
      { x: containerSprite.x + btnWidth, y: containerSprite.y * 0.8 },
      { x: containerSprite.x + btnWidth, y: (containerSprite.y + btnHeight) * 0.8 },
      { x: containerSprite.x, y: containerSprite.y + btnHeight },
    ],
  )

  window.app.stage.addChild(containerSprite)

  // window.app.ticker.add((delta: number) => {})
}

export default setup
