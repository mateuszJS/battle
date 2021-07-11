// import { alert } from "./utils";
// import { foo, bar } from "./constants"

import { Faction } from "./faction";
import { MAP_SQUAD_REPRESENTATION_TO_TYPE } from "./squad-details";


var factions: Array<Faction> = []

export function initUniverse(
  factionData: Float32Array,
): void {
  for (let i = 0; i < factionData.length; i += 4) {
    factions.push(new Faction(
      factionData[i] as u32,
      i == 0,
      factionData[i + 1],
      factionData[i + 2],
      factionData[i + 3],
    ))
  }
}


export function getFactoriesInitData(): Float32Array {
  let result = new Float32Array(factions.length * 5)
  for (let i = 0; i < factions.length; i++) {
    let faction = factions[i]
    result[i * 5 + 0] = faction.id as f32
    result[i * 5 + 1] = faction.factory.id
    result[i * 5 + 2] = faction.factory.x
    result[i * 5 + 3] = faction.factory.y
    result[i * 5 + 4] = faction.factory.angle
  }
  return result
}

export const Float32Array_ID = idof<Float32Array>()

function updateUniverse(): void {
  factions.forEach(faction => {
    faction.update()
  })
}

export function getUniverseRepresentation(): Float32Array {
  updateUniverse()

  let representation = factions.map<f32[]>(faction => faction.getRepresentation()).flat()
  let result = new Float32Array(representation.length)
  for (let i: i32 = 0; i < representation.length; i++) {
    result[i] = representation[i]
  }

  return result
}

export function createSquad(squadType: f32): void {
  unchecked(factions[0]).factory.addSquadDoProduction(MAP_SQUAD_REPRESENTATION_TO_TYPE.get(squadType))
}



// export function getRandomArray(len: i32): Int32Array {
//   const arr = new Int32Array(len)
//   // fill with random values
//   return arr
// }

/*
  Two ways how to store objects

  var a = new Map<string,string>()
  a.set("prop", "hello world")


  class A {
    constructor(public prop: string) {}
  }
  var a = new A("hello world")




  class MyClass {
    propOne: i32;
    propTwo: i32;
  }

  var myInstance: MyClass = { propOne: 2, propTwo: 3 };
  Objects created via literals can have methods and default property values, but may not have a constructor.
*/


/*
  Checking reference

  var a = "hello"
  var b = a
  var c = "h" + a.substring(1)

  if (a === b) { true }
  if (a === c) { false }
  if (a == c) { true }
*/