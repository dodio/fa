var session = require("express-session"),
		debug = require('debug')('fa:middleware:session')

module.exports = function(conf) {
	if(conf.redis){
		var redis = require('connect-redis'),
				redisStore = redis(session);
		debug("using redis session store: http://%s:%s",conf.redis.host,conf.redis.port);
		conf.store = new redisStore(conf.redis);
	}else{
		var file = require("session-file-store"),
				path = conf.path

		debug("using file-session-store：%s", path);
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
