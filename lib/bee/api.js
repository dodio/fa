/**
 * 一个按层级递归并进行负载均衡的 API 管理类
 */

var nodeUtil = require('util'),
  _ = require('lodash'),
  log = require('debug')('bee:api')

module.exports = Api;

// api name 的分隔符
Api.NAME_DELIMITER = '|';

function Api(name, request, conf, parent) {
  if (typeof name != 'string') {
    throw new Error('api name must be a string');
  }

  if (parent && name === '') {
    throw new Error('api name can not be empty string when to be an release')
  }
  this.name = name;
  this.isRoot = name === '';
  this.parent = parent || null;

  if (conf.hasOwnProperty('version') && (typeof conf.version != 'string' || conf.version == '')) {
    throw new Error(nodeUtil.format('[%s] version must be a string and not an empty string.', name));
  }
  this.version = conf.version || false;

  //必须存在服务器配置，或者子版本配置
  if (conf.hasOwnProperty('servers')) {
    if (!nodeUtil.isArray(conf.servers) || !conf.servers.length) {
      throw new Error(nodeUtil.format('[%s] servers must not be an empty array'))
    }
    this.servers = createServers(request.defaults(conf.defaults), conf.servers);
    this.subVersion = false;

  } else if (conf.hasOwnProperty('releases')) {
    if (!nodeUtil.isObject(conf.releases) || !Object.keys(conf.releases).length) {
      throw new Error(nodeUtil.format('[%s] releases must not be an empty Object'))
    }
    if (!this.isRoot && !conf.releases[conf.latest]) {
      throw new Error(nodeUtil.format('[%s] latest release not exists in releases configuration.', name))
    }
    this.releases = createRelease(request.defaults(conf.defaults), conf.releases, this)
    this.latest = this.releases[conf.latest]
    this.servers = false;
  } else {
    throw new Error(nodeUtil.format('[%s] must have servers or releases configuration', name))

  }

}
/**
 * 递归查找子版本
 * @return {[type]} [description]
 */
Api.prototype.resolve = function() {
  var versionStack = _.slice(arguments)
  var pre = versionStack.shift();
  log('resolve [%s] in [%s] , current stack :[%s]', pre, this.name, versionStack.join(Api.NAME_DELIMITER))

  // 返回含有服务器列表的 api
  if (this.servers) {
    return this;
  }

  var sub = this.releases[pre] || this.latest;
  if (sub) {
    return sub.resolve.apply(sub, versionStack);
  }

}

function createRelease(request, confObj, parent) {
  var apis = {},
    name

  for (var i in confObj) {
    if (confObj.hasOwnProperty(i)) {
      name = parent.name == '' ? i : parent.name + Api.NAME_DELIMITER + i;
      apis[i] = new Api(name, request, confObj[i], parent)
    }
  }
  return apis;
}

function createServers(request, servers) {
  return servers.map(function(v, i) {
    return request.defaults(v)
  })
}