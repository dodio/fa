<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>挫逼的500错误</title>
</head>
<body>
  <ul>
  <li>消息：{{fa_message.msg}}</li>
  {% if fa_message.data %}
  <li>
   {% autoescape 'html' %}
   <pre>
    {{fa_message.data.stack}}
   {% endautoescape %}
   </pre>
  </li>
  {% endif %}
  <li>时间：{{fa_message_time}}</li>
  <li>跳转地址：{{fa_message_redirect}}</li>
</ul>

</body>
</html>