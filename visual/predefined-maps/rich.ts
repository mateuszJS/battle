import { SerializedMapInfo } from "~/map-creator/get-serialized-map-info"

const nodes = [{ id: 0, x: 628.3136502683765, y: 628.3136502683763, visited: new Array(8).fill(false) },{ id: 1, x: 2027.5168801939053, y: 628.3136502683763, visited: new Array(8).fill(false) },{ id: 2, x: 3371.6863497316235, y: 628.3136502683763, visited: new Array(8).fill(false) },{ id: 3, x: 3371.6863497316235, y: 2052.2961391966755, visited: new Array(8).fill(false) },{ id: 4, x: 2027.6250865650966, y: 2052.24203601108, visited: new Array(8).fill(false) },{ id: 5, x: 628.3136502683765, y: 2057.7064577562323, visited: new Array(8).fill(false) },{ id: 6, x: 3371.6863497316235, y: 3518.276056094182, visited: new Array(8).fill(false) },{ id: 7, x: 2018.3734418282545, y: 3516.328341412742, visited: new Array(8).fill(false) },{ id: 8, x: 628.3136502683765, y: 3529.7459314404427, visited: new Array(8).fill(false) },{ id: 9, x: 3371.6863497316235, y: 4927.880453601107, visited: new Array(8).fill(false) },{ id: 10, x: 2001.4932479224374, y: 4945.247576177284, visited: new Array(8).fill(false) },{ id: 11, x: 628.3136502683765, y: 4939.999567174515, visited: new Array(8).fill(false) },{ id: 12, x: 3371.6863497316235, y: 6332.399151662049, visited: new Array(8).fill(false) },{ id: 13, x: 1991.9710872576172, y: 6322.98519736842, visited: new Array(8).fill(false) },{ id: 14, x: 628.3136502683765, y: 6344.788781163434, visited: new Array(8).fill(false) },{ id: 15, x: 3371.6863497316235, y: 7699.532548476453, visited: new Array(8).fill(false) },{ id: 16, x: 1997.6519217451519, y: 7717.1701869806075, visited: new Array(8).fill(false) },{ id: 17, x: 628.3136502683765, y: 7744.5463988919655, visited: new Array(8).fill(false) }]

export default {
  nodes,
  connections: [[
        { joinIndex: 3, node: nodes[1] },
        { joinIndex: 1, node: nodes[0] },
      ],[
        { joinIndex: 1, node: nodes[1] },
        { joinIndex: 3, node: nodes[2] },
      ],[
        { joinIndex: 2, node: nodes[2] },
        { joinIndex: 0, node: nodes[3] },
      ],[
        { joinIndex: 2, node: nodes[1] },
        { joinIndex: 0, node: nodes[4] },
      ],[
        { joinIndex: 2, node: nodes[0] },
        { joinIndex: 0, node: nodes[5] },
      ],[
        { joinIndex: 3, node: nodes[4] },
        { joinIndex: 1, node: nodes[5] },
      ],[
        { joinIndex: 3, node: nodes[3] },
        { joinIndex: 1, node: nodes[4] },
      ],[
        { joinIndex: 2, node: nodes[3] },
        { joinIndex: 0, node: nodes[6] },
      ],[
        { joinIndex: 2, node: nodes[4] },
        { joinIndex: 0, node: nodes[7] },
      ],[
        { joinIndex: 2, node: nodes[5] },
        { joinIndex: 0, node: nodes[8] },
      ],[
        { joinIndex: 3, node: nodes[7] },
        { joinIndex: 1, node: nodes[8] },
      ],[
        { joinIndex: 1, node: nodes[7] },
        { joinIndex: 3, node: nodes[6] },
      ],[
        { joinIndex: 2, node: nodes[6] },
        { joinIndex: 0, node: nodes[9] },
      ],[
        { joinIndex: 2, node: nodes[7] },
        { joinIndex: 0, node: nodes[10] },
      ],[
        { joinIndex: 2, node: nodes[8] },
        { joinIndex: 0, node: nodes[11] },
      ],[
        { joinIndex: 2, node: nodes[11] },
        { joinIndex: 0, node: nodes[14] },
      ],[
        { joinIndex: 1, node: nodes[11] },
        { joinIndex: 3, node: nodes[10] },
      ],[
        { joinIndex: 1, node: nodes[10] },
        { joinIndex: 3, node: nodes[9] },
      ],[
        { joinIndex: 2, node: nodes[9] },
        { joinIndex: 0, node: nodes[12] },
      ],[
        { joinIndex: 2, node: nodes[10] },
        { joinIndex: 0, node: nodes[13] },
      ],[
        { joinIndex: 1, node: nodes[14] },
        { joinIndex: 3, node: nodes[13] },
      ],[
        { joinIndex: 1, node: nodes[13] },
        { joinIndex: 3, node: nodes[12] },
      ],[
        { joinIndex: 2, node: nodes[12] },
        { joinIndex: 0, node: nodes[15] },
      ],[
        { joinIndex: 2, node: nodes[13] },
        { joinIndex: 0, node: nodes[16] },
      ],[
        { joinIndex: 2, node: nodes[14] },
        { joinIndex: 0, node: nodes[17] },
      ],[
        { joinIndex: 1, node: nodes[17] },
        { joinIndex: 3, node: nodes[16] },
      ],[
        { joinIndex: 1, node: nodes[16] },
        { joinIndex: 3, node: nodes[15] },
      ]],
  portals: [{ angle: 0.6283185307179586, x: 561.6992728531854, y: 7826.566828254846 },{ angle: -2.5132741228718345, x: 3461.8464335180047, y: 534.8099896121882 },{ angle: 0, x: 651.8892832409971, y: 627.5428497229916 },{ angle: 0, x: 2059.491862880886, y: 608.4444252077561 },{ angle: 0, x: 627.9756752077561, y: 2060.628029778393 },{ angle: 0, x: 2044.9381059556783, y: 2042.7739785318556 },{ angle: 0, x: 3374.794407894736, y: 2041.6919148199443 },{ angle: 0, x: 2033.1436114958444, y: 3525.579986149584 },{ angle: 0, x: 662.8722299168974, y: 3544.5161011080327 },{ angle: 0, x: 3392.9730782548468, y: 3516.436547783933 },{ angle: 0, x: 3407.6350415512456, y: 4919.494459833794 },{ angle: 0, x: 2009.2300034626035, y: 4953.200744459833 },{ angle: 0, x: 632.6285491689749, y: 4922.253722299168 },{ angle: 0, x: 627.4346433518004, y: 6324.987015235456 },{ angle: 0, x: 1991.1595394736837, y: 6323.039300554015 },{ angle: 0, x: 3381.0703774238223, y: 6337.75536703601 },{ angle: 0, x: 3391.2417763157887, y: 7692.823753462602 },{ angle: 0, x: 2009.933344875346, y: 7722.905124653738 }],
} as SerializedMapInfo