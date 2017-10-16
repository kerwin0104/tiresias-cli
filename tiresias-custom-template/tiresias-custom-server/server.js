const fs = require('fs')
const path = require('path')
const tiresias = require('tiresias')
const webrootDir = path.join(__dirname, './src')

var serverConfig = {}
serverConfig.rootDir = webrootDir
serverConfig.port = 9999

server = { 
  init (config) {
    if (config) {
      serverConfig = Object.assign({}, serverConfig, config)
    }
    tiresias.setConfig(serverConfig)
    return tiresias
  },
  start (port) {
    tiresias.simpleStart(port || serverConfig.port)
    return tiresias 
  }
} 

module.exports = server
