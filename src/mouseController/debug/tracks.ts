let graph = null

const debug = (result: Float32Array) => {
  if (!graph) {
    graph = new PIXI.Graphics()
    window.app.stage.addChild(graph)
  }

  let i = 0
  graph.clear()
  graph.lineStyle(3, 0xffffff, 0.3)
  while (i < result.length) {
    if (result[i] === -1 || result[i] === -2) {
      if (i !== 0) {
        if (result[i] === -1) {
          graph.endFill()

          graph.beginFill(0xff0000, 1)
          graph.lineStyle(0)
          graph.drawCircle(result[i - 2] - 2.5, result[i - 1] - 2.5, 5)
          graph.endFill()

          graph.beginFill(0x000000, 0)
          graph.lineStyle(3, 0xffffff, 0.3)
        } else {
          graph.closePath() // result[i] = -2
        }
        if (i === result.length - 1) {
          break
        }
      }
      graph.moveTo(result[i + 1], result[i + 2])
      i += 3
    } else {
      graph.lineTo(result[i], result[i + 1])
      i += 2
    }
  }
}

export default debug
