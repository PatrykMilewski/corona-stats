require('source-map-support').install()

const browser = require('./common/browser')
const xpath = require('xpath')

const url = 'https://www.gdansk.robyg.pl/oferta/mieszkania/zielony-widok'
const element = '/html/body/div[1]/div/div[2]/div/section[1]/div/div[2]/form/div[1]/div[2]/div/div/div[1]/a/span/em'

module.exports.handler = async () => {
    await browser.initializeBrowser()

    const data = await getData()

    return {
        statusCode: 200,
        body: `${data.free}`
    }
}

const getData = async () => {
    const pageDom = await browser.getUrlContent(url)
    const node = xpath.select(element, pageDom)[0]

    node.childNodes[0].constructor.name
    const textNodes = Object.values(node.childNodes).filter(singleNode => singleNode.constructor.name === 'Text')

    return {
        free: parseInt(textNodes[1])
    }
}