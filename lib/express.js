var express = require("express");
module.exports = function (fa) {
    console.log("[express]创建 app");
    var app = fa.app = express();
}