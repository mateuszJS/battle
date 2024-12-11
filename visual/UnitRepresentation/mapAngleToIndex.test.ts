import mapAngleToIndex from "./mapAngleToIndex"

const exactyCoversAngles = [
  [0, 0],
  [1.0912770348023004, 1],
  [1.5707963267948966, 2],
  [2.0503156187874927, 3],
  [3.141592653589793, 4],
  [-2.0503156187874927, 5],
  [-1.570796326794897, 6],
  [-1.0912770348023006, 7],
].map(([a, i]) => [
  (a + Math.PI * 2) % (Math.PI * 2),
  i,
])

const mapInputToOutput = [
  /* angle, number of all angles, expected index */

  /* points that are perfectly aligned with angles */
  ...exactyCoversAngles,

  /* points that are shiften a bit by positive angle */
  ...exactyCoversAngles.map(([a, i]) => [a + .2, i]),
  
  /* points that are shiften a bit by negative angle */
  ...exactyCoversAngles.map(([a, i]) => [a - .2, i]),

  /* angles are just below edges */
  ...exactyCoversAngles.map(([a, i], index) => {
    // if (i === 0) return []

    const prevAngle = index === 0 
      ? exactyCoversAngles[7][0] - (2 * Math.PI)
      : exactyCoversAngles[index - 1][0]
    // const avg = i === 0
    //   ? exactyCoversAngles.length - 1
    //   : i - 1
    const avg = (prevAngle + a) / 2
    return [
      avg - .452,
      index === 0 ? 7 : i - 1
    ]
  }),


  /* angles are just above edges */
  ...exactyCoversAngles.map(([a, i], index) => {
    // if (i === 0) return []

    const prevAngle = index === 0 
      ? exactyCoversAngles[7][0] - (2 * Math.PI)
      : exactyCoversAngles[index - 1][0]
    // const avg = i === 0
    //   ? exactyCoversAngles.length - 1
    //   : i - 1
    const avg = (prevAngle + a) / 2
    return [
      avg + .452,
      index === 0 ? 7 : i - 1
    ]
  }),
] as const







test('correctly maps angle to an index', () => {
  mapInputToOutput.forEach(([input, output]) => {
    console.log(input, output)
    expect(mapAngleToIndex(input, 8)).toBe(output)
  })
})
