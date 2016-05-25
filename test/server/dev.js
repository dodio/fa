// hack 环境变量
require("./enviroment");
//直接引入bluebird
global.Promise = require('bluebird'); 
var fa = require("../../index")(),
    app = fa.app

require('./routes')(fa.horse);
global.fa = fa;
fa.start();
