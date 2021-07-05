// import { alert } from "./utils";

export function add(a: i32, b: i32): i32 {
  return a + b;
}
// npx asc -b -0 main.wasm -t main.wat main.ts
// flag -0 -> no optimization, so it's very fast and also provides sourcemaps
