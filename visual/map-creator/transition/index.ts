import { getOffsetY } from "map-creator/serializeMap";
import mat4 from "utils/mat4";
import getWorldMatrix from "worldMatrix";

function logicPointToCanvas(
  matrix: Float32Array,
  rawPoint: number[],
  canvas: HTMLElement,
) {
  const point = mat4.translation(rawPoint) 
  const worldPoint = mat4.multiply(matrix, point).slice(12, 16);

  const normPoint = { // divice te reslts by W component, like WebGPU does
    x: worldPoint[0] / worldPoint[3], // x
    y: -worldPoint[1] / worldPoint[3], // y
  }
  const canvasPoint = {
    x: ((normPoint.x + 1) / 2) * canvas.clientWidth,
    y: ((normPoint.y + 1) / 2) * canvas.clientHeight,
  }

  return canvasPoint
}

export default function startTransition(
  canvas: HTMLElement,
  mapElement: HTMLElement,
  toolBarEl: HTMLElement,
  controlPanelEl: HTMLElement,
  cameraTarget: Point,
  cleanup: VoidFunction
) {
        
  const worldMatrix = getWorldMatrix(
    canvas,
    cameraTarget,
    // { x: mapElStartPosition.width / 2, y: mapElStartPosition.height / 2 },
    0,
  )
  const mapElRect = mapElement.getBoundingClientRect()
  const offsetY = getOffsetY(mapElement)
  const topLeftCorner = logicPointToCanvas(worldMatrix, [0, 0, offsetY, 1], canvas)
  const topRightCorner = logicPointToCanvas(worldMatrix, [mapElRect.width, 0, offsetY, 1], canvas)

  const widthMatrixed = Math.hypot(
    topLeftCorner.x - topRightCorner.x,
    topLeftCorner.y - topRightCorner.y,
  )

  const endScale = widthMatrixed / mapElRect.width

  /* MAP ELEMENT ANIMATION */

  const animationDetails = [
    { top: mapElRect.y + 'px', left: mapElRect.x + 'px', scale: 1, opacity: 1 },
    { top: topLeftCorner.y + 'px', left: topLeftCorner.x + 'px', scale: endScale, opacity: -1.5 },
  ];

  const animationTiming = {
    duration: 2000,
    iterations: 1,
    easing: "ease-in"
  };

  /* change from relative flow layout to aboslute position */
  mapElement.style.position = 'absolute'
  mapElement.style.top = mapElRect.y + 'px'
  mapElement.style.left = mapElRect.x + 'px'
  // Object.entries(animationDetails[1]).forEach(([name, value]) => {
  //   mapElement.style[name as 'top'] = value as string
  // })
  const placeholderElement = document.createElement('div') // element just to fill gap of mapElement
  // otherwise elements in css grid would shift to fill that gap
  mapElement.parentElement!.insertBefore(placeholderElement, mapElement)

  const animation = mapElement.animate(animationDetails, animationTiming);
  animation.addEventListener('finish', () => {
    cleanup()
  })

  /* CANVAS ANIMATION */
  canvas.style.transformOrigin = `${mapElRect.x}px ${mapElRect.y}px`
  const animationDetailsCanvas = [
    {
      top: (mapElRect.y - topLeftCorner.y) * (1 / endScale) + 'px',
      left: (mapElRect.x - topLeftCorner.x) * (1 / endScale) + 'px',
      scale: `${1 / endScale}`
    },
    { top: '0px', left: '0px', scale: 1 },
  ];
  // Object.entries(animationDetailsCanvas[0]).forEach(([name, value]) => {
  //   canvas.style[name as 'top'] = value as string
  // })
  canvas.animate(animationDetailsCanvas, animationTiming);

  /* TOOLBAR ANIMATION */
  const animationDetailsToolbar = [
    {
      transform: 'translateX(0px)',
      opacity: 1,
    },
    {
      transform: 'translateX(-200px)',
      opacity: 0
    },
  ];

  toolBarEl.animate(animationDetailsToolbar, animationTiming);


  /* RIGHT PANEL ANIMATION */
  const animationDetailsRightPanel = [
    {
      transform: 'translateX(0px)',
      opacity: 1,
    },
    {
      transform: 'translateX(200px)',
      opacity: 0
    },
  ];

  controlPanelEl.animate(animationDetailsRightPanel, animationTiming);
}