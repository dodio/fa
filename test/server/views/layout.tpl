<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>{{title}}</title>
  <link href="//cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet">
  <link href="//cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" rel="stylesheet">
  <script src="//cdn.bootcss.com/jquery/1.10.2/jquery.min.js"></script>
  <style>
    body{
      font-size: 12px;
      font-family: "微软雅黑";
    }
    .header{
      height: 35px;
      line-height: 3;
      background-color: #000;
      color: #fff;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="container">
      <nav>
        <a href="/">首页</a>
        <a href="/about">关于</a>
        <a href="/error500">500错误</a>
        <a href="/notexist">404notFound</a>
        <a href="/api/tngou">bee调用http接口</a>
        <a href="/array_message">参数校验错误</a>
        <a href="/simple_message">业务异常</a>
      </nav>
    </div>
  </div>
  <div class="container">
    {% block content %}
    this is parent
    {% endblock %}
  </div>
  
</body>
</html>