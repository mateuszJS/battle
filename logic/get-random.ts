const LUT_LENGTH: usize = 256
var index = 0

var lookUpTable = new Array<f32>(LUT_LENGTH)

for (let i = 0; i < LUT_LENGTH; ++i) {
  lookUpTable[i] = Math.random()
}

export function getRandom(): f32 {
  index = (index + 1) % LUT_LENGTH
  return lookUpTable[index]
}