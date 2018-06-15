var axios = require('axios')
var apiUrl = process.env.PETS_API_URL || 'http://localhost:3002/pets/'

module.exports = {
  get: function () {
    return axios.get(apiUrl).then((res) => { return res.data })
  }
}
