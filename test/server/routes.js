var fa = global.fa

module.exports = function(router) {
  router.use(fa.middleware.get("message")({
    tpl: "message" //默认使用的模板文件路径
  }))

  router.get("/login", function(req, res) {
    req.session.user = {
      name: 'xiyang',
      email: 'go2solo18@gmail.com'
    }
    var msg = fa.message.success(null, "登录成功啦，马上即将返回")
    res.message.page(msg, 3000, "/");
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

  router.get("/array_message", function(req, res, next) {
    var info = [{
      "userid": "用户id不能为中文"
    }]
    res.message(50, info, "参数错误")
  })

  router.get("/simple_message", function(req, res, next) {
    res.message(1, "查询出问题啦")
  })

  router.get("/error500", function(req, res, next) {
    throw new FaError("500错误", 500)
  })

  router.post("/api/data", function(req, res) {
    res.json(req.body);
  })

  router.get("/api/tngou", function(req, res, next) {
    var tngou = fa.bee('tngou');
    tngou.get('/info/list').json(function(k, v) {
      if (k === req.query.blocked) {
        return undefined
      }
      return v;
    }).spread(function(data) {
      res.send(data)
    })
      .catch(next)
  })

  router.get('/api/img', function(req, res, next) {
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