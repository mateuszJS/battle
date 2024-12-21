import mat4 from "utils/mat4";
import ModuleGUI from "./GUI";
import vec3 from "utils/vec3";

const GUI = ModuleGUI.default

const startAngle = [-89.99, 0, 0] // bascially our mat4.lookAt tries to make sure object is oriented correctly,
// and at -90 is totating object weirdly to keep in in the right orientation
// const endAngle = [...startAngle]
const endAngle = [-27, -11, 0]

function easeInOut(t: number) {
  return t > 0.5 ? 4*Math.pow((t-1),3)+1 : 4*Math.pow(t,3);
}

const animationLength = 3000
const animationDelay = 500

const degToRad = (d: number) => d * Math.PI / 180;
export const cameraSettings = {
  fieldOfView: degToRad(18),
  zNear: 1,
  zFar: 10000,
  radius: 3008.11,
  cameraAngle: [degToRad(endAngle[0]), degToRad(endAngle[1]), degToRad(endAngle[2])],
  scale: [1, 1, 1],
  scaleFactor: 1,
  light: [-0.5, -1, -0.37]
}; // to add more perspective, increase fieldofView and decrease translation.z
const radToDegOptions = { min: -360, max: 360, step: 1, converters: GUI.converters.radToDeg };


let time = 0

const gui = new GUI();
gui.add(cameraSettings, 'fieldOfView', {min: 1, max: 179, converters: GUI.converters.radToDeg});
gui.add(cameraSettings, 'zNear', 1, 2000).name('zNear');
gui.add(cameraSettings, 'zFar', 1, 4000).name('zFar');
gui.add(cameraSettings, 'radius', -10000, 10000).name('distance from target');
gui.add(cameraSettings.cameraAngle, '0', radToDegOptions).name('rotation.x');
gui.add(cameraSettings.cameraAngle, '1', radToDegOptions).name('rotation.y');
gui.add(cameraSettings.cameraAngle, '2', radToDegOptions).name('rotation.z(no impact)');
gui.add(cameraSettings, 'scaleFactor', -5, 5).name('scaleFactor');
gui.add(cameraSettings.light, '0', -1, 1).name('light.x');
gui.add(cameraSettings.light, '1', -1, 1).name('light.y');
gui.add(cameraSettings.light, '2', -1, 1).name('light.z');

let extraMatrix: Float32Array  | null = null

export function setExtraMatrix(matrix: Float32Array | null) {
  extraMatrix = matrix
}

function getProjMatrix(canvas: HTMLElement) {
  const aspect = canvas.clientWidth / canvas.clientHeight;

  /* PERSPECTIVE MATRIX BY DEFAULT LOOKS INTO NEGATIVE Z DIRECTION */
  return mat4.perspective(
      cameraSettings.fieldOfView,
      aspect,
      cameraSettings.zNear,      // zNear
      cameraSettings.zFar,   // zFar
  );
}

export default function getMatricies(canvas: HTMLElement, targetPoint: Point, dt: number) {
  time += dt


  const target = [targetPoint.x, 0, targetPoint.y];

  const matricies = []

  const relativeProgress = Math.max(0, time - animationDelay) / (animationLength - animationDelay)
  if (time >= animationLength) {
    // ORDER MATTERS

    matricies.push(mat4.rotationY(cameraSettings.cameraAngle[1]))// 2. the nrotate!
    matricies.push(mat4.rotationX(cameraSettings.cameraAngle[0])) // 1.
    // we dont need Z, it's later calculated base on const up = [0, 1, 0]; and other axis, so it wont impact
  } else {
    const easeProgress = easeInOut(relativeProgress)
    matricies.push(mat4.rotationY(
      degToRad(startAngle[1] * (1 - easeProgress) + endAngle[1] * easeProgress)
    ))
    matricies.push(mat4.rotationX(
      degToRad(startAngle[0] * (1 - easeProgress) + endAngle[0] * easeProgress)
    ))
  }
  matricies.push(
    mat4.translation([0, 0, cameraSettings.radius]),
  )
 
 
  const cameraPos = matricies.reduce(
    (matrix, rotationMatrix) => mat4.multiply(matrix, rotationMatrix),
    mat4.translation(target) // put camera at exact same palce as objwct to follow
  )

  // Get the camera's position from the matrix we computed
  const eye = cameraPos.slice(12, 15);
  const up = [0, 1, 0];
  const viewMatrix = mat4.lookAt(eye, target, up);

  const projection = getProjMatrix(canvas)
  if (extraMatrix) {
    mat4.multiply(extraMatrix, projection, projection)
  }

  const viewProjectionMatrix = mat4.multiply(projection, viewMatrix);
  // return viewProjectionMatrix

  return {
    worldMatrix: viewProjectionMatrix,
    lightDirection: vec3.normalize(cameraSettings.light)
  }

}

export function getCameraAngle(): number[] {
  return cameraSettings.cameraAngle
}