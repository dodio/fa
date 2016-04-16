var request = require('request')

module.exports = makeRequestProxy(request);

function makeRequestProxy (req) {

  return req;

  // TODO : 给 request 做一个代理，方便promise 或者做一些统一处理
  function proxy(){
    req.apply(null, arguments)  
  }
}