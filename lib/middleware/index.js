var nodePath = require('path'),
    nodeUtil = require('util'),
    incPath = nodePath.join(__dirname, 'inc'),
    debug = require('debug')('fa:middleware')



module.exports = function(fa) {
    debug("mount middleware module to fa.middleware.");
    fa.middleware = helper;
}

var middlewares = {};

var helper = {

    add: function(name, factory, replace) {
        if (middlewares[name] && !replace) {
            throw new Error(nodeUtil.format("middleware [%s] already exists. you can use add(name, factory, true) to replace it", name));
        }
        if (typeof factory !== 'function') {
            throw new Error('middleware factory must be a function');
        }
        if(middlewares[name]){
            debug("middleware [%s] have been replaced by code line:\n %s", name, new Error().stack.split("\n")[2])
        }
        middlewares[name] = factory;
    },

    get: function(name) {
        name = String(name);
        if (middlewares[name]) {
            return middlewares[name];
        }
        try {
            var factory = require(nodePath.join(incPath, name));
            if (typeof factory !== 'function') {
                throw new Error('middleware factory must be a function');
            }
            return middlewares[name] = factory;

        } catch (e) {
            throw new Error(nodeUtil.format('can not find middleware [%s]\nmessage: %s', name, e.message))
        }
    }

}