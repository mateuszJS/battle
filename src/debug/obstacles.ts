let graph = null

const debug = (result: number[][][]) => {
  if (!graph) {
    graph = new PIXI.Graphics()
    window.app.stage.addChild(graph)
  }

  graph.clear()
  graph.beginFill(0x000000, 0)
  graph.lineStyle(3, 0xffffff, 0.3)

  result.forEach(pointsList => {
    const [firstPoint, ...restPoint] = pointsList
    graph.moveTo(firstPoint[0], firstPoint[1])
    restPoint.forEach(point => {
      graph.lineTo(point[0], point[1])
    })
    graph.closePath()
  })
}

export default debug
