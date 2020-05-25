const axios = require('axios')

var Request = {
  // TODO: Implement the method set as a class
  Get: function (url, params, callback) {
    axios.get(url, {
      params: params
    }).then(function (response) {
      callback(response)
    })
      .catch(function (e) {
        console.log('axios.get(...) get error: ' + e)
      })
      .then(function () {
      // Always execute here.
      })
  },

  // The post method
  Post: function (url, params, callback) {
    // Convert to object
    var requrstPayload = params
    if (typeof (params) !== 'object') {
      requrstPayload = { params }
    }
    axios.post(url, requrstPayload).then(function (response) {
      callback(response.data)
    }).catch(function (e) {
      console.log('axios.get(...) get error: ' + e)
    })
  }
}

export default{
  Request
}
