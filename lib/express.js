var express = require("express");
module.exports = function (fa) {
    
    console.log("[express]创建 app");
    var app = fa.app = express(),
        config = fa.config;
    
    fa.on("fa-swig.ready",function () {
        console.log("[express]配置fa-swig");
        app.engine(config.get('fa.view.ext'), fa.swig.renderFile);
        app.set('view engine', config.get('fa.view.ext'));
        app.set('view cache', config.get('swig').cache);
        
        //异步发出让后面绑定ready事件的代码有机会执行.
        process.nextTick(function(){
            fa.emit("express.ready",app);
        })
    })
}