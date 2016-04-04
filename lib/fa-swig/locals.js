/**
 * 设置默认的模板变量，这里主要是设置模板方法
 */
module.exports = function setLocals(swig) {
    for(var i in locals){
        swig.options.locals[i] = locals[i];
    }
}


var locals = {
    /**
     * 返回当前时间的time ms
     */
    now: function () {
        return Date.now();
    }
}