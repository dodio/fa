var nodePath = require('path'),
    nodeUtil = require('util'),
    incPath = nodePath.join(__dirname,'inc')



module.exports = function(fa) {
  console.log("[middleware]加载模块.");
  fa.middleware = helper;
  console.log("[middleware]模块加载完成.");
}

var middlewares = {};

var helper = {

  add: function(name, factory){
    if(middlewares[name]){
      throw new Error(nodeUtil.format("已经存在名为：%s 的中间件", name));
    }
    if(typeof factory !== 'function'){
      throw new Error('中间件工厂为函数');
    }
    middlewares[name] = factory;
  },

  get: function(name){
    name = String(name);
    if(middlewares[name]){
      return middlewares[name];
    }
    try{
      var factory = require(nodePath.join(incPath,name));
      if(typeof factory !== 'function'){
        throw new Error('中间件工厂为函数');
      }
      return middlewares[name] = factory;

    }catch(e){
      throw new Error(nodeUtil.format('%s 中间件不存在',name))
    }
  }

}