const redisClient = require('../redisClient');
const getTableRecordsCommand = require('./getTableRecords');

module.exports = async (tableName, recordId) => {
	try {
		const table = await redisClient.get(`base:tables:${tableName}`);
		let records;

		if (table) {
			records = JSON.parse(table);
		} else {
			records = await getTableRecordsCommand(tableName);
    }

    const record = records.find(item => item.id == recordId)

		return record;
	} catch (err) {
		throw err;
	}
};
