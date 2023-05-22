const formatter = Intl.NumberFormat("en-US", {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2
});

export const format = (num) => {
	return formatter.format(num);
};