export {}; // just to indicate that it's a module, so I can declare "global"

declare global {
  interface Window {
    getUint32ArrayPointer:(array: Uint32Array) => number
    getFloat32ArrayPointer:(array: Float32Array) => number
    useUint32ArrayData: (pointer: number, callback: (arr: Uint32Array) => void) => void
    useFloat32ArrayData: (pointer: number, callback: (arr: Float32Array) => void) => void

    gl: WebGL2RenderingContext
    glExt: {
      formatRGBA: Extension
      formatRG: Extension
      formatR: Extension
      supportLinearFiltering: OES_texture_float_linear | null
    }
  }
}