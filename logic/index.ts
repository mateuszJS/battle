// import { alert } from "./utils";
// import { foo, bar } from "./constants"

import { Faction } from "./faction";


var factions: Array<Faction> = []

export function initUniverse(
  factionData: Float32Array,
): void {
  for (let i = 0; i < factionData.length; i += 4) {
    trace("input", 4, factionData[i], factionData[i + 1], factionData[i + 2], factionData[i + 3])
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

// export function add(a: i32, b: i32): i32 {
//   return a + b + bar + foo
// }


export function sum(arr: Int32Array): i32 {
  let sum = 0
  for (let i = 0, k = arr.length; i < k; ++i) {
    sum += unchecked(arr[i]) // unchecked -> index is 100% in array, do not make additional check
  }
  trace("HERE", 1, sum)
  return sum
}
export const Int32Array_ID = idof<Int32Array>()


export function getUniverseRepresentation(): Float32Array {
  let representation = factions.map<f32[]>(faction => faction.getRepresentation()).flat()
  let result = new Float32Array(representation.length)
  for (let i: i32 = 0; i < representation.length; i++) {
    trace("", 1, representation[i]);
    result[i] = representation[i]
  }

  return result
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