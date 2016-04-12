var express = require("express"),
    debug = require('debug')('fa:express')
    
module.exports = function (fa) {
    debug("create express app and mount to fa.app");
    var app = fa.app = express();
}