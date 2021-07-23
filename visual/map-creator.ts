import initGame, { WasmModule } from '~/initGame'

const trackSideTexture = PIXI.Texture.from('assets/bridge/track-side.jpg')
const trackSurfaceTexture = PIXI.Texture.from('assets/bridge/track-surface.jpg')
const nodePlatformTexture = PIXI.Texture.from('assets/bridge/node-platform.png')

let activeElement = null
let isJoiner = true
let offset = { x: 0, y: 0 }
let connections = []
const connectionsContainer = new PIXI.Graphics()
const activeConnectionContainer = new PIXI.Graphics()
let nodes = []

const onDragStart = (event) => {
  activeElement = event.currentTarget
  offset.x = event.currentTarget.x - event.data.global.x
  offset.y = event.currentTarget.y - event.data.global.y
  event.stopPropagation()
}


const drawConnections = () => {
  connectionsContainer.clear()
  connectionsContainer.lineStyle(3, 0x0000ff, 1);

  connections.forEach(([node1, node2]) => {
    connectionsContainer.moveTo(node1.x + node1.parent.x, node1.y + node1.parent.y);
    connectionsContainer.lineTo(node2.x + node2.parent.x, node2.y + node2.parent.y);
    connectionsContainer.drawCircle(node1.x + node1.parent.x, node1.y + node1.parent.y, 6)
    connectionsContainer.drawCircle(node2.x + node2.parent.x, node2.y + node2.parent.y, 6)
  })
}

const getHoveredJoiner = (x, y) => {
  let hoveredJoiner = null
  nodes.forEach(node => {
    node.children.forEach(joiner => {
      const distance = Math.hypot(joiner.x + joiner.parent.x - x, joiner.y + joiner.parent.y - y)
      if (distance < 15) {
        hoveredJoiner = joiner
      }
    })
  })
  if (hoveredJoiner === activeElement) {
    return null
  }
  const isJoinerConnected = !!connections.find(
    ([node1, node2]) => node1 === hoveredJoiner || node2 === hoveredJoiner
  )
  if (isJoinerConnected) {
    return null
  }
  return hoveredJoiner
}

const onDragEnd = (event) => {
  if (isJoiner) {
    activeConnectionContainer.clear();
    const hoveredJoiner = getHoveredJoiner(event.data.global.x, event.data.global.y)

    if (hoveredJoiner) {
      connections.push([activeElement, hoveredJoiner])
      drawConnections()
    }
  }

  activeElement = null
  isJoiner = false
  event.stopPropagation()
}

const updateActiveConnection = (x, y) => {
  activeConnectionContainer.clear()
  activeConnectionContainer.lineStyle(5, 0x7700ff, 1)
  activeConnectionContainer.moveTo(offset.x,offset.y)
  activeConnectionContainer.lineTo(x, y)
  const hoveredJoiner = getHoveredJoiner(x, y)
  if (hoveredJoiner) {
    activeConnectionContainer.drawCircle(hoveredJoiner.x + hoveredJoiner.parent.x, hoveredJoiner.y + hoveredJoiner.parent.y, 8)
  }
  if (isJoiner) {
    activeConnectionContainer.drawCircle(activeElement.x + activeElement.parent.x, activeElement.y + activeElement.parent.y, 8)
  }
}

const onDragMove = (event)  => {
  if (activeElement) {
    if (isJoiner) {
      updateActiveConnection(event.data.global.x, event.data.global.y)
    } else {
      activeElement.position.set(
        Math.clamp(event.data.global.x + offset.x, 50, 450),
        Math.clamp(event.data.global.y + offset.y, 50, 450)
      )
      drawConnections()
    }
  }
}

const mapCreator = (wasmModule: WasmModule) => {
  const mapCreatorWrapper = new PIXI.Container()
  const nodesWrapper = new PIXI.Container()

  const background = new PIXI.Graphics()
  background.beginFill(0x333333)
  background.drawRect(50, 50, 500, 500)
  background.endFill()
  mapCreatorWrapper.addChild(background)
  mapCreatorWrapper.addChild(nodesWrapper)
  mapCreatorWrapper.addChild(connectionsContainer)
  mapCreatorWrapper.addChild(activeConnectionContainer)

  background.interactive = true;
  background.on('rightclick', (event) => {
    // const newNode = new PIXI.Sprite(nodePlatformTexture)

    const newNode = new PIXI.Graphics()
    newNode.beginFill(0xff0000)
    newNode.drawRect(-25, -25, 50, 50)
    newNode.endFill()

    for (let i = 0; i < 4; i++) {
      const joiner = new PIXI.Graphics()
      joiner.beginFill(0x00ff00)
      joiner.drawCircle(0, 0, 5)
      joiner.endFill()
      joiner.interactive = true
      joiner.x = Math.sin(i / 4 * Math.PI * 2) * 25
      joiner.y = -Math.cos(i / 4 * Math.PI * 2) * 25

      joiner
        .on('pointerdown', (event) => {
          activeElement = event.currentTarget
          isJoiner = true

          const connectionIndex = connections.findIndex(
            ([node1, node2]) => node1 === activeElement || node2 === activeElement
          )
          if (connectionIndex !== -1) {
            const removedConnection = connections.splice(connectionIndex, 1)[0]

            if (removedConnection[0] === activeElement) {
              activeElement = removedConnection[1]
            } else {
              activeElement = removedConnection[0]
            }
            offset.x = activeElement.x + activeElement.parent.x
            offset.y = activeElement.y + activeElement.parent.y
          } else {
            offset.x = activeElement.x + activeElement.parent.x
            offset.y = activeElement.y + activeElement.parent.y
          }
          drawConnections()
          updateActiveConnection(event.data.global.x, event.data.global.y)
          event.stopPropagation()
        })
      newNode.addChild(joiner)
    }


    newNode.interactive = true
    newNode.position.copyFrom(event.data.global)

    newNode
      .on('pointerdown', onDragStart)
      .on('pointerup', onDragEnd)
      .on('pointerupoutside', onDragEnd)
      
    nodesWrapper.addChild(newNode)
    nodes.push(newNode)
  })
  background.on('pointermove', onDragMove)
  window.app.stage.addChild(mapCreatorWrapper)
}

export default mapCreator
