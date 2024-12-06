import Bridge from "../Bridge";

let mockBridges: Bridge[] = []

export function __setMockBridges(newMockBridges: Bridge[]) {
  mockBridges = newMockBridges
}

export function getBridge(anchorPoint: HTMLElement) {
  return mockBridges.find(bridge => bridge.anchorPoints.includes(anchorPoint))
}