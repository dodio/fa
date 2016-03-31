var express = require("express");

function Fa(conf){
  var app = this.app = express(),
      swig = require("./lib/fa-swig")();

  app.engine("tpl", swig.renderFile );
  app.set("view engine", "tpl");
  
}
module.exports = new Fa();