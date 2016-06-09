var _ = require("lodash"),
  validate = {}

/**
 * 这个只是针对字符串参数进行验证，并不是判断数值类型.
 * @type {[type]}
 */
var ValidateGroup = require("./ValidateGroup")

validate.create = function(rules) {
  return new ValidateGroup(rules);
}

validate.ValidateGroup = ValidateGroup;
validate.common = require("./common");



module.exports = function(fa) {
  fa.validate = validate
}