const fs = require('fs')
const path = require('path')
const tiresias = require('tiresias')
const conf = require('./conf.json')
const webrootDir = path.join(__dirname, './src')

var serverConfig = {}
serverConfig.rootDir = webrootDir

tiresias.setConfig(serverConfig)
tiresias.simpleStart(conf.port)

