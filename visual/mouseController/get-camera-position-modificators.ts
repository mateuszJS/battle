// const MAX_CAMERA_MOVE_SPEED = 15
// const START_MOVING_CAMERA_BOUNDARY = 100

// const getCameraPositionModificators = (x: number, y: number) => {
//   let modX = 0
//   let modY = 0

//   if (x < START_MOVING_CAMERA_BOUNDARY) {
//     modX =
//       ((START_MOVING_CAMERA_BOUNDARY - x) / START_MOVING_CAMERA_BOUNDARY) * MAX_CAMERA_MOVE_SPEED
//   } else if (x > window.innerWidth - START_MOVING_CAMERA_BOUNDARY) {
//     modX =
//       ((window.innerWidth - START_MOVING_CAMERA_BOUNDARY - x) / START_MOVING_CAMERA_BOUNDARY) *
//       MAX_CAMERA_MOVE_SPEED
//   }

//   if (y < START_MOVING_CAMERA_BOUNDARY) {
//     modY =
//       ((START_MOVING_CAMERA_BOUNDARY - y) / START_MOVING_CAMERA_BOUNDARY) * MAX_CAMERA_MOVE_SPEED
//   } else if (y > window.innerHeight - START_MOVING_CAMERA_BOUNDARY) {
//     modY =
//       ((window.innerHeight - START_MOVING_CAMERA_BOUNDARY - y) / START_MOVING_CAMERA_BOUNDARY) *
//       MAX_CAMERA_MOVE_SPEED
//   }

//   return {
//     modX,
//     modY,
//   }
// }

// export default getCameraPositionModificators
