const AirtableApi = require('../airtableApi');
const redisClient = require('../redisClient');
const getBaseCommand = require('./getBase');

module.exports = async (tableName) => {
	try {
		const base = await redisClient.get('base');
		let info;

		if (base) {
			info = JSON.parse(base);
		} else {
			info = await getBaseCommand();
		}

		const { data } = await AirtableApi.get(`/${info.baseId}/${tableName}`);
		const { records } = data;

		redisClient.set(`base:tables:${tableName}`, JSON.stringify(records));

		return records;
	} catch (err) {
		throw err;
	}
};
