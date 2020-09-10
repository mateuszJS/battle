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
  // NOTE: I have update it to window.world, but nto sure if we are using it
  window.world.addChild(window.smokeContainer.graphics)
}

export default createSmokeContainer
