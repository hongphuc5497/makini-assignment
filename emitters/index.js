const events = require('node:events');

const fetchRecordsQueue = require('../queues/fetchRecordsQueue');
const Logger = require('../logger');

const FetchRecordsByTableEmitter = new events.EventEmitter();

FetchRecordsByTableEmitter.on('exec', (tableName) =>
	fetchRecordsQueue.add('fetch', { tableName })
);

FetchRecordsByTableEmitter.on('error', (err) => Logger.error(err));

module.exports = {
	FetchRecordsByTableEmitter,
};
