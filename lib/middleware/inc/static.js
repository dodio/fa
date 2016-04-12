var express = require("express"),
    debug = require('debug')('fa:middleware:static')

module.exports = function(options){
    var app = express.Router();

    debug('app url: [%s], local path: [%s]', options.urlPattern, options.publicDir)
    app.use(options.urlPattern, require('express').static(options.publicDir , options.options));
    //拦截404
    var notFound;
    if(typeof options.notFound === "function"){
        notFound = options.notFound;
    }else{
        notFound = function(req,res){
            res.sendStatus(404);
        }
    }
    app.use(options.urlPattern, notFound);
    return app;
};
