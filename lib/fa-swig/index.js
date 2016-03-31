var swig = require("swig");

module.exports = function (options) {
  var swigInstance = new swig.Swig(options);

  return swigInstance;
}

