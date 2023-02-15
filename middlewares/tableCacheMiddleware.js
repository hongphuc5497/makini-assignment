const redisClient = require('../redisClient');
const getBaseCommand = require('../commands/getBase');
const { FetchRecordsByTableEmitter } = require('../emitters/index');

const fetchOtherTables = async (tableName) => {
	try {
		let base;

		const cachedResult = await redisClient.get('base');
		if (cachedResult) {
			base = JSON.parse(cachedResult);
		} else {
			base = await getBaseCommand();
		}
		const tableNames = base.tables
			.map((item) => item.name)
			.filter((name) => name !== tableName);

		tableNames.forEach((item) => FetchRecordsByTableEmitter.emit('exec', item));
	} catch (err) {
		throw err;
	}
};

module.exports = async (req, res, next) => {
	try {
		const { tableName } = req.params;

		await fetchOtherTables(tableName);

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
