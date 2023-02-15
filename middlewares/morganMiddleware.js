const morgan = require('morgan');
const Logger = require('../logger');

const DEV_FORMAT =
	':remote-addr :method :url :status :res[content-length] - :response-time ms';

module.exports = morgan(DEV_FORMAT, {
	stream: {
		write: (message) => {
			Logger.http(message.trim());
		},
	},
});
