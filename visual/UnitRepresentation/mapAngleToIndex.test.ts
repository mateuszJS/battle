import mapAngleToIndex from "./mapAngleToIndex"


const mapInputToOutput = [
  /* angle, number of all angles, expected index */
  [[Math.PI * 0.75, 12], 4],
  [[Math.PI * 1.25, 12], 8],
] as const

test('correctly maps angle to an index', () => {
  mapInputToOutput.forEach(([input, output]) => {
    expect(mapAngleToIndex(...input)).toBe(output)
  })
})
