require("./enviroment");

var fa = require("../../index")(),
    app = fa.app

app.set("views", [__dirname, "views"].join("/"));

app.get("/", function(req, res, next) {
    res.render("index")
})
app.listen(80, function() {
    fa.emit("started");
});

fa.on("started",function(){
   console.log("server started");
})