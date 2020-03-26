process.env.AWS_LAMBDA_FUNCTION_NAME = 'mock'

const logger = require('../src/logger').logger
const context = require('./context')

afterEach(() => {
    jest.clearAllMocks()
})

describe('test', () => {

    it('valid event is published successfully', async () => {
        await handler({
            dimension: 'cdn'
        }, context)
        expect(axios.get).toBeCalledTimes(common.allMetrics.length)
        expect(datadog.sendDistributionMetric).toBeCalledTimes(31)
    })

    it('valid event is published successfsffully', async () => {
        const url = `${process.env.MUX_API_URL}/metrics/exits_before_video_start/breakdown?group_by=country&timeframe[]=1584975600&timeframe[]=1584979100&filters[]=country:DK`
        const values = []
        let i = 0
        const secondsSleep = 30
        while (i++ < 241) {
            const response = await axios.get(url, common.getMuxBasicAuthConfig())
            const point = response.data.data[0]
            values.push({
                secondsAfter: i * secondsSleep - (secondsSleep),
                dimension: point.field,
                value: point.value
            })

            console.log(i)
            await new Promise(r => setTimeout(r, secondsSleep * 1000));
        }
        console.log(JSON.stringify(values))

    }, 2109871198)

})
