import hexToRGB from "./hexToRgb"

export default function addSchemeSetting(parentNode: HTMLElement): () => number[] {
  const colorMatrix = Array(12).fill(0) // it's matrix3x3 but because of the webgpu memory layout...
  const initialColors = ['#ff0000', '#00ff00', '#0000ff']
  initialColors.forEach((initialColor, i) => {
    const node = document.createElement('input')
    node.type = 'color'
    node.value = initialColor

    const { r, g, b } = hexToRGB(initialColor)
    colorMatrix[0 + i] = r
    colorMatrix[4 + i] = g
    colorMatrix[8 + i] = b

    parentNode.appendChild(node)
    node.addEventListener('input', () => {
      // console.log(e.target!.value)
      // index = 1
      const { r, g, b } = hexToRGB(node.value)
      colorMatrix[0 + i] = r
      colorMatrix[4 + i] = g
      colorMatrix[8 + i] = b
    })
  })

  return () => colorMatrix
}