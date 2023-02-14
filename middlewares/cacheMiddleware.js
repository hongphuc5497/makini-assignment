const redisClient = require('../redisClient');

module.exports = (cacheKey) => {
	return async (req, res, next) => {
		try {
			const cachedResult = await redisClient.get(cacheKey);
			if (cachedResult) {
				req.cache = JSON.parse(cachedResult);

				next();
			} else {
				next();
			}
		} catch (err) {
			next(err);
		}
	};
};
