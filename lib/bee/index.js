/**
 * 蜜蜂，专门负责后端http api的调用，和结果返回，依赖Promise
 */
var request = require('./request'),
    Api = require('./api'),
    log = require('debug')('bee:log'),
    debug = require('debug')('bee'),
    nodeUtil = require('util')

module.exports = function (fa) {
    fa.bee = makeBee(fa.config.get("bee"))
}

function makeBee(beeConf){
  var apis = search.apis = new Api("", request, beeConf)

  return search;

  function search(apiName, version, release){
    return apis.resolve(version, release);
  }
}

