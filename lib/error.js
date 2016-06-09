var nodeUtil = require("util"),
    isFunction = nodeUtil.isFunction,
    message = require("./message").message

module.exports = function(fa){
  global.FaError = FaError
  fa.middleware.add("error", errorHandler)
}

nodeUtil.inherits(FaError, Error)

function FaError (msg, statusCode) {
  this.name = "FaError"
  this.message = msg
  this.statusCode = parseInt(statusCode) || 500
  Error.captureStackTrace(this, FaError)
}


function errorHandler(conf){
  conf = Object.assign({
    status: 999,
    debug: true,
    errorHandler: finalErrorHandler,
    logger: function logError(err, req, res, next){
      console.log(err)
      next(err)
    },
    error: {}
  },conf)

  function wrapError(err, req, res, next){
    var faError

    if(!(err instanceof FaError)){
      if(err instanceof Error){
        faError = new FaError(err.message)
        faError.stack = err.stack

      }else if(typeof err === 'string'){
        faError = new FaError(err)

      }else{
        faError = new FaError("unknown message type:" + (typeof err))
      }
    }else {
      faError = err
    }
    res.status(faError.statusCode)
    next(faError)
  }

  function finalErrorHandler(err, req, res, next){
    var msg,
        httpCodeConf = conf.error[res.statusCode] || {},
        status = httpCodeConf && httpCodeConf.status ? httpCodeConf.status : conf.status 

    if(conf.debug){
      msg = message(status, {stack:err.stack}, err.message)
    }else {
      msg = message(status, err.message)
    }

    if(req.accepts('text/html')){
      res.message.page(msg, httpCodeConf.time, httpCodeConf.redirect, httpCodeConf.tpl)
    }else{
      res.message(msg)
    }
  }
  return [wrapError, conf.logger, conf.errorHandler]
}