module.exports = function(conf){

	var path = conf.path;
  if (require('fs').existsSync(path)){
  	return require('serve-favicon')(path);
  }else{
  	return function(req,res,next){
  		next();
  	}
  }
};

