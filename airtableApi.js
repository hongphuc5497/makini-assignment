require('dotenv').config();

const axios = require('axios');

module.exports = axios.create({
	baseURL: 'https://api.airtable.com/v0/',
	responseType: 'json',
	headers: {
		Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`,
	},
});
