var axios = require('axios')
var apiUrl = process.env.API_URL || 'http://localhost:3001/people/'

module.exports = {
  get: function () {
    return axios.get(apiUrl).then((res) => {
      return res.data
    })
  },

  add: function (item) {
    return axios.post(apiUrl, item)
  },

  del: function (id) {
    return axios.delete(apiUrl + id)
  }
}
