require('dotenv').config();

const Queue = require('bull');
const redisClient = require('../redisClient');
const Logger = require('../logger');
const getTableRecordCommand = require('../commands/getTableRecords');

const fetchRecordsQueue = new Queue(
	'fetch-records-queue',
	process.env.REDIS_URL
);

fetchRecordsQueue.process('fetch', async (job) => {
	try {
		const { tableName } = job.data;
		let isCache = false;
		let records;

		const cachedResult = await redisClient.get(`base:tables:${tableName}`);
		if (cachedResult) {
			records = JSON.parse(cachedResult);
			isCache = true;
		} else {
			records = await getTableRecordCommand(tableName);
		}

		const response = {
			isCache,
			tableName,
			totalRecords: records.length,
		};

		Logger.debug(response);

		return Promise.resolve(response);
	} catch (err) {
		Logger.error(err);

		return Promise.reject(err);
	}
});

module.exports = fetchRecordsQueue;
