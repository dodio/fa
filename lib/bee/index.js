/**
 * 蜜蜂，专门负责后端http api的调用，和结果返回，依赖Promise
 */
var request = require('./request'),
  Api = require('./api'),
  log = require('debug')('bee:log'),
  debug = require('debug')('bee'),
  nodeUtil = require('util'),
  _ = require('lodash')

module.exports = function(fa) {
  fa.bee = makeBee(fa.config.get("bee"))
  fa.bee.request = request;
}

function makeBee(beeConf) {
  var apis = search.apis = new Api("", request, beeConf),
    cache = {};

  function search() {
    var searchPath = Array.prototype.join.call(arguments, Api.NAME_DELIMITER),
      api

    log('search api :[%s]', searchPath)
    if (cache.hasOwnProperty(searchPath)) {
      log("found cached api : [%s]", searchPath);
      api = cache[searchPath];

    } else {
      log('searching api :[%s]', searchPath);
      api = cache[searchPath] = apis.resolve.apply(apis, arguments);
      log('%s api :[%s]', api ? 'found' : 'undefined', searchPath);

    }

    if (!api) {
      return;
    }

    log("get balanced server in [%s]", api.name);
    return balanceServer(api);
  }

  return search;

}


function balanceServer(api) {
  var servers = api.servers;
  return servers.length == 1 ? servers[0] : servers[_.random(0, servers.length)];
}