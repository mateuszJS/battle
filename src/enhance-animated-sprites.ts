interface EnhancedAnimateSprite extends PIXI.AnimatedSprite {
  prototype: any
  updateTexture: Function,
}

const enhanceAnimatedSprites = () => {
  (PIXI.AnimatedSprite as unknown as EnhancedAnimateSprite).prototype.updateTexture = function() {
    const currentFrame = this.currentFrame;

    if (this._previousFrame === currentFrame) {
      return;
    }

    if (this.onFrameChange) {
      if (this.onFrameChange(this.currentFrame)) {
        return // do not change the current frame
      }
    }

    this._previousFrame = currentFrame;

    this._texture = this._textures[currentFrame];
    this._textureID = -1;
    this._textureTrimmedID = -1;
    this._cachedTint = 0xFFFFFF;
    this.uvs = this._texture._uvs.uvsFloat32;

    if (this.updateAnchor) {
      this._anchor.copyFrom(this._texture.defaultAnchor);
    }
  }
}

export default enhanceAnimatedSprites