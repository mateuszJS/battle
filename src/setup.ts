import { DropShadowFilter } from '@pixi/filter-drop-shadow'
import getTexture from '~/getTexture'
import createBackgroundTexture from './createBackgroundTexture'
const setup = () => {
  const backgroundTexture = PIXI.Texture.from('assets/pure_background_with_traced_images copy.jpg')
  const startBtnBaseTexture = PIXI.Texture.from('assets/start_btn.png')
  const background = new PIXI.Sprite(backgroundTexture)
  background.width = window.innerWidth
  background.height = window.innerHeight

  const btnWidth = 367
  const btnHeight = 189
  const btnX = 0.12281855 * window.innerWidth
  const btnY = 0.230086694 * window.innerHeight
  /* eslint-disable prettier/prettier */
  const geometry = new PIXI.Geometry()
    .addAttribute('aVertexPosition',
        [
          btnX + 0, 0 + btnY,
          btnX + btnWidth, 0 + btnY,
          btnX + btnWidth, btnHeight + btnY,
          btnX + 0, btnHeight + btnY,
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
      vMapCoord = aVertexPosition / uMapSize;
      gl_Position = vec4(pos, 0.0, 1.0);
  }`

  const fragmentShader = `precision mediump float;

  varying vec2 vTextureCoord;
  varying vec2 vMapCoord;

  uniform sampler2D uTextureSampler2;
  uniform sampler2D uMapSampler2;
  uniform bool uColorBurn;
  //https://www.w3.org/TR/compositing-1/#blendingcolorburn
  //
  float blendColorBurn(float base, float blend) {
    return (blend==0.0)?blend:max((1.0-((1.0-base)/blend)),0.0);
  }
  
  vec3 blendColorBurn(vec3 base, vec3 blend) {
    return vec3(blendColorBurn(base.r,blend.r),blendColorBurn(base.g,blend.g),blendColorBurn(base.b,blend.b));
  }

  vec3 colorBurn (vec3 target, vec3 blend){
    return 1.0 - (1.0 - blend) / target;
  }
  vec3 colorBurnEnhanced (vec4 target, vec4 blend){
    // https://dev.w3.org/SVG/modules/compositing/master/
    float Sa = target.a;
    float Da = blend.a;
    vec3 Dca = blend.rgb;
    vec3 Sca = target.rgb;
    return Sa * Da * (1.0 - min(vec3(1.0), (1.0 - Dca/Da) * Sa/Sca)) + Sca * (1.0 - Da) + Dca * (1.0 - Sa);
  }

  vec3 overlay (vec3 target, vec3 blend){
    // if(target > 0.5) {
    //   return screen(blend, 2 * target - 1.0);
    // }
    // return multiply(blend, 2.0 * target);

    vec3 temp;
    temp.x = (target.x > 0.5) ? (1.0-(1.0-2.0*(target.x-0.5))*(1.0-blend.x)) : (2.0*target.x)*blend.x;
    temp.y = (target.y > 0.5) ? (1.0-(1.0-2.0*(target.y-0.5))*(1.0-blend.y)) : (2.0*target.y)*blend.y;
    temp.z = (target.z > 0.5) ? (1.0-(1.0-2.0*(target.z-0.5))*(1.0-blend.z)) : (2.0*target.z)*blend.z;
    return temp;
  }


  void main() {
    vec4 textureSample = texture2D(uTextureSampler2, vTextureCoord);
    vec4 mapSample = texture2D(uMapSampler2, vMapCoord);
    // TODO: there is issue in the alpha channel!!!
    if (uColorBurn) {
      // it works the same in Illustrator
      // gl_FragColor = vec4(vec3(0.6) * 0.9, 0.9);
      // gl_FragColor = textureSample;
      // gl_FragColor = vec4(colorBurn(textureSample.rgb, mapSample.rgb), 1.0); // it's 1.0 so "without alpha", correct with excel and Illustrator
      // gl_FragColor = vec4(colorBurn(textureSample.rgb, mapSample.rgb) * textureSample.a, 1.0); // "with alpha" is also correct with excel
      
      // gl_FragColor = vec4(colorBurn(textureSample.rgb, mapSample.rgb), textureSample.a); // correct with excel, not with Illustrator

      gl_FragColor = vec4(colorBurnEnhanced(textureSample, mapSample), 1.0); // this is correct formula :o

      // gl_FragColor = vec4(colorBurn(textureSample.rgb, mapSample.rgb * (1.0 - textureSample.a)), textureSample.a); // correct with excel, not with Illustrator
      // gl_FragColor = vec4(colorBurn(textureSample.rgb, mapSample.rgb) * textureSample.a, textureSample.a); // correct with excel, not with Illustrator

      // gl_FragColor = vec4(colorBurn(textureSample.rgb, mapSample.rgb) * textureSample.a, textureSample.a);
      // gl_FragColor = vec4(colorBurn(textureSample.rgb, mapSample.rgb) * (textureSample.a * 0.5 + 1.0), textureSample.a);
      // gl_FragColor = vec4(colorBurn(textureSample.rgb * textureSample.a), mapSample.rgb), textureSample.a);
      // gl_FragColor = vec4(blendColorBurn(mapSample.rgb, textureSample.rgb), textureSample.a);
    } else {
      // gl_FragColor = textureSample;
      gl_FragColor = vec4(overlay(textureSample.rgb, mapSample.rgb), textureSample.a);
    }
  }

`

  const makeBlendText = () => {
    const normalRect = new PIXI.Graphics()
    normalRect.beginFill(0x999999)
    normalRect.drawRect(300, 300, 100, 100)
    // Textures are already premultipled! So rgb includes alpha!
    normalRect.alpha = 0.25
    window.app.stage.addChild(normalRect)

    const sourceRect = new PIXI.Graphics()
    sourceRect.beginFill(0x999999) // 153
    // sourceRect.beginFill(0x0a8c00)
    sourceRect.drawRect(0, 0, 100, 100)
    sourceRect.alpha = normalRect.alpha
    // Textures are already premultipled! So rgb includes alpha!
    // sourceRect.alpha = 0.9 //                results from Illustrator light x dark (our results without including alpha channel in the blend func) & (with alpha channel in blend func)
    // 99% looks almost like in Illustrator                          -> 170 x 1   (171 x 1  ) & (172, 1  )
    // 90% looks okay on darker one, on lighter it's much difference -> 174 x 11  (182 x 10 ) & (191, 12 )
    // 75% looks okay on darker one, on lighter it's much difference -> 179 x 26  (193 x 26 ) & (221, 26 )
    // 50% looks almost like in Illustrator                          -> 186 x 51  (189 x 51 ) & (255, 54 )
    // 43% looks okay on darker one, on lighter it's much difference -> 189 x 58  (175 x 58 ) & (255, 61 )
    // 35% looks okay on darker one, on lighter it's much difference -> 192 x 67  (147 x 66 ) & (255, 69 )
    // 25% looks okay on darker one, on lighter it's much difference -> 195 x 76  (154 x 77 ) & (255, 78 )
    // 10% looks okay on darker one, on lighter it's much difference -> 201 x 92  (184 x 92 ) & (255, 92 )
    // 1%  looks almost like in Illustrator                          -> 204 x 101 (202 x 101) & (255, 203)
    // 1.0 - (1.0 - blend) / target;
    // 1.0 - (1.0 - (opacity * blend + (1.0 - opacity)))/ target;
    sourceRect.endFill()

    const sourceRectTexture = getTexture(sourceRect, 100, 100, {
      texture: false,
      baseTexture: false,
    })

    const backdropRect = new PIXI.Graphics()
    // backdropRect.beginFill(0x000000) // 204
    backdropRect.beginFill(0xcccccc) // 204
    backdropRect.drawRect(0, 0, 100, 100)
    backdropRect.endFill()

    backdropRect.beginFill(0x666666) // 102
    backdropRect.drawRect(100, 100, 100, 100)
    backdropRect.endFill()

    const backdropRectTexture = getTexture(backdropRect, 200, 200, {
      texture: false,
      baseTexture: false,
    })

    const shader = PIXI.Shader.from(vertexShader, fragmentShader, {
      uTextureSampler2: sourceRectTexture,
      uMapSampler2: backdropRectTexture,
      uMapSize: [
        200, // NOTE: totally don't know why it works
        200,
      ],
      uColorBurn: true,
    })

    const geometryTest = new PIXI.Geometry()
      .addAttribute('aVertexPosition', [50, 50, 150, 50, 150, 150, 50, 150], 2)
      .addAttribute('aUvs', [0, 0, 1, 0, 1, 1, 0, 1], 2)
      .addIndex([0, 1, 2, 0, 2, 3])

    const mesh = new PIXI.Mesh(geometryTest, shader as PIXI.MeshMaterial)
    window.app.stage.addChild(new PIXI.Sprite(backdropRectTexture))
    window.app.stage.addChild(mesh)
  }
  // makeBlendText()
  // return
  // TODO: read difference between mesh and shader AND pixi filters

  const btnShadowBase = new PIXI.Sprite(PIXI.Texture.from('assets/start_btn.png'))
  btnShadowBase.width = btnWidth
  btnShadowBase.height = btnHeight
  btnShadowBase.x = btnX
  btnShadowBase.y = btnY

  btnShadowBase.filters = [
    new DropShadowFilter({
      distance: 0,
      blur: 3,
      alpha: 1,
      quality: 5,
      color: 0x663e03,
      // color: 0x361e02,
      // color: 0x824d08,
      // color: 0x915506,
      // color: 0x7f5c05,
      shadowOnly: true,
    }),
  ]

  const btnShadowTexture = getTexture(
    btnShadowBase,
    btnWidth,
    btnHeight,
    {
      texture: false,
      baseTexture: false,
    },
    btnX,
    btnY,
  )

  const btnShadowShader = PIXI.Shader.from(vertexShader, fragmentShader, {
    uTextureSampler2: btnShadowTexture,
    uMapSampler2: PIXI.Texture.from('assets/pure_background_with_traced_images copy.jpg'),
    uMapSize: [
      window.innerWidth, // NOTE: totally don't know why it works
      window.innerHeight,
    ],
    uColorBurn: false,
  })

  const btnShadowMesh = new PIXI.Mesh(geometry, btnShadowShader as PIXI.MeshMaterial)

  const btnFaceSprite = new PIXI.Sprite(PIXI.Texture.from('assets/start_btn.png'))
  btnFaceSprite.width = btnWidth
  btnFaceSprite.height = btnHeight
  btnFaceSprite.x = btnX
  btnFaceSprite.y = btnY

  window.app.stage.addChild(background)
  const btnContainer = new PIXI.Container()
  btnContainer.addChild(btnShadowMesh)
  btnContainer.addChild(btnFaceSprite)

  const startBtnContainerTexture = getTexture(
    btnContainer,
    btnWidth,
    btnHeight,
    {
      texture: false,
      baseTexture: false,
    },
    btnX,
    btnY,
  )

  const btnContainerShader = PIXI.Shader.from(vertexShader, fragmentShader, {
    uTextureSampler2: startBtnContainerTexture,
    uMapSampler2: PIXI.Texture.from('assets/pure_background_with_traced_images copy.jpg'),
    uMapSize: [window.innerWidth, window.innerHeight],
    uColorBurn: true,
  })
  const btnMesh = new PIXI.Mesh(geometry, btnContainerShader as PIXI.MeshMaterial)
  window.app.stage.addChild(btnMesh)
  // window.app.stage.addChild(new PIXI.Sprite(PIXI.Texture.from('assets/goooosh.png')))
  return
  const startBtnTexture = getTexture(
    btnMesh,
    btnWidth,
    btnHeight,
    {
      texture: false,
      baseTexture: false,
    },
    btnX,
    btnY,
  )

  const containerSprite = new PIXI.projection.Sprite2d(startBtnTexture)
  containerSprite.x = btnX
  containerSprite.y = btnY
  // containerSprite.x = 0.12281855 * window.innerWidth
  // containerSprite.y = 0.230086694 * window.innerHeight

  // containerSprite.proj.mapQuad(
  //   new PIXI.Rectangle(containerSprite.x, containerSprite.y, btnWidth, btnHeight),
  //   [
  //     { x: containerSprite.x, y: containerSprite.y },
  //     { x: containerSprite.x + btnWidth, y: containerSprite.y * 0.8 },
  //     { x: containerSprite.x + btnWidth, y: (containerSprite.y + btnHeight) * 0.8 },
  //     { x: containerSprite.x, y: containerSprite.y + btnHeight },
  //   ],
  // )

  window.app.stage.addChild(containerSprite)

  // window.app.ticker.add((delta: number) => {})
}

export default setup
