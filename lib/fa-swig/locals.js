/**
 * 设置默认的模板变量，这里主要是设置模板方法
 */
module.exports = function setLocals(swig) {
    swig.setDefaults({
        locals:locals
    })
}


var locals = {
    /**
     * 返回当前时间的time ms
     */
    now: function () {
        return new Date();
    }
}