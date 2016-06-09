var util = {},
    fs = require('fs'),
    nodePath = require('path'),
    nodeUtil = require("util");


module.exports = function(fa) {
    fa.util = util;
}
module.exports.util = util

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

/**
 * 加载某目录下指定的模块到对象上
 * @param  {[type]} path     [目录地址]
 * @param  {[type]} modArray [description]
 * @return {[type]}          [description]
 */
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




util.field = function (str) {
  // 字段白名单
  return makeJsonReciever(str, false)
}
  // 字段黑名单
util.nofield = function (str) {
  return makeJsonReciever(str, true)
}
util.randomPick = function(arr){
  return arr[Math.floor(Math.random()*arr.length)]
}
util.isNumberic = isNumberic;










// 必须有的字段，这三字段是所有接口默认含有的
var mustIn = 'status msg data'

function makeJsonReciever(fields, no){
  var 
  whiteFields = mustIn.split(' '),
  blackFields = [],

  white = {},
  black = {}
  if(typeof fields === 'string') {
    fields = fields.split(' ')
  }

  if(!no) {
    whiteFields = whiteFields.concat(fields)
  }else {
    blackFields = blackFields.concat(fields)
  }

  blackFields.forEach(function (v, i) {
    if(v.trim() === "") return 
    black[v] = true
  })
  whiteFields.forEach(function (v, i) {
    if(v.trim() === "") return 
    white[v] = true
  })
  var parser = function(k,v){
    //返回根元素
    if(k === '' || isNumberic(k)) return v

    // 获取白名单中的key
    if(white[k]) return v

    // 去掉黑名单中的key
    if(black[k]) return 

    // 黑名单模式，则默认获取；白名单默认不获取
    return no ?  v : undefined 
  }
  
  return parser
}

// 从jQuery抄来的
function isNumberic(obj) {
    var type = typeof obj
    return ( type === "number" || type === "string" ) && 

    !isNaN( obj - parseFloat( obj ) );
}