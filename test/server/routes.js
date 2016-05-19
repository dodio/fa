module.exports = function(router) {

  router.get("/login", function(req, res) {
    req.session.user = {
      name: 'xiyang',
      email: 'go2solo18@gmail.com'
    }
    res.send("已经成功登陆，请返回");
  });

  router.use(checkLogin);
  router.get("/", function(req, res, next) {
    res.locals.doit = function() {
      console.log('i want it');
    }
    res.cookie("testcookie", "testvalue", {
      signed: false
    });
    res.cookie("testsign", "testvalue", {
      signed: true
    });

    res.render("index", res.data.get())
  })

  router.get("/about", function(req, res, next) {
    res.render("page/about", {
      title: "关于我们"
    });
  })

  router.post("/api/data", function(req, res) {
    res.json(req.body);
  })

  router.get("/api/tngou", function(req, res, next) {
    var tngou = fa.bee('tngou');
    tngou.get('/info/list').json(function(k, v){
      if(k === req.query.blocked){
        return undefined
      }
      return v;
    }).spread(function(data){
      res.send(data)
    })
    .catch(next)
  })

  router.get('/api/img', function(req, res, next){
    // fa.bee('test').get(req.query.url).bee.on('response',function(response){
    //   response.pipe(res);
    // })
  fa.bee.request.get(req.query.url).bee.pipe(res);
  })
}


function checkLogin(req, res, next) {
  if (req.session.user) {
    res.data('user', req.session.user);
    return next();
  }
  res.redirect("/login");
}