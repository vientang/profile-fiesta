const cheerio = require('cheerio')

module.exports = {
	scrape: (html, props) => {		
		const metaData = {}
		$ = cheerio.load(html)
		$('meta').each((i, meta) => {
			if (meta.attribs) {
				const attribs = meta.attribs
				if (attribs.property) {
					const prop = attribs.property
					if (props.indexOf(prop) !== -1) {
						const key = prop.replace('og:', '')
						metaData[key] = attribs.content
					}
				}
			}
		})
		return metaData
	}
}
