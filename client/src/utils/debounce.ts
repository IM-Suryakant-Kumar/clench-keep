export const debounce = (
	fn: (...args: React.ChangeEvent<HTMLInputElement>[]) => void,
	delay: number,
) => {
	let timerID: number;
	const context = this || debounce;
	return function (...args: React.ChangeEvent<HTMLInputElement>[]) {
		if (timerID) clearTimeout(timerID);
		timerID = setTimeout(() => fn.apply(context, [...args]), delay);
	};
};
