const AirtableApi = require('../airtableApi');
const redisClient = require('../redisClient');
const getBaseCommand = require('./getBase');

const getBaseInfo = async () => {
	const base = await redisClient.get('base');
	let info;

	if (base) {
		info = JSON.parse(base);
	} else {
		info = await getBaseCommand();
	}

	return info;
};

const getTableRecordsWithRecursion = async (
	tableName,
	tempOffset = null,
	tempRecords = []
) => {
	try {
		const info = await getBaseInfo();

		const { data } = await AirtableApi.get(
			`/${info.baseId}/${tableName}${tempOffset ? '?offset=' + tempOffset : ''}`
		);
		const { records, offset } = data;

		tempRecords = [...tempRecords, ...records];

		if (offset) {
			return getTableRecordsWithRecursion(tableName, offset, tempRecords).then(
				(nextRecords) => {
					tempRecords = [...tempRecords, ...nextRecords];
					return tempRecords;
				}
			);
		}

		await redisClient.set(`base:tables:${tableName}`, JSON.stringify(tempRecords));

		return tempRecords;
	} catch (err) {
		throw err;
	}
};

const getTableRecordsWithWhileLoop = async (tableName) => {
	try {
		const records = [];
		let offset;
		const info = await getBaseInfo();

		do {
			const response = await AirtableApi.get(
				`/${info.baseId}/${tableName}${offset ? '?offset=' + offset : ''}`
			);

			records.push(...response.data.records);

			offset = response.data.offset;
		} while (offset);

		await redisClient.set(`base:tables:${tableName}`, JSON.stringify(records));

		return records;
	} catch (err) {
		throw err;
	}
};

module.exports = getTableRecordsWithWhileLoop;
