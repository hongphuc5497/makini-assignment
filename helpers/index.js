/**
 * It takes a function as an argument, and returns a function that calls the argument function, and if
 * it throws an error, it calls the next function with the error
 * @param func - The function that you want to wrap.
 */
const tryCatchWrapper = (func) => async (req, res, next) => {
	try {
		await func(req, res);
	} catch (err) {
		next(err);
	}
};

module.exports = {
	tryCatchWrapper,
};
