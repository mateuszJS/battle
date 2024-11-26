import AnimatedSprite from "./AnimatedSprite"

/** TEST IN THIS FILE NEEDS TO BE CALLED SEQUENTIALLY, NOT IN PARREL */

const initialConfig = {
  firstFrame: 7,
  animationLength: 5,
  timePerFrame: 500,
}

const animatedSprite = new AnimatedSprite(
  initialConfig.firstFrame,
  initialConfig.animationLength,
  initialConfig.timePerFrame,
  0
)

test('frame is the first frame at the beggining', () => {
  expect(animatedSprite.frameIndex).toBe(initialConfig.firstFrame)
})

test('frame is not changed in the right amount on time has not passed', () => {
  animatedSprite.update(initialConfig.timePerFrame - 1)
  expect(animatedSprite.frameIndex).toBe(initialConfig.firstFrame)
})

test('frame is has changed in the right amount on time has passed', () => {
  animatedSprite.update(initialConfig.timePerFrame)
  expect(animatedSprite.frameIndex).toBe(initialConfig.firstFrame + 1)
})

test('and again frame is not changed in the right amount on time has not passed', () => {
  animatedSprite.update(2 * initialConfig.timePerFrame - 1)
  expect(animatedSprite.frameIndex).toBe(initialConfig.firstFrame + 1)
})

test('and again frame continue changing if right amount of time has passed again', () => {
  animatedSprite.update(2 * initialConfig.timePerFrame)
  expect(animatedSprite.frameIndex).toBe(initialConfig.firstFrame + 2)
})

test('animation loop, frame resets to first frame if length is reached', () => {
  animatedSprite.update(5 * initialConfig.timePerFrame) // animationLength = 5
  expect(animatedSprite.frameIndex).toBe(initialConfig.firstFrame)
})

test('frame has changed by 2 frames when the right amount of time passed', () => {
  animatedSprite.update(7 * initialConfig.timePerFrame)
  expect(animatedSprite.frameIndex).toBe(initialConfig.firstFrame + 2)
})

const updatedConfig = {
  firstFrame: 11,
  animationLength: 3,
  timePerFrame: 100,
}

test('after config update the frame is update to new initial frame', () => {
  animatedSprite.updateConfig(
    updatedConfig.firstFrame,
    updatedConfig.animationLength,
    updatedConfig.timePerFrame,
    0
  )

  expect(animatedSprite.frameIndex).toBe(updatedConfig.firstFrame)
})

test('after config update the frame correctly increases', () => {
  animatedSprite.update(updatedConfig.timePerFrame)
  expect(animatedSprite.frameIndex).toBe(updatedConfig.firstFrame + 1)
})

test('after config update the frame correctly loop to first frame', () => {
  animatedSprite.update(2 * updatedConfig.timePerFrame)
  animatedSprite.update(3 * updatedConfig.timePerFrame)
  expect(animatedSprite.frameIndex).toBe(updatedConfig.firstFrame)
})

