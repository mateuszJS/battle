export default (func, time) => {
    let wait = false;
	return (e) => {
		if(!wait){
			func(e);
            wait = true;
			setTimeout(() => wait = false, time);
		}
    }
}
