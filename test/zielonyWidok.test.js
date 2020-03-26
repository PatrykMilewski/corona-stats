afterEach(() => {
    jest.clearAllMocks()
})

describe('test', () => {

    it('valid event is published successfully', async () => {
        await handler()
    })

})
