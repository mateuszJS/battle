import DrawSpritesProgram from 'webgl/programs/DrawSpritesProgram'


export let drawSpritesProgram: DrawSpritesProgram

export function compilePrograms() {
  drawSpritesProgram = new DrawSpritesProgram()
}
