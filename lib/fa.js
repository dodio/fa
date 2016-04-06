var events = require("events"),
    config = require("config"),
    nodeUtil = require('util'),
    _ = require('lodash')


module.exports = Fa;
nodeUtil.inherits(Fa, events);

//options 还没有投入使用
function Fa(options) {
    console.log("创建Fa实例");
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
        console.log("系统模块加载完成。");
        configureExpress(that);
        installMiddleWares(that);
        console.log("系统正在启动。。。");
        that.app.listen(port, function(){
            console.log('服务已经启动完毕，端口：%s',port);
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
    console.log("开始装配中间件！");
    var middlewareConfs = fa.config.get('middleware');

    var wareArray = [];

    // node-config 不支持数组动态配置 https://github.com/lorenwest/node-config/wiki/Configuration-Files#arrays-are-merged-by-replacement
    _.forEach(middlewareConfs, function(v, k){
        // middleware 可以根据不同环境设置是否启用
        if(v.disable){
            console.log("%s中间件被禁用",k);
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
            throw new Error("中间件必须排出优先级");
        }
        // 值越低越靠前
        return a.conf.level > b.conf.level
    });

    console.log("中间件装配顺序为：");
    wareArray.forEach(function(v, i){
        console.log(v.name);
    })

    wareArray.forEach(function(v, i){
        var fn = fa.middleware.get(v.name)(v.conf);
        fa.app.use(fn);
    })

    console.log("中间件装配完成！");
}

function configureExpress(fa){
    var config = fa.config,
        app = fa.app

    console.log("express 配置中...");
    app.engine(config.get('fa.view.ext'), fa.swig.renderFile);
    app.set('view engine', config.get('fa.view.ext'));
    app.set('view cache', config.get('swig').cache);

    console.log("express 配置完成.");

}