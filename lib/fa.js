var express = require("express"),
    util = require("util"),
    events = require("events")


module.exports = function Fa(options) {

    var app = this.app = express(),
        swig = require("./fa-swig")();

    app.engine("tpl", swig.renderFile);
    app.set("view engine", "tpl");
}

util.inherits(Fa, events);

