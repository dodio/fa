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
  var cache = {};

  function search(){
    var searchPath = Array.prototype.join.call(arguments, Api.NAME_DELIMITER);
    log('search api server :[%s]', searchPath)
    if(cache.hasOwnProperty(searchPath)){
      log("found cached api server : [%s]", searchPath);
      return cache[searchPath];
    }
    log('searching api server :[%s]', searchPath);
    var server = cache[searchPath] = apis.resolve.apply(apis, Array.prototype.slice.call(arguments));
    log('%s api server :[%s]', server ? 'found' : 'undefined' , searchPath);
    return server;
  }

  return search;

}

