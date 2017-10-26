const path = require('path')
const cpr = require('cpr')
const build = require('../build/tiresias-custom-webpack/build/prod.js')

const serverTemplatePath = path.join(__dirname, '../tiresias-custom-template/tiresias-custom-server')
const buildSourcePath = path.join(__dirname, '../test')
const buildDistPath = path.join(__dirname, '../dist/src')

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
  var config = {}
  config.rootDir = buildSourcePath
  config.distDir = buildDistPath
  config = Object.assign({}, config, buildConfig)
  config.distDir = path.join(config.distDir, './src')
  build(config)
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


