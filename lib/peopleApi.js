var request = require('request')
var apiUrl = process.env.API_URL || 'http://localhost:3001/people/'

module.exports = {
  get: function (callback) {
    request.get(apiUrl, function (error, response, data) {
      if (!error && response.statusCode === 200) {
        var json = JSON.parse(data)
        callback(null, json)
      } else {
        callback(error, null)
      }
    })
  },

  add: function (item, callback) {
    request.post({url: apiUrl, json: item}, function (error, response, item) {
      if (!error && response.statusCode === 201) {
        callback(null, item)
      } else {
        callback(error, null)
      }
    })
  },

  del: function (id, callback) {
    request.delete(apiUrl + id, function (error, response) {
      if (!error && response.statusCode === 204) {
        callback(null)
      } else {
        callback(error)
      }
    })
  }
}
