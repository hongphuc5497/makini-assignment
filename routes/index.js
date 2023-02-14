const express = require('express');
const router = express.Router();

const cacheMiddleware = require('../middlewares/cacheMiddleware');
const baseHandler = require('../handlers/base_handler');

const getTableRecordsCommand = require('../commands/getTableRecords');

router.get('/', (req, res, next) => {
	res.render('index', { title: 'Express' });
});

router.get(
	'/drawings',
	cacheMiddleware('base:tables:drawings'),
	async (req, res, next) => {
		let drawings;

		if (req.cache) {
			drawings = req.cache;
		} else {
			drawings = await getTableRecordsCommand('drawings');
		}

		res.render('drawings', {
			drawings: drawings.map(({ fields, ...restItem }) => fields),
		});
	}
);

router.get('/api/getBase', cacheMiddleware('base'), baseHandler.getBase);

module.exports = router;
