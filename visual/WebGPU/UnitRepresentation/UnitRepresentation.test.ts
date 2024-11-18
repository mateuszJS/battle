import { getAngleOffsetInFrames } from "./UnitRepresentation";

test('adds 1 + 2 to equal 3', () => {
  const frameOffset = getAngleOffsetInFrames(Math.PI * 0.75, 12)
  expect(frameOffset).toBe(4);
});