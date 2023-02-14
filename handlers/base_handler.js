const { tryCatchWrapper } = require('../helpers');
const getBaseCommand = require('../commands/getBase');

const getBase = tryCatchWrapper(async (req, res) => {
	if (req.cache) {
		res.status(200).json(req.cache);
	}

	const data = await getBaseCommand();

	res.status(200).json(data);
});

module.exports = {
	getBase,
};
