/**
 * 蜜蜂，专门负责后端http api的调用，和结果返回，依赖Promise
 */
var request = require('request')

module.exports = function (fa) {
    fa.bee = new Bee(fa.config.get("bee"));
}
function Bee(conf){
  this.config = conf;
}
