var methodOverride = require('method-override');
var express = require("express");
module.exports = function(conf){
    var app = express.Router();
    var methods = conf.methods;
    if (methods instanceof Array){
        for (var i = 0; i < conf.length; i++) {
            app.use(methodOverride(methods[i]));
        }
    }else if (methods){
        app.use(methodOverride(methods));
    }
    return app;
};

