const cpr = require('cpr')
const path = require('path')
const tiresiasWebpack = require('tiresias-webpack')
const getWebpackConfig = require('../config/webpack.prod.config.js')

const serverTemplatePath = path.join(__dirname, '../../tiresias-custom-server')
const distPath = path.join(__dirname, '../dist')

const buildSourcePath = path.join(__dirname, '../../src')
const buildDistPath = path.join(__dirname, '../../dist')

const defaultConfig = {}
defaultConfig.buildSourcePath = buildSourcePath
defaultConfig.buildDistPath = buildDistPath 

function copyServerFiles (config, callback) {
  console.log('copying server files...')
  cpr(serverTemplatePath, config.distDir, {
    // filter: /node_modules/,  // shit!
    deleteFirst: true,       //Delete "to" before
    overwrite: true,         //If the file exists, overwrite it
    confirm: true            //After the copy, stat all the copied files to make sure they are there
  }, (err, files) => {
      if (typeof callback === 'function') {
        callback(err, files)
      } 
  })
}

function buildFiles (buildConfig) {
  getWebpackConfig(webpackConfig => {
    tiresiasWebpack.exec(webpackConfig) 
  }, buildConfig)
}

function buildProd (buildConfig) {
  var config = {}
  config.rootDir = buildSourcePath
  config.distDir = buildDistPath
  config = Object.assign({}, config, buildConfig)

  copyServerFiles(config, (err, files) => {
    if (err) {
      throw err
    } else {
      console.log(files.join(',\n'))
      console.log('server files copied.')
      console.log('building files...')
      buildFiles(config)
      console.log('build files end.')
    }
  })
}

// buildProd()

module.exports = buildProd

