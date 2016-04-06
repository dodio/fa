var bodyParser = require('body-parser');
module.exports = function(conf){
    var middleware = [];
    middleware.push(bodyParser.urlencoded(conf.urlencoded));
    middleware.push(bodyParser.json(conf.json));

    return middleware;
};
