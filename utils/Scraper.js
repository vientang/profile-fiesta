var cheerio = require('cheerio')

module.exports = {
	scrape: function(html, props, url) {		
		var metaData = {}
		$ = cheerio.load(html)
		$('meta').each(function(i, meta) {
			if (meta.attribs) {
				var attribs = meta.attribs
				if (attribs.property) {
					var prop = attribs.property
					if (props.indexOf(prop) !== -1) {
						var key = prop.replace('og:', '')
						metaData[key] = attribs.content
					}
				}
			}
		})
		metaData['url'] = url
		return metaData
	}
}