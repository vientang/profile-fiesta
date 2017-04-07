import superagent from 'superagent'

export default {
  get: (endpoint, params, callback) => {
    superagent
			.get(endpoint)
			.query(params)
			.set('Accept', 'application/json')
			.end((err, response) => {
        if (err) {
          callback(err, null)
          return
        }
        const confirmation = response.body.confirmation
        if (confirmation !== 'Success') {
          callback({message: response.body.message}, null)
        }
        callback(null, response.body)
      })
  },
  post: (endpoint, params, callback) => {
    superagent
			.post(endpoint)
			.send(params)
			.set('Accept', 'application/json')
			.end((err, response) => {
        if (err) {
          callback(err, null)
          return
        }
        const confirmation = response.body.confirmation
        if (confirmation !== 'Success') {
          callback({message: response.body.message}, null)
        }
        callback(null, response.body)
      })
  }
}
