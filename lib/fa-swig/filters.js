/**
 * 设置过滤器
 */
module.exports = function setFilters(swig) {
    for(var i in filters){
        swig.setFilter(i, filters[i]);
    }
}

var filters = {
    /**
     * 取首末尾的空格
     */
    trim: function (str) {
        if(typeof str != 'string'){
            return '';
        }
        return str.trim();
    }
}