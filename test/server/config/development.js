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
    //global defaults to bee.
    "defaults": {
      "headers": {
        "apikey": "d006b78fed6046dec232092e38335439",
        "User-Agent": "fa-bee"
      }
    },
    // api集群,这里以百度apistore 中 天狗健康资讯为例：http://apistore.baidu.com/apiworks/servicedetail/888.html
    "releases": {
      "tngou": {
        "defaults": {}, 
        "latest": "v1",

        "releases": {
          "v1": {
            "version": "1.0.0",
            "defaults": {},
            "latest": "20160416",

            "releases": {
              "20160416": {
                "version": "20160416",
                "defaults": {},
                //servers 与 versions 必须有一个，servers 优先，如果配置了servers，子版本将被忽略, 也忽略 defaultVersion
                "servers": [
                  //就是单独的一个 request defaults 配置
                  {
                    "baseUrl": "http://apis.baidu.com/tngou/"
                  }
                ]
              }
            }
          }
        }
      },

      "test": {
        "servers":[
          {"baseUrl":""}
        ]
      }
    }
  }
}