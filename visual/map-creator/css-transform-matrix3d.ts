import numeric from 'numeric'

function getTransform(from: Point[], to: Point[]) {
  const A: number[][] = [] // 8x8
  for (let i = 0; i < 4; i++) {
    A.push([from[i].x, from[i].y, 1, 0, 0, 0, -from[i].x * to[i].x, -from[i].y * to[i].x])
    A.push([0, 0, 0, from[i].x, from[i].y, 1, -from[i].x * to[i].y, -from[i].y * to[i].y])
  }

  const b: number[] = [] // 8x1
  for (let i = 0; i < 4; i++) {
    b.push(to[i].x)
    b.push(to[i].y)
  }

  // Solve A * h = b for h
  const h = numeric.solve(A, b)

  const H = [[h[0], h[1], 0, h[2]],
            [h[3], h[4], 0, h[5]],
            [   0,    0, 1,    0],
            [h[6], h[7], 0,    1]]

  return H
}

export function applyTransform(
  element: HTMLElement,
  originalPos: number[][],
  targetPos: number[][],
  callback?: (e: HTMLElement, H: number[][]) => void
) {
  // All offsets were calculated relative to the document
  // Make them relative to (0, 0) of the element instead
  const from = originalPos.map(p => ({
    x: p[0] - originalPos[0][0],
    y: p[1] - originalPos[0][1]
  }))
  const to = targetPos.map(p => ({
    x: p[0] - originalPos[0][0],
    y: p[1] - originalPos[0][1]
  }))

  // Solve for the transform
  const H = getTransform(from, to)

  // Apply the matrix3d as H transposed because matrix3d is column major order
  // Also need use toFixed because css doesn't allow scientific notation
  element.style.transformOrigin = '0 0'
  const matrix = []
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) { // can be reversed j with i
      matrix.push(H[j][i].toFixed(20))
    }
  }

  element.style.transform = `matrix3d(${matrix.join(',')})`

  return callback?.(element, H)
}
