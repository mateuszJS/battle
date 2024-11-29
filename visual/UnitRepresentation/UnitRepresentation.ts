import { UnitState } from "logic-contants"
import AssetsDescriptor from "AssetsDescriptor"
import mapAngleToIndex from "./mapAngleToIndex"
import AssetId from "AssetsDescriptor/AssetId"
import AnimatedSprite from "../WebGPU/AnimatedSprite/AnimatedSprite"

export default class UnitRepresentation {
  private aSprites: AnimatedSprite[];

  constructor(
    private state: UnitState,
    private angle: number,
    private position: Point,
    private assets: AssetId[],
    now: DOMHighResTimeStamp
  ) {
    this.aSprites = assets.map(() =>  new AnimatedSprite())
    this.updateSpritesConfig(now)
  }

  // <0, 2 * Math.PI> -> <0, angles>

  /*
  WebGPU needs to receive:
    - fraction color matrix
    - index of frames for head
    - index of frames for arms & weapon & backpack
    - index of frames for body
    - position for head, maybe rotation flag
    - position for body, maybe rotation flag
    - position for arms & weapon & backpack, maybe rotation flag
  */

  private updateSpritesConfig(now: DOMHighResTimeStamp) {
    this.aSprites.forEach((sprite, index) => {
      const asset = this.assets[index]
      const { timePerFrame, animationLength, angles } = AssetsDescriptor[asset][this.state]
      const firstFrame = mapAngleToIndex(this.angle, angles) * animationLength

      sprite.updateConfig(
        {
          firstFrame,
          animationLength, 
          timePerFrame
        },
        now
      )
    })
  }


  /*
  How to do shootign naimation what we need:
    - animation normaly goes forward
    - once is looping, isntead of coming back to last frame we should
      come back to seocnd to last frame and keep going backward
    - also the time time offset might be different


    - for UnitState.FLY we need to start normal animation,
      then slow it down a lot for osme time, and again go forward once lande(this one can be also be achieved by changing timePerFrame)
    (loopBack: boolean) => {
      if its about to loop back
    }

    During UnitState.FLY just pass max frames you want to achieve "stopAt"
    until? how would to play it once it has been stopped?
    pass it with config a callback to determine 
    REMEMBER to pass loop boolean, or isLast boolean because
    you dont need to switch from last frame to frame 0, time might go so fast
    that you go to frame with index 1


    Callback is not goign to wor kso easily, because AnimatedSprite calculated current time, so
    once callback will "allow" frames ot mvoe forward, it iwll jump A LOT OF frames ahead, not ot the next frame

    Maybe we should mvoe to dt(delta time)?


    In other words:
    can we somehow unify all custom logic that comes from UnitResperentation?
    Is it a good idea ot mvoe that logic to AnimateSprite?

    For UnitState.SHOOT 

    But do we want a callback? And callback should just receive next and previous frame as params?
    
    Solutions:
    1. Manipulate timePerFrame - i'm nto sure how it suppsoe ot work yet
      - most promising one
      - add events to AnimatedSprtie config related to 
    2. If statement, check if now we have last frame and we are about to change to first one
      a) Update timePerFrame to quicker one, and go back, and then check whe nwe hit first frame
  */

  public update(angle: number, state: UnitState, now: DOMHighResTimeStamp) {
    if (this.angle === angle && this.state === state) {
      this.aSprites.forEach(aSprite => {
        // check if frames made circle, if yes, then go backward
        aSprite.tick(now)
      })
    } else {
      this.angle = angle
      this.state = state
      this.updateSpritesConfig(now)
    }
  }

  /**
   * @param textureLayers each asset adds it's own texture index
   * @param destinationRect each asset adds it's own position where should land on the durign render
   * @param sourcRect each asset adds it's source position from texture indicated by textureLayers
   */
  public addBufferData(
    textureLayersData: number[],
    destinationData: number[],
    sourceData: number[],
    indiciesData: number[],
  ) {
    this.aSprites.forEach((aSprite, index) => {
      const lastUsedIndex = destinationData.length / 2
      // each point has x and y component so that's why divided by 2
      const nextIndicies = 
      [
        0, 1, 2,
        0, 2, 3
      ].map(i => lastUsedIndex + i)
      indiciesData.push(...nextIndicies)



      const assetId = this.assets[index]
      const { frames } = AssetsDescriptor[assetId][this.state] // what if state is different for each asset??
      const frame = frames[aSprite.frameIndex]

      textureLayersData.push(...Array(4).fill(frame.textureIndex))

      sourceData.push(...frame.sourceRect)

  
      const { width, height } = frame.destinationRect
      const x = this.position.x + frame.destinationRect.x
      const y = this.position.y + frame.destinationRect.y
  
      destinationData.push(
        x,          y,
        x + width,  y,
        x + width,  y + height,
        x,          y + height
      )
    })
  }
}

