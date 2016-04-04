var events = require("events"),
    config = require("config"),
    util = require('util')


module.exports = Fa;
util.inherits(Fa, events);

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
    
    // fa.ready ? start() :
    that.once('ready', start); //express 配置完成时，可以认为系统可以启动监听端口.
    
    function start() {
        console.log("系统加载完成，开始启动监听。");
        that.app.listen(port, function(){
            console.log('Server has started... working on port:%s',port);
            cb && cb();
            that.emit('started');
        })
    }
}

function init(options) {
    this.config = config;
    
    require('./express')(this);
    require('./fa-swig')(this);
    require('./bee')(this);
    require('./horse')(this);
    require('./util')(this);
    
}
