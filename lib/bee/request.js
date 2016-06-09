var request = require('request'),
  nodeUtil = require('util'),
  debug = require('debug')('bee'),
  nodeUrl = require('url')

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


function Unpacker(options) {
  var self = this

  debug(options)
  self.options = options
  self.p = self._p = new Promise(function(resolve, reject) {
    //bee 可以pip到 response上， 但是从服务端来的headers 或者 cookies 也一起到了浏览器. 主要查看 request pipeDest 的源码
    self.bee = request(options, function(err, response, body) {
      if (err) {
        return reject(err)
      }
      resolve([body, response, self.bee])
    })
  })
}
/**
 * 指定一个状态码 多数是用于200
 * @param  {[type]} status [http状态码]
 * @return {[type]}        [description]
 */
Unpacker.prototype.status = function(status) {
  var self = this
  
  self._p = self._p.spread(function(body, response, bee) {
    debug("expecting status:%s, recieved:%s", status, response.statusCode)
    if (response.statusCode === status) {
      return [body, response, bee]
    }
    throw new FaError("Not expected status", 503)
  })
  return this;
}
/**
 * 以json来解析
 * @param  {[type]} reciever [description]
 * @return {[type]}          [description]
 */
Unpacker.prototype.json = function(reciever) {
  var self = this
  return self._p.spread(function(body, response, bee) {
    try {
      var data = bee._json ? body : JSON.parse(body, reciever);
    } catch (e) {
      debug('JSON parse error message %s \n', e.message)
      debug('url:%s', nodeUrl.resolve(self.options.baseUrl, self.options.uri))
      debug('response data(length:%s): \n %s', body.length, body.toString() || "返回数据为空")
      throw new FaError("Json parse failed")
    }
    return [data, response.toJSON(), bee]
  })
};
Unpacker.prototype.str = function(encoding) {
  return this._p.spread(function(body, response, bee) {
    var data = bee._json ? JSON.stringify(body) : body.toString(encoding);
    return [data, response.toJSON(), bee]
  })
}