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
  self.p = new Promise(function(resolve, reject) {
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
  return self.p.spread(function(body, response, bee) {
    try {
      var data = bee._json ? body : JSON.parse(body, reciever);
    }catch(e){
      throw new SyntaxError(nodeUtil.format('JSON parse %s \nurl:%s\nresponse data(length:%s):\n',
        e.message,
        nodeUrl.resolve(self.options.baseUrl, self.options.uri),
        body.length, 
        body.toString() || "返回数据为空")
      )
    }
    return [data, response.toJSON(), bee]
  })
};
Unpacker.prototype.str = function(encoding) {
  return this.p.spread(function(body, response, bee) {
    var data = bee._json ? JSON.stringify(body) : body.toString(encoding);
    return [data, response.toJSON(), bee]
  })
}