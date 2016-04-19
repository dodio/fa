var request = require('request'),
  nodeUtil = require('util')

module.exports = makeRequestProxy(request);

function makeRequestProxy(req) {
  // 默认保持 Buffer 对象，request 仅在请求中使用json 配置时会自动将 body转换为json
  var proxy = req.defaults({
    encoding: null
  }, function(options) {
    return new Unpacker(options)
  })

  return proxy;
}

/**
 * 还需要做更多的事来处理http错误的问题
 * @param {[type]} options [description]
 */
function Unpacker(options) {
  var self = this

  self.res = new Promise(function(resolve, reject) {
    //bee 可以pip到 response上， 但是从服务端来的headers 或者 cookies 也一起到了浏览器. 主要查看 request pipeDest 的源码
    self.bee = request(options, function(err, response, body) {
      if (err) {
        return reject(err)
      }
      resolve([body, response, self.bee])
    })
  })
}

Unpacker.prototype.json = function(reciever) {
  var self = this
  return self.res.spread(function(body, response, bee) {
    var data = bee._json ? body : JSON.parse(body, reciever);

    return [data, headers, bee]
  })
};
Unpacker.prototype.str = function(encoding) {
  return this.res.spread(function(body, response, bee) {
    var data = bee._json ? JSON.stringify(body) : body.toString(encoding);
    return [data, response.toJSON(), bee]
  })
}