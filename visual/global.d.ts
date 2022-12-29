declare module "*.vert" {
  const content: string;
  export default content;
}

declare module "*.frag" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

type ValueOf<T> = T[keyof T]

type f32 = number
type f64 = number
type usize = number
type u32 = number
type u8 = number

interface Extension {
  internalFormat: GLint,
  format: GLenum,
}

type Matrix3 = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number
];