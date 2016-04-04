var util =  {};
var fs = require('fs');
var path = require('path');

module.exports = function (fa) {
    fa.util = util;
    process.nextTick(function(){
      fa.emit("util.ready",util);
    })
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

/**
 * 加载某目录下所有的模块到一个对象
 */

util.loadWholeDirectory = function (path){
}