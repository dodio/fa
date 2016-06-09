var nodeUtil = require('util')

module.exports = function(fa){
  fa.message = message
  fa.middleware.add("message", messageHandler)
}
module.exports.message = message
/**
 * message 操作函数集合(本身是一个生成FaMessage对象的函数)
 */
function message(status, data, msg){
  return new FaMessage(status, data, msg)
}
message.success = function(data, msg) {
  return message(0, data, msg)
}
message.FaMessage = FaMessage
message.valid = valid


/**
 * FaMessage 对象
 * @param {[type]} status [业务状态码] 0 代表成功，其他状态均默认表示业务上有问题
 * @param {[type]} data   [业务数据] 
 * @param {[type]} msg    [业务消息]
 */
function FaMessage(status, data, msg){
  if(status && typeof status != "number" )
    throw new TypeError("FaMessage status must be a number")

  // 业务状态不为0，没有msg参数，data为string 重载data为msg
  if(status && !msg && typeof data === 'string'){
    msg = data
    data = null
  }else {
    msg = msg ? String(msg) : "no message"
  }
  data = data || null

  this.status = status
  this.msg = msg
  this.data = data
}

/**
 * connect 中间件工厂
 * @param  {[type]} conf [配置]
 * @return {[type]}      [中间件函数]
 */
function messageHandler(conf) {
  conf = conf || {}

  return function(req, res, next){
    res.message = messageSender

    function messageSender(status, data, msg){
      var faMessage
      if(valid(status)){
        faMessage = status
      }else{
        faMessage = message(status, data, msg)
      }
      return res.json(faMessage)
    }
    
    messageSender.success = function(data, msg){
      return messageSender(0, data, msg)
    }

    messageSender.page = function(msg, time, redirect, tpl){ 
      res.data("fa_message", msg)
      res.data("fa_message_time", time || 5000)
      res.data("fa_message_redirect", redirect || '/')
      return res.render(tpl || conf.tpl, res.data.get())
    }

    next()
  }
}

/**
   * 检测对象是否为有效的消息对象
   * @param  {[type]} obj [待检测的对象]
   * @return {[type]}     [description]
   */
function valid(obj){
  if(!nodeUtil.isObject(obj) || !obj.hasOwnProperty('status')){
    return false
  }

  if(!obj.hasOwnProperty('msg') && !obj.hasOwnProperty('data')){
    return false
  }

  return true
}