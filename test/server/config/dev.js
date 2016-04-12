var nodePath = require('path')
module.exports = {
  "middleware": {
    "session": {
      "path": nodePath.join(__dirname, '../tmp/session')
    },
    "static": {
      "publicDir": nodePath.join(__dirname, '../public')
    }
  }
}