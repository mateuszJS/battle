import { DropShadowFilter } from '@pixi/filter-drop-shadow'
import getTexture from '~/getTexture'
import debounce from 'debounce'

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

float colorBurnSingleColor (float Sca, float Dca, float Sa, float Da) {
  return Sa * Da * (1.0 - min(1.0, (1.0 - Dca/Da) * Sa/Sca)) + Sca * (1.0 - Da) + Dca * (1.0 - Sa);
}

vec3 colorBurn(vec4 target, vec4 blend){
  // https://dev.w3.org/SVG/modules/compositing/master/
  return vec3(
    colorBurnSingleColor(target.r, blend.r, target.a, blend.a),
    colorBurnSingleColor(target.g, blend.g, target.a, blend.a),
    colorBurnSingleColor(target.b, blend.b, target.a, blend.a)
  );
}

float overlaySingleColor (float Sc, float Dc) {
  if (2.0 * Dc <= 1.0) {
    return 2.0 * Sc * Dc;
  }
  return 1.0 - 2.0 * (1.0 - Dc) * (1.0 - Sc);
}

vec3 overlay(vec4 target, vec4 blend) {
  return vec3(
    overlaySingleColor(target.r, blend.r) * target.a,
    overlaySingleColor(target.g, blend.g) * target.a,
    overlaySingleColor(target.b, blend.b) * target.a
  );
}

void main() {
  vec4 textureSample = texture2D(uTextureSampler2, vTextureCoord);
  vec4 mapSample = texture2D(uMapSampler2, vMapCoord);

  if (uColorBurn) {
    gl_FragColor = vec4(colorBurn(textureSample, mapSample), 1.0);
  } else {
    gl_FragColor = vec4(overlay(textureSample, mapSample), textureSample.a);
  }
}

`

const getPerspectiveTexture = (sprite2d: PIXI.projection.Sprite2d, yOffsetsNormal: number[]) => {
  const { width, height } = sprite2d
  const yPoints = yOffsetsNormal.map(value => value * height)
  const minY = Math.min(...yPoints)
  const maxY = Math.max(...yPoints)
  const maxHeight = maxY - minY
  const yPointsFromZero = yPoints.map(value => value - minY) // have to be positive value

  sprite2d.proj.mapSprite(sprite2d, [
    { x: 0, y: yPointsFromZero[0] },
    { x: width, y: yPointsFromZero[1] },
    { x: width, y: yPointsFromZero[2] },
    { x: 0, y: yPointsFromZero[3] },
  ])

  return getTexture(sprite2d, width, maxHeight)
}

const setup = () => {
  const backgroundTexture = PIXI.Texture.from('assets/pure_background_with_traced_images.jpg')
  const background = new PIXI.Sprite(backgroundTexture)

  // TODO: read difference between mesh and shader AND pixi filters

  //==========================================================================================

  window.app.stage.addChild(background)

  const addItem = (
    texturePath: string,
    yPosNormal: number,
    heightNormal: number,
    proportionHeightToWidth: number,
    proportionWidthToX: number,
    projectionPointsY: number[] | null,
    windowSize: number,
  ) => {
    const verticalCenter = window.innerHeight / 2
    const horizontalCenter = window.innerWidth / 2
    const btnBaseHeight = windowSize * heightNormal
    const btnBaseWidth = btnBaseHeight * proportionHeightToWidth
    const btnBaseX = horizontalCenter - proportionWidthToX * btnBaseWidth
    const btnBaseY = verticalCenter + yPosNormal * btnBaseHeight

    const btnBaseSprite = new PIXI.Sprite(PIXI.Texture.from(texturePath))
    btnBaseSprite.width = btnBaseWidth
    btnBaseSprite.height = btnBaseHeight
    const btnBaseTextureResized = getTexture(btnBaseSprite, btnBaseWidth, btnBaseHeight)
    // looks like Sprite2d has to receive texture in correct size
    let btnPerspectiveTexture
    if (projectionPointsY) {
      const sprite2d = new PIXI.projection.Sprite2d(btnBaseTextureResized)
      btnPerspectiveTexture = getPerspectiveTexture(sprite2d, projectionPointsY)
    } else {
      btnPerspectiveTexture = btnBaseTextureResized
    }

    const btnShadowSprite = new PIXI.Sprite(btnPerspectiveTexture)
    // window.app.stage.addChild(aaa)
    // return

    const dropShadowFilter = new DropShadowFilter({
      distance: 0,
      blur: 3,
      alpha: 1,
      quality: 5,
      color: 0x663e03,
      shadowOnly: true,
    })
    btnShadowSprite.filters = [dropShadowFilter]
    const dropShadowFilterPadding = btnShadowSprite.filters[0].padding

    // window.app.stage.addChild(btnShadowSprite)
    // window.app.stage.addChild(new PIXI.Sprite(btnPerspectiveTexture))
    // return

    const btnShadowWidth = btnPerspectiveTexture.width + 2 * dropShadowFilterPadding
    const btnShadowHeight = btnPerspectiveTexture.height + 2 * dropShadowFilterPadding
    const btnShadowX = btnBaseX - dropShadowFilterPadding
    const btnShadowY = btnBaseY - dropShadowFilterPadding

    const btnShadowTexture = getTexture(
      btnShadowSprite,
      btnShadowWidth,
      btnShadowHeight,
      {
        texture: false,
        baseTexture: false,
      },
      -dropShadowFilterPadding,
      -dropShadowFilterPadding,
    )

    // const ccc = new PIXI.Sprite(btnShadowTexture)
    // window.app.stage.addChild(ccc)
    // return

    const btnShadowShader = PIXI.Shader.from(vertexShader, fragmentShader, {
      uTextureSampler2: btnShadowTexture,
      uMapSampler2: backgroundTexture,
      uMapSize: [window.innerWidth, window.innerHeight],
      uColorBurn: false,
    })

    const shadowGeometry = new PIXI.Geometry()
      .addAttribute(
        'aVertexPosition',
        [
          /* eslint-disable prettier/prettier */
          btnShadowX, btnShadowY,
          btnShadowX + btnShadowWidth, btnShadowY,
          btnShadowX + btnShadowWidth, btnShadowY + btnShadowHeight,
          btnShadowX, btnShadowY + btnShadowHeight,
          /* eslint-enable prettier/prettier */
        ],
        2,
      )
      .addAttribute('aUvs', [0, 0, 1, 0, 1, 1, 0, 1], 2)
      .addIndex([0, 1, 2, 0, 2, 3])
    // .interleave();

    const btnShadowMesh = new PIXI.Mesh(shadowGeometry, btnShadowShader as PIXI.MeshMaterial)

    // TO TEST OVERLAY
    // window.app.stage.addChild(background)
    // window.app.stage.addChild(btnShadowMesh)
    // return

    const btnFaceSprite = new PIXI.Sprite(btnPerspectiveTexture)

    btnFaceSprite.x = btnBaseX
    btnFaceSprite.y = btnBaseY

    const btnContainer = new PIXI.Container()
    btnContainer.addChild(btnShadowMesh)
    btnContainer.addChild(btnFaceSprite)
    // window.app.stage.addChild(btnContainer)
    // return

    const startBtnContainerTexture = getTexture(
      btnContainer,
      btnShadowWidth,
      btnShadowHeight,
      {
        texture: false,
        baseTexture: false,
      },
      btnShadowX,
      btnShadowY,
    )

    const btnContainerShader = PIXI.Shader.from(vertexShader, fragmentShader, {
      uTextureSampler2: startBtnContainerTexture,
      uMapSampler2: backgroundTexture,
      uMapSize: [window.innerWidth, window.innerHeight],
      uColorBurn: true,
    })
    const btnMesh = new PIXI.Mesh(shadowGeometry, btnContainerShader as PIXI.MeshMaterial)

    window.app.stage.addChild(btnMesh)

    return btnMesh
  }

  let itemsToClear = []

  const onResize = () => {
    itemsToClear.forEach(item => window.app.stage.removeChild(item))
    window.app.renderer.resize(window.innerWidth, window.innerHeight)
    background.width = window.innerWidth
    background.height = window.innerHeight
    const windowSize = Math.min(window.innerHeight * 1.75, window.innerWidth)

    const startBtn = addItem(
      'assets/start_btn.png',
      -1.2,
      0.14,
      1.941,
      1.4,
      [-0.137, 0.148, 1.057, 1],
      windowSize,
    )
    startBtn.interactive = true
    startBtn.buttonMode = true
    startBtn.on('pointerover', function() {
      this.tint = 0xaaaaaa
    })
    startBtn.on('pointerout', function() {
      this.tint = 0xffffff
    })

    const donateBtn = addItem(
      'assets/donate_btn.png',
      0.2,
      0.14,
      1.941,
      1.4,
      [0, -0.105, 0.756, 1],
      windowSize,
    )
    donateBtn.interactive = true
    donateBtn.buttonMode = true
    donateBtn.on('pointerover', function() {
      console.log(this.tint)
      // this.tint = 0xaaaaaa
      this.alpha = 0.5
      this.x -= 100
      this.texture = startBtn.texture
    })
    donateBtn.on('pointerout', function() {
      // this.tint = 0xffffff
      this.alpha = 1
      this.x += 100
    })

    itemsToClear = [
      startBtn,
      donateBtn,
      addItem('assets/divider.png', -0.46, 0.31, 0.0697, 0.5, null, windowSize),
    ]
  }

  window.addEventListener('resize', debounce(onResize, 1000))
  onResize()
}

export default setup
