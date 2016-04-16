var util = {},
    fs = require('fs'),
    nodePath = require('path'),
    nodeUtil = require("util");


module.exports = function(fa) {
    fa.util = util;
    process.nextTick(function() {
        fa.emit("util.ready", util);
    })
}

/**
 * 创建指定目录下的加载器
 */
util.loader = function(path) {
    return function(module) {
        return require(nodePath.jion(path, module));
    }
}

/**
 * 加载某目录下所有的模块到一个对象
 */

util.loadWholeDirectory = function(path) {
    var obj = {};

    var files = fs.readdirSync(path);

    files.forEach(function(v, i) {
        var moduleName = v.replace(/\..*$/, ""),
            filePath = nodePath.join(path, v)
        obj[moduleName] = require(filePath);
    });
    return obj;
}

util.loadModules = function(path, modArray) {
    var obj = {};
    if (!modArray) {
        return;
    }
    modArray = nodeUtil.isArray(modArray) ? modArray : [modArray];

    modArray.forEach(function(v, i) {
        obj[v] = require(nodePath.join(path, v));
    })

    return obj;
}