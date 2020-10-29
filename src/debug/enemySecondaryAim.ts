import { Universe } from '../../crate/pkg/index'

let graph = null
let timer = 0

const drawCircle = (x: number, y: number) => {
  graph.lineStyle(0, 0xffffff, 0)
  graph.beginFill(0xff00ff, 0.4)
  graph.drawCircle(x, y, 35)
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
  graph.clear()
  const result = universe.debug_enemy_secondary_aim()
  if (result[0] < 0) return

  drawCircle(result[0], result[1])
}

export const stopDebug = () => {
  window.world.removeChild(graph)
  timer = 0
  graph = null
}
