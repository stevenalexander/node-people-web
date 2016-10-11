var request = require('request-promise')
var apiUrl = process.env.API_URL || 'http://localhost:3001/people/'

module.exports = {
  get: function () {
    return request.get({uri: apiUrl, json: true})
  },

  add: function (item, callback) {
    return request.post({url: apiUrl, json: true, body: item})
  },

  del: function (id, callback) {
    return request.delete({url: apiUrl + id, json: true})
  }
}
