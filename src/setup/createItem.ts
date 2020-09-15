import { DropShadowFilter } from '@pixi/filter-drop-shadow'
import getTexture from '~/getTexture'
import getPerspectiveTexture from './getPerspectiveTexture'
import fragmentShader from './shared.frag'
import vertexShader from './shared.vert'

const createItem = (
  texture: PIXI.Texture,
  backgroundTexture: PIXI.Texture,
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

  const btnBaseSprite = new PIXI.Sprite(texture)
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
  // menuContainer.addChild(aaa)
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

  // menuContainer.addChild(btnShadowSprite)
  // menuContainer.addChild(new PIXI.Sprite(btnPerspectiveTexture))
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
  // menuContainer.addChild(ccc)
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
        btnShadowX,
        btnShadowY,
        btnShadowX + btnShadowWidth,
        btnShadowY,
        btnShadowX + btnShadowWidth,
        btnShadowY + btnShadowHeight,
        btnShadowX,
        btnShadowY + btnShadowHeight,
        /* eslint-enable prettier/prettier */
      ],
      2,
    )
    .addAttribute('aUvs', [0, 0, 1, 0, 1, 1, 0, 1], 2)
    .addIndex([0, 1, 2, 0, 2, 3])
  // .interleave();

  const btnShadowMesh = new PIXI.Mesh(shadowGeometry, btnShadowShader as PIXI.MeshMaterial)

  // TO TEST OVERLAY
  // menuContainer.addChild(background)
  // menuContainer.addChild(btnShadowMesh)
  // return

  const btnFaceSprite = new PIXI.Sprite(btnPerspectiveTexture)

  btnFaceSprite.x = btnBaseX
  btnFaceSprite.y = btnBaseY

  const btnContainer = new PIXI.Container()
  btnContainer.addChild(btnShadowMesh)
  btnContainer.addChild(btnFaceSprite)
  // menuContainer.addChild(btnContainer)
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

  return btnMesh
}

export default createItem
