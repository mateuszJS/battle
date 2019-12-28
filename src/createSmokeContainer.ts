const createSmokeContainer = () => {
  window.smokeContainer = {
    graphics: new PIXI.ParticleContainer(10000, {
      // scale: true,
      position: false,
      rotation: false,
      uvs: false,
      // alpha: true
      tint: false,
      vertices: false,
    }),
    elements: [],
  }
  window.app.stage.addChild(window.smokeContainer.graphics)
}

export default createSmokeContainer
