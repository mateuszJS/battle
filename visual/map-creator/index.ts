import initGame, { WasmModule } from '~/initGame'
import { MAP_HEIGHT, MAP_WIDTH } from './constants'
import getPlatformCoords from '~/consts/get-platform-coords'
import getSerializedMapInfo from './get-serialized-map-info'
import mapDetails from './map-details'
import { createMenu, addNewFaction, FactionVisualDetails } from './menu'

const platformCoords = getPlatformCoords()
const bridgeWidth = (platformCoords[3].y - platformCoords[2].y) * mapDetails.scale

let activeElement = null
let isJoiner = false
let isPortalArrow = false
let offset = { x: 0, y: 0 }
let connections: Array<[PIXI.Graphics, PIXI.Graphics]> = []
const connectionsContainer = new PIXI.Graphics()
const activeConnectionContainer = new PIXI.Graphics()
const nodesWrapper = new PIXI.Container()
const portalsWrapper = new PIXI.Container()
const mapCreatorWrapper = new PIXI.Container()

let nodes: PIXI.Container[] = []
let portals: PIXI.Container[] = []

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
  
  connections.forEach(([node1, node2]) => {
    connectionsContainer.lineStyle(bridgeWidth, 0x0000ff, 1);
    const node1Width = node1.width
    const node1Height = node1.height
    const node2Width = node2.width
    const node2Height = node2.height
    connectionsContainer.moveTo(node1.x + node1.parent.x, node1.y + node1.parent.y);
    connectionsContainer.lineTo(node2.x + node2.parent.x, node2.y + node2.parent.y);
    connectionsContainer.lineStyle(3, 0x0000ff, 1);
    drawJoiner(connectionsContainer, Math.round(node1.x) === 0, node1.x + node1.parent.x, node1.y + node1.parent.y)
    drawJoiner(connectionsContainer, Math.round(node2.x) === 0, node2.x + node2.parent.x, node2.y + node2.parent.y)
  })
}

const getHoveredJoiner = (x: number, y: number): PIXI.Graphics => {
  let hoveredJoiner = null
  nodes.forEach(node => {
    node.children.forEach(joiner => {
      const width = (joiner as PIXI.Graphics).width
      const height = (joiner as PIXI.Graphics).height
      const inRange = (
        joiner.x + joiner.parent.x - width / 2 < x &&
        joiner.x + joiner.parent.x + width / 2 > x &&
        joiner.y + joiner.parent.y - height / 2 < y &&
        joiner.y + joiner.parent.y + height / 2 > y
      )
      // const distance = Math.hypot(joiner.x + joiner.parent.x - x, joiner.y + joiner.parent.y - y)
      if (inRange) {
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
  isPortalArrow = false
  event.stopPropagation()
}

const updateActiveConnection = (x: number, y: number) => {
  activeConnectionContainer.clear()
  activeConnectionContainer.lineStyle(bridgeWidth, 0x7700ff, 1)
  activeConnectionContainer.moveTo(offset.x,offset.y)
  activeConnectionContainer.lineTo(x, y)
  activeConnectionContainer.lineStyle(5, 0x7700ff, 1)
  const hoveredJoiner = getHoveredJoiner(x, y)
  if (hoveredJoiner) {
    drawJoiner(activeConnectionContainer, Math.round(hoveredJoiner.x) === 0, hoveredJoiner.x + hoveredJoiner.parent.x, hoveredJoiner.y + hoveredJoiner.parent.y)
  }
  if (isJoiner) { // TODO: this is always true!
    drawJoiner(activeConnectionContainer, Math.round(activeElement.x) === 0, activeElement.x + activeElement.parent.x, activeElement.y + activeElement.parent.y)
  }
}

const onDragMove = (event)  => {
  if (activeElement) {
    if (isPortalArrow) {
      const angle = Math.atan2(
        event.data.global.x - activeElement.parent.position.x,
        activeElement.parent.position.y - event.data.global.y,
      )
      const factor = 20 / (2 * Math.PI);
      (activeElement as PIXI.Graphics).parent.rotation = Math.round(angle * factor) / factor
    } else if (isJoiner) {
      updateActiveConnection(event.data.global.x, event.data.global.y)
    } else {
      activeElement.position.set(...getSafePosition(event.data.global.x, event.data.global.y, activeElement.width / 2))
      drawConnections()
    }
  }
}

const onPointerDownPortalArrow = (event) => {
  activeElement = event.currentTarget
  isPortalArrow = true
  event.stopPropagation()
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

const drawJoiner = (graphics: PIXI.Graphics, isMiddleX: boolean, offsetX = 0, offsetY = 0) => {
  const width = isMiddleX ? bridgeWidth : 10
  const height = isMiddleX ? 10 : bridgeWidth
  graphics.drawRect(-width/2 + offsetX, -height/2 + offsetY, width, height)
}

const getNodeVisual = (disableJoinerEvent = false) => {
  const newNode = new PIXI.Graphics()
  newNode.beginFill(0xff0000)
  platformCoords.forEach((coord, index) => {
    newNode[index === 0 ? 'moveTo' : 'lineTo'](coord.x * mapDetails.scale, coord.y * mapDetails.scale)
  })
  newNode.closePath()

  for (let i = 0; i < 4; i++) {
    const joiner = new PIXI.Graphics()
    joiner.x = Math.sin(i / 4 * Math.PI * 2) * newNode.width / 2
    joiner.y = -Math.cos(i / 4 * Math.PI * 2) * newNode.height / 2
    joiner.beginFill(0x00ff00)
    drawJoiner(joiner, Math.round(joiner.x) === 0)
    joiner.endFill()


    if (!disableJoinerEvent) {
      joiner.interactive = true
      joiner.on('pointerdown', onPointerDownJoiner)
    }
    newNode.addChild(joiner)
  }

  return newNode
}

const getPortalVisual = (disableArrowEvent = false) => {
  const portalBase = new PIXI.Graphics()
  portalBase.beginFill(0x9900ff)
  portalBase.drawCircle(0, 0, 20)

  const portalArrow = new PIXI.Graphics()
  portalArrow.beginFill(0xffffff)
  portalArrow.drawRect(-3, -30, 6, 30)
  portalArrow.moveTo(0, -40)
  portalArrow.lineTo(10, -30)
  portalArrow.lineTo(-10, -30)
  portalArrow.closePath()

  if (!disableArrowEvent) {
    portalArrow.interactive = true
    portalArrow.on('pointerdown', onPointerDownPortalArrow)
  }

  const portal = new PIXI.Container()
  portal.addChild(portalBase)
  portal.addChild(portalArrow)
  return portal
}

const createBackground = () => {
  const background = new PIXI.Graphics()
  background.beginFill(0x333333)
  background.drawRect(mapDetails.x, mapDetails.y, mapDetails.width, mapDetails.height)
  background.endFill()
  mapCreatorWrapper.addChild(background)
  mapCreatorWrapper.addChild(nodesWrapper)
  mapCreatorWrapper.addChild(portalsWrapper)
  mapCreatorWrapper.addChild(connectionsContainer)
  mapCreatorWrapper.addChild(activeConnectionContainer)

  background.interactive = true;
  background.on('pointermove', onDragMove)
}

const createToolbar = () => {
  /* ADD PLATFORM BUTTON */
  const newNodeIcon = getNodeVisual(true)
  nodesWrapper.addChild(newNodeIcon)
  newNodeIcon.interactive = true
  newNodeIcon.scale.set(mapDetails.x / newNodeIcon.width)
  newNodeIcon.x = newNodeIcon.width / 2
  newNodeIcon.y = mapDetails.y + newNodeIcon.width / 2
  newNodeIcon
    .on('pointerdown', (event) => {
      const newNode = getNodeVisual()
      newNode.interactive = true

      newNode
      .on('pointerdown', onDragStart)
      .on('pointerup', onDragEnd)
      .on('pointerupoutside', onDragEnd)

      activeElement = newNode
      offset.x = 0
      offset.y = 0
      activeElement.position.set(...getSafePosition(event.data.global.x, event.data.global.y, newNodeIcon.width / 2))

      nodesWrapper.addChild(newNode)
      nodes.push(newNode)
    })

  /* ADD PORTAL BUTTON */
  const newPortalIcon = getPortalVisual(true)
  nodesWrapper.addChild(newPortalIcon)
  newPortalIcon.interactive = true
  newPortalIcon.scale.set(mapDetails.x / newPortalIcon.width)
  newPortalIcon.x = newPortalIcon.width / 2

  newPortalIcon.y = mapDetails.y + newPortalIcon.width / 2 + newNodeIcon.height
  newPortalIcon
    .on('pointerdown', (event) => {
      const newNode = getPortalVisual()
      newNode.interactive = true

      newNode
      .on('pointerdown', onDragStart)
      .on('pointerup', onDragEnd)
      .on('pointerupoutside', onDragEnd)

      isJoiner = false
      activeElement = newNode
      offset.x = 0
      offset.y = 0
      activeElement.position.set(...getSafePosition(event.data.global.x, event.data.global.y, newPortalIcon.width / 2))

      portalsWrapper.addChild(newNode)
      portals.push(newNode)

      addNewFaction()
    })
}

const mapCreator = (wasmModule: WasmModule) => {
  createBackground()
  createToolbar()
  const startGame = (factionVisualDetails: FactionVisualDetails[]) => {
    initGame({
      wasmModule,
      serializedMapInfo:  getSerializedMapInfo(nodes, connections, portals),
      mapWidth: MAP_WIDTH,
      mapHeight: MAP_HEIGHT,
      factionVisualDetails
    })
  }
  createMenu(startGame)
  window.app.stage.addChild(mapCreatorWrapper)
}

export default mapCreator
