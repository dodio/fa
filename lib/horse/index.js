/**
 * 马，帮助自动建立路由导航
 */

module.exports = function (fa) {
    // To do ，一些帮助加载路由或配置路由的工具函数
    var horse = require('express').Router();
    fa.horse = horse;
    fa.middleware.add("horse", function(){
      return horse;
    });
}