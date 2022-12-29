import DrawSpritesProgram from './DrawSpritesProgram'
import DrawPrimitiveProgram from './DrawPrimitiveProgram'
import DrawPrimitivePickingProgram from './DrawPrimitiveProgram/picking'


export let drawSpritesProgram: DrawSpritesProgram
export let drawPrimitiveProgram: DrawPrimitiveProgram
export let drawPrimitivePickingProgram: DrawPrimitivePickingProgram

export function compilePrograms() {
  drawSpritesProgram = new DrawSpritesProgram()
  drawPrimitiveProgram = new DrawPrimitiveProgram()
  drawPrimitivePickingProgram = new DrawPrimitivePickingProgram()
}
