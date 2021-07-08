// import { alert } from "./utils";
// import { foo, bar } from "./constants"


var factions = 

// export function add(a: i32, b: i32): i32 {
//   return a + b + bar + foo
// }


// export function sum(arr: Int32Array): i32 {
//   let sum = 0
//   for (let i = 0, k = arr.length; i < k; ++i) {
//     sum += unchecked(arr[i]) // unchecked -> index is 100% in array, do not make additional check
//   }
//   trace("HERE", 1, sum)
//   return sum
// }
// export const Int32Array_ID = idof<Int32Array>()


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