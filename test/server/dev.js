// hack 环境变量
require("./enviroment");
//直接引入bluebird
global.Promise = require('bluebird'); 
var fa = require("../../index")(),
    app = fa.app

global.fa = fa;

fa.middleware.add("notFound",function () {
  return function(req, res, next){
    next(new FaError("URL Not Found", 404))
  }
})
require('./routes')(fa.horse);
fa.start();