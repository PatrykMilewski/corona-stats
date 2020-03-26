require('source-map-support').install()

const browser = require('./browser')
const zielonyWidok = require('./zielonyWidok')

module.exports.handler = async () => {
    await browser.initializeBrowser()

    const data = await zielonyWidok.getData()

    return {
        statusCode: 200,
        body: `${data.free}`
    }
}
