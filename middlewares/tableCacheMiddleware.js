const redisClient = require('../redisClient');

module.exports = async (req, res, next) => {
	try {
		const { tableName } = req.params;

		const cachedResult = await redisClient.get(`base:tables:${tableName}`);
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
