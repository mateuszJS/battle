const generateArray = (count: number) => {
  const unitSize = 50
  const factor = count < 21 ? 0.35 : 0.2//zero maths, value comes only from view, depends on good looking
  const cols = Math.ceil(count * factor)
  const rows = Math.ceil(count / cols)
  const height = rows * unitSize
  const width = cols * unitSize
  const points: Point[] = []

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols && points.length < count; j++) {
      points.push({
        x: (i & 1) * 15 + j * unitSize - width / 2,//aby nieparzyste wiersze były o 20 w osi X przesunięte
        y: i * unitSize - height / 2// - height / 2, -width / 2 -> aby wyśrodkowac cała tablicę
      });
    }
  }

  return {
    height,
    width,
    cols,
    rows,
    points,
  }
}

export default generateArray;