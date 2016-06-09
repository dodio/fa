{% extends "./layout.tpl" %}


{% block content %}
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
<script>
  setTimeout(function() {
    alert("我要跳转到：{{fa_message_redirect}}")
    location.href="{{fa_message_redirect}}"
  },{{fa_message_time}})
</script>
{% endblock %}