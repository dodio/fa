var swig = require('swig'),
    setFilters = require('./filters'),
    setLocals = require('./locals'),
    setTags = require('./tags')

module.exports = function (fa) {
    console.log('[fa-swig]正在加载.');
    var config = fa.config,
        options = config.get('swig'),
        swig = new FaSwig(options)
        
    fa.swig = swig;
    console.log('[fa-swig]正在加载完成.');
}

function FaSwig(options) {
  var swigInstance = new swig.Swig(options);
  setLocals(swigInstance);
  setFilters(swigInstance);
  setTags(swigInstance);
  this.swig = swigInstance;
  this.renderFile = renderFile.bind(this);
}


function renderFile(path, locals, cb) {
    this.swig.renderFile(path, locals, cb);
    // console.log(arguments);
}