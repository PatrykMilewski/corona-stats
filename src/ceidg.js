require('source-map-support').install()

const logger = require('./common/logger').logger
const browser = require('./common/browser')
const xpath = require('xpath')

const url = 'https://prod.ceidg.gov.pl/ceidg.cms.engine/Template/Includes/StatisticPage.aspx?Id=3814CF7F-246D-4CC3-8B89-88AA1395DF1D'
const newEnterprisesXPath = './/*[@id="SpecialContentHolder"]/xmlns:table/xmlns:tbody/xmlns:tr[1]/xmlns:td[2]/text()'
const resumedEnterprisesXPath = './/*[@id="SpecialContentHolder"]/xmlns:table/xmlns:tbody/xmlns:tr[2]/xmlns:td[2]/text()'
const suspendedEnterprisesXPath = './/*[@id="SpecialContentHolder"]/xmlns:table/xmlns:tbody/xmlns:tr[3]/xmlns:td[2]/text()'
const closedEnterprisesXPath = './/*[@id="SpecialContentHolder"]/xmlns:table/xmlns:tbody/xmlns:tr[4]/xmlns:td[2]/text()'

module.exports.handler = async () => {
	try {
		await browser.initializeBrowser()
		const data = await getData()
		logger.info('Received data: ', data)
		return {
			statusCode: 200,
			body: JSON.stringify(data)
		}
	} finally {
		await browser.close()
	}
}

const getData = async () => {
	const pageDom = await browser.getUrlContent(url)
	const select = xpath.useNamespaces({
		xmlns: 'http://www.w3.org/1999/xhtml'
	})
	const newEnterprisesNode = select(newEnterprisesXPath, pageDom).toString()
	const resumedEnterprisesNode = select(resumedEnterprisesXPath, pageDom).toString()
	const suspendedEnterprisesNode = select(suspendedEnterprisesXPath, pageDom).toString()
	const closedEnterprisesNode = select(closedEnterprisesXPath, pageDom).toString()

	return {
		newEnterprises: parseInt(newEnterprisesNode),
		resumedEnterprises: parseInt(resumedEnterprisesNode),
		suspendedEnterprises: parseInt(suspendedEnterprisesNode),
		closedEnterprises: parseInt(closedEnterprisesNode),
	}
}