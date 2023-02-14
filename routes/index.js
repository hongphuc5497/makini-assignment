const express = require('express');
const router = express.Router();

const baseHandler = require('../handlers/base_handler');

const cacheMiddleware = require('../middlewares/cacheMiddleware');
const tableCacheMiddleware = require('../middlewares/tableCacheMiddleware');

const getTableRecordCommand = require('../commands/getTableRecord');
const getTableRecordsCommand = require('../commands/getTableRecords');

router.get('/', (req, res, next) => {
	res.render('index', { title: 'Express' });
});

router.get('/:tableName', tableCacheMiddleware, async (req, res, next) => {
	const { tableName } = req.params;

	if (req.cache) {
		records = req.cache;
	} else {
		records = await getTableRecordsCommand(tableName);
	}

	res.render('table', {
		tableName,
		records,
	});
});

router.get('/:tableName/:recordId', async (req, res, next) => {
	const { tableName, recordId } = req.params;
	const record = await getTableRecordCommand(tableName, recordId);

	res.render('record', {
		record,
		tableName,
	});
});

router.get('/api/getBase', cacheMiddleware('base'), baseHandler.getBase);

module.exports = router;
