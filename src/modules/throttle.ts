export default (func: Function, time: number) => {
  let wait = false;
  return (e) => {
    if (!wait) {
      func(e);
      wait = true;
      setTimeout(() => wait = false, time);
    }
  }
}
