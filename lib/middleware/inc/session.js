var session = require("express-session");

module.exports = function(conf) {
	if(conf.redis){
		var redis = require('connect-redis'),
				redisStore = redis(session);
		console.log("使用redis缓存session: http://%s:%s",conf.redis.host,conf.redis.port);
		conf.store = new redisStore(conf.redis);
	}else{
		var file = require("session-file-store"),
				path = conf.path

		console.log("使用文件保存session ,路径:%s",path);
		var fileStore =  file(session);

		conf.store = new fileStore({
			path:path
		});
	}
	return [ session(conf),checkSession ];
}

function checkSession(req,res,next){
	if(!req.session){
		next(new Error("Session GateWay Error"));
		return;
	}
	next();
}
