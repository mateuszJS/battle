const LUT_LENGTH: i32 = 256
var index = 0

var lookUpTable = new StaticArray<f32>(LUT_LENGTH)

for (let i = 0; i < LUT_LENGTH; ++i) {
  lookUpTable[i] = Mathf.random()
}

export function getRandom(): f32 {
  index = (index + 1) % LUT_LENGTH
  return unchecked(lookUpTable[index])
}