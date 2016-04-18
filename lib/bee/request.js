var request = require('request')

module.exports = makeRequestProxy(request);

function makeRequestProxy(req) {
  var proxy = req.defaults(function(options, callback) {
    return new Promise(function(resolve, reject) {
      var req = request(options, callback || function(err, respone, body) {
        if (err) {
          return reject(err);
        }
        resolve(body, respone, req);
      })
    })

  })

  return proxy;
}