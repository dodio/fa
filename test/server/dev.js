// hack 环境变量
require("./enviroment");

var fa = require("../../index")(),
    app = fa.app

app.set("views", [__dirname, "views"].join("/"));
require('./routes')(fa.horse);

fa.start();