var session = require("express-session"),
		debug = require('debug')('fa:middleware:session')

module.exports = function(conf) {
	conf = Object.assign({},conf)
	if(!conf.store){
		throw new Error("please assign the session store method")
	}
	var store

	if(typeof conf.store != 'string') {
		store = conf.store

	} else {
		var storeLib = require(conf.store),
				storeBuilder = storeLib(session)

		store = new storeBuilder(conf[conf.store])
	}

	if(typeof conf.store === 'string'){
		debug("using %s as session store.", conf.store)
		debug("store configuration is : %s", JSON.stringify(conf[conf.store]))

	}else {

		debug("using custom session store method")
	}

	conf.store = store
	return [ session(conf),checkSession ];
}

function checkSession(req,res,next){
	if(!req.session){
		next(new Error("Session GateWay Error"));
		return;
	}
	next();
}
