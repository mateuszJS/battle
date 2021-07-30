import initGame, { WasmModule } from '~/initGame'

const trackSideTexture = PIXI.Texture.from('assets/bridge/track-side.jpg')
const trackSurfaceTexture = PIXI.Texture.from('assets/bridge/track-surface.jpg')
const nodePlatformTexture = PIXI.Texture.from('assets/bridge/node-platform.png')

let activeElement = null
let isJoiner = true
let offset = { x: 0, y: 0 }
let connections: Array<[PIXI.Graphics, PIXI.Graphics]> = []
const connectionsContainer = new PIXI.Graphics()
const activeConnectionContainer = new PIXI.Graphics()
const nodesWrapper = new PIXI.Container()
const mapCreatorWrapper = new PIXI.Container()
let previewWrapper

let nodes: PIXI.Graphics[] = []
const nodePlatformSize = 100
const mapDetails = {
  x: nodePlatformSize,
  y: 50,
  width: 500,
  height: 800
}
const portalSize = 30

const updatePreview = () => {
  if (previewWrapper) {
    previewWrapper.parent.removeChild(previewWrapper)
  }

  previewWrapper = new PIXI.Container()
  const background = new PIXI.Graphics()
  background.beginFill(0x333333)
  background.drawRect(0, 0, mapDetails.width, mapDetails.height)
  background.endFill()
  previewWrapper.addChild(background)
  mapCreatorWrapper.addChild(previewWrapper)
  previewWrapper.x = mapDetails.x * 2 + mapDetails.width
  previewWrapper.y = mapDetails.y
  nodes.forEach(node => {
    const sprite = new PIXI.Sprite(nodePlatformTexture)
    sprite.x = node.x
    sprite.y = node.y
    sprite.scale.set(nodePlatformSize / nodePlatformTexture.width)
    previewWrapper.addChild(sprite)
  })
}

const onDragStart = (event) => {
  activeElement = event.currentTarget
  offset.x = event.currentTarget.x - event.data.global.x
  offset.y = event.currentTarget.y - event.data.global.y
  event.stopPropagation()
}

const getSafePosition = (x: number, y: number, size: number) => [
  Math.clamp(x + offset.x, mapDetails.x + size, mapDetails.x + mapDetails.width - size),
  Math.clamp(y + offset.y, mapDetails.y + size, mapDetails.y + mapDetails.height - size),
]

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

const getHoveredJoiner = (x: number, y: number): PIXI.Graphics => {
  let hoveredJoiner = null
  nodes.forEach(node => {
    node.children.forEach(joiner => {
      const distance = Math.hypot(joiner.x + joiner.parent.x - x, joiner.y + joiner.parent.y - y)
      if (distance < 15) {
        hoveredJoiner = joiner
      }
    })
  })
  if (!hoveredJoiner) {
    return null
  }
  if (hoveredJoiner === activeElement) {
    return null
  }
  if (hoveredJoiner.parent === activeElement.parent) {
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
  updatePreview()
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
      activeElement.position.set(...getSafePosition(event.data.global.x, event.data.global.y, nodePlatformSize / 2))
      drawConnections()
    }
  }
}

const onPointerDownJoiner = (event) => {
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
}

const getNodeVisual = (disableJoinerEvent = false) => {
  const newNode = new PIXI.Graphics()
  newNode.beginFill(0xff0000)
  newNode.drawRect(-nodePlatformSize / 2, -nodePlatformSize / 2, nodePlatformSize, nodePlatformSize)
  newNode.endFill()

  for (let i = 0; i < 4; i++) {
    const joiner = new PIXI.Graphics()
    joiner.beginFill(0x00ff00)
    joiner.drawCircle(0, 0, 5)
    joiner.endFill()
    joiner.x = Math.sin(i / 4 * Math.PI * 2) * nodePlatformSize / 2
    joiner.y = -Math.cos(i / 4 * Math.PI * 2) * nodePlatformSize / 2

    if (!disableJoinerEvent) {
      joiner.interactive = true
      joiner.on('pointerdown', onPointerDownJoiner)
    }
    newNode.addChild(joiner)
  }

  return newNode
}

const createBackground = () => {
  const background = new PIXI.Graphics()
  background.beginFill(0x333333)
  background.drawRect(mapDetails.x, mapDetails.y, mapDetails.width, mapDetails.height)
  background.endFill()
  mapCreatorWrapper.addChild(background)
  mapCreatorWrapper.addChild(nodesWrapper)
  mapCreatorWrapper.addChild(connectionsContainer)
  mapCreatorWrapper.addChild(activeConnectionContainer)

  background.interactive = true;
  background.on('pointermove', onDragMove)
}

const createToolbar = () => {
  const newNodeIcon = getNodeVisual(true)
  nodesWrapper.addChild(newNodeIcon)
  newNodeIcon.interactive = true
  newNodeIcon.x = nodePlatformSize / 2
  newNodeIcon.y = mapDetails.y + nodePlatformSize / 2
  newNodeIcon
    .on('pointerdown', (event) => {
      const newNode = getNodeVisual()
      newNode.interactive = true

      newNode
      .on('pointerdown', onDragStart)
      .on('pointerup', onDragEnd)
      .on('pointerupoutside', onDragEnd)

      isJoiner = false
      activeElement = newNode
      offset.x = 0
      offset.y = 0
      activeElement.position.set(...getSafePosition(event.data.global.x, event.data.global.y, nodePlatformSize / 2))

      nodesWrapper.addChild(newNode)
      nodes.push(newNode)
    })
}

const createStartBtn = (onClick) => {
  const button = new PIXI.Graphics()
  button.beginFill(0xffffff)
  button.drawRect(0, 0, 150, 60)
  button.endFill()
  
  const text = new PIXI.Text('START');
  text.x = 20;
  text.y = 20;
  button.addChild(text)
  button.x = mapDetails.y * 2 + mapDetails.height
  button.interactive = true
  button.buttonMode = true
  button.on('click', onClick)
  mapCreatorWrapper.addChild(button)
}


const mapCreator = (wasmModule: WasmModule) => {
  createBackground()
  createToolbar()
  createStartBtn(() => {
    const result = []
    nodes.forEach(node => {

      // result.push({
        // x: node.x,
        // y: node.y,
      //   connections: node.children.map(joiner => {
      //     const connection = connections.find((connection) => joiner === connection[0])
      //     if (connection) {
      //       connection[1]
      //     }
      //     return null
      //   })
      // })
    })
    initGame(wasmModule, nodes, connections)
  })
  window.app.stage.addChild(mapCreatorWrapper)
}

export default mapCreator
