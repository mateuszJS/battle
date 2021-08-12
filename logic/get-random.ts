const LUT_LENGTH: i32 = 256
var index = 0

var lookUpTable = new StaticArray<f32>(LUT_LENGTH)

for (let i = 0; i < LUT_LENGTH; ++i) {
  unchecked(lookUpTable[i] = Math.random() as f32)
}

export function getRandom(): f32 {
  index = (index + 1) % LUT_LENGTH
  return unchecked(lookUpTable[index])
}