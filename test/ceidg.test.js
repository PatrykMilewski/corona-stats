const handler = require('../src/ceidg').handler

afterEach(() => {
	jest.clearAllMocks()
})

describe('test', () => {
	
	it('valid event is published successfully', async () => {
		const response = await handler()
		expect(response.statusCode).toEqual(200)
	})

})