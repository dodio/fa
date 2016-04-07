var compressible = require('compressible');

module.exports = function(conf){
    conf.filter = typeof conf.filter === 'function' ? conf.filter : defaultFilter;
    return require('compression')(conf);
};

function defaultFilter(req, res){
  var type = res.getHeader('Content-Type');
  if (type === undefined || !compressible(type)) {
      return false;
  }
  return true;
}