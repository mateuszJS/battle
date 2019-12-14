#[macro_use]
extern crate wasm_bindgen;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern {
  #[wasm_bindgen(js_namespace = console)]
  fn log(msg: &str);
}


macro_rules! log {
  ($($t:tt)*) => (log(&format!($($t)*)))
}

// cfg_if! {
//     // When the `console_error_panic_hook` feature is enabled, we can call the
//     // `set_panic_hook` function to get better error messages if we ever panic.
//     if #[cfg(feature = "console_error_panic_hook")] {
//         extern crate console_error_panic_hook;
//         use console_error_panic_hook::set_once as set_panic_hook;
//     } else {
//         #[inline]
//         fn set_panic_hook() {}
//     }
// }

// set_panic_hook();

#[wasm_bindgen]
pub fn method(n: i32) -> i32 {
  n + 15
}
