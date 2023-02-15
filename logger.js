const winston = require('winston');
const { combine, errors, colorize, timestamp, printf, splat } = winston.format;

const levels = {
	error: 0,
	warn: 1,
	info: 2,
	http: 3,
	sql: 4,
	debug: 5,
};

const colors = {
	error: 'red',
	warn: 'yellow',
	info: 'green',
	http: 'magenta',
	sql: 'cyan',
	debug: 'blue',
};

winston.addColors(colors);

const customFormat = printf((info) => {
	if (info.level === 'error') {
		return `[${info.timestamp}] ${info.message} ${info.stack}`;
	}

	if (typeof info.message === 'object') {
		info.message = JSON.stringify(info.message, null, 3);
	}

	return `[${info.timestamp}] ${info.level}: ${info.message}`;
});

const format = combine(
	errors({ stack: true }),
	timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
	splat(),
	customFormat
);

const transports = [
	new winston.transports.Console({
		format: combine(colorize({ all: true })),
		handleExceptions: true,
	}),
];

module.exports = winston.createLogger({
	level: 'debug',
	levels,
	format,
	transports,
	exitOnError: false,
});
