{% extends "./layout.tpl" %}

{% block content %}
名字：{{user.name}} <br>
email:{{user.email}} <br>
{{ "  test trim filter  "|trim}}

<script>
  $(function(){
    //test post body parser
    $.post("/api/data",{
      hello:"bodyParser",
      lala:"这是中文"
    }, function(res){
      console.log(res);
      $("body").append(JSON.stringify(res))
    })
  });
</script>
{% parent %}
{% endblock %}