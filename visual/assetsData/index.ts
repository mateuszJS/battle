import elephantHead from './elephantHead'
import regularBody from  './regularBody'
import regularRifle from './regularRifle'

export enum AssetId {
  StandardBody = '0',
  StandardRifle = '1',
  ElephantHead = '2',
}

export default {
  [AssetId.ElephantHead]: elephantHead,
  [AssetId.StandardBody]: regularBody,
  [AssetId.StandardRifle]: regularRifle
} as const