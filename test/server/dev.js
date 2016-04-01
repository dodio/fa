var app = require("../../index")().app;

app.set("views", [__dirname, "views"].join("/"));

app.get("/", function(req, res, next) {
    res.render("index")
})
app.listen(80, function() {
    console.log("okay");
});