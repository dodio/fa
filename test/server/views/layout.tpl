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
    <div class="container">头部</div>
  </div>
  <div class="container">
    {% block content %}
    this is parent
    {% endblock %}
  </div>
  
</body>
</html>