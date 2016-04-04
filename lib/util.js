var util =  {};
var fs = require('fs');
var path = require('path');

module.exports = function (fa) {
    fa.util = util;
}

/**
 * 创建指定目录下的加载器
 */
util.loader = function (path) {
    return function (module) {
        return path.jion(path,module);
    }
}

/**
 * 等待某实例上所有事件完成
 */
util.allEvent = function (ins, events, cb) {
    
}