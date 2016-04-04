var express = require("express"),
    util = require("util"),
    events = require("events"),
    config = require("config")


module.exports = Fa;

function Fa() {
    var swigOptions = config.get('swig');
    var app = this.app = express(),
        swig = require("./fa-swig")(swigOptions);
    app.engine("tpl", swig.renderFile);
    app.set("view engine", "tpl");
    app.set('view cache', swigOptions.cache)
}

util.inherits(Fa, events);

