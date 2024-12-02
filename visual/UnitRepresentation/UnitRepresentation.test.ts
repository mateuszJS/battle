import { UnitState } from "logic-contants"
import AssetId from "AssetsDescriptor/AssetId"
import UnitRepresentation from "./UnitRepresentation"
import AssetsDescriptor from "AssetsDescriptor"

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
  const colorMatrixData: number[] = []

  unit.addBufferData(
    textureLayersData,
    destinationData,
    sourceData,
    indiciesData,
    colorMatrixData
  )

  const ElephantHeadRunFrame = AssetsDescriptor[AssetId.ElephantHead][UnitState.RUN].frames[0]
  const RegularBodyRunFrame = AssetsDescriptor[AssetId.RegularBody][UnitState.RUN].frames[0]

  expect(textureLayersData).toEqual([
    ...Array(4).fill(ElephantHeadRunFrame.textureIndex),
    ...Array(4).fill(RegularBodyRunFrame.textureIndex),
  ])
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
    ...ElephantHeadRunFrame.sourceRect,
    ...RegularBodyRunFrame.sourceRect,
  ])
  expect(indiciesData).toEqual([
    0,1,2,0,2,3,
    4,5,6,4,6,7
  ])
})


test('when time passes, the addBufferData adds correct data with new frames', () => {
  const { unit } = getClearState()

  const headRun = AssetsDescriptor[AssetId.ElephantHead][UnitState.RUN]
  const bodyRun = AssetsDescriptor[AssetId.RegularBody][UnitState.RUN]
  const timeToNextFrame = Math.max(headRun.timePerFrame, bodyRun.timePerFrame)
  unit.update(0, UnitState.RUN, timeToNextFrame)
  
  const sourceData: number[] = []

  unit.addBufferData([], [], sourceData, [], [])

  expect(sourceData).toEqual([
    ...headRun.frames[1].sourceRect,
    ...bodyRun.frames[1].sourceRect,
  ])
})


test('when angle changes, addBufferData adds correct data', () => {
  const { unit } = getClearState()
  unit.update(Math.PI * 1.5, UnitState.RUN, 0)
  const radiansToAngles = 3

  const headRun = AssetsDescriptor[AssetId.ElephantHead][UnitState.RUN]
  const headExpectFrameIdx = radiansToAngles * headRun.animationLength

  const bodyRun = AssetsDescriptor[AssetId.RegularBody][UnitState.RUN]
  const bodyExpectFrameIdx = radiansToAngles * bodyRun.animationLength

  const sourceData: number[] = []

  unit.addBufferData([], [], sourceData, [], [])

  // for the seak of simple tests, we check only sourceData
  // since they are most random(doesn't repeat between frames)
  expect(sourceData).toEqual([
    ...headRun.frames[headExpectFrameIdx].sourceRect,
    ...bodyRun.frames[bodyExpectFrameIdx].sourceRect,
  ])
})
