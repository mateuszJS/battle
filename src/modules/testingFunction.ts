const testingFunction = (
  testFunction: Function,
  loop: number,
  ...args: Parameters<any>
) => {
  let sum = 0;
  for (let i = 0; i < loop; i++) {
    const start = new Date().getTime();
    testFunction(...args);
    const end = new Date().getTime();
    sum += end - start;
  }
  sum /= loop
  console.log(sum)
}

export default testingFunction
