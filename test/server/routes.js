module.exports = function (router) {
  router.get("/", function(req, res, next) {
      res.locals.doit = function(){
          console.log('i want it');
      }
      res.render("index",{
          doit: 'ass hole'
      })
  })
  router.get("/about", function(req, res, next){
      res.render("page/about",{
          title:"关于我们"
      });
  })
}