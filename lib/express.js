var express = require("express"),
    debug = require('debug')('fa:express')
    
module.exports = function (fa) {
    console.log("创建app对象");
    var app = fa.app = express();
}