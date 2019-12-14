export default function (testFunction, loop, ...args) {
	let sum = 0;
	for(let i = 0; i < loop; i++) {
		let start = new Date(),
			x = testFunction(...args),
			end =  new Date();
		sum += end - start;
	}
	sum /= loop;
	console.log(sum);
}