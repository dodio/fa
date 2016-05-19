var events = require("events"),
    config = require("config"),
    nodeUtil = require('util'),
    _ = require('lodash'),
    debug = require("debug")("fa")

module.exports = Fa;
nodeUtil.inherits(Fa, events);

//options 还没有投入使用
function Fa(options) {
    debug("init fa instance");
    init.call(this,options);
}

/**
 * 启动服务器
 */
Fa.prototype.start = function (cb) {
    var port = config.get('fa.port');
    var that = this;
    
    _start();

    function _start() {
        debug("fa modules has been loaded.");
        configureExpress(that);
        installMiddleWares(that);
        debug("http server is starting");
        that.app.listen(port, function(){
            debug('http server is working at port：%s',port);
            cb && cb();
            that.emit('started');
        })
    }

}

function init(options) {
    this.config = config;
    var that = this;

    //加载内部模块
    [
    './express',
    './util',
    './middleware',
    './fa-swig',
    './bee',
    './horse',
    ].forEach(function (v, i){
        require(v)(that);
    })
    
}


function installMiddleWares(fa){
    debug("install middlewares to fa.app");
    var middlewareConfs = fa.config.get('middleware');

    var wareArray = [];

    // node-config 不支持数组动态配置 https://github.com/lorenwest/node-config/wiki/Configuration-Files#arrays-are-merged-by-replacement
    _.forEach(middlewareConfs, function(v, k){
        // middleware 可以根据不同环境设置是否启用
        if(v.disable){
            debug("middleware [%s] disabled",k);
            return ;
        }
        var obj = {
            name: k,
            conf: v
        };
        wareArray.push(obj);
    })

    wareArray.sort(function(a, b){
        if(!_.isNumber(a.conf.level) || !_.isNumber(b.conf.level)){
            throw new Error("middleware must be configured with a level.");
        }
        // 值越低越靠前
        return a.conf.level - b.conf.level
    });

    debug("install middlewares in order：[%s]", wareArray.map(function(v, i){return v.name}).join(','));

    wareArray.forEach(function(v, i){
        var fn = fa.middleware.get(v.name)(v.conf);
        fa.app.use(fn);
    })

    fa.config.installedMiddlewares = wareArray;

    debug("all the middlewares configured have been installed successful.");
}

function configureExpress(fa){
    var config = fa.config,
        app = fa.app

    debug("configure fa.app");
    app.engine(config.get('fa.view.ext'), fa.swig.renderFile);
    app.set('view engine', config.get('fa.view.ext'));
    app.set('view cache', config.get('swig').cache);
    app.disable("x-powered-by");
}