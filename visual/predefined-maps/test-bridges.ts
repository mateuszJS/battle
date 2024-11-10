import { SerializedMapInfo } from "map-creator/get-serialized-map-info"
import { FactionVisualDetails } from "map-creator/menu"
import { Species } from "representation/UnitFactory"

const nodes = [
  {
    id: 0,
    x: 1094.6708281637718,
    y: 1248.0129497518612,
    visited: new Array(8).fill(false)
  },{
    id: 1,
    x: 1037.9187344913153,
    y: 2984.864492866005,
    visited: new Array(8).fill(false)
  }]

export const PREDEFINED_MAP = {
  nodes,
  connections: [[
        { joinIndex: 2, node: nodes[0] },
        { joinIndex: 0, node: nodes[1] },
      ]],
  portals: [
    {
      angle: 0,
      x: 1077.0781637717123,
      y: 3001.342470533499
    },{
      angle: -3.141592653589793,
      x: 1063.2899736352358,
      y: 1082.3123449131515
    }],
} as SerializedMapInfo

export const PREDEFINED_FACTION_VISUAL_DETAILS: FactionVisualDetails[] = [
  {
    bodyMatrixColorFilter: [0.8745098114013672, 0.40784314274787903, 0.8745098114013672, 0, 0, 0.6784313917160034, 0.3019607961177826, 0.6431372761726379, 0, 0, 0.3960784375667572, 0.14509804546833038, 0.7568627595901489, 0, 0, 0, 0, 0, 1, 0],
    headMatrixColorFilter: [1, 0.18039216101169586, 0, 0, 0, 0, 0.5215686559677124, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0],
    species: Species.Elephant
  },
  {
    bodyMatrixColorFilter: [1, 0.6745098233222961, 0.6509804129600525, 0, 0, 0, 0.07450980693101883, 0.22745098173618317, 0, 0, 0, 0.529411792755127, 0.9019607901573181, 0, 0, 0, 0, 0, 1, 0],
    headMatrixColorFilter: [1, 0.05098039284348488, 0, 0, 0, 0, 0.9490196108818054, 0, 0, 0, 0, 0.364705890417099, 1, 0, 0, 0, 0, 0, 1, 0],
    species: Species.Rodion
  }
]
