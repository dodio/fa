module.exports = function(fa) {

  fa.on("util.ready",function(util){
    console.log("[middleware]加载模块.");
    console.log("[middleware]模块加载完成.");
    fa.emit("middleware.ready");
  })

}