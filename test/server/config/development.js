var nodePath = require('path')
module.exports = {
  "middleware": {
    "session": {
      "path": nodePath.join(__dirname, '../tmp/session')
    },
    "static": {
      "publicDir": nodePath.join(__dirname, '../public')
    }
  },

  "bee": {
    // 数据api集群
    "user": {
      // 版本
      "latest":{
        "defaults":{

        },
        "servers":[
          {

          }
        ]
      }
    }
  }
}