var bodyParser = require('body-parser');

module.exports = function(conf){
    var middleware = [];
    middleware.push(util.wrapExclude(conf.urlencoded.exclude, bodyParser.urlencoded(conf.urlencoded)));
    middleware.push(util.wrapExclude(conf.json.exclude, bodyParser.json()));

    return middleware;
};
