import mat4 from "utils/mat4";
import getWorldMatrix, { setExtraMatrix } from "worldMatrix";

function easeInOut(t: number) {
  return t > 0.5 ? 4*Math.pow((t-1),3)+1 : 4*Math.pow(t,3);
}

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

function updateMapElementStyle(mapEl: HTMLElement, canvas: HTMLElement, cameraTarget: Point, mapElWidth: number, mapScale: number) {
  const {worldMatrix} = getWorldMatrix(
    canvas,
    cameraTarget,
    // { x: mapElStartPosition.width / 2, y: mapElStartPosition.height / 2 },
    0,
  )

  const topLeftCorner = logicPointToCanvas(worldMatrix, [0, 0, 0, 1], canvas)
  const topRightCorner = logicPointToCanvas(worldMatrix, [mapElWidth * mapScale, 0, 0, 1], canvas)
  const widthMatrixed = Math.hypot(
    topLeftCorner.x - topRightCorner.x,
    topLeftCorner.y - topRightCorner.y,
  )

  const endScale = widthMatrixed / mapElWidth

  mapEl.style.top = topLeftCorner.y + 'px'
  mapEl.style.left = topLeftCorner.x + 'px'
  mapEl.style.scale = endScale.toString()
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

  const {worldMatrix} = getWorldMatrix(
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

  /* change from relative flow layout to aboslute position */
  mapElement.style.position = 'absolute'
  mapElement.style.top = mapElRect.y + 'px'
  mapElement.style.left = mapElRect.x + 'px'

  const placeholderElement = document.createElement('div') // element just to fill gap of mapElement
  // otherwise elements in css grid would shift to fill that gap
  mapElement.parentElement!.insertBefore(placeholderElement, mapElement)



  const startTime = document.timeline.currentTime as number
  const animationTime = 2000
  /* not sure if type in TS is correct and and if nay browser supposrt currrentTime as CSSNumericValue */ 

  function tick(now: DOMHighResTimeStamp) {
    const progress = easeInOut(Math.min((now - startTime) / animationTime, 1))

    const worldOriginPoint = getWebGPUPoint(worldMatrix, [0, 0, 0, 0])

    const originTranslationM = mat4.translation([
      worldOriginPoint.x,
      worldOriginPoint.y,
      0,
    ])

    const scaleM = mat4.scaling([
      (1 / endScale) * (1 - progress) + progress,
      (1 / endScale) * (1 - progress) + progress,
      1
    ])

    const translateM = mat4.translation([
      ((mapElRect.x - topLeftCorner.x) * endScale / canvas.clientWidth) * 2 * (1 - progress),
      (-(mapElRect.y - topLeftCorner.y) * endScale / canvas.clientHeight) * 2 * (1 - progress),
      0,
    ])

    const extraMatrix = [
      originTranslationM,
      // newOriginM,
      scaleM,
      // inverseNewOriginM,
      mat4.inverse(originTranslationM),
      translateM,
    ].reduce(
      (matrix, rotationMatrix) => mat4.multiply(matrix, rotationMatrix),
      mat4.identity() // put camera at exact same palce as objwct to follow
    )

    setExtraMatrix(extraMatrix)

    updateMapElementStyle(
      mapElement,
      canvas,
      cameraTarget,
      mapElRect.width,
      mapScale,
    )

    mapElement.style.opacity = `${(1 - progress) + progress * -1.5}`;

    canvas.style.opacity = `${(1 - progress) * 0 + 3.5 * progress * 1}`;

    if (progress < 1) {
      requestAnimationFrame(tick)
    } else {
      cleanup()
      setExtraMatrix(null)
    }
  }

  requestAnimationFrame(tick)

  /* TOOLBAR ANIMATION */

  const animationTiming = {
    duration: animationTime + 1000, // if it's exact same(without + 1000) the sometimes elements blinks
    // after animation is completed but elements are not removed yet
    iterations: 1,
    easing: "ease-in"
  };


  const animationDetailsToolbar = [
    {
      transform: 'translateX(0px)',
      opacity: 1,
    },
    {
      transform: 'translateX(-400%)',
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
      transform: 'translateX(400%)',
      opacity: 0
    },
  ];

  controlPanelEl.animate(animationDetailsRightPanel, animationTiming);
}