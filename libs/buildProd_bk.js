const cpr = require('cpr')
const path = require('path')
const tiresiasWebpack = require('tiresias-webpack')

const serverTemplatePath = path.join(__dirname, '../tiresias-template')
const distPath = path.join(__dirname, '../dist')

const buildSourcePath = path.join(__dirname, '../test')
const buildDistPath = path.join(__dirname, '../dist/src')

const defaultConfig = {}
defaultConfig.buildSourcePath = buildSourcePath
defaultConfig.buildDistPath = buildDistPath 

function copyServerFiles (config, callback) {
  console.log('copying server files...')
  cpr(serverTemplatePath, config.distDir, {
    deleteFirst: true,  //Delete "to" before
    overwrite: true,    //If the file exists, overwrite it
    confirm: true       //After the copy, stat all the copied files to make sure they are there
  }, (err, files) => {
      if (typeof callback === 'function') {
        callback(err, files)
      } 
  })
}

function buildFiles (buildConfig) {
  buildConfig.distDir = path.join(buildConfig.distDir, './src')
  tiresiasWebpack(buildConfig) 
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

module.exports = buildProd


