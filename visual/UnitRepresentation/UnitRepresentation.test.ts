import { UnitState } from "logic-contants"
import AssetId from "AssetsDescriptor/AssetId"
import UnitRepresentation from "./UnitRepresentation"

jest.mock('AssetsDescriptor')

function getClearState() {
  return {
    unit: new UnitRepresentation(
      UnitState.RUN,
      0,
      { x: 0, y: 0 },
      [AssetId.ElephantHead, AssetId.RegularBody],
      0,
    )
  }
}

test('addBufferData adds correct data', () => {
  const { unit } = getClearState()

  const textureLayersData: number[] = []
  const destinationData: number[] = []
  const sourceData: number[] = []
  const indiciesData: number[] = []

  unit.addBufferData(
    textureLayersData,
    destinationData,
    sourceData,
    indiciesData
  )

  expect(textureLayersData).toEqual([4,4,4,4,3,3,3,3])
  expect(destinationData).toEqual([
    -502.8322469443083,
    -1928.6474091932178,
    -399.8322469443083,
    -1928.6474091932178,
    -399.8322469443083,
    -1650.6474091932178,
    -502.8322469443083,
    -1650.6474091932178,
    -205.22872917354107,
    -1328.5196255892515,
    -87.22872917354107,
    -1328.5196255892515,
    -87.22872917354107,
    -1254.5196255892515,
    -205.22872917354107,
    -1254.5196255892515
  ])
  expect(sourceData).toEqual([
    0.7921599089168012,
    0.464202742325142,
    0.7127368075307459,
    0.8857757973019034,
    0.09209740441292524,
    0.7933277997653931,
    0.7030220609158278,
    0.8093953398056328,
    0.021930926479399204,
    0.9433356958907098,
    0.572630780050531,
    0.6654445738531649,
    0.388800241984427,
    0.8496887346263975,
    0.7443910103756934,
    0.5051046009175479
  ])
  expect(indiciesData).toEqual([0,1,2,0,2,3,4,5,6,4,6,7])

  // expect(animatedSprite.frameIndex).toEqual(initialConfig.firstFrame)
})
