import AnimatedSprite from "./AnimatedSprite"

/** TEST IN THIS FILE NEEDS TO BE CALLED SEQUENTIALLY, NOT IN PARREL */
describe('updated by tick()', () => {

  const animatedSprite = new AnimatedSprite()

  beforeAll(() => {
    animatedSprite.updateConfig({
      firstFrame: 7,
      animationLength: 5,
      timePerFrame: 500,
    })
  })

  test('at the beggining the frame is the first frame', () => {
    expect(animatedSprite.frameIndex).toBe(7/* firstFrame */)
  })

  test('when not enough of time has passed, the frame is not changing', () => {
    animatedSprite.tick(500/* timePerFrame */ - 1)
    expect(animatedSprite.frameIndex).toBe(7/* firstFrame */)
  })

  test('when time has passed by one 500ms, the frame advances by one', () => {
    animatedSprite.tick(500/* timePerFrame */)
    expect(animatedSprite.frameIndex).toBe(7/* firstFrame */ + 1)
  })

  test('when not enough time has NOT passed, the frame does NOT change', () => {
    animatedSprite.tick(0)
    expect(animatedSprite.frameIndex).toBe(7/* firstFrame */ + 1)
  })

  test('when time has passed by 1000ms, the frame has advanced by 2 frames', () => {
    animatedSprite.tick(2 * 500/* timePerFrame */)
    expect(animatedSprite.frameIndex).toBe(7/* firstFrame */ + 3)
  })

  test('animation loop, frame resets to first frame if animation length is reached', () => {
    animatedSprite.tick(2 * 500/* timePerFrame */) // animationLength = 5
    expect(animatedSprite.frameIndex).toBe(7/* firstFrame */)
  })

  test('when time passed by one full animation time + 2 frames, the current frame is equal 2', () => {
    animatedSprite.tick(7 * 500/* timePerFrame */)
    expect(animatedSprite.frameIndex).toBe(7/* firstFrame */ + 2)
  })

  const updatedConfig = {
    firstFrame: 11,
    animationLength: 3,
    timePerFrame: 100,
  }

  test('after config update the state of AnimatedSprite is set up to a fresh one', () => {
    animatedSprite.updateConfig(updatedConfig)

    expect(animatedSprite.frameIndex).toBe(11 /*first frame */)
  })

  test('after config update the frame correctly increases', () => {
    animatedSprite.tick(updatedConfig.timePerFrame)
    expect(animatedSprite.frameIndex).toBe(11 /*first frame */ + 1)
  })

  test('after config update the frame correctly loop to first frame', () => {
    animatedSprite.tick(1 * updatedConfig.timePerFrame) // just random time
    animatedSprite.tick(4 * updatedConfig.timePerFrame) // to check edge cases
    expect(animatedSprite.frameIndex).toBe(11 /*first frame */)
  })

  test('when timePerFrame is a number, progress method throws error when called', () => {
    expect(() => animatedSprite.progress(0)).toThrow()
  })
})

describe('updated by progress()', () => {
  const animatedSprite = new AnimatedSprite()

  beforeAll(() => {
    animatedSprite.updateConfig({
      firstFrame: 0,
      animationLength: 5,
      timePerFrame: null,
    })
  })

  const progressToFrameIndex = [
    [0.0, 0],
    [0.1, 0],
    [0.2, 0],
    [0.3, 1],
    [0.4, 1],
    [0.5, 2],
    [0.6, 2],
    [0.7, 3],
    [0.8, 3],
    [0.9, 4],
    [1.0, 4],
  ]

  progressToFrameIndex.forEach(([progress, expectedFrame]) => {
    test(`for progress ${progress} the frame should be ${expectedFrame}`, () => {
      animatedSprite.progress(progress)
      expect(animatedSprite.frameIndex).toBe(expectedFrame)
    })
  })

  test('when timePerFrame is bull, tick method throws error when called', () => {
    expect(() => animatedSprite.tick(0)).toThrow()
  })
})

describe('when switches from .tick() to .progress() the frame', () => {
  const animatedSprite = new AnimatedSprite()

  beforeAll(() => {
    animatedSprite.updateConfig({
      firstFrame: 0,
      animationLength: 5,
      timePerFrame: 100,
    })
    animatedSprite.tick(3 * 100 /* timePerFrame */)
  
    const progressConfig = {
      firstFrame: 0,
      animationLength: 5,
      timePerFrame: null,
    }
  
    animatedSprite.updateConfig(progressConfig)
  })

  test('is correctly reseted', () => {
    expect(animatedSprite.frameIndex).toBe(0)
  })

  test('correctly advances', () => {
    animatedSprite.progress(0.55)
    expect(animatedSprite.frameIndex).toBe(2)
  })
})

describe('when switches from .progress() to .tick() the frame', () => {
  const animatedSprite = new AnimatedSprite()

  beforeAll(() => {
    const progressConfig = {
      firstFrame: 0,
      animationLength: 5,
      timePerFrame: null,
    }
    animatedSprite.updateConfig(progressConfig)
    animatedSprite.progress(0.55)
  

    const tickConfig = {
      firstFrame: 0,
      animationLength: 5,
      timePerFrame: 100,
    }
    animatedSprite.updateConfig(tickConfig)
  })

  test('is correctly reseted', () => {
    expect(animatedSprite.frameIndex).toBe(0)
  })

  test('correctly advances', () => {
    animatedSprite.tick(2 * 100 - 1)
    expect(animatedSprite.frameIndex).toBe(1)
  })
})
