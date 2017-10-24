const path = require('path')
const build = require('../build/tiresias-custom-webpack/build/prod.js')

const buildSourcePath = path.join(__dirname, '../test')
const buildDistPath = path.join(__dirname, '../dist/src')


function buildProd (buildConfig) {
  var config = {}
  config.rootDir = buildSourcePath
  config.distDir = buildDistPath
  config = Object.assign({}, config, buildConfig)
  console.log(config)
  build(config)
}

module.exports = buildProd


