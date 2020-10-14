import { Universe } from '../../crate/pkg/index'

let graph = null

const debug = (universe: Universe) => {
  if (graph) return

  const result = universe.debug_obstacles()
  graph = new PIXI.Graphics()
  window.world.addChild(graph)

  let i = 2

  graph.clear()
  graph.beginFill(0x000000, 0)
  graph.lineStyle(3, 0xffffff, 0.3)
  graph.moveTo(result[0], result[1])

  while (i < result.length) {
    if (result[i] === -1) {
      graph.endFill()

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

export default debug
