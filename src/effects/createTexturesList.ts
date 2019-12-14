export default (getTextureName, count) => {
  const arr = []
  for (let i = 0; i < count; i++) {
    const texture = getTextureName(i)
    arr.push(PIXI.Texture.from(texture))
  }
  return arr
}
