var swig = require('swig'),
    setFilters = require('./filters'),
    setLocals = require('./locals'),
    setTags = require('./tags')

setLocals(swig);

module.exports = function (options) {
  var swigInstance = new swig.Swig(options);
  
  setFilters(swigInstance);
  setTags(swigInstance);
  
  return swigInstance;
}

