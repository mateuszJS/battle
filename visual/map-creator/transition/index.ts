import mat4 from "utils/mat4";
import getWorldMatrix, { setExtraMatrix } from "worldMatrix";

function getWebGPUPoint(
  matrix: Float32Array,
  rawPoint: number[],
) {
  const point = mat4.translation(rawPoint) 
  const worldPoint = mat4.multiply(matrix, point).slice(12, 16);

  return { // divice te reslts by W component, like WebGPU does
    x: worldPoint[0] / worldPoint[3], // x
    y: worldPoint[1] / worldPoint[3], // y
  }
}

function logicPointToCanvas(
  matrix: Float32Array,
  rawPoint: number[],
  canvas: HTMLElement,
) {
  const normPoint = getWebGPUPoint(matrix, rawPoint)
  const canvasPoint = {
    x: ((normPoint.x + 1) / 2) * canvas.clientWidth,
    y: ((-normPoint.y + 1) / 2) * canvas.clientHeight,
  }

  return canvasPoint
}

export default function startTransition(
  canvas: HTMLElement,
  mapElement: HTMLElement,
  toolBarEl: HTMLElement,
  controlPanelEl: HTMLElement,
  cameraTarget: Point,
  cleanup: VoidFunction,
  mapScale: number
) {
  setExtraMatrix(null)
  // canvas.style.width = 9000 + 'px'
  // canvas.style.height = 6000 + 'px'
  // const { width , height } = canvas.getBoundingClientRect()

  // canvas.style.width = width * 6 + 'px'
  // canvas.style.height = height * 6 + 'px'
        
  const worldMatrix = getWorldMatrix(
    canvas,
    cameraTarget,
    // { x: mapElStartPosition.width / 2, y: mapElStartPosition.height / 2 },
    0,
  )
  const mapElRect = mapElement.getBoundingClientRect()
  const topLeftCorner = logicPointToCanvas(worldMatrix, [0, 0, 0, 1], canvas)
  const topRightCorner = logicPointToCanvas(worldMatrix, [mapElRect.width * mapScale, 0, 0, 1], canvas)

  const widthMatrixed = Math.hypot(
    topLeftCorner.x - topRightCorner.x,
    topLeftCorner.y - topRightCorner.y,
  )

  const endScale = widthMatrixed / mapElRect.width

  /* MAP ELEMENT ANIMATION */

  const animationDetails = [
    { top: mapElRect.y + 'px', left: mapElRect.x + 'px', scale: 1, opacity: 1 },
    { top: topLeftCorner.y + 'px', left: topLeftCorner.x + 'px', scale: endScale, opacity: 1 },
    // { top: topLeftCorner.y + 'px', left: topLeftCorner.x + 'px', scale: endScale, opacity: -1.5 },
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
  Object.entries(animationDetails[0]).forEach(([name, value]) => {
    mapElement.style[name as 'top'] = value as string
  })
  const placeholderElement = document.createElement('div') // element just to fill gap of mapElement
  // otherwise elements in css grid would shift to fill that gap
  mapElement.parentElement!.insertBefore(placeholderElement, mapElement)

  // const animation = mapElement.animate(animationDetails, animationTiming);
  // animation.addEventListener('finish', () => {
  //   cleanup()
  // })
  console.log(1/  endScale)
  /* CANVAS ANIMATION */
  canvas.style.transformOrigin = `${mapElRect.x}px ${mapElRect.y}px`
  const animationDetailsCanvas = [
    {
      // top: (mapElRect.y - topLeftCorner.y) * (1 / endScale) + 'px',
      // left: (mapElRect.x - topLeftCorner.x) * (1 / endScale) + 'px',
      scale: `${1 / endScale}`
    },
    { top: '0px', left: '0px', scale: 1 },
  ];
  // Object.entries(animationDetailsCanvas[0]).forEach(([name, value]) => {
  //   canvas.style[name as 'top'] = value as string
  // })
  
      // Error, make sure to write test for it, and then fix it!

  const startTime = document.timeline.currentTime as number
  const animationTime = 2000
  /* not sure if type in TS is correct and and if nay browser supposrt currrentTime as CSSNumericValue */ 

  function tick(now: DOMHighResTimeStamp) {
    const progress = 0 // Math.min((now - startTime) / animationTime, 1)

    const worldOriginPoint = getWebGPUPoint(worldMatrix, [0, 0, 0, 0])
    // const origin = logicPointToCanvas(worldMatrix, [140, 0, 20, 1], canvas)
    // console.log('origin', origin)
    console.log('topLeftCorner.x', topLeftCorner.x)

    const originTranslationM = mat4.translation([
      worldOriginPoint.x,
      worldOriginPoint.y,
      0,
    ])
    const scaleM = mat4.scaling([1 / endScale, 1 / endScale, 1])
    const translateM = mat4.translation([
      ((mapElRect.x - topLeftCorner.x) * endScale / canvas.clientWidth) * 2,
      (-(mapElRect.y - topLeftCorner.y) * endScale / canvas.clientHeight) * 2,
      0,
    ])

    const extraMatrix = [
      originTranslationM,
      scaleM,
      mat4.inverse(originTranslationM),
      translateM,
    ].reduce(
      (matrix, rotationMatrix) => mat4.multiply(matrix, rotationMatrix),
      mat4.identity() // put camera at exact same palce as objwct to follow
    )

    setExtraMatrix(extraMatrix)

    if (progress < 1) {
      requestAnimationFrame(tick)
    } else {
      setExtraMatrix(null)
    }
  }

  requestAnimationFrame(tick)


  // Object.entries(animationDetailsCanvas[0]).forEach(([name, value]) => {
  //   canvas.style[name as 'top'] = value as string
  // })
  // canvas.animate(animationDetailsCanvas, animationTiming);

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