import { Universe } from '../../crate/pkg/index'

let graph = null
let timer = 0
const drawCircle = (x, y) => {
  graph.beginFill(0xff0000, 1)
  graph.lineStyle(0)
  graph.drawCircle(x - 2.5, y - 2.5, 5)
  graph.endFill()
}

export const startDebug = (universe: Universe) => {
  if (++timer > 30) {
    timer = 0
  } else {
    return
  }

  if (!graph) {
    graph = new PIXI.Graphics()
    window.world.addChild(graph)
  }

  const result = universe.debug_track()

  let i = 2

  graph.clear()
  graph.beginFill(0x000000, 0)
  graph.lineStyle(3, 0xffffff, 0.3)
  graph.moveTo(result[0], result[1])

  while (i < result.length) {
    if (result[i] === -1) {
      graph.endFill()

      drawCircle(result[i - 2], result[i - 1])

      graph.beginFill(0x000000, 0)
      graph.lineStyle(3, 0xffffff, 0.3)
      graph.moveTo(result[i + 1], result[i + 2])
      i += 3
    } else {
      graph.lineTo(result[i], result[i + 1])
      i += 2
    }
  }
}

export const stopDebug = () => {
  window.world.removeChild(graph)
  timer = 0
  graph = null
}
