import { WasmModule } from '~/initGame'

const initConvertArraysUtils = (wasmModule: WasmModule) => {
  const {
    __getFloat32ArrayView,
    __getUint32ArrayView,
    __pin,
    __unpin,
    Float32Array_ID,
    Uint32Array_ID,
    __newArray,
  } = wasmModule;

  window.getUint32ArrayPointer = (array: Uint32Array) => (
    __newArray(Uint32Array_ID, array)
  )
  window.getFloat32ArrayPointer = (array: Float32Array) => (
    __newArray(Float32Array_ID, array)
  )
  window.useUint32ArrayData = (pointer: number, callback: (arr: Uint32Array) => void) => {
    const arrPtr = __pin(pointer) 
    const data = __getUint32ArrayView(arrPtr)
    callback(data)
    __unpin(arrPtr)
  }
  window.useFloat32ArrayData = (pointer: number, callback: (arr: Float32Array) => void) => {
    const arrPtr = __pin(pointer) 
    const data = __getFloat32ArrayView(arrPtr)
    callback(data)
    __unpin(arrPtr)
  }
}

export default initConvertArraysUtils
