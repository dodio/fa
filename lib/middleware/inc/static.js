var express = require("express")

module.exports = function(options){

    var app = express.Router();
    
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
