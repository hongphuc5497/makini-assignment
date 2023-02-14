const request = require('supertest');
const app = require('../index');

describe('Airtable Base test suite', () => {
	it('tests /api/getBase endpoint', async () => {
		const res = await request(app).get('/api/getBase');

		expect(res.statusCode).toBe(200);

		expect(res.body).toEqual(
			expect.objectContaining({
				baseId: expect.any(String),
				tables: expect.any(Array),
			})
		);
	});
});
