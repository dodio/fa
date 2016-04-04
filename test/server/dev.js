require("./enviroment");

var fa = require("../../index")();

fa.on('express.ready', function (app) {
    app.set("views", [__dirname, "views"].join("/"));

    app.get("/", function(req, res, next) {
        res.locals.doit = function(){
            console.log('i want it');
        }
        res.render("index",{
            user: "zhang xixi",
            doit: 'ass hole'
        })
    })
    app.get("/about", function(req, res, next){
        res.render("page/about",{
            title:"关于我们"
        });
    })
    fa.emit('ready');
})


fa.start();