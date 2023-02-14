const AirtableApi = require('../airtableApi');
const redisClient = require('../redisClient');

module.exports = () => {
	return new Promise((resolve, reject) => {
		AirtableApi.get('/meta/bases')
			.then(({ data: { bases } }) => {
				const baseId = bases[0].id;

				AirtableApi.get(`/meta/bases/${baseId}/tables`)
					.then(({ data: { tables } }) => {
						const info = {
							baseId,
							tables,
						};

						redisClient.set('base', JSON.stringify(info));

						resolve(info);
					})
					.catch((err) => reject(err));
			})
			.catch((err) => {
				reject(err);
			});
	});
};
