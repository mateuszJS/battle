import { Universe } from '../../crate/pkg/index'

export const startDebug = (universe: Universe) => {
  window.visibleInfluenceMap = true
}

export const stopDebug = () => {
  window.visibleInfluenceMap = false
}
