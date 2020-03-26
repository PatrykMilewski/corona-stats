require('source-map-support').install()

const chromium = require('chrome-aws-lambda')
const DOMParser = require('xmldom').DOMParser

let browser = undefined

module.exports.initializeBrowser = async () => {
    if (browser === undefined) {
        browser = await chromium.puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath,
            headless: chromium.headless,
        })
    }
}

const getPage = async () => {
    const pages = await browser.pages()
    let page = pages[0]
    if (page === undefined) {
        page = await browser.newPage()
    }
    return page
}

module.exports.getUrlContent = async (url) => {
    const page = await getPage()
    await page.goto(url)
    const content = await page.content()
    return new DOMParser().parseFromString(content)
}