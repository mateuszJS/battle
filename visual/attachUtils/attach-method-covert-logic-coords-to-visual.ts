const attachMethodToConvertLogicCoordsToVisual = (mapHeight) => {
  window.convertLogicCoordToVisual = (x: number, y: number): [number, number] => {
    const angle = Math.atan2(x, mapHeight - y) - 0.65
    const distance = Math.hypot(x, mapHeight - y)
    return [
      Math.sin(angle) * distance,
      (-Math.cos(angle) * distance + mapHeight) * 0.52,
    ]
  }
}

export default attachMethodToConvertLogicCoordsToVisual